# Deployment Guide for Bcentx Website

This guide will help you deploy the Bcentx website to various hosting platforms.

## 📋 Pre-Deployment Checklist

- [ ] All links are working correctly
- [ ] Images and assets load properly
- [ ] Contact form is configured (if using backend)
- [ ] Affiliate links are set up with correct URLs
- [ ] Meta tags are updated with correct information
- [ ] Analytics code is added (if applicable)
- [ ] SSL certificate is configured (most hosts provide this automatically)

## 🌐 Deployment Options

### Option 1: GitHub Pages (Free & Easy)

1. **Ensure your repository is public or has GitHub Pages enabled**

2. **Go to Repository Settings:**
   - Navigate to your repository on GitHub
   - Click "Settings" tab
   - Scroll to "Pages" section

3. **Configure GitHub Pages:**
   - Source: Select "Deploy from a branch"
   - Branch: Select "main" or "copilot/develop-bcentx-website"
   - Folder: Select "/ (root)"
   - Click "Save"

4. **Access Your Site:**
   - Your site will be available at: `https://bernard5162.github.io/Bcentx/`
   - Wait 2-3 minutes for initial deployment

5. **Optional - Custom Domain:**
   - Add a `CNAME` file with your domain name
   - Configure DNS settings with your domain provider
   - Add domain in GitHub Pages settings

### Option 2: Netlify (Recommended for Production)

1. **Sign up at [netlify.com](https://netlify.com)**

2. **Deploy via Git:**
   - Click "New site from Git"
   - Connect to GitHub
   - Select your Bcentx repository
   - Configure settings:
     - Branch: `main` or `copilot/develop-bcentx-website`
     - Build command: (leave empty)
     - Publish directory: `/`
   - Click "Deploy site"

3. **Configure Domain (Optional):**
   - Go to "Domain settings"
   - Add custom domain
   - Follow DNS configuration instructions

4. **Features Available:**
   - Automatic HTTPS
   - Continuous deployment from Git
   - Form handling (upgrade contact form)
   - Netlify Functions for backend
   - Analytics

### Option 3: Vercel

1. **Sign up at [vercel.com](https://vercel.com)**

2. **Import Project:**
   - Click "New Project"
   - Import from GitHub
   - Select Bcentx repository
   - Configure:
     - Framework Preset: Other
     - Build Command: (leave empty)
     - Output Directory: (leave empty)
   - Click "Deploy"

3. **Your site will be live at:** `https://bcentx-[random].vercel.app`

4. **Custom Domain:**
   - Add domain in project settings
   - Configure DNS records

### Option 4: Traditional Web Hosting (cPanel/FTP)

1. **Connect via FTP:**
   - Use FileZilla, Cyberduck, or your hosting's file manager
   - Connect with your FTP credentials

2. **Upload Files:**
   - Upload all files to `public_html` or `www` directory
   - Ensure `index.html` is in the root
   - Maintain folder structure (css/, js/)

3. **Test Your Site:**
   - Visit your domain: `https://yourdomain.com`
   - Test all pages and functionality

### Option 5: AWS S3 + CloudFront

1. **Create S3 Bucket:**
   ```bash
   aws s3 mb s3://bcentx-website
   ```

2. **Upload Files:**
   ```bash
   aws s3 sync . s3://bcentx-website --exclude ".git/*"
   ```

3. **Configure Static Website Hosting:**
   - Enable static website hosting in S3 console
   - Set index document: `index.html`
   - Set error document: `index.html`

4. **Set Bucket Policy:**
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::bcentx-website/*"
       }
     ]
   }
   ```

5. **Optional - CloudFront Distribution:**
   - Create CloudFront distribution pointing to S3 bucket
   - Configure custom domain and SSL

## 🔧 Post-Deployment Configuration

### Update Contact Form Backend

Replace the console.log in `js/main.js` with actual form handling:

```javascript
// Using Formspree
fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
})

// Using Netlify Forms
// Add netlify attribute to form in HTML:
// <form netlify name="contact">
```

### Add Analytics

Add Google Analytics or Plausible to track visitors:

```html
<!-- Add before closing </head> tag in all HTML files -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Configure Affiliate Links

Update affiliate links in all pages with your actual affiliate IDs:

```html
<!-- Replace placeholder links -->
<a href="https://actual-partner-site.com?ref=YOUR_ID" 
   class="affiliate-link" 
   data-affiliate="partner-name">
```

### Set Up Email Service

For the contact form, integrate with:
- **Formspree**: Simple form backend
- **SendGrid**: Email API
- **Mailgun**: Email service
- **EmailJS**: Client-side email

### Performance Optimization

1. **Minify CSS and JavaScript:**
   ```bash
   # Using online tools or:
   npm install -g clean-css-cli uglify-js
   cleancss -o css/styles.min.css css/styles.css
   uglifyjs js/main.js -o js/main.min.js
   ```

2. **Enable Caching:**
   - Add `.htaccess` for Apache
   - Configure cache headers in hosting

3. **Optimize Images:**
   - Use WebP format when adding images
   - Compress images with TinyPNG or ImageOptim

### Security Headers

Add security headers in your hosting configuration:

```
# .htaccess for Apache
<IfModule mod_headers.c>
    Header set X-Content-Type-Options "nosniff"
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-XSS-Protection "1; mode=block"
    Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
```

## 🧪 Testing After Deployment

- [ ] All pages load correctly
- [ ] Navigation works on all pages
- [ ] Forms submit successfully
- [ ] Mobile responsive design works
- [ ] Affiliate links work and track properly
- [ ] No console errors
- [ ] SEO meta tags are correct
- [ ] SSL certificate is active (HTTPS)
- [ ] Page load speed is acceptable

## 📊 Monitoring

### Google Search Console
1. Add your site to Search Console
2. Submit sitemap (create one with tools like xml-sitemaps.com)
3. Monitor indexing and search performance

### Uptime Monitoring
Use services like:
- UptimeRobot (free)
- Pingdom
- StatusCake

## 🆘 Troubleshooting

### Site Not Loading
- Check DNS propagation (can take 24-48 hours)
- Verify hosting configuration
- Check SSL certificate status

### Forms Not Working
- Verify backend endpoint is configured
- Check CORS settings
- Review browser console for errors

### Broken Links
- Run a link checker tool
- Update any absolute URLs to relative URLs

### Mobile Issues
- Test on multiple devices
- Use Chrome DevTools device emulation
- Check viewport meta tag is present

## 📞 Support Resources

- GitHub Pages: https://pages.github.com
- Netlify: https://docs.netlify.com
- Vercel: https://vercel.com/docs
- Stack Overflow: Tag your questions with relevant platform

---

**Need help with deployment? Create an issue in the GitHub repository!**
