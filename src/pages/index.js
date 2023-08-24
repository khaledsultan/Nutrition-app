import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import AddMeals from "../components/AddMeals.js";
import useLocalStorageState from "use-local-storage-state";
import React, { useState } from "react";
import { PieChart, pieChartDefaultProps } from "react-minimal-pie-chart";
import ProgressBar from "react-customizable-progressbar";
import Water from "@/components/Water.js";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const filterMeals = (meals, category) =>
    meals.filter((meal) => meal.name === category);
  const [meals, setMeals] = useLocalStorageState("mealsData", {
    defaultValue: [],
  });
  const [goal, setGoal] = useState(0);
  const [showBreakfast, setShowBreakfast] = useState(false);
  const [showLunch, setShowLunch] = useState(false);
  const [showDinner, setShowDinner] = useState(false);
  const [showSnacks, setShowSnacks] = useState(false);
  const [showPie, setShowPie] = useState(false);
  const [showProgressBar, setShowProgressBar] = useState(false);

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
  // ---------------toggle meals buttons ------------------

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
      <p className="quots"> “ It is Not Diet, It is A Lifestyle Change ”</p>
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

      <div>
        <button className="toggleAddMeals_button" onClick={toggleBreakfast}>
          Breakfast
        </button>
        {showBreakfast && (
          <div className="toggleAddMeals">
            <AddMeals
              name="Breakfast"
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
          </div>
        )}
        <Water />
      </div>
    </>
  );
}
