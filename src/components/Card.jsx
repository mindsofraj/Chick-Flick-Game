import React, { useEffect, useState } from "react";
import qnmark from "../assets/qn-mark.svg";
import info from "../assets/info.svg";
import "../App.css";

const Card = ({ src, name, handleClick, matched, disabled }) => {
  return (
    <>
      <div className="flip-card noSelect">
        <div className={matched ? "flip-card-inner flip" : "flip-card-inner"}>
          <div className="flip-card-back">
            <img src={src} loading="lazy" className="noSelect" alt="Img" />
            <img src={info} title={name} className="info noSelect" alt="i" />
          </div>
          <div
            className="flip-card-front"
            onClick={!disabled ? handleClick : null}
          >
            <img src={qnmark} className="qnmarkImg noSelect" alt="?" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
