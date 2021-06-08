import React from "react";
 
const Order = (props) => {

  //sort in numerical order (main, side, drink, dessert)
  //revise if don't want index to show on orders
  let orderedItems = props.items.sort((a, b) => a.split(" ")[0] - b.split(" ")[0])

  //map over orderedItems to get quantities
  //ex: [{3: '1 Eggs, 2: '2 Toast', 2: '3 Coffee'}]
  
  return (<div>
    {props.items.length > 0 ? 
    <div>
    <h1>current order</h1>
    <ul>
    {orderedItems.map((item, index) => 
    <li className='menu-item' 
    key={index}
    >
        {item}
    </li>)}
    </ul>
    <button onClick={props.clearOrder}>Start Over</button>
    <button onClick={props.submitOrder}>Submit!</button>
    </div>
    : null}
  </div>);
};

export default Order;