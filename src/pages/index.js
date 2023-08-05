import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import AddMeals from "../components/AddMeals.js";
import Water from "@/components/Water.js";
import useSWR from "swr";
import React, { useState } from "react";
import { LocalStorageState } from "use-local-storage-state";
import Link from "next/link.js";
import { PieChart } from "react-minimal-pie-chart";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [barcode, setBarcode] = useState("4009337473736");
  const [displayValue, setDisplayValue] = useState("");
  const [displayFat, setDisplayFat] = useState("");
  const [displayCarb, setDisplayCarb] = useState("");
  const [displayProtein, setDisplayProtein] = useState("");
  // const [totalGlobalCalories, setTotalGlobalCalories] = useState([]);
  const [totalCalory, setTotalCalory] = useState(0);
  const [totalFat, setTotalFat] = useState(0);
  const [totalCarb, setTotalCarb] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data } = useSWR(
    `https://world.openfoodfacts.org/api/v2/search?code=${barcode}&fields=knowledge_panels`,
    fetcher
  );
  console.log({ data });
  //3263859883713  42kcal
  //4009337473736 138kcal
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
  //////////////////////////

  return (
    <>
      <h1>Welcome back !!! </h1>
      <p>(QUOTE OF TODAY)</p>
      <div className="Pie">
        <PieChart
          label={({ dataEntry }) => dataEntry.value}
          labelStyle={{ color: "#E38627" }}
          data={[
            { title: "Total Fat", value: totalFat, color: "#E38627" },
            { title: "Total Carb", value: totalCarb, color: "#C13C37" },
            { title: "Total Protein", value: totalProtein, color: "#6A2135" },
          ]}
        />
      </div>

      {/* <ul>
        <li>
          <Link href="/breakfast">
            Breakfast<span> ---- {totalCalory} ----</span>
          </Link>
        </li>

        <li>
          Lunch<span> ---- totalCaloriesFromLunch ----</span>
        </li>

        <li>
          Dinner<span> ---- totalCaloriesFromDinner ----</span>
        </li>

        <li>
          Snacks<span> ---- totalCaloriesFromSnacks ----</span>
        </li>
      </ul>
      <p>The total calories for today is: {totalGlobalCalories} Kcal</p> */}
      <Water />
      <hr />
      <input type="text" value={barcode} onChange={handleBarcode} />
      <button onClick={handleButtonClick}>submit</button>
      <ul>
        <li>{displayValue}</li>
        <li>{displayFat}</li>
        <li>{displayCarb}</li>
        <li>{displayProtein}</li>
      </ul>
      <AddMeals name="Breakfast" handleTotalCalories={handleTotalCalories} />
      <AddMeals name="Dinner" handleTotalCalories={handleTotalCalories} />
      <AddMeals name="Lunch" handleTotalCalories={handleTotalCalories} />
      <AddMeals name="Snacks" handleTotalCalories={handleTotalCalories} />
      <p>The total calories for today is: {totalCalory} Kcal</p>
      <p>The total fat for today is: {totalFat} Kcal</p>
      <p>The total carb for today is: {totalCarb} Kcal</p>
      <p>The total protein for today is: {totalProtein} Kcal</p>
      <hr />
    </>
  );
}
