import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import AddMeals from "../components/AddMeals.js";
import useLocalStorageState from "use-local-storage-state";
import React, { useState } from "react";
import { PieChart, pieChartDefaultProps } from "react-minimal-pie-chart";
import ProgressBar from "react-customizable-progressbar";
import Water from "@/components/Water.js";
import BarcodeScanner from "../components/BarcodeScanner.js";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  //3263859883713  42kcal
  //4009337473736 138kcal

  const [meals, setMeals] = useLocalStorageState("mealsData", {
    defaultValue: [],
  });
  const filterMeals = (meals, category) =>
    meals.filter((meal) => meal.name === category);

  // const [totalGlobalCalories, setTotalGlobalCalories] = useState([]);
  // const [totalCalory, setTotalCalory] = useState(0);
  const [totalFat, setTotalFat] = useState(0);
  const [totalCarb, setTotalCarb] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [goal, setGoal] = useState(0);
  const [showBreakfast, setShowBreakfast] = useState(false);
  const [showLunch, setShowLunch] = useState(false);
  const [showDinner, setShowDinner] = useState(false);
  const [showSnacks, setShowSnacks] = useState(false);
  const [showPie, setShowPie] = useState(false);
  const [showProgressBar, setShowProgressBar] = useState(false);
  // const [barcode, setBarcode] = useState("4009337473736");

  // const fetcher = (...args) => fetch(...args).then((res) => res.json());
  // const { data } = useSWR(
  //   `https://world.openfoodfacts.org/api/v2/search?code=${barcode}&fields=knowledge_panels`,
  //   fetcher
  // );
  // console.log("barcode:", data);

  // function handleBarcode(e) {
  //   console.log("value", e.target.value);
  //   setBarcode(e.target.value);
  // }
  // const handleButtonClick = () => {
  //   let { products } = data;
  //   let [firstItem] = products;
  //   let { knowledge_panels } = firstItem;
  //   let { nutrition_facts_table } = knowledge_panels;
  //   let { elements } = nutrition_facts_table;
  //   let table = elements[0];
  //   let { table_element } = table;
  //   let { rows } = table_element;
  //   let value = rows[0];
  //   let { values } = value;
  //   let calory = values[1];
  //   let num = calory.text;
  //   let matches = num.match(/\(([^)]+)\)/);
  //   let Kcal = matches[0];
  //   let valueData = Number(Kcal.match(/(\d+)/)[0]);
  //   console.log("caloryValueFromIndex;", valueData);
  //   setDisplayValue(valueData);
  //   // --------------
  //   let a = rows[1].values;
  //   let fat = a[1];
  //   let b = fat.text;
  //   let valueFat = Number(b.match(/(\d+(\.\d+)?)/)[0]);
  //   console.log({ table_element });
  //   console.log({ valueFat });
  //   setDisplayFat(valueFat);
  //   // --------------
  //   let c = rows[3].values;
  //   let carb = c[1];
  //   let d = carb.text;
  //   let valueCarb = Number(d.match(/(\d+(\.\d+)?)/)[0]);
  //   console.log({ valueCarb });
  //   setDisplayCarb(valueCarb);
  //   // --------------
  //   let x = rows[6].values;
  //   let protein = x[1];
  //   let y = protein.text;
  //   let valueProtein = Number(y.match(/(\d+(\.\d+)?)/)[0]);
  //   console.log({ valueProtein });
  //   setDisplayProtein(valueProtein);
  // };
  // console.log({ data });

  // ---------------------
  // console.log({ meals });
  // ---------------map over meals array to calculate total kcal for all meals ------------------
  const map1 = meals.map((meal) => Number(meal.Kcal));
  // console.log(map1);
  function sumKCal(arr) {
    return arr.reduce((accumulator, currentValue) => {
      if (typeof currentValue === "number") {
        return accumulator + currentValue;
      } else {
        return accumulator;
      }
    }, 0);
  }
  // console.log(sumKCal(map1));
  let finalKCal = sumKCal(map1);
  // ---------------map over meals array to calculate total g fat  for all meals ------------------
  const map2 = meals.map((meal) => Number(meal.Fat));
  // console.log(map1);
  function sumFat(arr) {
    return arr.reduce((accumulator, currentValue) => {
      if (typeof currentValue === "number") {
        return accumulator + currentValue;
      } else {
        return accumulator;
      }
    }, 0);
  }
  // console.log(sumKCal(map1));
  let finalFat = sumFat(map2);
  // ---------------map over meals array to calculate total g carb  for all meals ------------------
  const map3 = meals.map((meal) => Number(meal.Carb));
  // console.log(map1);
  function sumCarb(arr) {
    return arr.reduce((accumulator, currentValue) => {
      if (typeof currentValue === "number") {
        return accumulator + currentValue;
      } else {
        return accumulator;
      }
    }, 0);
  }
  // console.log(sumKCal(map1));
  let finalCarb = sumCarb(map3);
  // ---------------map over meals array to calculate total g carb  for all meals ------------------
  const map4 = meals.map((meal) => Number(meal.Protein));
  // console.log(map1);
  function sumProtein(arr) {
    return arr.reduce((accumulator, currentValue) => {
      if (typeof currentValue === "number") {
        return accumulator + currentValue;
      } else {
        return accumulator;
      }
    }, 0);
  }
  // console.log(sumKCal(map1));
  let finalProtein = sumProtein(map4);
  // ----------------------

  function handleAddMeal(meal) {
    setMeals([...meals, meal]);
  }
  function toggleBreakfast() {
    setShowBreakfast(!showBreakfast);
  }
  function toggleLunch() {
    setShowLunch(!showLunch);
  }
  function toggleDinner() {
    setShowDinner(!showDinner);
  }
  function toggleSnacks() {
    setShowSnacks(!showSnacks);
  }
  function toggleSummary() {
    setShowPie(!showPie);
  }

  // ---------------------not used----------

  // function handleTotalCalories(calCalory, calFat, calCarb, calProtein) {
  //   console.log("Kcal from add meals :", calCalory);

  //   setTotalCalory(calCalory);
  //   setTotalFat(calFat);
  //   setTotalCarb(calCarb);
  //   setTotalProtein(calProtein);
  // }

  // ---------------------
  function kcalhandleKcalOnChange(e) {
    e.preventDefault();
    setGoal(e.target.value);
    setShowProgressBar(true);
  }
  function handleShowPie() {
    setShowPie(true);
  }
  //////////////////////////

  return (
    <>
      <h1>Welcome back !!! </h1>
      <p className="quots"> “ It is Not Diet, It is A Lifestyle Change”</p>

      {/* <section className="goals_container"> */}
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
              // transition="0.3s ease"
            />
            <p>
              Calories left:<strong>{goal - finalKCal}</strong> Kcal
            </p>
          </div>
        )}
      </div>
      {/* </section> */}

      <div>
        <button className="toggleAddMeals_button" onClick={toggleBreakfast}>
          Breakfast
        </button>
        {showBreakfast && (
          <div className="toggleAddMeals">
            <AddMeals
              name="Breakfast"
              // handleTotalCalories={handleTotalCalories}
              meals={filterMeals(meals, "Breakfast")}
              onAddMeal={handleAddMeal}
              handleShowPie={handleShowPie}
            />
          </div>
        )}
      </div>
      <div>
        <button className="toggleAddMeals_button" onClick={toggleLunch}>
          Lunch
        </button>
        {showLunch && (
          <div className="toggleAddMeals">
            {" "}
            <AddMeals
              name="Lunch"
              // handleTotalCalories={handleTotalCalories}
              meals={filterMeals(meals, "Lunch")}
              onAddMeal={handleAddMeal}
              handleShowPie={handleShowPie}
            />
          </div>
        )}
      </div>
      <div>
        <button className="toggleAddMeals_button" onClick={toggleDinner}>
          Dinner
        </button>
        {showDinner && (
          <div className="toggleAddMeals">
            {" "}
            <AddMeals
              name="Dinner"
              // handleTotalCalories={handleTotalCalories}
              meals={filterMeals(meals, "Dinner")}
              onAddMeal={handleAddMeal}
              handleShowPie={handleShowPie}
            />
          </div>
        )}
      </div>
      <div>
        <button className="toggleAddMeals_button" onClick={toggleSnacks}>
          Snacks
        </button>
        {showSnacks && (
          <div className="toggleAddMeals">
            {" "}
            <AddMeals
              name="Snacks"
              // handleTotalCalories={handleTotalCalories}
              meals={filterMeals(meals, "Snacks")}
              onAddMeal={handleAddMeal}
              handleShowPie={handleShowPie}
            />
          </div>
        )}
        <button
          className="toggleAddMeals_button_Summary"
          onClick={toggleSummary}
        >
          ➡️Summary
        </button>
        {showPie && (
          <div className="Pies">
            {/* <div className="Pie"> */}
            {/* <h2>
              From your total KCal how many carb kcal ,fat kcal and protein
              kcal?
            </h2> */}
            {/* <div className="Pie">
              <PieChart
                data={[
                  { title: "🧈", value: 9 * totalFat, color: "#78C1F3" },
                  { title: " 🍞", value: 4 * totalCarb, color: "#9BE8D8" },
                  {
                    title: "🥩",
                    value: 4 * totalProtein,
                    color: "#F8FDCF",
                  },
                ]}
                label={({ dataEntry }) =>
                  `${dataEntry.title} ${dataEntry.value}`
                }
                labelStyle={{ fontSize: "50%" }}
              /> */}
            {/* </div> */}

            {/* <div className="Pie_2"> */}
            <h2>
              From your total KCal how many g of carb, g of fat and g of protein
              ?
            </h2>
            <div className="Pie_2">
              <PieChart
                label={({ dataEntry }) =>
                  `${dataEntry.title} ${dataEntry.value}`
                }
                labelStyle={{ fontSize: "50%" }}
                data={[
                  { title: "🧈", value: finalFat, color: "#78C1F3" },
                  { title: "🍞", value: finalCarb, color: "#9BE8D8" },
                  {
                    title: "🥩",
                    value: finalProtein,
                    color: "#F8FDCF",
                  },
                ]}
              />
            </div>
          </div>
        )}
        <Water />
      </div>
    </>
  );
}
