import React, { useState } from "react";
import Card from "./Component/Card";
import "./App.css";
import data from "./api/serverData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenAlt } from "@fortawesome/free-solid-svg-icons";
function App() {
  const [serverData, setServerData] = useState(data.members);

  //scads
  return (
    <React.Fragment>
      <h1 className="heading">User Dashboard</h1>

      <div className="App">
        {serverData.map((each, index) => {
          return <Card key={index} each={each} />;
        })}
      </div>
      <div className="footer">
        <div className="flex items-center">
          <p className="pr-2">Created By </p>
          <FontAwesomeIcon icon={faPenAlt} className="pen-icon" />
        </div>
        <p>PRIYANKA NISHAD</p>
      </div>
    </React.Fragment>
  );
}

export default App;
