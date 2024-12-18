import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/components/App';

// Create container for content script
const container = document.createElement('div');
container.id = 'my-extension-container';
document.body.appendChild(container);

// Render React app
const root = createRoot(container);
root.render(React.createElement(App));
