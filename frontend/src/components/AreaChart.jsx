import React from 'react'
import Chart from 'react-apexcharts';

function AreaChart({ options, series }) {
    return (
        <Chart options={options} series={series} type="area" width={500} height={320} />
    )
}

export default AreaChart
