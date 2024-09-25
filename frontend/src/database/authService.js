const server = "http://localhost:7999/api/v1"
import { getAccessToken} from "../util/utils"
function setCookie(result) {
  const {accessToken, refreshToken} = result?.data
  let expires = new Date(Date.now() + 1 * 864e5).toUTCString(); // 864e5 is the number of milliseconds in a day
  document.cookie = `${"accessToken"}=${encodeURIComponent(accessToken)}; expires=${expires}; path=/`;
  expires = new Date(Date.now() + 5 * 864e5).toUTCString(); // 864e5 is the number of milliseconds in a day
  document.cookie = `${"refreshToken"}=${encodeURIComponent(refreshToken)}; expires=${expires}; path=/`;
  return {accessToken, refreshToken}
}
function deleteCookie() {
  document.cookie = `${"accessToken"}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  document.cookie = `${"refreshToken"}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
class AuthService{
    constructor(){

    }
    async login({username, password}){
        try {
            const response = await fetch(`${server}/login`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({username, password}), // Send the form data as JSON
            })
      
            if (response.ok) {
              // Success
              const result = await response.json();
              console.log('Login successfully:', result);
              setCookie(result)
              return result
            } else {
              // Error handling
              console.error('Form submission error:', response.statusText);
              return  null
            }
          } catch (error) {
            console.error('Form submission error:', error);
            return null
          }
    }
    async logout(){
        const accessToken = await getAccessToken()
        try {
            const response = await fetch(`${server}/logout`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
              },
              // body : JSON.stringify({accessToken})
            })
      
            if (response.ok) {
              const result = await response.json();
              console.log('Loggout successfully:', result);
              deleteCookie()
              return true
            } else {
              // Error handling
              console.error('Loggout unsuccessfull:', response.statusText);
              return false
            }
          } catch (error) {
            console.error('Loggout unsuccessfull:', error);
            return false
          }
    }
    
    async refreshToken({refreshToken}){
      console.log(refreshToken)
        try {
            const response = await fetch(`${server}/refresh-token`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${refreshToken}`,
              },
              // body : JSON.stringify({refreshToken}),
            })
      
            if (response.ok) {
              // Success
              const result = await response.json();
              console.log('Refresh token successfully:', result);
              return setCookie(result)
            } else {
              // Error handling
              console.error('refresh token unsuccessfull:', response.statusText);
              return  false
            }
          } catch (error) {
            console.error('refresh token unsuccessfull:', error);
            return false
          }
    }
    async updateAccountInfo({fullName, oldPassword, newPassword}){
      const accessToken = await getAccessToken()
        try {
            const response = await fetch(`${server}/update-account-info`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
              },
              body: JSON.stringify({fullName, oldPassword, newPassword}), // Send the form data as JSON
            })
      
            if (response.ok) {
              // Success
              const result = await response.json();
              console.log('update Account info successfully:', result);
              return result
            } else {
              // Error handling
              console.error('update Account info error:', response.statusText);
              return null
            }
          } catch (error) {
            console.error('update Account info error:', error);
            return null
        }
    }
    async getCurrentUser(){
       const accessToken = await getAccessToken()
       console.log('accesstoken', accessToken)
       if(!accessToken) return  false
        try {
            const response = await fetch(`${server}/get-current-user`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
              },
              // body : JSON.stringify({accessToken})
            })
      
            if (response.ok) {
              // Success
              const result = await response.json();
              console.log('get current user successfully:', result);
              return result
            } else {
              // Error handling
              console.error('get current user error:', response.statusText);
              return null
            }
          } catch (error) {
            console.error('get current user error:', error);
            return null
          }
    }
    async updateProfileImage({ profile }) {
      const accessToken = await getAccessToken();
      try {
          const formData = new FormData(); // Create a FormData object
          formData.append('profile', profile); // Append the file
          // formData.append('accessToken', accessToken); // Append the token
  
          const response = await fetch(`${server}/update-profile-image`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${accessToken}`,
              },
              body: formData, // Send the FormData with the file
          });
  
          if (response.ok) {
              // Success
              const result = await response.json();
              console.log('Profile updated successfully:', result);
              return result;
          } else {
              // Error handling
              console.error('Profile update error:', response.statusText);
              return null;
          }
      } catch (error) {
          console.error('Profile update error:', error);
          return null;
      }
  }
    async deleteUserProfileImage(){
      const accessToken = await getAccessToken()
        try {
            const response = await fetch(`${server}/delete-user-profile-image`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
              },
              // body : JSON.stringify({accessToken})
            })
      
            if (response.ok) {
              // Success
              const result = await response.json();
              console.log('delete user profie successfully:', result);
              return result
            } else {
              // Error handling
              console.error('profile deletion error:', response.statusText);
              return null
            }
          } catch (error) {
            console.error('profile deletion error:', error);
            return null
          }
    }
}
const authService = new AuthService()
export default authService
