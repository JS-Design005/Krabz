// Get the ID out of the URL 
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Set up DOM Elements
const cartCountElement = document.getElementById('item-count');
const addToCartButton = document.getElementById('add-to-cart-btn');

// Find the number of items in the cart and update badge number
let currentCartCount = parseInt(localStorage.getItem('cartItemsCount')) || 0;
if (cartCountElement) {
    cartCountElement.innerText = currentCartCount;
}

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
            // Inject data
            document.getElementById('breadcrumb').innerText = currentProduct.breadcrumb;
            document.getElementById('product-title').innerText = currentProduct.name;
            document.getElementById('product-price').innerText = currentProduct.price;
            document.getElementById('product-desc').innerText = currentProduct.description;

            // Inject image
            document.getElementById('product-img').src = currentProduct.image;
            document.getElementById('product-img').alt = currentProduct.name;

            // Inject review data
            const reviewsContainer = document.getElementById('reviews-container');
            reviewsContainer.innerHTML =''; // clears our placeholder text

            if (currentProduct.reviews && currentProduct.reviews.length > 0) {
                currentProduct.reviews.forEach(review => {
                    const reviewDiv = document.createElement('div');
                    reviewDiv.className = 'review-card';

                    // wrapping star rating together
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

            // Cart Button
            if (addToCartButton) {
                addToCartButton.addEventListener('click', () => {
                    // update badge
                    currentCartCount++;
                    if (cartCountElement) cartCountElement.innerText = currentCartCount;
                    localStorage.setItem('cartItemsCount', currentCartCount);

                    // Save actual Product ID
                    let cartList = JSON.parse(localStorage.getItem('cartList')) || [];
                    cartList.push(productId);
                    localStorage.setItem('cartList', JSON.stringify(cartList));

                    alert(`${currentProduct.name} added to cart!`);
                });
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