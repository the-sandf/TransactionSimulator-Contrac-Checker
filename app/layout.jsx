// app/layout.js
import '../styles/globals.css';  // Import global styles

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Web3 Platform</title>
      </head>
      <body>
        <main>
          {children} {/* Render the child components (pages) here */}
        </main>
        <footer className="text-center p-4">
          <p>&copy; {new Date().getFullYear()} Web3 Platform</p>
        </footer>
      </body>
    </html>
  );
}
