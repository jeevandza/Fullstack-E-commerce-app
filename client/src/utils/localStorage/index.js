function getToken() {
  return localStorage.getToken("access_tonen");
}

function updateUserAndToken({ access_token, user }) {
  localStorage.setItem("access_token", JSON.stringify(access_token));
  localStorage.setItem("user", JSON.stringify(user));
}

function getUser() {
  return localStorage.getItem("user");
}

function removeUser() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user");
}
export { getToken, updateUserAndToken, getUser, removeUser };
