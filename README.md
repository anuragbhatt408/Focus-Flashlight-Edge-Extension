# 🔦 Focus Flashlight

> **A digital horse-blinder for the web.** > Dim the distractions. Highlight the focus. Read better.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/Language-Vanilla%20JS-F7DF1E.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Microsoft Edge](https://img.shields.io/badge/Available%20on-Edge%20Add--ons-0078D7.svg)]([https://microsoftedge.microsoft.com/addons/detail/focus-flashlight/dbeoiecheeocpjmfbfmpdfddlmapjgeo])

---

## 📖 The Story
It was 11 PM. I was trying to read a dense technical article, and I was failing miserably. Sidebar ads, notifications, and bright white backgrounds were killing my attention span.

I realized I didn't need more discipline—I needed **digital horse blinders**. I wanted a tool to dim the entire internet and shine a literal spotlight on just the paragraph I was currently reading.

I built **Focus Flashlight** to fix this. It’s a lightweight, open-source browser extension that helps you focus on one thing at a time.

**[👉 Read the "How I Built This" article on Medium](https://javascript.plainenglish.io/i-built-a-flashlight-for-the-web-because-i-couldnt-focus-33b5bab5e9a7)**

---

## ✨ Features

* **🔦 Spotlight Effect:** A smooth, radial light that follows your mouse cursor.
* **🌑 Dim the Noise:** Darkens the rest of the page to reduce visual clutter.
* **⚡ Zero Lag:** Powered by CSS Variables and hardware acceleration for 60fps performance.
* **🌙 Dark Mode Support:** Uses a smart Z-Index stacking hack to make text "pop out" as bright white cards, even on pitch-black websites.
* **🎛️ Customizable:** Adjust the spotlight size and background dimness via a clean popup menu.

---

## 🚀 Installation

### Option 1: The Easy Way (Microsoft Edge)
You can install it directly from the official Microsoft Edge Add-ons store. Since Edge is built on Chromium, this works perfectly and updates automatically.

👉 **[Download for Microsoft Edge]([https://javascript.plainenglish.io/i-built-a-flashlight-for-the-web-because-i-couldnt-focus-33b5bab5e9a7])**

### Option 2: The "Hacker" Way (Chrome, Brave, Opera)
Since I built this as a free, open-source tool, I chose not to pay the $5 fee to list it on the Chrome Web Store. But you can still install it manually in 30 seconds:

1.  **Download** this repository (Click the green "Code" button -> "Download ZIP") and unzip it.
2.  Open Chrome and type `chrome://extensions` in the address bar.
3.  Toggle **Developer Mode** to **ON** (top right corner).
4.  Click the **Load Unpacked** button.
5.  Select the unzipped folder containing the code.
6.  That's it! The flashlight icon will appear in your toolbar.

---

## 🛠️ How It Works (Under the Hood)

This extension is built with **Vanilla JavaScript** (no frameworks) to keep it lightweight. Here is how the core mechanics work:

### 1. The Physics (CSS Variables)
Instead of re-rendering the DOM on every mouse move (which causes lag), the content script simply updates two CSS variables. The browser handles the painting.

```javascript
// content.js
function moveLight(e) {
  // e.clientX/Y are the mouse coordinates
  overlay.style.setProperty('--x', e.clientX + 'px');
  overlay.style.setProperty('--y', e.clientY + 'px');
}
```

### 2. The Visuals (Radial Gradients)
The "hole" in the darkness isn't an image—it's a dynamic CSS gradient utilizing the variables set by JavaScript.

```css
/* styles.css */
background: radial-gradient(
  circle var(--radius) at var(--x) var(--y), 
  transparent 0%, 
  rgba(255, 255, 255, 0.08) 18%, /* Subtle rim light */
  rgba(0, 0, 0, var(--darkness)) 40%
);
```

### 3. The "Pop-Out" Effect (Z-Index Hacking)
To make text readable on dark mode sites, we use a z-index trick. When you hover over a paragraph, we lift it into a new stacking context above the flashlight overlay.

```css
body.focus-mode-active p:hover {
  position: relative;
  z-index: 2147483648; /* Higher than the overlay's z-index */
  background-color: white;
  color: black;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
}
);
```

## 🤝 Contributing
* This is an open-source project! If you have ideas for features (e.g., keyboard shortcuts, different light shapes, reading timer), feel free to fork the repo.
* Fork the Project
* Create your Feature Branch (git checkout -b feature/AmazingFeature)
* Commit your Changes (git commit -m 'Add some AmazingFeature')
* Push to the Branch (git push origin feature/AmazingFeature)
* Open a Pull Request

## 👨‍💻 Author
### Anurag Bhatt Full Stack Developer | GenAI Enthusiast

### LinkedIn: **[👉 Connect with me](https://www.linkedin.com/in/anuragbhatt408/)**
### Medium: **[👉 Read the article](https://javascript.plainenglish.io/i-built-a-flashlight-for-the-web-because-i-couldnt-focus-33b5bab5e9a7)**
