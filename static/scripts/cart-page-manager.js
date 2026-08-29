const container = document.querySelector('.cart-container');
const cartTotalElement = document.getElementById('cart-total');
const checkoutCount = document.getElementById('checkout-count');
const paymentForm = document.getElementById('payment-form');
const successMessage = document.getElementById('success-message');

function renderCartPage() {
    // 1. Grab the current items array from storage
    const cartItems = JSON.parse(localStorage.getItem('cartList')) || [];

    // Update the summary counter box on the checkout form
    if (checkoutCount) checkoutCount.innerText = cartItems.length;

    // 2. Fetch your product data to match names, images, and prices
    fetch('../data/products.json')
        .then(response => response.json())
        .then(products => {
            let totalPrice = 0;
            container.innerHTML = ''; // Wipe out old HTML before redrawing

            if (cartItems.length === 0) {
                container.innerHTML = '<p>Your cart is empty.</p>';
                if (cartTotalElement) cartTotalElement.innerText = '$0.00';
                return;
            }

            // Loop through each saved item ID
            cartItems.forEach((id, index) => {
                const product = products.find(p => p.id === id);

                if (product) {
                    // Add the price to your running total sum
                    totalPrice += parseFloat(product.price);

                    const itemDiv = document.createElement('div');
                    itemDiv.className = 'cart-item';
                    
                    // We attach a data-index to the button so it remembers its position
                    itemDiv.innerHTML = `
                        

                        <img class="item-img" src="${product.image}" alt="${product.name}">
                            <div class="item-info">
                            <span><b>${product.name}</b></span>
                            <span>$${parseFloat(product.price).toFixed(2)}</span>
                            <button class="remove-btn" data-index="${index}">Remove</button>
                        </div>
                        
                        <hr class="review-divider"> 
                    `;
                    container.appendChild(itemDiv);
                }
            });

            // Set final calculated total price on screen
            if (cartTotalElement) {
                cartTotalElement.innerText = `$${totalPrice.toFixed(2)}`;
            }

            // Fire up click listeners on your fresh remove buttons
            setupRemoveButtons();
        })
        .catch(error => console.error('Error loading cart list:', error));
}

function setupRemoveButtons() {
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const indexToRemove = parseInt(e.target.getAttribute('data-index'));
            let cartItems = JSON.parse(localStorage.getItem('cartList')) || [];
            
            // Remove the selected item from your array position
            cartItems.splice(indexToRemove, 1);
            
            // Save the updated list back to the browser box
            localStorage.setItem('cartList', JSON.stringify(cartItems));
            
            // Instantly tell the badge up top to refresh its number too!
            if (typeof updateGlobalCartBadge === 'function') {
                updateGlobalCartBadge();
            }
            
            // Redraw everything on screen nicely
            renderCartPage();
        });
    });
}

// 3. Handle the mock checkout form
if (paymentForm) {
    paymentForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Keep page from refreshing completely

        paymentForm.style.display = 'none';
        if (successMessage) successMessage.style.display = 'block';

        // Clear everything out when order is finished
        localStorage.removeItem('cartList'); 
        
        // FIX: Clear the visual item list container too!
        if (container) {
            container.innerHTML = '<p>Your cart is empty.</p>';
        }

        // Reset badge count to 0 visually
        const cartCountElement = document.getElementById('item-count');
        if (cartCountElement) cartCountElement.innerText = '0';
    });
}


// Start up the script processing immediately on page load
renderCartPage();
