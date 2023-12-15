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



document.title=getCategoryFromUrl();
async function fetchData() {
  // Fetch data from the API using async/await
  let url = "https://dummyjson.com/products/category/";
  let categoryName; // variable to save the coming catogory name

  try {
    // const response = await fetch(url + categoryName);  LIKE THIS
    const response = await fetch(url + getCategoryFromUrl());

    if (!response.ok) {
      throw new Error(`Can't find data: ${response.status}`);
    }
    // Parse the response JSON
    const data = await response.json();
    console.log(data.products.length);

    const productsContainer = document.querySelector(".products-container");

    for (let i = 0; i < data.products.length; i++) {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");
      const imageContainer = document.createElement("div");
      imageContainer.classList.add("image-container");

      const image = document.createElement("img");
      image.src = data.products[i].thumbnail;
      image.alt = "Product Image";

      const discount = document.createElement("span");
      discount.classList.add("discount-span");
      discount.innerText = `${data.products[i].discountPercentage}% off`;

      const nameContainer = document.createElement("div");
      nameContainer.classList.add("pName");
      nameContainer.innerText = data.products[i].title;

      const ratingContainer = document.createElement("div");
      ratingContainer.classList.add("pRating");
      for (let k = 0; k < 5; k++) {
        const rateImage = document.createElement("img");
        rateImage.src = "../assets/star.png";
        ratingContainer.appendChild(rateImage);
      }
      const rateValue = document.createElement("span");
      rateValue.innerText = ` (${data.products[i].rating})`;
      ratingContainer.appendChild(rateValue);

      const priceContainer = document.createElement("div");
      priceContainer.classList.add("pPrice");
      priceContainer.innerText = `Price : $ ${data.products[i].price}`;

      const orderDiv = document.createElement("div");
      orderDiv.classList.add("button-container");

      const orderButton = document.createElement("Button");
      orderButton.classList.add("order-button");
      orderButton.innerText = "ORDER NOW";

      // Add a click event listener to the "ORDER NOW" button
      orderButton.addEventListener("click", () => {
        // Redirect to the product page details
        window.location.href = `product.html?id=${data.products[i].id}`;
      });

      productCard.appendChild(image);
      productCard.appendChild(discount);
      productCard.appendChild(nameContainer);
      productCard.appendChild(ratingContainer);

      productCard.appendChild(priceContainer);

      orderDiv.appendChild(orderButton);
      productCard.appendChild(orderDiv);

      productsContainer.appendChild(productCard);
    }
  } catch (error) {
    console.error(error);
  }
}
function getCategoryFromUrl(){
  var currentUrl = window.location.href;
  var index = currentUrl.indexOf('=')

  return currentUrl.slice(index + 1)
}
fetchData();

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
function goHome (){
  window.open('home.html' , '_self');
}
function goProfile(){
  window.open('profile.html' ,'_self');
}
function goCart(){
  window.open('cart.html' , '_self');
}