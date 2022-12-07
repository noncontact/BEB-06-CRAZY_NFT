import { my } from "./index";

function myDetail(address) {
  return my.get(`detail/${address}`);
}
function myClub(address) {
  return my.get(`club/${address}`);
}
function myNft(address) {
  return my.get(`nft/${address}`);
}
function myContent(address) {
  return my.get(`content/${address}`);
}
function clubEntryList(address, club_id) {
  return my.get(`admin/info/${address}/${club_id}`);
}
function clubEntry(address, club_id) {
  return my.get(`admin/allow/${address}/${club_id}`);
}
function myAdminClub(address) {
  return my.get(`admin/club/${address}`);
}

/*function updateProfileUser(imgData) {
  return sign.post("signintes", imgData);
}

function logoutUser() {
  return sign.post("logout");
}*/

export {
  myDetail,
  myClub,
  myNft,
  myContent,
  clubEntryList,
  clubEntry,
  myAdminClub,
};
