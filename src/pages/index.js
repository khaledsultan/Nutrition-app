import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import AddMeals from "../components/AddMeals.js";
import useLocalStorageState from "use-local-storage-state";

import useSWR from "swr";
import React, { useState } from "react";
import { LocalStorageState } from "use-local-storage-state";
import Link from "next/link.js";
import { PieChart, pieChartDefaultProps } from "react-minimal-pie-chart";
import ProgressBar from "react-customizable-progressbar";

const inter = Inter({ subsets: ["latin"] });
// const handlee = Handlee({ subsets: ["cursive"] });
const filterMeals = (meals, category) =>
  meals.filter((meal) => meal.name === category);

export default function Home() {
  //3263859883713  42kcal
  //4009337473736 138kcal
  const [barcode, setBarcode] = useState("3263859883713");
  const [meals, setMeals] = useLocalStorageState("mealsData", {
    defaultValue: [],
  });
  const [displayValue, setDisplayValue] = useState("");
  const [displayFat, setDisplayFat] = useState("");
  const [displayCarb, setDisplayCarb] = useState("");
  const [displayProtein, setDisplayProtein] = useState("");
  // const [totalGlobalCalories, setTotalGlobalCalories] = useState([]);
  const [totalCalory, setTotalCalory] = useState(0);
  const [totalFat, setTotalFat] = useState(0);
  const [totalCarb, setTotalCarb] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [goal, setGoal] = useState(0);

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data } = useSWR(
    `https://world.openfoodfacts.org/api/v2/search?code=${barcode}&fields=knowledge_panels`,
    fetcher
  );
  console.log({ data });

  // ---------------------
  function handleAddMeal(meal) {
    setMeals([...meals, meal]);
  }
  // ---------------------

  function handleBarcode(e) {
    console.log("value", e.target.value);
    setBarcode(e.target.value);
  }
  const handleButtonClick = () => {
    let { products } = data;
    let [firstItem] = products;
    let { knowledge_panels } = firstItem;
    let { nutrition_facts_table } = knowledge_panels;
    let { elements } = nutrition_facts_table;
    let table = elements[0];
    let { table_element } = table;
    let { rows } = table_element;
    let value = rows[0];
    let { values } = value;
    let calory = values[1];
    let num = calory.text;
    let matches = num.match(/\(([^)]+)\)/);
    let Kcal = matches[0];
    let valueData = Number(Kcal.match(/(\d+)/)[0]);
    console.log("caloryValueFromIndex;", valueData);
    setDisplayValue(valueData);
    // --------------
    let a = rows[1].values;
    let fat = a[1];
    let b = fat.text;
    let valueFat = Number(b.match(/(\d+(\.\d+)?)/)[0]);
    console.log({ table_element });
    console.log({ valueFat });
    setDisplayFat(valueFat);
    // --------------
    let c = rows[3].values;
    let carb = c[1];
    let d = carb.text;
    let valueCarb = Number(d.match(/(\d+(\.\d+)?)/)[0]);
    console.log({ valueCarb });
    setDisplayCarb(valueCarb);
    // --------------
    let x = rows[6].values;
    let protein = x[1];
    let y = protein.text;
    let valueProtein = Number(y.match(/(\d+(\.\d+)?)/)[0]);
    console.log({ valueProtein });
    setDisplayProtein(valueProtein);
  };
  function handleTotalCalories(calCalory, calFat, calCarb, calProtein) {
    console.log("Kcal from index :", calCalory);
    const updatedTotalGlobalCalories = Number(totalCalory) + Number(calCalory);
    const updatedTotalGlobalFat = Number(totalFat) + Number(calFat);
    const updatedTotalGlobalCarb = Number(totalCarb) + Number(calCarb);
    const updatedTotalGlobalProtein = Number(totalProtein) + Number(calProtein);
    // console.log({ updatedTotalCalories });
    // setTotalGlobalCalories(updatedTotalGlobalCalories);
    setTotalCalory(updatedTotalGlobalCalories);
    setTotalFat(updatedTotalGlobalFat);
    setTotalCarb(updatedTotalGlobalCarb);
    setTotalProtein(updatedTotalGlobalProtein);
  }
  function kcalhandleKcalOnChange(e) {
    e.preventDefault();
    setGoal(e.target.value);
  }
  //////////////////////////

  return (
    <>
      <h1>Welcome back !!! </h1>
      <p className="quots"> “ It is Not Diet, It is A Lifestyle Change”</p>
      {/* <section className="goals_container"> */}
      <div className="KcalGoal_container">
        <h3>
          Enter Your Goal of Calories:
          <input
            min={0}
            type="number"
            name="numberOfKcal"
            placeholder="2000 KCal"
            onChange={kcalhandleKcalOnChange}
          ></input>
        </h3>
        <ProgressBar progress={(totalCalory * 100) / goal} radius={100} />
        <p>
          Calories left:<strong>{goal - totalCalory}</strong> Kcal
        </p>
      </div>
      {/* </section> */}

      <div className="Pie">
        {/* <h2>
          From you total KCal how many carb kcal ,fat kcal and protrin kcal?
        </h2> */}
        <PieChart
          label={({ dataEntry }) => dataEntry.value}
          labelStyle={{ fontSize: "10px" }}
          data={[
            { title: "Total Fat", value: 9 * totalFat, color: "#E38627" },
            { title: "Total Carb", value: 4 * totalCarb, color: "#C13C37" },
            {
              title: "Total Protein",
              value: 4 * totalProtein,
              color: "#6A2135",
            },
          ]}
        />
      </div>
      <div className="Pie_2">
        {/* <h2>
          From you total KCal how many g of carb, g of fat and g of protrin ?
        </h2> */}

        <PieChart
          label={({ dataEntry }) => dataEntry.value}
          animationDuration="5000"
          animationEasing="ease-out"
          labelStyle={{ fontSize: "10px" }}
          data={[
            { title: "Total Fat", value: totalFat, color: "#E38627" },
            { title: "Total Carb", value: totalCarb, color: "#C13C37" },
            {
              title: "Total Protein",
              value: totalProtein,
              color: "#6A2135",
            },
          ]}
        />
      </div>

      <AddMeals
        name="Breakfast"
        handleTotalCalories={handleTotalCalories}
        meals={filterMeals(meals, "Breakfast")}
        onAddMeal={handleAddMeal}
      />
      <AddMeals
        name="Lunch"
        handleTotalCalories={handleTotalCalories}
        meals={filterMeals(meals, "Lunch")}
        onAddMeal={handleAddMeal}
      />
      <AddMeals
        name="Dinner"
        handleTotalCalories={handleTotalCalories}
        meals={filterMeals(meals, "Dinner")}
        onAddMeal={handleAddMeal}
      />
      <AddMeals
        name="Snacks"
        handleTotalCalories={handleTotalCalories}
        meals={filterMeals(meals, "Snacks")}
        onAddMeal={handleAddMeal}
      />
      <input type="text" value={barcode} onChange={handleBarcode} />
      <button onClick={handleButtonClick}>submit</button>
      <ul>
        <li>{displayValue}</li>
        <li>{displayFat}</li>
        <li>{displayCarb}</li>
        <li>{displayProtein}</li>
      </ul>
    </>
  );
}
