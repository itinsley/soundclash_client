import React, {Component} from "react";
 
class Avatar extends Component{
  
  render(){
    const user = this.props.user;
    const description = this.props.description;
    const size = this.props.size;
    
    if (user.image_url){
      return(
        <img  alt={description} className="u-circle " height={size} 
          src={user.image_url} title={user.name} width={size}></img>
      )  
    }

    return (
      <div>{user.name.substring(0,2).toUpperCase()}</div>
    )
  }
    
}

export default Avatar