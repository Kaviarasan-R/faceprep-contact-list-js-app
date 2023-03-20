import React from "react";
import "../assets/styles/AuthCard.css";

const Card = (props) => {

  return (
    <div className="auth-card">
      <div className="card">{props.children}</div>
    </div>
  );
};

export default Card;