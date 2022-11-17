import {useState} from 'react'

function UserToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    console.log(tokenString)
    const userToken = JSON.parse(tokenString);
    return userToken;
  };
  const [token, setToken] = useState(getToken());
  const saveToken = (userToken) => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };
  return {
    setToken: saveToken,
    token,
  };
}

export default UserToken