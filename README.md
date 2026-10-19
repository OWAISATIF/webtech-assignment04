Markdown Slides Web Application
A lightweight, zero-dependency slide presentation web application built with vanilla HTML5, CSS3, and JavaScript (ES6).

This project allows users to compose presentations using Markdown syntax on a split-screen live editor, store slide decks locally, and deliver presentations in full-screen mode.

Features
50/50 Split Workspace: Live dark-themed code editor on the left with instant slide preview rendering on the right.

Custom Markdown Parsing: Converts # headers, ## subheaders, and line breaks directly into formatted HTML elements without using external libraries or dependencies.

Slide Separation: Splits slide decks seamlessly using the standard --- line separator.

Navigation Controls: Previous/Next navigation buttons with edge boundaries (disables buttons on first/last slide) and dynamic slide counter display (current / total).

Fullscreen Presentation Mode: Dedicated presentation mode with automatic viewport state change listeners.

Local Memory Persistence: Save slide content to browser localStorage to keep work safe across reloads.

Keyboard Shortcuts:

Left Arrow / Right Arrow: Navigate between slides.

Ctrl + S / Cmd + S: Quick-save slides to localStorage.

Built With
HTML5 – Application structure and semantic containers.

CSS3 – Flexbox split layout and fullscreen styles.

Vanilla JavaScript – Regular expressions parsing, DOM manipulation, state management, and event handling.
