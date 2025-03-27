# Promptimizer

Promptimizer optimizes your prompts to AI tools for better results. Simply enter your prompt and see the magic happen.

## Features

- Sleek cover page with app introduction
- Interactive prompt input with dynamic "Optimize" button
- Color grid animation for loading states
- Optimized prompt display with copy functionality
- Detailed explanation of prompt improvements
- Responsive design for all device sizes

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
```
git clone https://github.com/hilalk/promotimizer.git
cd promotimizer
```

2. Install dependencies:
```
npm install
```

3. Add required assets:
   - Add fonts to `public/assets/fonts/`:
     - ESKlarheitKurrent-Rg.woff
     - ESKlarheitPlakat-Xbd.woff
     - NoeDisplay-RegularItalic.woff
   - Add images to `public/assets/images/`:
     - bg.png (background image for cover)
     - logo.svg (Penguins from Pluto logo)

4. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Add your OpenAI API key to the `.env` file
   ```
   REACT_APP_OPENAI_API_KEY=your-openai-api-key-here
   ```

5. Start the development server:
```
npm start
```

6. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Deployment

### Cloudflare Pages

This app is designed to be compatible with Cloudflare Pages. To deploy:

1. Build the project:
```
npm run build
```

2. Deploy the `build` directory to Cloudflare Pages through the Cloudflare Dashboard or CLI.

## Project Structure

- `src/components/`: React components
- `src/services/`: API services
- `public/assets/`: Static assets like images, fonts, and icons

## Technologies Used

- React.js
- Styled Components
- D3.js (for animations)
- OpenAI API integration (simulated)

## Credits

Made with ♥ by [Penguins from Pluto](https://penguinsfrompluto.com) 