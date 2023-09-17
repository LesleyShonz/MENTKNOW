import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import 'typeface-baloo-bhai';
import 'typeface-roboto'


const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
    />
    
    <App />
  </React.StrictMode>
);
