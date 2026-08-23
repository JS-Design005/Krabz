// Get the ID out of the URL 
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Set up DOM Elements
const addToCartButton = document.getElementById('add-to-cart-btn');

// Fetch JSON data file
fetch('../data/products.json')
    .then(res => {
        if (!res.ok) throw new Error('Could not find file');
        return res.json();
    })
    .then(products => {
        // find the specific product
        const currentProduct = products.find(p => p.id === productId);

        // inject data into the template page
        if (currentProduct) {
            // Inject data (Added the '$' here visually for your clean numbers!)
            document.getElementById('breadcrumb').innerText = currentProduct.breadcrumb;
            document.getElementById('product-title').innerText = currentProduct.name;
            document.getElementById('product-price').innerText = `$${parseFloat(currentProduct.price).toFixed(2)}`;
            document.getElementById('product-desc').innerText = currentProduct.description;

            // Inject image
            document.getElementById('product-img').src = currentProduct.image;
            document.getElementById('product-img').alt = currentProduct.name;

            // Inject review data
            const reviewsContainer = document.getElementById('reviews-container');
            reviewsContainer.innerHTML = ''; // clears our placeholder text

            if (currentProduct.reviews && currentProduct.reviews.length > 0) {
                currentProduct.reviews.forEach(review => {
                    const reviewDiv = document.createElement('div');
                    reviewDiv.className = 'review-card';

                    reviewDiv.innerHTML = `
                    <p><span class="review-name">${review.reviewer}</span></p>
                    <p class="star-rating">${review.rating}</p>
                    <p class="review-comment">${review.comment}</p>
                    <hr class="review-divider">  
                    `;

                    reviewsContainer.appendChild(reviewDiv);
                });
            } else {
                reviewsContainer.innerText = "No reviews for this product yet.";
            }

            // --- NEW: IN-STORE ONLY BOOLEAN CHECK ---
 if (currentProduct.inStoreOnly === true) {
                // PATH 1: Handle Live Animals
                if (addToCartButton) {
                    addToCartButton.style.display = 'none';
                    
                    const parentContainer = addToCartButton.parentElement;
                    const storeNotice = document.createElement('div');
                    storeNotice.className = 'in-store-notice';
                    storeNotice.innerHTML = `
                        <p><strong>In-Store Only Adoption</strong></p>
                        <p style="font-size: 0.95rem; margin-top: 5px;">To keep our live Krabz healthy and safe, they cannot be shipped. Please visit your local Petstock branch to adopt!</p>
                    `;
                    parentContainer.appendChild(storeNotice);
                }
            } 
            else if (currentProduct.outOfStock === true) {
                // PATH 2: Handle Out of Stock Items (Fixed with 'else if')
                if (addToCartButton) {
                    addToCartButton.style.display = 'none';
                    
                    const parentContainer = addToCartButton.parentElement;
                    const stockNotice = document.createElement('div');
                    stockNotice.className = 'out-of-stock-notice'; // Gave this its own class name for custom CSS styling
                    stockNotice.innerHTML = `
                        <p><strong>Out of Stock!</strong></p>
                        <p style="font-size: 0.95rem; margin-top: 5px;">Don't worry! We expect to have more of this product back in stock soon!</p>
                    `;
                    parentContainer.appendChild(stockNotice);
                }
            } 
            else {
                // PATH 3: Normal Add to Cart Button Logic for shippable stock items
                if (addToCartButton) {
                    addToCartButton.style.display = 'block'; 
                    
                    addToCartButton.addEventListener('click', () => {
                        let cartList = JSON.parse(localStorage.getItem('cartList')) || [];
                        cartList.push(productId);
                        localStorage.setItem('cartList', JSON.stringify(cartList));

                        if (typeof updateGlobalCartBadge === 'function') {
                            updateGlobalCartBadge();
                        }

                        alert(`${currentProduct.name} added to cart!`);
                    });
                }
            }
            
        } else {
            // Error handling
            document.getElementById('product-title').innerText = "Product not found!"
            document.getElementById('product-desc').innerText = "No description available."
            document.getElementById('breadcrumb').innerText = "Unknown Product";
        }
    })
    .catch(error => {
        console.error('Error Loading Product data', error);
    });
