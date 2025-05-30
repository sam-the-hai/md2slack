# Markdown to Slack Converter

A simple web tool to convert Markdown to Slack-compatible formatting.

## Features

- Convert Markdown to Slack format
- Support for headers, lists, links, code blocks, and more
- Clean, modern UI
- Copy to clipboard functionality
- Status feedback

## Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/md2slack.git
cd md2slack
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm start
```

## Deployment

### Automatic Deployment (GitHub Pages)

The project is automatically deployed to GitHub Pages when you push to the main branch.

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy to GitHub Pages:
```bash
npm run deploy
```

## Project Structure

```
md2slack/
├── index.html          # Main HTML file
├── style.css          # Styles
├── build.js           # Build script
├── package.json       # Project configuration
└── js/
    ├── app.js         # Application entry point
    ├── parser.js      # Markdown parser
    └── ui.js          # UI controller
```

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run deploy` - Deploy to GitHub Pages

## License

MIT 