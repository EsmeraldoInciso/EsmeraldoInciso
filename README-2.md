# Esmeraldo (Don) Inciso Jr. — Portfolio

A modern, dark-themed personal portfolio website built with vanilla HTML, CSS, and JavaScript. Designed for GitHub Pages deployment.

## 🚀 Deploy to GitHub Pages

### Quick Setup

1. **Create a new repo** on GitHub named `doninciso-swiftly.github.io` (or any repo name)

2. **Push this folder** to the repo:
   ```bash
   cd portfolio
   git init
   git add .
   git commit -m "Initial portfolio deploy"
   git branch -M main
   git remote add origin https://github.com/doninciso-swiftly/doninciso-swiftly.github.io.git
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - Go to **Settings → Pages**
   - Source: **Deploy from a branch**
   - Branch: **main** / root
   - Click **Save**

4. Your site will be live at `https://doninciso-swiftly.github.io` within a few minutes.

### Using a Custom Domain (Optional)

1. Go to **Settings → Pages → Custom domain**
2. Enter your domain (e.g., `don.dev`)
3. Add a `CNAME` file to the repo root containing just your domain
4. Configure DNS:
   - **A records** pointing to GitHub Pages IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - Or a **CNAME** record: `doninciso-swiftly.github.io`

## 📁 Structure

```
portfolio/
├── index.html          # Main page
├── css/
│   └── style.css       # All styles
├── js/
│   └── main.js         # Scroll reveal, nav, interactions
├── assets/
│   ├── favicon.svg     # Site favicon
│   └── og-image.png    # Social preview image (add your own)
└── README.md
```

## ✏️ Customization

- **Colors:** Edit CSS variables in `:root` block in `css/style.css`
- **Content:** Edit text directly in `index.html`
- **Contact links:** Update `href` values in the Contact section
- **OG image:** Add a 1200×630px `og-image.png` to `/assets/`
- **Fonts:** Swap Google Fonts imports in `index.html` `<head>`

## 🛠 Tech

- Vanilla HTML5, CSS3, JavaScript (ES6+)
- Google Fonts (Playfair Display, DM Sans, JetBrains Mono)
- CSS animations & IntersectionObserver for scroll reveals
- No build tools, no dependencies — just deploy
