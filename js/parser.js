/**
 * Markdown to Slack Parser
 * Converts Markdown syntax to Slack-compatible formatting
 */
export class MarkdownToSlackParser {
  /**
   * Converts markdown text to Slack format
   * @param {string} md - The markdown text to convert
   * @returns {string} The converted Slack-formatted text
   */
  static parse(md) {
    if (!md) return '';
    
    try {
      // First convert to plain text with Slack formatting
      const formattedText = md
        // Headers - handle both # and ## style
        .replace(/^#{1,2}\s+(.*)$/gm, (_, content) => {
          const text = content.trim();
          return `*${text}*`;
        })
        
        // Text Formatting
        .replace(/\*\*([^*]+)\*\*/g, '*$1*')                // Bold → Bold
        .replace(/\*([^*]+)\*/g, '_$1_')                    // Italic → Italic
        .replace(/__([^_]+)__/g, '*$1*')                    // Bold (alt) → Bold
        .replace(/_([^_]+)_/g, '_$1_')                      // Italic (alt) → Italic
        .replace(/~~([^~]+)~~/g, '~$1~')                    // Strikethrough
        
        // Lists - handle both - and * style
        .replace(/^[-*]\s+(.*)$/gm, '• $1')                 // Unordered lists
        .replace(/^\d+\.\s+(.*)$/gm, '$&')                  // Numbered lists
        
        // Links and Images
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<$2|$1>')     // Links
        .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<$2|$1>')    // Images
        
        // Code
        .replace(/^```(\w*)\n([\s\S]*?)```/gm, '```$1\n$2```')  // Code blocks
        .replace(/`([^`]+)`/g, '`$1`')                      // Inline code
        
        // Other Elements
        .replace(/^>\s+(.*)$/gm, '> $1')                    // Blockquotes
        .replace(/^[-*_]{3,}$/gm, '---')                    // Horizontal rules
        .replace(/^\|(.+)\|$/gm, match => match.replace(/\|/g, ' | ').trim())  // Tables
        
        // GitHub-specific
        .replace(/@([a-zA-Z0-9-]+)/g, '@$1')                // Preserve @mentions
        .replace(/(https?:\/\/[^\s]+)/g, '<$1>')            // Convert bare URLs to links
        
        // Cleanup
        .replace(/\n{3,}/g, '\n\n')                         // Max 2 newlines
        .replace(/[ \t]+$/gm, '')                           // Remove trailing spaces
        .trim();                                             // Remove leading/trailing whitespace

      // Create a temporary textarea to handle the text
      const textarea = document.createElement('textarea');
      textarea.value = formattedText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);

      return formattedText;
    } catch (error) {
      console.error('Error parsing markdown:', error);
      return 'Error: Could not parse markdown';
    }
  }

  /**
   * Validates if the input is valid markdown text
   * @param {string} md - The text to validate
   * @returns {boolean} Whether the input is valid
   */
  static validate(md) {
    if (!md) return false;
    if (typeof md !== 'string') return false;
    return true;
  }
} 