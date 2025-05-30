import { MarkdownToSlackParser } from './parser.js';

describe('MarkdownToSlackParser', () => {
  test('converts headers correctly', () => {
    const input = `# Header 1
## Header 2
### Header 3`;
    const expected = `*Header 1*
*Header 2*
*Header 3*`;
    expect(MarkdownToSlackParser.parse(input)).toBe(expected);
  });

  test('converts text formatting correctly', () => {
    const input = `**Bold text**
_Italic text_
~~Strikethrough~~
__Bold alt__
_Italic alt_`;
    const expected = `*Bold text*
_Italic text_
~Strikethrough~
*Bold alt*
_Italic alt_`;
    expect(MarkdownToSlackParser.parse(input)).toBe(expected);
  });

  test('converts lists correctly', () => {
    const input = `- Item 1
* Item 2
+ Item 3
1. Numbered 1
2. Numbered 2`;
    const expected = `• Item 1
• Item 2
• Item 3
1. Numbered 1
2. Numbered 2`;
    expect(MarkdownToSlackParser.parse(input)).toBe(expected);
  });

  test('converts links and images correctly', () => {
    const input = `[Link text](https://example.com)
![Image alt](https://example.com/image.jpg)
https://bare-url.com`;
    const expected = `<https://example.com|Link text>
<https://example.com/image.jpg|Image alt>
<https://bare-url.com>`;
    expect(MarkdownToSlackParser.parse(input)).toBe(expected);
  });

  test('converts code correctly', () => {
    const input = '`inline code` and ```\nblock code\n```';
    const expected = '`inline code` and ```\nblock code\n```';
    expect(MarkdownToSlackParser.parse(input)).toBe(expected);
  });

  test('converts release notes correctly', () => {
    const input = `Release v1.0.0

## What's Changed

- Added feature X by @user1 in [PR #123](https://github.com/org/repo/pull/123)
- Fixed bug Y by @user2 in [PR #456](https://github.com/org/repo/pull/456)

## Full Changelog
[Compare v0.9.0...v1.0.0](https://github.com/org/repo/compare/v0.9.0...v1.0.0)`;
    const expected = `Release v1.0.0

*What's Changed*

• Added feature X by @user1 in <https://github.com/org/repo/pull/123|PR #123>
• Fixed bug Y by @user2 in <https://github.com/org/repo/pull/456|PR #456>

*Full Changelog*
<https://github.com/org/repo/compare/v0.9.0...v1.0.0|Compare v0.9.0...v1.0.0>`;
    expect(MarkdownToSlackParser.parse(input)).toBe(expected);
  });

  test('converts mixed content correctly', () => {
    const input = `# Main Title
## Subtitle

**Bold** and _italic_ text with \`code\`.

- List item 1
- List item 2

[Link](https://example.com) and @mention`;
    const expected = `*Main Title*
*Subtitle*

*Bold* and _italic_ text with \`code\`.

• List item 1
• List item 2

<https://example.com|Link> and @mention`;
    expect(MarkdownToSlackParser.parse(input)).toBe(expected);
  });
}); 