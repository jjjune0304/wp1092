import React from 'react'

function StationInfo(props) {
  const info = props.station_info;
  const labels = [
    { label: '車站名稱', value: (info?info.station_name:"")},
    { label: '車站位址', value: (info?info.address:"")},
    { label: '詢問處位置', value: (info?info.service_counter:"")},
    { label: '自行車進出', value: (info?info.enable_bicycle:"")}
  ]

  return (
    <div className="station-info-container">
      <table className="station-info-table">
        <thead>
          <tr>
            <th colSpan="2">車站資訊</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td id="table-station_name-label">{labels[0].label}</td>
            <td id="table-station_name-value">{labels[0].value}</td>
          </tr>
          <tr>
            <td id="table-address-label">{labels[1].label}</td>
            <td id="table-address-value">{labels[1].value}</td>
          </tr>
          <tr>
            <td id="table-service_counter-label">{labels[2].label}</td>
            <td id="table-service_counter-value">{labels[2].value}</td>
          </tr>
          <tr>
            <td id="table-enable_bicycle-label">{labels[3].label}</td>
            <td id="table-enable_bicycle-value">{labels[3].value}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default StationInfo
