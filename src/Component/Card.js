import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.css";

function Card() {
  return (
    <div>
      <div className="cardContainer cursor-pointer">
        <div className="forBg">
          <div className="image-section flex items-center justify-center">
            <img
              className="rounded-full mt-16 w-full"
              src="https://s3.amazonaws.com/uifaces/faces/twitter/SULiik/128.jpg"
              alt="image"
            />
          </div>
        </div>
        <div className="info text-center">
          <p>Ravi Kumar</p>
          <p> Associate software developer</p>
        </div>
        <div className="task flex justify-evenly mt-8 pb-8 text-center">
          <div className="complete ">
            <p>COMPLETED</p>
            <p>3</p>
          </div>
          <div>
            <p>PENDING</p>
            <p>2</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
