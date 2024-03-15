import React from "react";
import { ReactTyped } from "react-typed";

function TypedComp () {
    return(
  <div>
    <ReactTyped
      strings={['Greener', 'Cheaper', "Smarter"]}
      typeSpeed={120}
      backSpeed={130}
      loop
    />
  </div>
)}

export default TypedComp;