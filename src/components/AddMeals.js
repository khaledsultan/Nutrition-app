`use client`;
import React, { useState } from "react";
import styled from "styled-components";

//// try to combine all state in one object

export default function AddMeals({ name, handleTotalCalories }) {
  const [mealsData, setMealsData] = useState([
    // {
    //   kcal: 0,
    //   fat: 0,
    //   carb: 0,
    //   protein: 0,
    // },
  ]);
  const [calCalory, setCalCalory] = useState([]);
  const [calFat, setCalFat] = useState([]);
  const [calCarb, setCalCarb] = useState([]);
  const [calProtein, setCalProtein] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const form = Object.fromEntries(formData);
    const updatedMealsData = [...mealsData, form];
    const totalKcal = updatedMealsData.reduce((total, item) => {
      const kcal = Number(item["Kcal"]);
      return total + kcal;
    }, 0);
    const totalFat = updatedMealsData.reduce((total, item) => {
      const fat = Number(item["Fat"]);
      return total + fat;
    }, 0);
    const totalCarb = updatedMealsData.reduce((total, item) => {
      const carb = Number(item["Carb"]);
      return total + carb;
    }, 0);
    const totalProtein = updatedMealsData.reduce((total, item) => {
      const protein = Number(item["Protein"]);
      return total + protein;
    }, 0);
    // -----------------
    // console.log(totalKcal);
    // console.log("mealsdatakcal", mealsData.kcal);
    // console.log("form.kcal", form.kcal);
    // setMealsData({ kcal: mealsData.kcal + Number(form.kcal) });
    setMealsData(updatedMealsData);
    setCalCalory(totalKcal);
    setCalFat(totalFat);
    setCalCarb(totalCarb);
    setCalProtein(totalProtein);
    // console.log("aftermealsdata", mealsData.kcal);

    event.target.reset();
    // console.log({ totalKcal });

    // return handleTotalCalories(totalKcal);
  }

  return (
    <>
      <h2>{name}</h2>
      {/* {caloryValue !== null && <p>Calories: {caloryValue} Kcal</p>} */}
      <ul>
        {mealsData.map((item, index) => (
          <li key={index}>
            {item[`Food`]} - {item[`Amount`]} - {item[`Kcal`]} - {item[`Fat`]} -
            {item[`Carb`]} -{item[`Protein`]}
          </li>
        ))}
      </ul>

      <p>
        kcal:
        {calCalory}
      </p>
      <p>Fat:{calFat}</p>
      <p>Carb:{calCarb}</p>
      <p>Protein:{calProtein}</p>
      {/* <p>{mealsData.kcal}</p> */}
      <form onSubmit={handleSubmit}>
        <div>
          {/* <label htmlFor={`${name}Barcode`}></label>
          <Input
            onSubmit={(e) => onBarcodeChange(e)}
            id={`${name}Barcode`}
            name={`${name}Barcode`}
            type="text"
            placeholder="Barcode"
            // required
          /> */}
          <label htmlFor={`${name}Food`}></label>
          <Input
            id={`${name}Food`}
            name="Food"
            type="text"
            placeholder="Food Item "
            // required
          />
          <label htmlFor={`${name}Amount`}></label>
          <Input
            id={`${name}Amount`}
            name="Amount"
            type="number"
            placeholder="Amount"
            min="0"
            // required
          />
          <label htmlFor={`${name}Kcal`}></label>
          <Input
            id={`${name}Kcal`}
            name="Kcal"
            type="number"
            placeholder="0 Kcal"
            min="0"
            // required
          />
          <label htmlFor={`${name}Fat`}></label>
          <Input
            id={`${name}Fat`}
            name="Fat"
            type="number"
            placeholder="0 Fat"
            min="0"
            // required
          />
          <label htmlFor={`${name}Carb`}></label>
          <Input
            id={`${name}Carb`}
            name="Carb"
            type="number"
            placeholder="0 Carb"
            min="0"
            // required
          />
          <label htmlFor={`${name}Protein`}></label>
          <Input
            id={`${name}Protein`}
            name="Protein"
            type="number"
            placeholder="0 Protein"
            min="0"
            // required
          />

          <button type="submit">Add ➕</button>
        </div>
      </form>

      <hr />
    </>
  );
  s;
}

const Input = styled.input`
  border: none;
  border-bottom: solid 1px grey;
  margin: 2%;
`;
