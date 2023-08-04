import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import AddMeals from "../components/AddMeals.js";
import useSWR from "swr";
import React, { useState } from "react";
import { LocalStorageState } from "use-local-storage-state";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [barcode, setBarcode] = useState("4009337473736");
  const [displayValue, setDisplayValue] = useState("");
  const [displayFat, setDisplayFat] = useState("");
  const [displayCarb, setDisplayCarb] = useState("");
  const [displayProtein, setDisplayProtein] = useState("");
  const [totalCalories, setTotalCalories] = useState([]);

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data } = useSWR(
    `https://world.openfoodfacts.org/api/v2/search?code=${barcode}&fields=knowledge_panels`,
    fetcher
  );
  // console.log({ data });
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
  function handleTotalCalories(Kcal) {
    console.log("Kcal from index :", Kcal);
    const updatedTotalCalories = Number(totalCalories) + Number(Kcal);
    // console.log({ updatedTotalCalories });
    setTotalCalories(updatedTotalCalories);
  }

  return (
    <>
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
      <p>The total calories for today is: {totalCalories} Kcal</p>
    </>
  );
}
