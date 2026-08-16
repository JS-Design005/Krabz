// Function to update the number on the header cart icon
function updateGlobalCartBadge() {
    const cartCountElement = document.getElementById('item-count');
    if (cartCountElement) {
        // Look for your array box in storage
        const cartList = JSON.parse(localStorage.getItem('cartList')) || [];
        // Set the badge number to match how many items are in the array
        cartCountElement.innerText = cartList.length;
    }
}

// Run this automatically as soon as the page finishes loading
updateGlobalCartBadge();
