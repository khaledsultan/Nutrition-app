import React, { useState } from "react";
export default function Water() {
  // cup cup-small
  const cups = Array.from({ length: 8 });
  const [clickedCups, setClickedCups] = useState([]);
  const handleCupClick = (cupIndex) => {
    if (clickedCups.includes(cupIndex)) {
      // If the cup is already clicked, remove it from the array
      setClickedCups(clickedCups.filter((index) => index !== cupIndex));
    } else {
      setClickedCups([...clickedCups, cupIndex]);
    }
  };

  function cupClassName(index) {
    return clickedCups.includes(index) ? "cup cup-small full" : "cup cup-small";
  }

  return (
    <>
      <h3>Goal: 2 Liters</h3>
      <div class="cups">
        {cups.map((item, index) => (
          <div
            key={index}
            className={cupClassName(index)}
            onClick={() => handleCupClick(index)}
          >
            250 ml
          </div>
        ))}
      </div>
    </>
  );
}
