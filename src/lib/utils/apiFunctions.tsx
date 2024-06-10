import axios from "axios";
import Cookie from 'js-cookie'
export async function loginUserApiFunction(
  email: string,
  password: string,
  role: string
) {
  const res = await axios.post("http://localhost:8000/api/v1/user/login", {
    email,
    password,
    role,
  });
  
  
  return res.data.data;
}

export async function signupUserApiFunction(
  username: string,
  email: string,
  password: string,
  role: string
) {
  const res = await axios.post("http://localhost:8000/api/v1/user/signup", {
    username,
    email,
    password,
    role,
  });
 
  return res.data.data;
}






export function getCookie() {
    try {
      const coo = Cookie.get("user_credentials");

      if (coo) {
        const user_credentials = JSON.parse(coo);
        return user_credentials;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }