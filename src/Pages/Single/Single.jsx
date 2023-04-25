import "./single.css"
import React from "react"
 
function Single(){
  return(
    <div>
        <button onClick={navigate("/single",{state:{id:123123123}})}>Details</button>
    </div>
  )
}

export default Single;