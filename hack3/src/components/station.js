import React from 'react'

function Station(props) {
  const s_id = props.s_id;
  const s_name = props.s_name;
  const s_type = props.s_type;
  const start = props.start;
  const end = props.end;
  const handleSelect = () => {
    props.select(s_id)
  };

  const color = (k) => {
    if (k === 'R') return 'red';
    if (k === 'G') return 'green';
    if (k === 'B') return 'blue';
    if (k === 'O') return 'orange';
  }
  const line = <div id={'l-'+s_id} className={"line"+" "+color(s_type)}></div>;
  return (
    <div className="station-line-container">
      <div id={'s-'+s_id} className={"station-and-name"} onClick={handleSelect}> {/* you should add both id and onClick to attributes */

      }
        <div className={"station-rectangle"+" "+color(s_type)+(end||start?" end":"")}>{s_id}</div>
        <div className={"station-name"+" "+color(s_type)}>{s_name}</div>
      </div>
      {!end?line:""}
    </div>
  )
}

export default Station
