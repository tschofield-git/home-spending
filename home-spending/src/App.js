import logo from './logo.svg';
import './App.css';
import React from 'react';
import 'materialize-css';
import {Button, Icon, Select, TextInput, Toast} from 'react-materialize';

function App() {
  return (
    <div className="App">
          <h1>Home Spending</h1>
          <EssayForm />
    </div>
  );
}

class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: '',
      price: 0,
      category: ''
    };

    this.handleChangeItem = this.handleChangeItem.bind(this);
    this.handleChangePrice = this.handleChangePrice.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeItem(event) {
    this.setState({item: event.target.value});
  }

  handleChangePrice(event) {
    this.setState({price: event.target.value});
  }

  handleChangeCategory(category) {
    this.setState({category: category});
  }

  handleSubmit(event) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: 'spending,item='+this.state.item+',category='+this.state.category+' value='+this.state.price
    };
    fetch('http://influxdb-spending-monitoring-influxdb-svc:8086/write?db=spending_metrics', requestOptions)
        .then(response => response.json())
        .then(data => window.M.toast(data));
    window.M.toast({html: "Item registered: " + this.state.item + " (" + this.state.category + ") - £" + this.state.price}, 1000);
    event.preventDefault();
  }

  render() {
    return (
      <div class="row">
    <form class="col s12">
      <div class="row">
      <div class="input-field col s12 m6">
        <TextInput onChange={this.handleChangeItem}
          id="TextInput-4"
          label="Item"
        />
        </div>
        <div class="input-field col s12 m6">
        <TextInput onChange={this.handleChangePrice}
          id="TextInput-4"
          label="Price"
          type="number"
        />
        </div>
        </div>
        <div class="row">
        <div class="input-field col s12">
        <div class="row">
          <div class="col s4"><div class={"iconButton " + (this.state.category==="Food" ? "iconSelected" : "")} onClick={() => this.handleChangeCategory("Food")}><Icon medium>shopping_cart</Icon><br />Food</div></div>
          <div class="col s4"><div class={"iconButton " + (this.state.category==="Car" ? "iconSelected" : "")} onClick={() => this.handleChangeCategory("Car")}><Icon medium>directions_car</Icon><br />Car</div></div>
          <div class="col s4"><div class={"iconButton " + (this.state.category==="Eating Out" ? "iconSelected" : "")} onClick={() => this.handleChangeCategory("Eating Out")}><Icon medium>fastfood</Icon><br />Eating Out</div></div>
          </div><div class="row">
          <div class="col s4"><div class={"iconButton " + (this.state.category==="Health" ? "iconSelected" : "")} onClick={() => this.handleChangeCategory("Health")}><Icon medium>favorite</Icon><br />Health</div></div>
          <div class="col s4"><div class={"iconButton " + (this.state.category==="Entertainment" ? "iconSelected" : "")} onClick={() => this.handleChangeCategory("Entertainment")}><Icon medium>tag_faces</Icon><br />Entertainment</div></div>
          <div class="col s4"><div class={"iconButton " + (this.state.category==="Bills" ? "iconSelected" : "")} onClick={() => this.handleChangeCategory("Bills")}><Icon medium>lightbulb</Icon><br />Bills</div></div>
          </div><div class="row">
          <div class="col s4"><div class={"iconButton " + (this.state.category==="Shopping" ? "iconSelected" : "")} onClick={() => this.handleChangeCategory("Shopping")}><Icon medium>shopping_bag</Icon><br />Shopping</div></div>
          <div class="col s4"><div class={"iconButton " + (this.state.category==="Home" ? "iconSelected" : "")}onClick={() => this.handleChangeCategory("Home")}><Icon medium>home</Icon><br />Home</div></div>
          <div class="col s4"><div class={"iconButton " + (this.state.category==="General" ? "iconSelected" : "")} onClick={() => this.handleChangeCategory("General")}><Icon medium>paid</Icon><br />General</div></div>
        </div>
        </div>
        <div class="input-field col s12" >
        <Button onClick={this.handleSubmit} disabled={this.state.item==='' || this.state.price===0 || this.state.category===''}>Submit</Button>
        </div>        
      </div>
    </form>
  </div>
    );
  }
}

export default App;
