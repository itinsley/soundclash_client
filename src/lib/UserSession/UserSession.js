import jwtLib from 'jsonwebtoken';

const set = (jwt)=>{
  const decoded = jwtLib.decode(jwt);

  const expiry = new Date(0); 
  expiry.setUTCSeconds(decoded.exp);

  const userDetails = {
    email: decoded.email,
    userName: decoded.user_name,
    imageUrl: decoded.image_url,
    expiry,
  }

  localStorage.setItem('userDetails', JSON.stringify(userDetails));

  return userDetails;
}

const get = ()=>{  

  const UserDetailsString = localStorage.getItem('userDetails')
  if (!UserDetailsString){
    return {};
  }
  const userDetails = JSON.parse(UserDetailsString);
  if (new Date(userDetails.expiry)< Date.now()){
    return {};
  }
  return userDetails;
}

const clear = ()=>{
  localStorage.clear();
}
export default {
  set,
  get,
  clear
}