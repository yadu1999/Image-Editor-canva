# Image-Editor-canva

🎨 Canva-like Image Editor

A web-based image editor built with Next.js that allows users to create custom designs by layering images, text, and shapes—similar to Canva. Users can add, move, resize, and layer elements to generate a composite image.


📁 Project Structure

canva-editor/
├── components/         # Reusable React components (Toolbar, Canvas, LayerItem, etc.)
├── pages/              # Next.js page components
├── public/             # Static assets (icons, images)
├── styles/             # Global and component-specific styles
├── utils/              # Utility functions and constants
└── README.md

✨ Features

🖼️ Add multiple images to the canvas

🔤 Insert customizable text elements

🟦 Add basic shapes (rectangles, circles, etc.)

🎯 Move, resize, and rotate elements freely

🧱 Layer-based design system with Z-index management

📂 Download/export final design as an image

♻️ Undo/redo support (if implemented)

🎨 Responsive design for desktop screens


🛠️ Tech Stack

Frontend Framework: Next.js

Canvas Rendering: HTML5 Canvas / DOM-based rendering

Styling: Tailwind CSS or Custom CSS (as per implementation)

State Management: React Hooks & Context API (if used)

🧑‍💻 Getting Started


Prerequisites:-

Make sure you have Node.js and npm installed.

node -v
npm -v
Installation
Clone the repository:

bash
Copy
Edit
git clone https://github.com/yadu1999/Image-Editor-canva.git
cd canva-editor


Install dependencies:

npm install

Run the development server:

npm run dev
