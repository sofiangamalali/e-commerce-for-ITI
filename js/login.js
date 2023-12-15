function validateUsername(username) {
  if (username.length === 0) {
    return false;
  } else {
    return true;
  }
}

function validatePassword(password) {
  if (password.length === 0) {

    return false;
  } else {
    return true;
  }
}

async function Login() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  var isUsernameValid = validateUsername(username);
  var isPasswordValid = validatePassword(password);
  if (isUsernameValid && isPasswordValid) {
    let response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: `${username}`,
        password: `${password}`,
      })
    });
    if (response.status === 200) {
      let userData = await response.json();
      localStorage.setItem('user', JSON.stringify(userData));
      window.location.href = "profile.html";
    } else {

      var errorSpan = document.querySelector('.displayMsg');
      errorSpan.style.display = 'block';
    }
  } else {
    var errorSpan = document.querySelector('.displayMsg-required');
    errorSpan.style.display = 'block';
  }
}

function onfoucsUserName (){
  var errorSpan = document.querySelector('.displayMsg-required');
  errorSpan.style.display = 'none';
  
  var errorSpan = document.querySelector('.displayMsg');
  errorSpan.style.display = 'none';
}





