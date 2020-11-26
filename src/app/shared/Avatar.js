import React, { Component } from "react";
import UserAvatar from "react-user-avatar";

const colours = [
  "#27ae60",
  "#2980b9",
  "#8e44ad",
  "#2c3e50",
  "#f1c40f",
  "#e67e22",
  "#e74c3c",
  "#95a5a6",
  "#f39c12",
  "#d35400",
  "#c0392b",
  "#bdc3c7",
  "#7f8c8d",
];

class Avatar extends Component {
  render() {
    const user = this.props.user;
    const description = this.props.description;
    const size = this.props.size;

    // if (user.image_url) {
    //   return (
    //     <img
    //       alt={description}
    //       className="image-avatar u-circle "
    //       height={size}
    //       src={user.image_url}
    //       title={user.name}
    //       width={size}
    //     ></img>
    //   );
    // }

    return <UserAvatar size={size} name={user.name} colors={colours} />;
  }
}

export default Avatar;
