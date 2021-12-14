import {gql, useQuery} from "@apollo/client";
import "./ExchangeRates.css";

const EXCHANGE_RATES = gql`
  query price($currencies: [String]!) {
  markets(
  filter:{
    baseSymbol: {_in:$currencies}
    quoteSymbol: {_eq:"EUR"}
    exchangeSymbol: {
      _like: "%kraken%"
    }
  }) {
    exchangeSymbol
    baseSymbol
    quoteSymbol
    ticker {
      lastPrice
    }
  }
}
`;

function ExchangeRates({currencies, setCurrencies}) {

  const { loading, error, data, refetch } = useQuery(EXCHANGE_RATES, {
    variables: { currencies },
  });
  function deleteCurrency(currency) {
    const index = currencies.indexOf(currency);
    if (index > -1) {
      const newArray = currencies;
      newArray.splice(index, 1);
      setCurrencies(newArray);
    }
    refetch();
  }

  if (error) return <p>Error :(</p>;

  return <div className="markets-list">
    {
      loading ? <p>Loading...</p> :
      data.markets.filter(({ticker}) => ticker).map(({baseSymbol, ticker}) => (
        <div key={baseSymbol} className="markets-list__item">
          <div className="markets-item__market">
            <span className="markets-item__currency">{baseSymbol}</span>
            <span className="markets-item__price">
              {ticker ? parseFloat(ticker.lastPrice).toFixed(2) : ''} €
            </span>
          </div>
          <button onClick={() => deleteCurrency(baseSymbol)} className="markets-item__close" />
        </div>
      ))
    }
  </div>
}

export default ExchangeRates;