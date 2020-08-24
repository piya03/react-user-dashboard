import React, { useState } from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faInfoCircle,
  faSmile,
} from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import Modal from "./Modal";

const DATE_FORMAT_V1 = "MMM DD YYYY h:mmA";
const DATE_FORMAT_V2 = "YYYY-MM-DD HH:mm";
const DATE_FORMAT_V3 = "hh:mm A";
const DATE_FORMAT_V4 = "YYYY-MM-DD";

function Card({ each }) {
  const activities = (each?.activity_periods || []).sort((a, b) => {
    let atime = moment(a.start_time, DATE_FORMAT_V1).format(DATE_FORMAT_V2);
    let btime = moment(b.start_time, DATE_FORMAT_V1).format(DATE_FORMAT_V2);
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
  const [selectedDate, setselectedDate] = useState(currentDate);
  console.log("Card -> selectedDate", selectedDate);

  //   2.pm
  // 25

  const statsActivities = React.useMemo(() => {
    return activities.reduce(
      (acc, elem) => {
        // moment(each.start_time, DATE_FORMAT_V1).isAfter(each.end_time, DATE_FORMAT_V1)

        const isNowAfterThenEndTime = moment().isAfter(
          moment(elem.end_time, DATE_FORMAT_V1)
        );

        if (isNowAfterThenEndTime) {
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

  function formatTime(Time) {
    return moment(Time, DATE_FORMAT_V1).format(DATE_FORMAT_V3);
  }

  let activitiesAfterApplyingFilter = activities
    .map((elem, index) => {
      // {stae, enf}
      // moment(24 matchMedia, 19991)
      let activityStartTimeFormatted = moment(
        elem.start_time,
        DATE_FORMAT_V1
      ).format(DATE_FORMAT_V4);

      if (activityStartTimeFormatted !== selectedDate) {
        return null;
      }
      return elem;
    })
    .filter(Boolean);

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
          <div className="user-modal-header">
            {`${each?.realname}'s`} Activites
          </div>
          <div className="flex justify-end mb-10">
            <input
              className="calendar-input"
              type="date"
              value={selectedDate}
              onChange={(e) => {
                console.log("App6 -hfhfghfg> e", e.target.value);
                setselectedDate(e.target.value);
              }}
            />
          </div>

          {activitiesAfterApplyingFilter.map((elem, index) => {
            let isCompleted = moment().isAfter(
              moment(elem.end_time, DATE_FORMAT_V1)
            );

            return (
              <div>
                <div className="modalContainer py-3 items-center overflow-scroll">
                  {isCompleted ? (
                    <FontAwesomeIcon icon={faCheck} className="check-icon" />
                  ) : (
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      className="info-icon"
                    />
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
              </div>
            );
          })}
          {activitiesAfterApplyingFilter.length === 0 && (
            <div className="flex justify-center items-baseline">
              <p className="noActivity pb-10">No Activity yet</p>
              <FontAwesomeIcon icon={faSmile} className="smily-icon" />
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}

export default Card;
