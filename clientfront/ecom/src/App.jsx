import React, { useContext } from "react";
import AppContext from "./context/AppContext";

function App() {
  const { products } = useContext(AppContext);

  return <div>hi{products.name}</div>;
}

export default App;
