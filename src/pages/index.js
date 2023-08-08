import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import AddMeals from "../components/AddMeals.js";
import useLocalStorageState from "use-local-storage-state";
import useSWR from "swr";
import React, { useState } from "react";
import { PieChart, pieChartDefaultProps } from "react-minimal-pie-chart";
import ProgressBar from "react-customizable-progressbar";
import BarcodeScanner from "../components/BarcodeScanner.js";

const inter = Inter({ subsets: ["latin"] });
// const handlee = Handlee({ subsets: ["cursive"] });
const filterMeals = (meals, category) =>
  meals.filter((meal) => meal.name === category);

export default function Home() {
  //3263859883713  42kcal
  //4009337473736 138kcal

  const [meals, setMeals] = useLocalStorageState("mealsData", {
    defaultValue: [],
  });

  // const [totalGlobalCalories, setTotalGlobalCalories] = useState([]);
  const [totalCalory, setTotalCalory] = useState(0);
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

  // console.log({ data });

  // ---------------------
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

  // ---------------------

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
          Enter Your Goal of Calories:
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
              progress={(totalCalory * 100) / goal}
              radius={100}
              transition="0.3s ease"
            />
            <p>
              Calories left:<strong>{goal - totalCalory}</strong> Kcal
            </p>
          </div>
        )}
      </div>
      {/* </section> */}
      {showPie && (
        <div>
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
        </div>
      )}

      <div>
        <button className="toggleAddMeals_button" onClick={toggleBreakfast}>
          Breakfast
        </button>
        {showBreakfast && (
          <div className="toggleAddMeals">
            <AddMeals
              name="Breakfast"
              handleTotalCalories={handleTotalCalories}
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
              handleTotalCalories={handleTotalCalories}
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
              handleTotalCalories={handleTotalCalories}
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
              handleTotalCalories={handleTotalCalories}
              meals={filterMeals(meals, "Snacks")}
              onAddMeal={handleAddMeal}
              handleShowPie={handleShowPie}
            />
          </div>
        )}
      </div>
    </>
  );
}
