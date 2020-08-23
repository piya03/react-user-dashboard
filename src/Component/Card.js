import React, { useState } from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import Modal from "./Modal";

function Card({ each }) {
  const activities = (each?.activity_periods || []).sort((a, b) => {
    let atime = moment(a.start_time, "MMM DD YYYY h:mmA").format(
      "YYYY-MM-DD HH:mm"
    );
    let btime = moment(b.start_time, "MMM DD YYYY h:mmA").format(
      "YYYY-MM-DD HH:mm"
    );
    return atime > btime ? 1 : -1;
  });

  const [show, setShow] = useState(false);
  let year = new Date().getFullYear();
  let month = new Date().getMonth() + 1;
  let date = new Date().getDate();

  month = month > 10 ? month : "0" + month;
  date = date > 10 ? date : "0" + date;
  let currentDate = `${year}-${month}-${date}`;

  console.log("Card -> currentDate", currentDate);
  const [dateVal, setDateVal] = useState(currentDate);
  console.log("Card -> dateVal", dateVal);

  const statsActivities = React.useMemo(() => {
    return activities.reduce(
      (acc, elem) => {
        if (moment().isAfter(moment(elem.end_time, "MMM DD YYYY h:mmA"))) {
          acc.completed++;
        } else {
          acc.pending++;
        }
        return acc;
      },
      {
        completed: 0,
        pending: 0,
      }
    );
  }, [each]);
  console.log("statsActivities -> statsActivities", statsActivities);

  //console.log()
  // description: "Complete task AB",
  // start_time: "Aug 23 2020  1:33PM",
  // end_time: "Aug 23 2020 1:54PM",
  //   let t = moment(elem.start_time, "MMM DD YYYY h:mmA").format("hh:mm A");
  //   console.log("statsActivities -> t", t);

  //let t = moment(elem.start_time, "MMM DD YYYY h:mmA").format("hh:mm A");
  function formatTime(Time) {
    return moment(Time, "MMM DD YYYY h:mmA").format("hh:mm A");
  }
  //   let dateOnly = moment("jul 23 2020  1:33PM", "MMM DD YYYY h:mmA").format(
  //     "YYYY-MM-DD"
  //   );
  //   console.log("Card -> dateOnly", dateOnly);
  //   console.log("Card -> see", dateOnly === dateVal);

  return (
    <div>
      <div
        onClick={() => setShow(true)}
        className="cardContainer cursor-pointer"
      >
        <div className="forBg">
          <div className="image-section flex items-center justify-center">
            <img
              className="rounded-full mt-16 w-full"
              src={each?.avatar}
              alt=""
            />
          </div>
        </div>
        <div className="info text-center">
          <p>{each?.realname}</p>
          <p> Associate software developer</p>
        </div>

        <div className="task flex justify-evenly mt-8 pb-8 text-center">
          <div className="complete ">
            <p className="text-sm">
              COMPLETED{" "}
              <FontAwesomeIcon icon={faCheck} className="check-icon" />
            </p>
            <p>{statsActivities.completed}</p>
          </div>
          <div>
            <p className="text-sm">
              PENDING{" "}
              <FontAwesomeIcon icon={faInfoCircle} className="info-icon" />
            </p>
            <p>{statsActivities.pending}</p>
          </div>
        </div>
      </div>

      {show && (
        <Modal show={true} setShow={setShow}>
          <div className="flex justify-between">
            <div>Activites on</div>
            <input
              type="date"
              value={dateVal}
              onChange={(e) => {
                console.log("App -hfhfghfg> e", e.target.value);
                setDateVal(e.target.value);
              }}
            />
          </div>

          {activities.map((elem, index) => {
            let dateOnly = moment(elem.start_time, "MMM DD YYYY h:mmA").format(
              "YYYY-MM-DD"
            );

            let isCompleted = moment().isAfter(
              moment(elem.end_time, "MMM DD YYYY h:mmA")
            );
            console.log("Card -> dateOnly", dateOnly);

            if (dateOnly !== dateVal) {
              return null;
            }

            return (
              <div className="modalContainer py-3">
                {isCompleted ? (
                  <FontAwesomeIcon icon={faCheck} className="check-icon" />
                ) : (
                  <FontAwesomeIcon icon={faInfoCircle} className="info-icon" />
                )}

                <div>{elem?.description}</div>
                <div className="text-sm">
                  <p>START TIME</p>
                  <p>{formatTime(elem?.start_time)} </p>
                </div>
                <div className="text-sm">
                  <p>END TIME</p>
                  <p>{formatTime(elem?.end_time)}</p>
                </div>
              </div>
            );
          })}
        </Modal>
      )}
    </div>
  );
}

export default Card;
