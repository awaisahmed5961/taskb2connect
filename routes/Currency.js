const express = require('express');
const router = express.Router();
const https = require('http')
const axios = require('axios')

/**
 * @route GET/ api/exchange/crypto
 * @description Get exchange rates of crypto
 * @access public
 */

router.get('/crypto',
    async (req, res) => {
        try {
            axios.get('https://api.coingecko.com/api/v3/exchange_rates').then(response => {
                const currencies = Object.entries(response.data.rates).map((e) => ({ name: e[0], detail: e[1] }));

                const crypto = currencies.filter((curr) => curr.detail.type == 'crypto')
                res.send(crypto)
            }).catch(err => {
                console.log(err);
                res.send(err)
            })
        }
        catch (err) {
            // console.log(err.message);
            res.status(500).send('Server Error');
        }
    });

/**
 * @route GET/ api/exchange/currency
 * @description Get exchange rates of currency
 * @access public
 */

router.get('/currency',
    async (req, res) => {
        try {
            axios.get('https://api.exchangerate.host/latest').then(response => {
                const rates = Object.entries(response.data.rates).map((e) => ({ cur: [e[0]], rat: e[1] }));
                res.send(rates)
            }).catch(err => {
                console.log(err);
                res.send(err)
            })
        }
        catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error');
        }
    });



module.exports = router;