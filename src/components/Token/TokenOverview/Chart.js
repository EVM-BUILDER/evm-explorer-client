import React, { PureComponent } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
  {
    pv: 1500,
  },
  {
    pv: 600,
  },
  {
    pv: 3000,
  },
  {
    pv: 4000,
  },
  {
    pv: 2000,
  },
]

const Chart = () => {
  return (
    <ResponsiveContainer width="100%" height={21}>
      <LineChart width={120} height={100} data={data}>
        <CartesianGrid horizontal={false} vertical={false} />
        <Line type="monotone" dataKey="pv" stroke="#418143" activeDot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default Chart
