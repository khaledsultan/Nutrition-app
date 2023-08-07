import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import Water from "@/components/Water.js";
import useLocalStorageState from "use-local-storage-state";
import { Kaisei_Decol } from "next/font/google";

export default function AboutYou() {
  // const [results, setResults] = useLocalStorageState(
  //   ("results", { defaultValue: [] })
  // );
  const [results, setResults] = useState([]);
  const [item, setItem] = useState([]);
  // const [item, setItem] = useLocalStorageState(("item", { defaultValue: [] }));
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    setResults([...results, data]);
    event.target.reset();
  }
  ///////////why we used use effect ?
  useEffect(() => {
    setItem(
      results.map((item) =>
        item.gender == 0
          ? (66.41 +
              (13.75 * item.weight + 5.003 * item.height - 6.775 * item.age)) *
            item.activity
          : (655.1 +
              (9.563 * item.weight + 1.85 * item.height - 4.676 * item.age)) *
            item.activity
      )
    );
  }, [results]);
  return (
    <>
      <h2>How Many Calories You Burn Daily ?!</h2>
      <form onSubmit={handleSubmit}>
        <div className="aboutYou">
          <label htmlFor="gender"></label>
          <select id="gender" name="gender">
            <option value="" hidden>
              Your gender
            </option>
            <option value="0">Male 🚹</option>
            <option value="1">Female 🚺</option>
          </select>

          <label htmlFor="height"></label>
          <input
            className="aboutYou_input"
            id="height"
            name="height"
            type="number"
            placeholder="Height in cm"
            min="0"
            required
          />
          <label htmlFor="weight"></label>
          <input
            className="aboutYou_input"
            id="weight"
            name="weight"
            type="number"
            placeholder="Weight in kg"
            min="0"
            required
          />
          <label htmlFor="age"></label>
          <input
            className="aboutYou_input"
            id="age"
            name="age"
            type="number"
            placeholder="Age"
            min="0"
            required
          />
          <div>
            <label htmlFor="activity">Select your activity level:</label>
            <select id="activity" name="activity">
              <option value="" hidden>
                Activity level
              </option>
              <option value="1.2">little or no exercise</option>
              <option value="1.375">
                light exercise(sports 1-3 days/week)
              </option>
              <option value="1.55">
                moderate exercise(sports 3-5 days/week)
              </option>
              <option value="1.725">
                hard exercise(sports 6-7 days a week)
              </option>
              <option value="1.9">
                very hard exercise(sports & physical job or 2x training)
              </option>
            </select>
          </div>

          <button className="aboutYou_button">Calculate</button>
          <ul>
            {results.map((item, index) => (
              <li className="add_meals_list" key={index}>
                <span className="span">Your Weight: {item.weight} kg</span>
                <span className="span">Your Height:{item.height} cm</span>
                <span className="span">Your age :{item.age} year</span>
              </li>
            ))}
          </ul>
          <h2>
            {item.map((item) => {
              if (item == 0) {
                return;
              }
              return Math.round(item) + "Kcal";
            })}
          </h2>
        </div>
      </form>
      <Water />
    </>
  );
}
