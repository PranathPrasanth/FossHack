
function validateLogin() {
  // Simple validation, can be extended
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "user" && password === "pass") {
    window.location.href = "selection.html";
    return false;
  } else {
    alert("Invalid username or password");
    return false;
  }
}