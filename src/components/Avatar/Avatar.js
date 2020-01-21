import React from "react";

const Avatar = ({ imageLink }) => {
  return (
    <img
      src={
        imageLink != null
          ? imageLink
          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLmktkJrArXh_zZVovazl5mb3lna9HXqPo7XvvviCSQAuru5C&s"
      }
      alt=""
    />
  );
};

export default Avatar;
