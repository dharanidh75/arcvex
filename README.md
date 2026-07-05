# ArcVex Agency

ArcVex is a premium digital agency landing page built with React, Vite, Tailwind CSS, and Framer Motion. It features a modern, high-contrast design with sleek typography, smooth animations, and a fully responsive layout.

## 🚀 Installation & Setup

Follow these steps to get the project running locally on your machine.

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- npm (comes with Node.js)

### Steps

1. **Open your terminal and navigate to the web app directory:**
   ```bash
   cd apps/web
   ```

2. **Install the dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **View the app:**
   Open your browser and navigate to the local URL provided in your terminal (usually `http://localhost:5173`).

---

## 📁 File Structure

Here is an overview of the project's structure to help you navigate the codebase:

```text
ArcVex/
├── apps/
│   └── web/
│       ├── public/               # Public static assets that are served directly
│       │   ├── about-image.png   # The image used in the "Who We Are" section
│       │   └── favicon.svg       # Website favicon
│       │
│       ├── src/                  # Application source code
│       │   ├── assets/           # Internal assets imported into React components
│       │   ├── components/       # Reusable UI components
│       │   │   ├── Header.jsx       # Navigation bar
│       │   │   ├── Footer.jsx       # Global footer
│       │   │   ├── ServiceCard.jsx  # Individual service offering cards
│       │   │   ├── ProjectCard.jsx  # Portfolio project cards
│       │   │   └── ...
│       │   │
│       │   ├── lib/              # Helper and utility functions (e.g. cn for Tailwind classes)
│       │   │
│       │   ├── pages/            # Page-level components
│       │   │   └── HomePage.jsx     # The main landing page assembling all components
│       │   │
│       │   ├── App.jsx           # Main React component wrapping the router/pages
│       │   ├── index.css         # Global CSS variables, custom utilities, and Tailwind base
│       │   └── main.jsx          # React DOM entry point
│       │
│       ├── index.html            # Main HTML template file
│       ├── package.json          # Project dependencies and npm scripts
│       ├── postcss.config.js     # PostCSS configuration for processing Tailwind
│       ├── tailwind.config.js    # Tailwind CSS theme, colors, fonts, and plugins configuration
│       └── vite.config.js        # Vite bundler configuration
│
└── README.md                     # This documentation file
```

## 🛠️ Built With

- **[React](https://react.dev/)**: Frontend library for building the UI.
- **[Vite](https://vitejs.dev/)**: Next-generation frontend tooling and bundler.
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework for rapid styling.
- **[Framer Motion](https://www.framer.com/motion/)**: Production-ready animation library for React.
- **[Lucide React](https://lucide.dev/)**: Beautiful and consistent icon toolkit.
- **[Google Fonts](https://fonts.google.com/)**: Utilizing `Plus Jakarta Sans` for clean body copy and `Tiempos` for elegant editorial highlights.
