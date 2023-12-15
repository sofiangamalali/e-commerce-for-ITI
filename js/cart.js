
(
    function isLogin() {
        if (localStorage.getItem('user') == null) {
            window.location.href = "login.html";
        }
    }
)();
function getCart() {
    if (localStorage.getItem('cart') == null) {
        localStorage.setItemItem('cart', '[]');
    }
    return JSON.parse(localStorage.getItem('cart'));

}
function addToCart(productObject) {
    var cart = getCart()
    const existingItem = cart.find(item => item.productObject.id === productObject.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ productObject, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}

function removeFromCart(productId) {
    const cart = getCart();

    const itemIndex = cart.findIndex(item => item.productObject.id === productId);
    console.log(itemIndex);
    if (itemIndex !== -1) {

        cart[itemIndex].quantity -= 1;
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }

    }
    localStorage.setItem('cart', JSON.stringify(cart));
}

(function addItemstoCart() {
    var cart = getCart();
    var cartTable = document.querySelector('table');
    cart.forEach(item => {
        cartTable.appendChild(createCartItem(item));
    });
}

)();

(
    function UpdateTotalPrice() {
        var cart = getCart();
        const totalPrice = cart.reduce((acc, item) => {
            const itemPrice = item.productObject.price * item.quantity;
            return acc + itemPrice;
        }, 0);
        var totalPriceP = document.getElementsByClassName('total-cost-p')
        totalPriceP[0].innerText = '$' + totalPrice;
        totalPriceP[1].innerText = '$' + totalPrice;
    }
)();


(
    function getCartQuantity() {
        var cartQuantity = document.getElementsByClassName('qunatity');
        cartQuantity[0].innerText = getCart().length;
        cartQuantity[1].innerText = getCart().length;
    }
)();
function createCartItem(cartItem) {
    // Create table row
    const tableRow = document.createElement('tr');

    // Create product cell
    const productCell = document.createElement('td');
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');

    // Create and append product image
    const productImage = document.createElement('img');
    productImage.src = cartItem.productObject.thumbnail;
    productDiv.appendChild(productImage);

    // Create and append product name
    const productNameHeading = document.createElement('h4');
    productNameHeading.innerText = cartItem.productObject.title;
    productDiv.appendChild(productNameHeading);

    productCell.appendChild(productDiv);

    // Create count cell
    const countCell = document.createElement('td');
    const countDiv = document.createElement('div');
    countDiv.classList.add('count');

    // Create and append decrement, item count, and increment spans
    const decrementSpan = document.createElement('span');
    decrementSpan.addEventListener('click', () => {
        removeFromCart(cartItem.productObject.id);
        location.reload();

    })
    decrementSpan.innerText = '-';
    countDiv.appendChild(decrementSpan);

    const itemCountDiv = document.createElement('div');
    itemCountDiv.classList.add('item-count');
    itemCountDiv.innerText = cartItem.quantity;
    countDiv.appendChild(itemCountDiv);

    const incrementSpan = document.createElement('span');
    incrementSpan.addEventListener('click', () => {
        addToCart(cartItem.productObject);
        location.reload();

    })
    incrementSpan.innerText = '+';
    countDiv.appendChild(incrementSpan);

    countCell.appendChild(countDiv);

    // Create and append unit price cell
    const unitPriceCell = document.createElement('td');
    unitPriceCell.innerText = '$ ' + cartItem.productObject.price;

    // Create and append total price cell
    const totalPriceCell = document.createElement('td');
    var totalPrice = cartItem.productObject.price * cartItem.quantity;
    totalPriceCell.innerText = '$ ' + totalPrice;

    // Append cells to the table row
    tableRow.appendChild(productCell);
    tableRow.appendChild(countCell);
    tableRow.appendChild(unitPriceCell);
    tableRow.appendChild(totalPriceCell);

    return tableRow;
}

function checkOut(){
    alert('Your order is Checkedout')
    localStorage.removeItem('cart');
    location.reload();
}