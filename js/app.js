import { MarkdownConverterUI } from './ui.js';

// Markdown to Slack Parser
class MarkdownToSlackParser {
  static parse(md) {
    if (!md) return '';
    
    try {
      return md
        // Headers (must be first to avoid conflicts with other patterns)
        .replace(/^#{1,6}\s+(.*)$/gm, (match, content) => {
          return `*${content.trim()}*`;
        })
        // Bold and Italic (must be before lists to avoid conflicts)
        .replace(/\*\*([^*]+)\*\*/g, '*$1*')                // Bold → Bold
        .replace(/\*([^*]+)\*/g, '_$1_')                     // Italic → Italic
        .replace(/__([^_]+)__/g, '*$1*')                    // Bold (alt syntax) → Bold
        .replace(/_([^_]+)_/g, '_$1_')                      // Italic (alt syntax) → Italic
        // Lists
        .replace(/^[-*+]\s+(.*)$/gm, '• $1')                // Unordered list items
        .replace(/^\d+\.\s+(.*)$/gm, '$&')                  // Numbered list items (preserve numbers)
        // Links
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<$2|$1>')     // [text](url) → <url|text>
        // Code blocks and inline code
        .replace(/^```(\w*)\n([\s\S]*?)```/gm, '```$1\n$2```')  // Code blocks with language
        .replace(/`([^`]+)`/g, '`$1`')                      // Inline code
        // Blockquotes
        .replace(/^>\s+(.*)$/gm, '> $1')                    // Blockquote
        // Horizontal rule
        .replace(/^[-*_]{3,}$/gm, '---')                    // Horizontal rule (any of -, *, _)
        // Strikethrough
        .replace(/~~([^~]+)~~/g, '~$1~')                    // Strikethrough
        // Tables (basic support)
        .replace(/^\|(.+)\|$/gm, (match) => {               // Table rows
          return match.replace(/\|/g, ' | ').trim();
        })
        // Images
        .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<$2|$1>')   // Images
        // Clean up multiple newlines
        .replace(/\n{3,}/g, '\n\n')                         // Max 2 newlines
        // Clean up spaces
        .replace(/[ \t]+$/gm, '')                           // Remove trailing spaces
        .trim();                                             // Remove leading/trailing whitespace
    } catch (error) {
      console.error('Error parsing markdown:', error);
      return 'Error: Could not parse markdown';
    }
  }

  static validate(md) {
    if (!md) return false;
    if (typeof md !== 'string') return false;
    return true;
  }
}

// UI Controller
class MarkdownConverterUI {
  constructor() {
    this.inputElement = document.getElementById("input");
    this.outputElement = document.getElementById("output");
    this.convertButton = document.getElementById("convert");
    this.copyButton = document.getElementById("copy");
    this.statusElement = document.getElementById("status");
    
    this.initializeEventListeners();
  }

  initializeEventListeners() {
    this.convertButton.addEventListener("click", () => this.convert());
    this.copyButton.addEventListener("click", () => this.copyToClipboard());
    this.inputElement.addEventListener("input", () => this.handleInput());
  }

  handleInput() {
    // Clear status when user starts typing
    this.showStatus('');
  }

  convert() {
    const input = this.inputElement.value;
    
    if (!MarkdownToSlackParser.validate(input)) {
      this.showStatus('Please enter some markdown text', 'error');
      return;
    }

    try {
      const output = MarkdownToSlackParser.parse(input);
      this.outputElement.value = output;
      this.showStatus('Converted successfully!', 'success');
    } catch (error) {
      console.error('Conversion error:', error);
      this.showStatus('Error converting markdown', 'error');
    }
  }

  copyToClipboard() {
    try {
      this.outputElement.select();
      document.execCommand("copy");
      this.showStatus('Copied to clipboard!', 'success');
    } catch (error) {
      console.error('Copy error:', error);
      this.showStatus('Error copying to clipboard', 'error');
    }
  }

  showStatus(message, type = '') {
    if (!this.statusElement) return;
    
    this.statusElement.textContent = message;
    this.statusElement.className = type ? `status ${type}` : 'status';
    
    // Clear status after 3 seconds
    if (message) {
      setTimeout(() => {
        this.statusElement.textContent = '';
        this.statusElement.className = 'status';
      }, 3000);
    }
  }
}

// Initialize the UI when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new MarkdownConverterUI();
}); 