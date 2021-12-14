import logo from './assets/logo.svg';
import './App.css';
import ExchangeRates from "./components/ExchangeRates/ExchangeRates";
import AddingForm from "./components/AddingForm/AddingForm";
import {useState} from "react";

function App() {
  const [currencies, setCurrencies] = useState(["BTC", "LTC", "XMR"]);
  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main className="app-main">
        <div className="left-side">
          <h1>Now you can track all your cryptos here!</h1>
          <p className="direction-text">Just enter the cryptocurrency code on the form to the right.</p>
          <ExchangeRates currencies={currencies} setCurrencies={setCurrencies} />
        </div>
        <AddingForm currencies={currencies} setCurrencies={setCurrencies} />
      </main>
      <footer className="app-footer">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Cras tincidunt erat sed sapien sagittis, a varius nibh tempus. Nullam ut dapibus lacus.
        Donec non mi pellentesque, vestibulum nulla sed, convallis nibh.
        Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur iaculis mauris eget justo suscipit fringilla.
        Quisque vulputate ac odio ac egestas.
      </footer>
    </div>
  );
}

export default App;
