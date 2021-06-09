import React from "react";
import '../App.css';

const Menu = (props) => {

  let menuItems = [];

  if (props.meal === 'breakfast') {
    menuItems = [{1: 'Eggs'}, {2: 'Toast'}, {3: 'Coffee'}]}
  else if (props.meal === 'lunch'){
    menuItems = [{1: 'Sandwich'}, {2: 'Chips'}, {3: 'Soda'}]}
  else if (props.meal === 'dinner'){
    menuItems = [{1: 'Steak'}, {2:'Potatoes'}, {3: 'Wine'}, {4: 'Cake'}]}


  return (<div>
    
    <h1>{props.meal !== '' ? `${props.meal} menu`: null}</h1>

    {menuItems.map((value, index) => {
      let item = Object.values(menuItems[index])
      let dish
      if (index + 1 === 1) {dish = 'main'}
      if (index + 1 === 2) {dish = 'side'}
      if (index + 1 === 3) {dish = 'drink'}
      if (index + 1 === 4) {dish = 'dessert'}
      
      return (<li 
      className = 'menu-item'
      key={index}>
      {index + 1}. {dish} <button onClick={() => props.addToOrder(index + 1, item)}>+</button>
      </li>)
    })}


  </div>);
};

export default Menu;