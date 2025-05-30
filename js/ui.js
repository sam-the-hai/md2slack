import { MarkdownToSlackParser } from './parser.js';

// UI Controller
export class MarkdownConverterUI {
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