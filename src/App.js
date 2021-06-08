import React, {Component} from 'react';
import './App.css';
import Menu from './components/menu.js'
import Order from './components/order.js'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      meal: '',
      items: []
    }
  }


  mealSelect = e => {
    this.setState({
      meal: e.target.value,
      items: []
    })
  }

  addToOrder = (index, item) => {
    this.setState({
        items: [...this.state.items, `${index}. ${item[0]}`]
      })
  }



  clearOrder = () => {
    this.setState({
      items: []
    })
  }


  submitOrder = () => {

    let orderIndices = this.state.items.map(itemWithIndex => {
      return itemWithIndex.split(".")[0]
    })

    // alert user if selections not valid
    try {
      if (!orderIndices.includes("1") || !orderIndices.includes("2")){
        throw new Error ('All orders must include a main and side dish.');
      }
      else if (this.state.meal !== 'breakfast' && orderIndices.filter(item => item === '3').length > 1){
        throw new Error ('Sorry, only one drink allowed for lunch and dinner orders.')
     }
      else if (this.state.meal !== 'lunch' && orderIndices.filter(item => item === '2').length > 1){
        throw new Error ('Sorry, only one side allowed for breakfast and dinner orders.')
      }
      else if (this.state.meal === 'dinner' && !orderIndices.includes('4')){
        throw new Error ('Please include dessert for dinner orders.')
      }
      else if (!orderIndices.includes("3") && !orderIndices.includes('+ Water')) {
        // add water
        this.setState({
          items: [...this.state.items, '+ Water']
        })
      }
      else if (this.state.meal === 'dinner' && !orderIndices.includes('+ Water')){
        this.setState({
          items: [...this.state.items, '+ Water']
        })
      }
      else {
        this.confirmOrder()
      }
    }
    catch (err) {
      alert(err)
    }
  }

  confirmOrder = () => {
    alert('Order Complete!')
    //clear items
    this.setState({
      items: []
    })
  }


  render() {
    return (
      <div className="App">
        <h1>Let's Eat!</h1>
        <select onChange={this.mealSelect}>
        <option value="">Select a menu to get started</option>
          <option value="breakfast">breakfast</option>
          <option value="lunch">lunch</option>
          <option value="dinner">dinner</option>
        </select>
        {/* pass state as props to menu and order componenents */}
        <Menu meal={this.state.meal} addToOrder={this.addToOrder}/>
        <Order items={this.state.items} clearOrder={this.clearOrder} submitOrder={this.submitOrder}/>
      </div>
    );
  }
}

export default App;