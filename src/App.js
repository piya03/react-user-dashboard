import React, { useState, useEffect } from "react";
import Card from "./Component/Card";
import "./App.css";
import Modal from "./Component/Modal";
import data from "./api/serverData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
function App() {
  const [serverData, setServerData] = useState(data.members);

  return (
    <React.Fragment>
      <div className="App">
        {serverData.map((each, index) => {
          console.log("App -> each", each);
          return <Card key={index} each={each} />;
        })}
        {/* 
        {show && (
          <Modal show={true} setShow={setShow}>
            <div className="flex justify-between">
              <div>Activites on</div>
              <input
                type="date"
                value={dateVal}
                onChange={(e) => {
                  console.log("App -hfhfghfg> e", e);
                  setDateVal(e.target.value);
                }}
              />
            </div>

            <div className="modalContainer py-3">
              <FontAwesomeIcon icon={faCheck} className="check-icon" />
              <div>Complete task AB</div>
              <div className="text-sm">
                <p>START TIME</p>
                <p>2:00 PM</p>
              </div>
              <div className="text-sm">
                <p>END TIME</p>
                <p>5:PM</p>
              </div>
            </div>

            <div className="modalContainer py-3">
              <FontAwesomeIcon icon={faCheck} className="check-icon" />
              <div>Complete task AB</div>
              <div className="text-sm">
                <p>START TIME</p>
                <p>2:00 PM</p>
              </div>
              <div className="text-sm">
                <p>END TIME</p>
                <p>5:PM</p>
              </div>
            </div>
          </Modal>
        )} */}
      </div>
    </React.Fragment>
  );
}

export default App;
