import React from "react";
import "../styles/Loading.css";
function Loading({ noBackground }) {
  return (
    <>
      <div className={`${noBackground ? "wrapper-no-background" : "wrapper"}`}>
        <span className="circle circle-1"></span>
        <span className="circle circle-2"></span>
        <span className="circle circle-3"></span>
        <span className="circle circle-4"></span>
        <span className="circle circle-5"></span>
        <span className="circle circle-6"></span>
        <span className="circle circle-7"></span>
        <span className="circle circle-8"></span>
      </div>
    </>
  );
}

export default Loading;
