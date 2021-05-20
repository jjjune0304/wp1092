import React from 'react'
import Station from './station'

function RouteGraph(props) {
  const data = props.route_data
  const select = props.select
  let length = data.length;
  return (
    <div className="route-graph-container">
      {
        // generate many stations
        // use <Station /> with your own customized parameters
        // coding here ...
        data.map((s, id) => <Station key={s.station_id} s_id={s.station_id} 
                                s_name={s.station_name} s_type={s.station_type}
                                end={id === (length-1)} start={id === 0} select={select}/>)
      }
    </div>
  )
}

export default RouteGraph
