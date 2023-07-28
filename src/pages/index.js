import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import AddMeals from "../components/AddMeals.js";
import useSWR from "swr";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [barcode, setBarcode] = useState("4009337473736");
  // const [caloryValue, setCaloryValue] = useState("");

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data } = useSWR(
    `https://world.openfoodfacts.org/api/v2/search?code=${barcode}&fields=knowledge_panels`,
    fetcher
  );
  //3263859883713  42kcal
  //6161102031379 165kcal
  //4009337473736 138kcal
  if (data) {
    const { products } = data;
    const [firstItem] = products;
    const { knowledge_panels } = firstItem;
    const { nutrition_facts_table } = knowledge_panels;
    const { elements } = nutrition_facts_table;
    const table = elements[0];
    const { table_element } = table;
    const { rows } = table_element;
    const value = rows[0];
    const { values } = value;
    const calory = values[1];
    const num = calory.text;
    let matches = num.match(/\(([^)]+)\)/);

    const Kcal = matches[0];
    const caloryValue = Number(Kcal.match(/(\d+)/)[0]);
    // setCaloryValue(Number(Kcal.match(/(\d+)/)[0]));

    // let Knumm = Knum[0];
    // const FinalNum = Number(knumm);
    console.log({ caloryValue });
  }

  function handleBarcode(e) {
    // console.log("value", e.target.value);
    setBarcode(e.target.value);
  }

  return (
    <>
      <p>your goal for today: (number of kcal) Kcal</p>
      <AddMeals
        name="Breakfast"
        barcode={barcode}
        onBarcodeChange={handleBarcode}
        // caloryValue={setCaloryValue}
      />
      <AddMeals
        name="Dinner"
        barcode={barcode}
        onBarcodeChange={handleBarcode}
      />
      <AddMeals
        name="Lunch"
        barcode={barcode}
        onBarcodeChange={handleBarcode}
      />
      <AddMeals
        name="Snacks"
        barcode={barcode}
        onBarcodeChange={handleBarcode}
      />
      <p>The total calories for today is: (number of kcal) Kcal</p>
    </>
  );
}
