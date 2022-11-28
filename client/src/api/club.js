import { club } from "./index";

function allClubsList() {
  return club.get("allclub");
}


/*function updateProfileUser(imgData) {
  return sign.post("signintes", imgData);
}

function logoutUser() {
  return sign.post("logout");
}*/

export { allClubsList};