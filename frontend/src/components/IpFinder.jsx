import React from 'react'
import { useState, useEffect } from 'react'
import { findFlagUrlByIso2Code } from "country-flags-svg";
import axios from 'axios';
const lookup = require('country-code-lookup');
var validate = require('ip-validator');

function IpFinder() {

    const [ipaddress, setIpAddress] = useState('');
    const [geoDetail, setGeoDetail] = useState(null);
    const [error, setError] = useState(false)
    useEffect(() => {
        if (ipaddress.length == 0) {
            setGeoDetail(null)
        }
    }, [ipaddress])
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate.ip(ipaddress)) {
            setError(false)
            axios.get(`/api/geo/${ipaddress}`).then((res) => {
                console.log({
                    ...res.data,
                    fullCountryName: lookup.byIso(res.data.country).country,
                    flag: findFlagUrlByIso2Code(res.data.country)
                })
                setGeoDetail({
                    ...res.data,
                    fullCountryName: lookup.byIso(res.data.country).country,
                    flag: findFlagUrlByIso2Code(res.data.country)
                })
            })
        }
        else {
            setError(true)
        }
    }
    const onIpFieldChange = (e) => {
        setIpAddress(e.target.value);
    }
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-6">
                    <div class="card p-4" >
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Find Geo Detials</label>
                                <input type="text"
                                    className="form-control"
                                    placeholder="IP Address"
                                    onChange={onIpFieldChange}
                                />
                                {error && <p className=" form-text text-danger">Invalid IP Address</p>}
                            </div>
                            <button type="submit" className="btn btn-success">Find Location</button>
                        </form>

                        {

                            geoDetail && <div class="card-body">

                                <div class="card-title">
                                    <img src={geoDetail.flag} width="30" height="30" />
                                    {" "} {geoDetail.fullCountryName}
                                </div>
                                <p class="card-text">
                                    City : <span className="text-muted text-bold">{geoDetail.city}</span>
                                </p>
                                <p class="card-text">
                                    Region : <span className="text-muted text-bold">{geoDetail.region}</span>
                                </p>
                                <p class="card-text">
                                    Timezone : <span className="text-muted text-bold">{geoDetail.timezone}</span>
                                </p>


                            </div>
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default IpFinder
