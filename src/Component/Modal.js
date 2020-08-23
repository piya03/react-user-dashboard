import React from "react";
import "./style.css";

function Modal(props) {
  const { show, setShow } = props;

  if (!show) return null;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setShow(false);
      }}
      className={`modal fixed w-full h-full top-0 left-0 flex items-center justify-center`}
    >
      <div
        className={`modal-container bg-white w-11/12 md:max-w-md
         mx-auto rounded shadow-lg  overflow-y-auto`}
      >
        <div
          className="modal-content py-4  px-6"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {/*Title*/}
          <div className="flex justify-end  pb-3">
            <div
              className="modal-close cursor-pointer "
              onClick={(e) => {
                setShow(false);
              }}
            >
              <svg
                className="fill-current text-black"
                xmlns="http://www.w3.org/2000/svg"
                width={18}
                height={18}
                viewBox="0 0 18 18"
              >
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
              </svg>
            </div>
          </div>
          <div>{props.children}</div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
