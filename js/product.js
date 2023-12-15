var productObject;

(async function fetchData() {
  const productTitleContainer = document.querySelector(".product-title");
  const productBrandContainer = document.querySelector(".product-brand");
  const productPriceContainer = document.querySelector(".product-price");
  const priceSpan = document.querySelector(".priceSpan");
  const productRatingContainer = document.querySelector(".product-rating");
  const productDescriptionContainer = document.querySelector(
    ".product-description"
  );
  const productStockContainer = document.querySelector(".product-stock");
  const fullImageContainer = document.querySelector(".main-image");
  const imageContainer = document.querySelector(".thumbnails");

  try {
    let url = "https://dummyjson.com/products/";

    const response = await fetch(url + getProductIDFromUrl());

    if (!response.ok) {
      throw new Error(`Can't find data: ${response.status}`);
    }

    // Parse the response JSON
    const data = await response.json();
    productObject = data;
    // Access and display the title attribute
    const title = data.title;
    document.title = title;
    productTitleContainer.innerText = `${title}`;

    const brand = data.brand;
    productBrandContainer.innerText = ` Brand : ${brand}`;

    const discount = data.discountPercentage;

    const discContainer = `(-${discount}% off ) \n`;
    priceSpan.innerText = discContainer;

    const price = data.price;
    productPriceContainer.innerText = `Price : $  ${price}`;

    const rating = data.rating;
    productRatingContainer.innerText = `Rating : (${rating}) `;

    // Number of stars you want to display
    const numberOfStars = 5;

    for (let i = 0; i < numberOfStars; i++) {
      // Create an image element
      const starImage = document.createElement("img");
      starImage.classList.add("stars");

      // Set the source (URL) of the star image
      starImage.src = "../assets/star.png"; // Replace 'star.png' with the actual path to your star image

      // Append the image to the productRatingDiv
      productRatingContainer.appendChild(starImage);
    }

    const description = data.description;
    productDescriptionContainer.innerText = `Description: \n ${description}`;

    const stock = data.stock;
    productStockContainer.innerText = `In stock : ${stock}`;

    const images = data.images;

    const mainImage = document.createElement("img");
    mainImage.src = images[0];
    fullImageContainer.appendChild(mainImage);

    // Loop to get all the small images avail for this product
    images.forEach((image, i) => {
      const smallImages = document.createElement("img");
      smallImages.classList.add("thumbnail");
      smallImages.src = image;

      // Add click event listener to each thumbnail
      smallImages.addEventListener("click", () => {
        // Update the main image source when a thumbnail is clicked
        mainImage.src = image;
        mainImage.alt = image;
      });

      imageContainer.appendChild(smallImages);
    });
  } catch (error) {
    console.error(error);
  }
}


)();

function getProductIDFromUrl() {
  var currentUrl = window.location.href;
  var index = currentUrl.indexOf('=')

  return currentUrl.slice(index + 1)

}
function getCart() {
  if (localStorage.getItem('cart') == null) {
    localStorage.setItem('cart', '[]');
  }
  return JSON.parse(localStorage.getItem('cart'));

}
function addToCart() {
  
  if (isLogin()) {
    var cart = getCart()
  const existingItem = cart.find(item => item.productObject.id === productObject.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ productObject, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${document.title} added to cart`);
  } else {
    window.location.href = "login.html";
  }
}



function isLogin() {
  if (localStorage.getItem('user') == null) {
    return false;
  }
  return true;
}