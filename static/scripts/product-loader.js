// Get the ID out of the URL 
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

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

            if(currentProduct.reviews && currentProduct.reviews.length > 0) {
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
        } else {
            // Error handling
            document.getElementById('product-title').innerText = "Product not found!"
        }
    })
    .catch(error => {
        console.error('Error Loading Product data', error);
    });