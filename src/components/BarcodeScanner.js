import React, { useEffect } from "react";
import Quagga from "quagga";
import { useDispatch } from "react-redux";
const BarcodeScanner = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector("#barcode-scanner"),
          constraints: {
            facingMode: "environment",
          },
        },
        decoder: {
          readers: ["ean_reader"],
        },
      },
      (err) => {
        if (err) {
          console.error("Error initializing Quagga:", err);
          return;
        }
        Quagga.start();
        Quagga.onDetected(handleBarcodeDetected);
      }
    );

    return () => {
      Quagga.stop();
    };
  }, []);
  const handleBarcodeDetected = (result) => {
    const barcodeData = result.codeResult.code;
    console.log("Barcode detected:", barcodeData);
    dispatch({ type: "SCAN_BARCODE", payload: barcodeData });
  };
  return (
    <div id="barcode-scanner" style={{ width: "100%", height: "100%" }}></div>
  );
};
export default BarcodeScanner;
