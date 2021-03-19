import React from "react";
import "./DayListItem.scss";
import classNames from "classnames"

export default function DayListItem(props) {

  const dayClass = classNames("day-list__item", {
    
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0

  });

  //don't need curly braces as it is a one line func aka implicit return
  const formatSpots = () =>
    (props.spots ? `${props.spots} spot${props.spots > 1 ? `s` : ``} remaining`: `no spots remaining`)
    // console.log(formatSpots())
  

  return (
    //did not need to include event in onClick as it is a stated action in index.js
    <li onClick={() => props.setDay(props.name)}
      className={dayClass}
      >

      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
    
  );
  
}

