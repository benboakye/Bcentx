**Bcentx Website Development Plan (HTML, CSS, JavaScript)**

**1\. Core Purpose & User Flow**

* **Objective:** Create a blog-focused platform to educate users on making money (online/offline).  
* **Key User Journey:**  
  * User lands on the Home Page.  
  * Explores recent posts/categories.  
  * Navigates to the Learning Centre for detailed content.  
  * (Optional) Visits the Partnership Hub for expert services.

**2\. Tech Stack**

* **Frontend:** HTML5, CSS3, JavaScript (ES6+)  
* **Styling:** Pure CSS or a lightweight framework (e.g., Pico.css, Milligram for quick prototyping)  
* **Interactivity:** Vanilla JavaScript for dynamic elements.

**3\. Module Breakdown & Development Steps**

**3.1. Home Page**

* **HTML Structure:**  
  * Header (logo, navigation)  
  * Hero section (mission statement: "Teach people how to make money")  
  * "Recent Blog Posts" section (placeholders for now)  
  * "Popular Income Categories" section (links to Learning Centre categories)  
  * Call to action: "Explore the Learning Centre"  
  * Footer (basic links, copyright)  
* **CSS Styling:**  
  * Responsive design for various screen sizes (mobile-first approach).  
  * Clear typography, consistent color scheme.  
  * Visually appealing layout for blog post previews.  
* **JavaScript (Minimal):**  
  * Smooth scrolling for internal links.  
  * (Optional) Simple carousel for featured posts.

**3.2. Learning Centre**

* **HTML Structure:**  
  * Header (consistent with Home Page)  
  * Main content area for blog posts.  
  * Sidebar for "Categorized Income Types":  
    * Traditional Employment & Career Growth  
    * Side Hustles & Freelancing  
    * Entrepreneurship & Business Building  
    * Investing & Financial Growth  
    * Digital Income Streams  
  * Footer  
* **CSS Styling:**  
  * Layout for blog post listings (e.g., grid or list view).  
  * Styling for individual blog posts (readable text, images, code blocks).  
  * Clear visual distinction for categories in the sidebar.  
* **JavaScript (for future dynamic content):**  
  * (Future) Filtering/sorting blog posts by category.  
  * (Future) Lazy loading of images or content as the user scrolls.

**3.3. Individual Blog Post Page**

* **HTML Structure:**  
  * Header  
  * Blog post title, author, date.  
  * Main content area (definitions, methods, pros/cons, practical steps).  
  * Related posts section.  
  * Call to action for Partnership Hub.  
  * Footer  
* **CSS Styling:**  
  * Optimized for readability.  
  * Consistent formatting for headings, paragraphs, lists.  
  * Image styling.  
* **JavaScript (Minimal):**  
  * (Optional) Table of contents generation from headings.

**3.4. Partnership Hub**

* **HTML Structure:**  
  * Header  
  * Introduction to the hub (experts offering services).  
  * "Sign Up as an Expert" form (placeholder for now).  
  * (Future) Listing of expert profiles (name, specialty, services).  
  * Footer  
* **CSS Styling:**  
  * Form styling.  
  * Layout for expert listings (if implemented).  
* **JavaScript (for future dynamic content):**  
  * (Future) Form validation.  
  * (Future) Dynamic loading of expert profiles.

**4\. Content Focus**

* **Primary Content:** Blog posts within the Learning Centre.  
* **Content Elements:** Definitions, methods, pros and cons, practical steps for each income type.

**5\. Monetization Streams (Minimal)**

* **Affiliate Links:**  
  * **Implementation:** Embed `<a>` tags with `rel="nofollow"` and `target="_blank"` within relevant blog posts and guides.  
  * **JavaScript:** (Optional) Track clicks for analytics.  
* **Paid Strategy Sessions:**  
  * **Implementation:** Links/buttons within the Partnership Hub leading to a contact form or booking system (initially, a placeholder).  
  * **JavaScript:** (Future) Integration with a third-party booking API.

**6\. Color Theme**

* **Palette:** Green and Blue

**CSS Implementation:**  
/\* Primary Blue \*/  
:root {  
  \--primary-blue: \#007bff; /\* A vibrant blue for main elements \*/  
  \--secondary-blue: \#6c757d; /\* A slightly muted blue for secondary elements \*/  
  \--light-blue: \#e9f5ff; /\* A very light blue for backgrounds or accents \*/  
}

/\* Primary Green \*/  
:root {  
  \--primary-green: \#28a745; /\* A strong green for success states or highlights \*/  
  \--secondary-green: \#218838; /\* A darker green for hover states or deeper accents \*/  
  \--light-green: \#d4edda; /\* A light green for subtle backgrounds \*/  
}

body {  
  background-color: var(--light-blue); /\* Example: light blue background \*/  
  color: \#333; /\* Dark grey for text for good contrast \*/  
}

h1, h2, h3, h4, h5, h6 {  
  color: var(--primary-blue); /\* Headings in primary blue \*/  
}

a {  
  color: var(--primary-green); /\* Links in primary green \*/  
}

button {  
  background-color: var(--primary-green); /\* Buttons with primary green background \*/  
  color: white;  
  border: none;  
  padding: 10px 20px;  
  border-radius: 5px;  
}

button:hover {  
  background-color: var(--secondary-green); /\* Darker green on hover \*/  
}

/\* You can apply these variables to other elements as needed \*/  
/\* For example, for a navigation bar: \*/  
.navbar {  
  background-color: var(--primary-blue);  
  color: white;  
}

/\* For a call to action section: \*/  
.call-to-action {  
  background-color: var(--light-green);  
  border-left: 5px solid var(--primary-green);  
  padding: 20px;

* }

**7\. Development Workflow**

1. **Set up Project:** Create `index.html`, `style.css`, `script.js` files.  
2. **HTML First:** Build out the basic HTML structure for all pages.  
3. **CSS Styling:** Apply styling, ensuring responsiveness and incorporating the green and blue color theme.  
4. **JavaScript Interactivity:** Add dynamic elements and any required client-side logic.  
5. **Content Integration:** Populate with initial blog post content (can be static HTML for now).  
6. **Testing:** Test across different browsers and devices.

**8\. Future Enhancements (Post-MVP)**

* Backend for blog post management (e.g., Node.js with Express, a headless CMS).  
* User authentication for experts.  
* Search functionality for blog posts.  
* Comments section on blog posts.  
* Email newsletter integration.

