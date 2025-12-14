# FWDays Homework - Frontend

A simple React application built with Vite for deployment on AWS infrastructure.

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **CSS Modules** - Component styling

## Project Structure

```
frontend/
├── public/           # Static assets
├── src/
│   ├── assets/      # Images, icons, etc.
│   ├── pages/       # Page components
│   ├── styles/      # CSS files
│   ├── App.jsx      # Main application component
│   └── main.jsx     # Entry point
├── index.html       # HTML template
├── package.json     # Dependencies
└── vite.config.js   # Vite configuration
```

## Development

Install dependencies:
```bash
npm install
```

Run development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Deployment

This application is deployed on AWS using:
- **S3** for static file hosting
- **CloudFront** for CDN distribution

The infrastructure is managed with AWS CDK in the `/infrastructure` directory.

### Deployment URLs

- HM-1: http://kyrylo-fwdays-hm-1.s3-website.eu-north-1.amazonaws.com/
- HM-2: https://d3qxy14hergyyi.cloudfront.net/
