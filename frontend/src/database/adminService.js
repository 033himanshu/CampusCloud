const server = "http://localhost:7999/api/v1"
import { getAccessToken} from "../util/utils"
class AdminService{
    constructor(){

    }
    async getAllCourses(){
        const accessToken = await getAccessToken()
        try {
            const response = await fetch(`${server}/a/get-all-courses`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
              }
            })
      
            if (response.ok) {
              // Success
              const result = await response.json();
              console.log('get all courses successfully:', result);
              return result.data.courses
            } else {
              // Error handling
              console.error('get all courses error:', response.statusText);
              return  null
            }
          } catch (error) {
            console.error('get all courses error:', error);
            return null
          }
    }
    async getAllDepartment(){
        const accessToken = await getAccessToken()
        try {
            const response = await fetch(`${server}/a/get-all-departments`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
              },
            })
      
            if (response.ok) {
              const result = await response.json();
              console.log('get All departments successfully:', result);
              return result?.data?.departments
            } else {
              // Error handling
              console.error('get All departments unsuccessfull:', response.statusText);
              return false
            }
          } catch (error) {
            console.error('get All departments unsuccessfull:', error);
            return false
          }
    }
    
    async getAllTeachers(){
        const accessToken = await getAccessToken()
        try {
            const response = await fetch(`${server}/a/get-all-teachers`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
              },
            })
      
            if (response.ok) {
              const result = await response.json();
              console.log('get All Teachers successfully:', result);
              return result?.data?.teachers
            } else {
              // Error handling
              console.error('get All Teachers unsuccessfull:', response.statusText);
              return false
            }
          } catch (error) {
            console.error('get All Teachers unsuccessfull:', error);
            return false
          }
    }
    async makeDepartment({name}){
      const accessToken = await getAccessToken()
        try {
            const response = await fetch(`${server}/a/make-department`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
              },
              body: JSON.stringify({name}), // Send the form data as JSON
            })
      
            if (response.ok) {
              // Success
              const result = await response.json();
              console.log('make Department successfully:', result);
              return result
            } else {
              // Error handling
              console.error('make Department error:', response.statusText);
              return null
            }
          } catch (error) {
            console.error('make Department error:', error);
            return null
        }
    }
    async changeHod({teacherId, deptId}){
        const accessToken = await getAccessToken()
          try {
              const response = await fetch(`${server}/a/change-hod`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({teacherId, deptId}), // Send the form data as JSON
              })
        
              if (response.ok) {
                // Success
                const result = await response.json();
                console.log('changeHod successfully:', result);
                return result
              } else {
                // Error handling
                console.error('changeHod error:', response.statusText);
                return null
              }
            } catch (error) {
              console.error('changeHod error:', error);
              return null
          }
      }
      async registerTeacher({ fullName, username, deptId }){
        const accessToken = await getAccessToken()
        console.log({ fullName, username, deptId })
          try {
              const response = await fetch(`${server}/a/register-teacher`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ fullName, username, deptId }), // Send the form data as JSON
              })
        
              if (response.ok) {
                // Success
                const result = await response.json();
                console.log('registerTeacher successfully:', result);
                return result
              } else {
                // Error handling
                console.error('registerTeacher error:', response.statusText);
                return null
              }
            } catch (error) {
              console.error('registerTeacher error:', error);
              return null
          }
      }
    
    
    
}
const adminService = new AdminService()
export default adminService
