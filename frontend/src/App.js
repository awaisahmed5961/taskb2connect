import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Header from './components/Header';
import IpFinder from './components/IpFinder';
import AreaChart from './components/AreaChart';
function App() {

  const [currency, setCurrency] = useState([])
  const [crypto, setCrypto] = useState([])
  const [currencyGraph, setCurrencyGraph] = useState({});

  const [chart, setChart] = useState({
    options: {
      chart: {
        foreColor: "#333", toolbar: {
          show: false
        },
      },
      xaxis: {
        categories: ["USD", "AED", "GBP", "JYP", "CAD", "AUD", "SPD", "NZD", "YEN"], labels: {
          style: {
            colors: '#8F9198'
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: '#8F9198'
          }
        }
      },
      fill: {
        colors: ["#53E3DE"]
      },
      zoom: {
        enabled: false
      },

      dataLabels: {
        enabled: false,
        style: {
          colors: ['#69BABA'],
          borderRadius: 40
        },
        background: {
          enabled: true,
          foreColor: '#69BABA',
          width: "20px",
          height: "20px",
          padding: 4,
          borderRadius: "50",
          borderWidth: 1,
          borderColor: '#69BABA',
          opacity: 0.9,
          dropShadow: {
            enabled: false,
            top: 1,
            left: 1,
            blur: 1,
            color: '#000',
            opacity: 0.45
          }
        },
      },
      tooltip: {
        enable: false
      },
      grid: {
        show: true,
        borderColor: '#4E5677',
      },
      stroke: {
        curve: 'straight',
        width: 4,
        colors: ["#69BABA"],
      }, markers: {
        size: 7,
        colors: ["#69BABA"],
        strokeColor: "#69BABA",
        strokeWidth: 3
      },
    },
    series: [{
      name: 'series-1',
      data: [1.5, 2.4, 1.3, 1.0, 2, 3.3, 1.5, 3.5, 1.1]
    }]
  })

  const [cryptoChart, setCryptoChart] = useState({
    options: {
      chart: {
        foreColor: "#333", toolbar: {
          show: false
        },
      },
      xaxis: {
        categories: ["BTC", "ETH", "LTC", "BCH", "BNB", "EOS", "XRP", "XLM", "LINK", "DOT", "YFI", "BITS", "SATS"], labels: {
          style: {
            colors: '#8F9198'
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: '#8F9198'
          }
        }
      },
      fill: {
        colors: ["#53E3DE"]
      },
      zoom: {
        enabled: false
      },

      dataLabels: {
        enabled: false,
        style: {
          colors: ['#69BABA'],
          borderRadius: 40
        },
        background: {
          enabled: true,
          foreColor: '#69BABA',
          width: "20px",
          height: "20px",
          padding: 4,
          borderRadius: "50",
          borderWidth: 1,
          borderColor: '#69BABA',
          opacity: 0.9,
          dropShadow: {
            enabled: false,
            top: 1,
            left: 1,
            blur: 1,
            color: '#000',
            opacity: 0.45
          }
        },
      },
      tooltip: {
        enable: false
      },
      grid: {
        show: true,
        borderColor: '#4E5677',
      },
      stroke: {
        curve: 'straight',
        width: 4,
        colors: ["#69BABA"],
      }, markers: {
        size: 7,
        colors: ["#69BABA"],
        strokeColor: "#69BABA",
        strokeWidth: 3
      },
    },
    series: [{
      name: 'series-1',
      data: [1.00, 14.29, 351.84, 115.39, 105.10, 16912.49, 51146.26, 204130.41, 2745.11, 2067.39, 2.09, 1000000.00, 100000000.00]
    }]
  })

  useEffect(() => {
    axios.get('/api/exchange/currency').then((res) => {
      console.log(res.data)
      const currencies = res.data.slice(0, 15)
      setCurrency(currencies)
      let names = []
      let values = []
      currencies.map(curr => {
        names.push(curr.cur[0]);
        values.push(curr.rat)
      })
      var name = Object.keys(names).map(key => {
        return names[key];
      })

      setCurrencyGraph({
        xaxis: name,
        values: values
      });
      // console.log(currencyGraph)
    })
  }, [])

  useEffect(() => {
    axios.get('/api/exchange/crypto').then((res) => {
      setCrypto(res.data)
      // console.log(res.data)
    })
  }, [])


  return (
    <div className="App">
      <Header />
      <IpFinder />
      <div className="container">
        <div className="row">
          <div className="row mt-5">
            <div className="col-6">
              <h5 className="text-muted">Currency Rates <span className="text-small">BC(EURO)</span> </h5>
              <AreaChart options={chart.options} series={chart.series} />
            </div>
            <div className="col-6">
              <h5 className="text-muted">Crypto Rates <span className="text-small">BC(BTC)</span> </h5>
              <AreaChart options={cryptoChart.options} series={cryptoChart.series} />
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-6">
              <h5 className="text-muted">Currency Rates <span className="text-small">base currency EURO</span> </h5>
              <table class="table text-center">
                <thead>
                  <tr>
                    <th scope="col">Currency</th>
                    <th scope="col">Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {currency.map(e => (
                    <tr key={e.cur} >
                      <td>{e.cur}</td>
                      <td>{e.rat.toFixed(2)}</td>
                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
            <div className="col-6">
              <h5 className="text-muted">Crypto Rates</h5>
              <table class="table text-center">
                <thead>
                  <tr>
                    <th scope="col">Coins</th>
                    <th scope="col">Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {crypto.map(e => (
                    <tr key={e.name} >
                      <td>{e.name.toUpperCase()}</td>
                      <td>{e.detail.value.toFixed(2)} {e.detail.unit}</td>
                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div >
    </div >
  );
}

export default App;
