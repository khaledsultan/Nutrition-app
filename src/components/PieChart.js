// import React, { useState, useEffect } from "react";
// import styles from "../styles/Home.module.css";

// function PieChart({ data }) {
//   const [colors, setColors] = useState([
//     "cornflowerblue",
//     "olivedrab",
//     "orange",
//     "tomato",
//     "crimson",
//     "purple",
//     "turquoise",
//     "forestgreen",
//     "navy",
//     "gray",
//   ]);

//   useEffect(() => {
//     createPie();
//   }, [data]);

//   function sliceSize(dataNum, dataTotal) {
//     return (dataNum / dataTotal) * 360;
//   }

//   function addSlice(sliceSize, offset, sliceID, color) {
//     // Implement the rendering of each pie slice using React components
//     // You can use CSS styles to achieve the visual representation of the pie chart.
//   }

//   function iterateSlices(sliceSize, offset, dataCount, sliceCount, color) {
//     // Implement the recursive function to iterate over slices using React components
//   }

//   function createPie() {
//     let listTotal = data.reduce((total, num) => total + num, 0);
//     let offset = 0;

//     for (let i = 0; i < data.length; i++) {
//       let size = sliceSize(data[i], listTotal);
//       iterateSlices(size, offset, i, 0, colors[i]);
//       offset += size;
//     }
//   }

//   return (
//     <div className="pie-chart">
//       <section>
//         <div class="pieID pie"></div>
//         <ul class="pieID legend">
//           <li>
//             <em>Fat</em>
//             <span>{data[0]}</span>
//           </li>
//           <li>
//             <em>Carb</em>
//             <span>{data[1]}</span>
//           </li>
//           <li>
//             <em>Protein</em>
//             <span>{data[2]}</span>
//           </li>
//         </ul>
//       </section>
//     </div>
//   );
// }

// export default PieChart;
