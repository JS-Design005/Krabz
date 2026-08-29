# Krabz - Pet Supplies Online Store

An interactive, semantic, multi-page web application designed for hermit crab customers. This project is a showcase of my web development skills so far. I explored creating a template page, and using JavaScript to inject the data into the page, responsive styles and layered backgrounds. 

## Tech Stack & Key Concepts
*   **Structure & Semantics**: HTML5 using semantic elements (`<main>`, `<nav>`, `<header>`).
*   **Styling**: CSS3 focusing on responsive design using Flexbox, CSS variables and animations.
*   **Logic Engine**: Modern Vanilla JavaScript (ES6+) seperated into different files.
*   **State Management**: Using browser `localStorage` to save cart object data across page reloads.
*   **Data Strategy**: Used the javaScript `fetch()` to take data from local JSON files.

## Architectural File Structure
To maintain clear separation of concerns, the JavaScript was split into specific files:
*   `global-manager.js`: Automatically updates the shopping cart badge count in the header when the page loads by checking `localStorage`
*   `product-loader.js`: Reads the URL to see which item a user clicked on, then automatically loads that specific product's information into the page template.
*   `cart-page-manager.js`: Handles cart and checkout logic, including calculating the total price, letting users remove items from their list, and simulating data tracking for sales.
*   `slideshow.js`: Manages the slideshow animation on the web banner of the home page.
*   `preloader.js`: Handles the loading animation as the page loads, it makes sure it knows when to fade. I had to add a delay because when I first tested it, I noticed a couple of pictures still needed to download.
*   `nav.js`: Manages the colapseable hamburger menu on smaller screens.

## Engineering Highlights & Learning Outcomes
*   **Data**: Ensured the static JSON store pricing data as pure numbers rather than a string with "$" to enable the js to caculate the prices of the items.
*   **Fallback**: Adding a (`if (element)`) as a fallback so if the script fails, it will try something else.
*   **Security**: Structured the order submission and contact forms so the user knows they are not real and that the shopping site isnt real.

## Assets & Attributions
*   **Custom Branding & Rebrand Mockups**: The primary logo, design system, and four core product packaging mockups were created by me as part of a TAFE Graphic Design Diploma rebranding case study in 2023. 
*   **Original Business Inspiration**: The rebrand was based on the original product lines of [Krabooz](https://krabooz.com/). This project is strictly a non-commercial portfolio piece and is not affiliated with the company.
*   **Driftwood Asset**: High-quality gnarled aquascaping layout sourced from [Magnific](https://www.magnific.com/free-psd/intricate-gnarled-driftwood-piece-natural-decor-aquascaping_425414976.htm) (Created by muhammad.abdullah).
*   **Sand Asset**: High-quality gnarled aquascaping layout sourced from [Magnific](https://www.magnific.com/free-psd/small-mound-fine-brown-powder-transparent-background_425510526.htm#fromView=search&page=1&position=32&uuid=15fd9e16-ed73-4288-adc3-719362329744&track=ais_test_b&query=playsand+small+pile+on+white+background) (Created by muhammad.abdullah).

## Visual Identity & Typography

### Design Rationale
The site was designed with a bubbly nature to reflect the brand's friendly vibe. Starting with a colourful home page, encouraging users to check out their shop, and including some pet information pages build instant trust with their customers. The customers will see that the company truely understands the needs of such an exotic sort of pet.

While the home page is very colourful, the other pages have more of a minimalist approach. This way, the customers won't be distracted from the products and it also makes site navigation less crowded.

Originally, I wanted to stick with the brand pattern and elements for the whole site. But, I realised that including large web banners on some pages (especially the main page) was crucial so the customer can picture how this exotic pet will look. Is it cute enough to spend money on? Although, this did lead to needing a preloading page with a spinner animation to keep the user entertained while the page loads. 

The typography system was carefully selected to balance a playful, approachable brand personality. Its clean, geometric structure ensures high legibility at small sizes, while its roundedness echos the playful nature of the logo.
* **Headings:** **Sour Gummy** was chosen for main headings and buttons. Its bold, bubbly, and organic shapes inject a soft, friendly energy that defines the brand's visual identity.
* **Body Text & UI Elements:** **Quicksand** was selected for the body text. 

### Font Credits
I used these open-source typefaces for this project:
* **[Sour Gummy](https://fonts.google.com/specimen/Sour+Gummy)** – Designed by Stefie Justprince (Licensed under SIL Open Font License)
* **[Quicksand](https://fonts.google.com/specimen/Quicksand)** – Designed by Andrew Paglinawan (Licensed under SIL Open Font License)

## Learning Journey
As a beginner, my main goal for this project was to learn and practice coding. To make this project fully functional, I collaborated with AI tools to create the JavaScript logic. Along the way, I was able to study how these scripts interact with the DOM!

## Author Designer
Developed by **Jojo Smith** - 2026.
