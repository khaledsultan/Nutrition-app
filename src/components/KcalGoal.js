import React, { useState } from "react";
import ProgressBar from "react-customizable-progressbar";

export default function KcalGoal({ finalKCal }) {
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [goal, setGoal] = useState(0);
  function kcalhandleKcalOnChange(e) {
    e.preventDefault();
    setGoal(e.target.value);
    setShowProgressBar(true);
  }

  return (
    <div className="KcalGoal_container">
      <h3>
        Enter Your Goal of Calories⚡:
        <input
          min={0}
          type="number"
          name="numberOfKcal"
          placeholder="2000 KCal"
          onChange={kcalhandleKcalOnChange}
        ></input>
      </h3>
      {showProgressBar && (
        <div>
          <ProgressBar
            className="KcalGoal_progressbar"
            progress={(finalKCal * 100) / goal}
            radius={100}
          />
          <p>
            Calories left:<strong>{goal - finalKCal}</strong> Kcal
          </p>
        </div>
      )}
    </div>
  );
}
