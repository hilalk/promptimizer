import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'ESKlarheitKurrent-Rg';
    src: url('/assets/fonts/ESKlarheitKurrent-Rg.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  
  @font-face {
    font-family: 'ESKlarheitPlakat-Xbd';
    src: url('/assets/fonts/ESKlarheitPlakat-Xbd.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  
  @font-face {
    font-family: 'NoeDisplay-RegularItalic';
    src: url('/assets/fonts/NoeDisplay-RegularItalic.woff') format('woff');
    font-weight: normal;
    font-style: italic;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%; /* 1rem = 10px */
    overflow-x: hidden;
  }

  body {
    font-family: 'Agdasima', sans-serif;
    font-size: 7rem;
    min-height: 100vh;
    position: relative;
    padding-bottom: 6rem; /* Space for footer */
    overflow-x: hidden;
  }
  
  /* Force all buttons to have border-radius */
  button {
    border-radius: 0.2rem !important;
  }

  /* Responsive font scaling for mobile */
  @media (max-width: 768px) {
    html {
      font-size: 50%; /* 1rem = 8px (20% reduction) */
    }
  }

  /* Global button styles */
  .primary-button {
    display: flex;
    align-items: center;
    padding: 1.6rem;
    border: 0.6rem solid black !important;
    border-radius: 0.2rem;
    background-color: transparent;
    text-transform: uppercase;
    font-family: 'Agdasima', sans-serif;
    font-size: 2rem;
    cursor: pointer;
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(0.95);
    }
    
    &:active {
      transform: scale(0.9);
    }

    svg {
      margin-right: 1rem;
    }
  }

  .toggle-button {
    background: none;
    border: none;
    text-decoration: underline;
    text-transform: uppercase;
    font-family: 'Agdasima', sans-serif;
    font-size: 2rem;
    cursor: pointer;
    transition: transform 0.2s ease;
    display: flex;
    align-items: center;
    
    &:hover {
      transform: scale(0.95);
    }
    
    &:active {
      transform: scale(0.9);
    }

    svg {
      margin-right: 1rem;
    }
  }

  /* Page content padding */
  .page-content {
    padding: 2rem;
  }

  /* Console log styles */
  console.log {
    color: blue;
    font-weight: bold;
  }
`;

export default GlobalStyles; 