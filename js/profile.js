(
  function isLogin() {
    if (localStorage.getItem('user') != null) {
      var userObject = JSON.parse(localStorage.getItem('user'));
      DiplayUserData(userObject);
    } else {
      window.location.href = "login.html";
    }
  }
)();
function LogOut() {
  localStorage.removeItem("user");
  localStorage.removeItem("cart");
  window.history.back();
}
function DiplayUserData(userData) {
  const userImage = document.querySelector(".user-img");
  const userName = document.querySelector(".user-name");
  const userFullName = document.querySelector(".user-first-lastName");
  const userEmail = document.querySelector(".user-email");
  const userGender = document.querySelector(".user-gender");
  const userIcon = document.createElement("img");

  userIcon.classList.add("u-img");
  userIcon.src = userData.image;
  userImage.appendChild(userIcon);

  const uName = userData.username;
  userName.innerText = `Username: ${uName}`;

  const uFirstName = userData.firstName;
  const uLastName = userData.lastName;
  userFullName.innerText = `Full name: ${uFirstName} ${uLastName}`;

  const uEmail = userData.email;
  userEmail.innerText = `Email: ${uEmail}`;

  const uGender = userData.gender;
  userGender.innerText = `Gender: ${uGender}`;

}






