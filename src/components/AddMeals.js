`use client`;

import React, { useState } from "react";
import styled from "styled-components";

export default function AddMeals({
  name,
  barcode,
  onBarcodeChange,
  caloryValue,
}) {
  const [mealsData, setMealsData] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    setMealsData([...mealsData, data]);
    event.target.reset();
    // console.log(data);
    console.log({ caloryValue });
  }

  return (
    <>
      <h2>{name}</h2>
      {caloryValue !== null && <p>Calories: {caloryValue} Kcal</p>}
      <ul>
        {mealsData.map((item, index) => (
          <li key={index}>
            {item[`${name}Food`]} - {item[`${name}Amount`]} -{" "}
            {item[`${name}Kcal`]}
            Kcal
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor={`${name}Barcode`}></label>
          <Input
            onChange={(e) => onBarcodeChange(e)}
            id={`${name}Barcode`}
            name={`${name}Barcode`}
            type="text"
            placeholder="Barcode"
            // required
          />
          <label htmlFor={`${name}Food`}></label>
          <Input
            id={`${name}Food`}
            name={`${name}Food`}
            type="text"
            placeholder="Food Item"
            // required
          />
          {/* <label htmlFor={`${name}Amount`}></label>
          <Input
            id={`${name}Amount`}
            name={`${name}Amount`}
            type="number"
            placeholder="Amount"
            min="0"
            // required
          /> */}
          {/* <label htmlFor={`${name}Kcal`}></label>
          <Input
            id={`${name}Kcal`}
            name={`${name}Kcal`}
            type="number"
            placeholder="0 Kcal"
            min="0"
            // required
          /> */}

          <button>Add ➕</button>
        </div>
      </form>
    </>
  );
}

const Input = styled.input`
  border: none;
  border-bottom: solid 1px grey;
  margin: 2%;
`;
