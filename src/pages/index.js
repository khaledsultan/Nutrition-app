import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import AddMeals from "../components/AddMeals.js";
import useSWR from "swr";

const inter = Inter({ subsets: ["latin"] });
export default function Home() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data } = useSWR(
    "https://world.openfoodfacts.org/api/v2/search?code=3263859883713&fields=knowledge_panels",
    fetcher
  );
  const { products } = data;
  const pro = products[0];
  const { knowledge_panels } = pro;
  const { nutrition_facts_table } = knowledge_panels;

  // console.log({ pro });
  console.log({ nutrition_facts_table });
  return (
    <>
      <p>your goal for today: (number of kcal) Kcal</p>
      <AddMeals name="Breakfast" />
      <AddMeals name="Dinner" />
      <AddMeals name="Lunch" />
      <AddMeals name="Snacks" />
      <p>The total calories for today is: (number of kcal) Kcal</p>
    </>
  );
}
