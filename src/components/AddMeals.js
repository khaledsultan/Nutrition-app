`use client`;
import React, { useState } from "react";
import useLocalStorageState from "use-local-storage-state";
//// try to combine all state in one object

export default function AddMeals({ name, handleTotalCalories }) {
  const [mealsData, setMealsData] = useState([]);

  // const [mealsData, setMealsData] = useLocalStorageState("mealsData", {
  //   defaultValue: [],
  // });

  // {
  //   kcal: 0,
  //   fat: 0,
  //   carb: 0,
  //   protein: 0,
  // },
  // ]);
  const [calCalory, setCalCalory] = useState([]);
  const [calFat, setCalFat] = useState([]);
  const [calCarb, setCalCarb] = useState([]);
  const [calProtein, setCalProtein] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const form = Object.fromEntries(formData);
    // const { Kcal } = form;

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
    setMealsData(updatedMealsData);
    setCalCalory(totalKcal);
    setCalFat(totalFat);
    setCalCarb(totalCarb);
    setCalProtein(totalProtein);
    // console.log("aftermealsdata", mealsData.kcal);
    event.target.reset();
    // console.log({ totalKcal });

    return handleTotalCalories(totalKcal, totalFat, totalCarb, totalProtein);
  }

  return (
    <>
      <section className="add_meals">
        <h2 className="add_meals_name">{name}</h2>
        <div className="add_meals_result">
          <p>⚡ {calCalory}</p>
          <p>🧈 {calFat}</p>
          <p>🍚 {calCarb}</p>
          <p>🥩 {calProtein}</p>
        </div>
        <ul>
          {mealsData.map((item, index) => (
            <li className="add_meals_list" key={index}>
              <span className="add_meals_span">{item["Food"]}</span>
              <span className="span">{item["Amount"]}</span>
              <span className="span">{item["Kcal"]}</span>
              <span className="span">{item["Fat"]}</span>
              <span className="span">{item["Carb"]}</span>
              <span className="span">{item["Protein"]}</span>
            </li>
          ))}
        </ul>

        <form onSubmit={(event) => handleSubmit(event, `${name}`)}>
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
            <input
              className="add_meals_form_input"
              id={`${name}Food`}
              name="Food"
              type="text"
              placeholder="    Food Item "
              color="white"
              required
            />
            <label htmlFor={`${name}Amount`}></label>
            <input
              className="add_meals_form_input"
              id={`${name}Amount`}
              name="Amount"
              type="number"
              placeholder="    Amount"
              min="0"
              required
            />
            <label htmlFor={`${name}Kcal`}></label>
            <input
              className="add_meals_form_input"
              id={`${name}Kcal`}
              name="Kcal"
              type="number"
              placeholder="    0 Kcal"
              min="0"
              required
            />
            <label htmlFor={`${name}Fat`}></label>
            <input
              className="add_meals_form_input"
              id={`${name}Fat`}
              name="Fat"
              type="number"
              placeholder="    0 g Fat "
              min="0"
              required
            />
            <label htmlFor={`${name}Carb`}></label>
            <input
              className="add_meals_form_input"
              id={`${name}Carb`}
              name="Carb"
              type="number"
              placeholder="    0 g Carb"
              min="0"
              required
            />
            <label htmlFor={`${name}Protein`}></label>
            <input
              className="add_meals_form_input"
              id={`${name}Protein`}
              name="Protein"
              type="number"
              placeholder="    0 g Protein"
              min="0"
              required
            />

            <button type="submit" className="add_meals_button">
              +
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
