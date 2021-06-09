import React from "react";
 
const Order = (props) => {

  //sort in numerical order (main, side, drink, dessert)
  let orderedItems = props.items.sort((a, b) => a.split(" ")[0] - b.split(" ")[0])

  let orderObj = {}

  for (let i = 0; i < orderedItems.length; i++) {
    if (orderObj[orderedItems[i]]) {
      orderObj[orderedItems[i]]++
    }
    else orderObj[orderedItems[i]] = 1
  }

  return (<div>
    {props.items.length > 0 ? 
    <div>
    <h1>current order</h1>
    <ul>
    {Object.keys(orderObj).map (item => {
      return (<li className='order-item'>
          {orderObj[item]} {item.split(" ")[1]}
      </li>)
      })
    }
    </ul>
    <button onClick={props.clearOrder}>Start Over</button>
    <button onClick={props.submitOrder}>Submit!</button>
    </div>
    : null}
  </div>);
};

export default Order;