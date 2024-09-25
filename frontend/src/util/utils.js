import authService from "../database/authService";

const getCookie  = (name) => {
    const cookieArr = document.cookie.split(';');
    for (let cookie of cookieArr) {
        const cookiePair = cookie.trim().split('=');
        if (cookiePair[0] === name) {
            return cookiePair[1];
        }
    }
    return null;
}
const getAccessToken =  async () => {
    let accessToken = getCookie('accessToken');
    let refreshToken = getCookie('refreshToken');
    if(!refreshToken) return null
    if (!accessToken) {
      console.error('refreshing accessToken');
      accessToken = (await authService.refreshToken({refreshToken}))?.accessToken
    }
    return accessToken
  }

export  { getCookie, getAccessToken}