import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import useLocalStorageState from "use-local-storage-state";

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
        <div>
          <label htmlFor="gender"></label>
          <select id="gender" name="gender">
            <Option value="" hidden>
              Your gender
            </Option>
            <option value="0">Male</option>
            <option value="1">Female</option>
          </select>

          <label htmlFor="height"></label>
          <Input
            id="height"
            name="height"
            type="number"
            placeholder="Height in cm"
            min="0"
            // required
          />
          <label htmlFor="weight"></label>
          <Input
            id="weight"
            name="weight"
            type="number"
            placeholder="Weight in kg"
            min="0"
            // required
          />
          <label htmlFor="age"></label>
          <Input
            id="age"
            name="age"
            type="number"
            placeholder="Age"
            min="0"
            // required
          />
          <label htmlFor="activity">Select your activity level:</label>
          <select id="activity" name="activity">
            <Option value="" hidden>
              Activity level
            </Option>
            <option value="1.2">little or no exercise</option>
            <option value="1.375">light exercise(sports 1-3 days/week)</option>
            <option value="1.55">
              moderate exercise(sports 3-5 days/week)
            </option>
            <option value="1.725">hard exercise(sports 6-7 days a week)</option>
            <option value="1.9">
              very hard exercise(sports & physical job or 2x training)
            </option>
          </select>

          <button>Calculate</button>
          <h2>
            {item.map((item) => {
              if (item == 0) {
                return;
              }
              return Math.round(item);
            })}
          </h2>
        </div>
      </form>
    </>
  );
}

const Input = styled.input`
  border: none;
  border-bottom: solid 1px grey;
  margin: 2%;
`;

const Option = styled.option`
  color: grey;
`;
