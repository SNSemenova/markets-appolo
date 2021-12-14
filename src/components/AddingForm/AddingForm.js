import {useEffect, useState} from "react";
import {gql, useLazyQuery} from "@apollo/client";
import "./AddingForm.css"

const EXCHANGE_RATES = gql`
  query price($currency: String!) {
  markets(
  filter:{
    baseSymbol: {_eq:$currency}
    quoteSymbol: {_eq:"EUR"}
    exchangeSymbol: {
      _like: "%kraken%"
    }
  }) {
    baseSymbol
  }
}
`;

function AddingForm({currencies, setCurrencies}) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  function changeValue(event) {
    setError('');
    setValue(event.target.value);
  }

  const [
    getCurrency,
    { loading, data }
  ] = useLazyQuery(EXCHANGE_RATES);

  function handleSubmit(event) {
    event.preventDefault();
    getCurrency({ variables: { currency: value } })
  }

  useEffect(() => {
    if (data && data.markets && data.markets.length > 0) {
      if (currencies.includes(value)) {
        setError('this market is already shown');
      } else {
        setCurrencies([...currencies, value]);
        setValue('');
      }
    } else if (data) {
      setError('no such market');
    }
  }, [data])

  return <form onSubmit={handleSubmit} className="adding-form">
    <label className="adding-form__input-label">
      <input value={value} onChange={changeValue} className="adding-form__input"/>
      { error ? <span className="adding-form__error">{error}</span> : null }
    </label>
    { loading ? <p>Loading ...</p> :
      <button type="submit" className="adding-form__submit">Add</button>
    }
    <p className="adding-form__info-text">Use of this service is subject to terms and conditions.</p>
  </form>
}

export default AddingForm;