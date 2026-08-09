// Get the elements
const checkoutCount = document.getElementById('checkout-count');
const paymentForm = document.getElementById('payment-form');
const successMessage = document.getElementById('sucess-message');

// Get Items from local storage
let totalItems = parseInt(localStorage.getItem('cartItemsCount')) || 0;
checkoutCount.innerText = totalItems;

// Handle the Mock submission
if (paymentForm) {
    paymentForm.addEventListener('submit', (event) => {
        // stop form from refreshing the page
        event.preventDefault();

        // hide the input form
        paymentForm.style.display = 'none';

        // Show the hidden success message
        successMessage.style.display = 'block';

        // Clear browsers cart storage
        localStorage.removeItem('cartItemsCount'); 
    });
}