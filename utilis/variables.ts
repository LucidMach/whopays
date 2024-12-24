let authToken: boolean = false;


function getToken() {
    return authToken;
}
  
function updateToken(val: boolean) {
    authToken = val;
}

export { getToken, updateToken };