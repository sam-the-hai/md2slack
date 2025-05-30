import { MarkdownToSlackParser } from './parser.js';

/**
 * UI Controller for the Markdown to Slack converter
 */
export class MarkdownConverterUI {
  constructor() {
    this.initializeElements();
    this.initializeEventListeners();
  }

  /**
   * Initialize DOM elements
   * @private
   */
  initializeElements() {
    this.inputElement = document.getElementById("input");
    this.outputElement = document.getElementById("output");
    this.convertButton = document.getElementById("convert");
    this.copyButton = document.getElementById("copy");
    this.statusElement = document.getElementById("status");

    if (!this.inputElement || !this.outputElement || !this.convertButton || !this.copyButton) {
      throw new Error('Required DOM elements not found');
    }
  }

  /**
   * Initialize event listeners
   * @private
   */
  initializeEventListeners() {
    this.convertButton.addEventListener("click", () => this.convert());
    this.copyButton.addEventListener("click", () => this.copyToClipboard());
    this.inputElement.addEventListener("input", () => this.handleInput());
  }

  /**
   * Handle input changes
   * @private
   */
  handleInput() {
    this.showStatus('');
  }

  /**
   * Convert markdown to Slack format
   * @private
   */
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

  /**
   * Copy output to clipboard
   * @private
   */
  async copyToClipboard() {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(this.outputElement.value);
      } else {
        this.outputElement.select();
        document.execCommand("copy");
      }
      this.showStatus('Copied to clipboard!', 'success');
    } catch (error) {
      console.error('Copy error:', error);
      this.showStatus('Error copying to clipboard', 'error');
    }
  }

  /**
   * Show status message
   * @param {string} message - The message to display
   * @param {string} type - The type of message (success/error)
   * @private
   */
  showStatus(message, type = '') {
    if (!this.statusElement) return;
    
    this.statusElement.textContent = message;
    this.statusElement.className = type ? `status ${type}` : 'status';
    
    if (message) {
      setTimeout(() => {
        this.statusElement.textContent = '';
        this.statusElement.className = 'status';
      }, 3000);
    }
  }
} 