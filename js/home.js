




let categories = [];
(async function createCateogrylinks() {
    var categoryLinksContainer = document.querySelector('.category-links-container');
    const response = await fetch('https://dummyjson.com/products/categories');
    const data = await response.json();
    categories = await data;
    for (let i = 0; i < categories.length; i++) {
        var link = document.createElement('span');
        link.innerText = categories[i].charAt(0).toUpperCase() + categories[i].slice(1);
        link.addEventListener('click', () => {
            window.open('Category.html?category=' + categories[i], '_blank');
        })
        categoryLinksContainer.appendChild(link);
    }
    createCategoryProducts();

})();


async function createCategoryProducts() {
    var baseUrl = 'https://dummyjson.com/products/category/';
    var allCategoryContainer = document.querySelector('.all-category-container');

    for (let i = 0; i < categories.length; i++) {
        const response = await fetch(baseUrl + categories[i]);
        const data = await response.json();

        var categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        var titleContainer = document.createElement('div');
        titleContainer.classList.add('title-container');
        categoryContainer.appendChild(titleContainer);

        var title = document.createElement('h2');
        title.innerText = categories[i].charAt(0).toUpperCase() + categories[i].slice(1);
        titleContainer.appendChild(title);

        var viewAllButton = document.createElement('div');
        viewAllButton.classList.add('viewall-container');
        viewAllButton.innerText = 'View All';
        viewAllButton.addEventListener('click', () => {
            window.open('Category.html?category=' + categories[i], '_blank');
        })
        titleContainer.appendChild(viewAllButton);


        var allProductsContainer = document.createElement('div');
        allProductsContainer.classList.add('allproducts-container');
        for (let j = 0; j < data.products.length - 2; j++) {
            // container for product
            var productContainer = document.createElement('div');
            productContainer.classList.add('product-container');

            // discount
            var discountContainer = document.createElement('div');
            discountContainer.classList.add('discount-container');
            var discountValue = document.createElement('span');
            discountValue.innerText = data.products[j].discountPercentage + '%';
            discountContainer.appendChild(discountValue);

            // image
            var productImage = document.createElement('div');
            productImage.classList.add('product-image');
            var image = document.createElement('img');
            image.src = data.products[j].thumbnail;
            image.width = 180;
            image.height = 180;
            productImage.appendChild(image);
            // details
            var productDetails = document.createElement('div');
            productDetails.classList.add('product-details');

            // name
            var name = document.createElement('span');
            name.innerText = data.products[j].title;
            productDetails.appendChild(name);

            // rate container
            var rateContainer = document.createElement('div');
            rateContainer.classList.add('rate-container');
            for (let k = 0; k < 5; k++) {
                var rateImage = document.createElement('img');
                rateImage.src = '../assets/star.png';
                rateContainer.appendChild(rateImage);
            }
            var rateValue = document.createElement('span');
            rateValue.innerText = `(${data.products[j].rating})`;
            rateContainer.appendChild(rateValue);

            // price
            var price = document.createElement('span');
            price.innerText = 'Price ';
            var priceValue = document.createElement('span');
            priceValue.innerText = data.products[j].price + '$';
            price.appendChild(priceValue);

            // order button
            var orderButton = document.createElement('button');
            orderButton.innerText = 'Order';
            orderButton.addEventListener('click', function () {
                window.open('product.html?productId=' + data.products[j].id, '_blank');
            });

            // Append all elements to product container
            productContainer.appendChild(discountContainer);
            productContainer.appendChild(productImage);
            productContainer.appendChild(productDetails);
            productDetails.appendChild(rateContainer);
            productDetails.appendChild(price);
            productDetails.appendChild(orderButton);
            allProductsContainer.appendChild(productContainer);
        }
        // Append all elements to category container
        categoryContainer.appendChild(allProductsContainer);
        allCategoryContainer.appendChild(categoryContainer);
    }
}






function createItem(productName, imgSrc, id) {
    var item = document.createElement('div');
    item.classList.add('item');
    var name = document.createElement('span');
    name.innerText = productName;
    var img = document.createElement('img')
    img.src = imgSrc;
    img.width = 40;
    img.height = 40;
    item.appendChild(name);
    item.appendChild(img);
    item.setAttribute('data-product-id', id);
    return item;
}
async function searchItemByName(keyWord) {
    var sugContainer = document.querySelector('.sug-container');
    sugContainer.addEventListener('click', function (event) {
        var target = event.target;
        if (target.classList.contains('item')) {
            var productId = target.getAttribute('data-product-id');


            window.open('product.html?productId=' + productId);
        }
    });
    if (keyWord.length > 1) {
        const baseUrl = 'https://dummyjson.com/products/search?q=' + keyWord;
        var response = await fetch(baseUrl);
        var data = await response.json();
        var result = data.products;
        if (result.length > 4) {
            sugContainer.innerHTML = '';
            for (let j = 0; j < 4; j++) {
                var item = createItem(result[j].title, result[j].thumbnail, result[j].id)
                sugContainer.appendChild(item);
            }
        } else {
            sugContainer.innerHTML = '';
            for (let i = 0; i < result.length; i++) {
                var item = createItem(result[i].title, result[i].thumbnail, result[i].id)
                sugContainer.appendChild(item);
            }
        }
        sugContainer.style.display = 'block';

    } else {
        sugContainer.style.display = 'none'
    }

}

function hideSearchResult() {

    sugContainer.style.display = 'none'
}
function goHome() {
    window.open('home.html', '_self');
}
function goProfile() {
    window.open('profile.html', '_self');
}
function goCart() {
    window.open('cart.html', '_self');
}