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
      return md
        // 1. Headers (all levels)
        .replace(/^#{1,6}\s+(.*)$/gm, (_, content) => `*${content.trim()}*`)

        // 2. Links and Images (before bold/italic)
        .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<$2|$1>')    // Images
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<$2|$1>')     // Links

        // 3. Bold (strong) - **text** or __text__ or *text*
        .replace(/\*\*([^*]+)\*\*/g, '*$1*')                // Bold → Bold
        .replace(/__([^_]+)__/g, '*$1*')                    // Bold (alt) → Bold
        .replace(/(^|\s)\*([^*\s][^*]*?)\*(?=\s|$)/g, '$1*$2*')  // Single * for bold

        // 4. Italic - _text_ only
        .replace(/(^|\s)_([^_\s][^_]*?)_(?=\s|$)/g, '$1_$2_')  // Italic

        // 5. Strikethrough
        .replace(/~~([^~]+)~~/g, '~$1~')

        // 6. Lists
        .replace(/^[-*+]\s+(.*)$/gm, '• $1')                // Unordered lists
        .replace(/^\d+\.\s+(.*)$/gm, '$&')                  // Numbered lists

        // 7. Code
        .replace(/^```(\w*)\n([\s\S]*?)```/gm, '```$1\n$2```')  // Code blocks
        .replace(/`([^`]+)`/g, '`$1`')                      // Inline code

        // 8. Blockquotes
        .replace(/^>\s+(.*)$/gm, '> $1')                    // Blockquotes

        // 9. Horizontal rules
        .replace(/^[-*_]{3,}$/gm, '---')                    // Horizontal rules

        // 10. Tables (simple)
        .replace(/^\|(.+)\|$/gm, match => match.replace(/\|/g, ' | ').trim())

        // 11. GitHub-specific
        .replace(/@([a-zA-Z0-9-]+)/g, '@$1')                // Preserve @mentions
        // Convert bare URLs to links, but not if already inside <...|...>
        .replace(/(^|\s)(https?:\/\/[^\s<>]+[^.,;:!?)\]\s<>])(?=\s|$)/g, '$1<$2>')

        // 12. Cleanup
        .replace(/\n{3,}/g, '\n\n')                         // Max 2 newlines
        .replace(/[ \t]+$/gm, '')                           // Remove trailing spaces
        .trim();                                             // Remove leading/trailing whitespace
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