import React from "react";
import classes from "../../styles/styles.module.css";

const Spinner = () => {
  return (
    <div className={`${classes.spinner_container} h-[80vh]`}>
      <div className={classes.spinner}></div>
    </div>
  );
};

export default Spinner;
