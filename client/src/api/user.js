import { sign } from "./index";

function registerInfo() {
  return sign.get("info");
}

function registerUser(userData) {
  return sign.post("signup", userData);
}

function loginUser(userData) {
  return sign.post("login", userData);
}

/*function updateProfileUser(imgData) {
  return sign.post("signintes", imgData);
}

function logoutUser() {
  return sign.post("logout");
}*/

export { registerInfo, registerUser, loginUser};