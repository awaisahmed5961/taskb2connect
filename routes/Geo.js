const express = require('express');
const router = express.Router();
const https = require('http')


/**
 * @route GET/ api/geo
 * @description Get Geo Location from IP Address
 * @access public
 */

router.get('/:ip',
    async (req, res) => {
        try {
            const options = {
                hostname: 'ipinfo.io',
                path: `/${req.params.ip}/geo`,
                method: 'GET'
            }

            const requ = https.request(options, resp => {
                console.log(`statusCode: ${res.statusCode}`)
                resp.on('data', d => {
                    res.send(d)
                })
            })

            requ.on('error', error => {
                res.status(504).json({
                    status: 504,
                    message: "Gateway timeout"
                })
            })

            requ.end()
        }
        catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error');
        }
    });



module.exports = router;