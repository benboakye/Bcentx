# Bcentx - Master the Art of Making Money

A comprehensive educational blog platform focused on teaching multiple income-generating strategies. Built with HTML, CSS, and JavaScript, featuring a responsive green/blue theme, affiliate link integration, and paid strategy session booking.

## 🌟 Features

### Core Functionality
- **Responsive Design**: Fully responsive layout that works seamlessly across desktop, tablet, and mobile devices
- **Smooth Scrolling**: Enhanced user experience with smooth page navigation
- **Interactive Forms**: Contact form with validation for booking strategy sessions
- **Affiliate Link Tracking**: Built-in system to track and manage affiliate links with disclosure modals
- **Green/Blue Theme**: Modern, professional color scheme optimized for financial education content

### Content Structure
- **Home Page**: Landing page with hero section, about section, and income streams overview
- **Learning Centre**: Hub page showcasing all five income categories with detailed descriptions
- **Category Pages**: Dedicated pages for each income stream:
  - Traditional Employment
  - Side Hustles
  - Entrepreneurship
  - Investing
  - Digital Income Streams
- **Blog Posts**: Educational articles with rich content formatting, affiliate callouts, and related articles
- **Strategy Session Booking**: Contact form integration for paid consulting services

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- A web server (for local development) or web hosting service

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/Bernard5162/Bcentx.git
cd Bcentx
```

2. Start a local web server:

**Using Python 3:**
```bash
python3 -m http.server 8000
```

**Using Node.js (http-server):**
```bash
npx http-server -p 8000
```

**Using PHP:**
```bash
php -S localhost:8000
```

3. Open your browser and navigate to:
```
http://localhost:8000
```

### Deployment

#### GitHub Pages
1. Go to your repository settings
2. Navigate to "Pages" section
3. Select the main branch as the source
4. Your site will be available at `https://bernard5162.github.io/Bcentx/`

#### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: (leave empty)
3. Set publish directory: `/`
4. Deploy!

#### Traditional Web Hosting
Upload all files to your web server's public directory (e.g., `public_html`, `www`, or `htdocs`)

## 📁 Project Structure

```
Bcentx/
├── index.html                              # Home page
├── learning-centre.html                     # Learning centre hub
├── category-traditional-employment.html     # Traditional employment category
├── category-side-hustles.html              # Side hustles category
├── category-entrepreneurship.html          # Entrepreneurship category
├── category-investing.html                 # Investing category
├── category-digital-income.html            # Digital income category
├── post-salary-negotiation.html            # Sample blog post
├── post-income-boosting-skills.html        # Sample blog post
├── css/
│   └── styles.css                          # Main stylesheet
├── js/
│   └── main.js                             # JavaScript functionality
└── README.md                               # This file
```

## 🎨 Design System

### Color Palette
- **Primary Green**: `#10b981` - Main call-to-action color
- **Primary Green Dark**: `#059669` - Hover states
- **Secondary Blue**: `#3b82f6` - Accent color
- **Secondary Blue Dark**: `#2563eb` - Blue hover states
- **Neutral Grays**: From `#f9fafb` to `#111827` - Text and backgrounds

### Typography
- **Font Family**: System font stack for optimal performance
- **Base Size**: 16px
- **Line Height**: 1.6 for body text
- **Headings**: Bold weights with tight line-height (1.2)

## 🔧 Customization

### Adding New Blog Posts

1. Create a new HTML file (e.g., `post-your-title.html`)
2. Use `post-salary-negotiation.html` as a template
3. Update the content within the `<article>` section
4. Add the post to relevant category pages
5. Update navigation links as needed

### Modifying Colors

Edit the CSS variables in `css/styles.css`:
```css
:root {
    --primary-green: #10b981;
    --secondary-blue: #3b82f6;
    /* Add your custom colors */
}
```

### Adding Categories

1. Create a new category HTML file using `category-traditional-employment.html` as template
2. Add the category to `learning-centre.html`
3. Update navigation in all pages
4. Add footer links for the new category

## 📱 Responsive Breakpoints

- **Desktop**: 1440px and above
- **Tablet**: 768px - 1439px
- **Mobile**: Below 768px

## 🔗 Affiliate Link Integration

Affiliate links are marked with `class="affiliate-link"` and `data-affiliate="identifier"`. The JavaScript tracks clicks and displays a disclosure modal on first click.

Example:
```html
<a href="https://partner-site.com" 
   class="affiliate-link" 
   data-affiliate="product-name">
   Click Here
</a>
```

## 📧 Contact Form Integration

The contact form (`index.html#contact`) currently logs submissions to the console. To enable real form submissions:

1. Set up a backend endpoint (e.g., using Node.js, PHP, or a service like Formspree)
2. Update the `initContactForm()` function in `js/main.js`
3. Replace the console.log with a fetch request to your endpoint

Example:
```javascript
fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
})
.then(response => response.json())
.then(data => {
    showNotification('Thank you! We will contact you soon.', 'success');
})
```

## 🧪 Features to Test

- ✅ Responsive navigation menu (hamburger on mobile)
- ✅ Smooth scrolling to anchor links
- ✅ Form validation and submission
- ✅ Affiliate link tracking and disclosure
- ✅ Mobile responsive design
- ✅ Cross-browser compatibility

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is created for educational purposes. All rights reserved.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For questions or support, please use the contact form on the website or open an issue in the GitHub repository.

## 🎯 Future Enhancements

- [ ] Search functionality for blog posts
- [ ] Newsletter subscription integration
- [ ] User authentication system
- [ ] Comments section for blog posts
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Analytics integration
- [ ] RSS feed for blog posts

---

**Built with ❤️ for financial education and empowerment**