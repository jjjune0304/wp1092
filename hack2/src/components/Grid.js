export default function Grid (props) {
    
    const {data, row_idx, col_idx} = props;
    const mapping = {'':"", 2:"NCTU", 4:"NYMU", 8:"NTU", 16:"UCSD", 32:"UBC", 64:"CUHK", 128:"UCLA", 256:"NYU",512:"UCB",1024:"HKUST", 2048:"UTokyo", 4096:"Columbia", 8192:"Yale", 16384:"Cambridge", 32768:"Stanford", 65536:"MIT"}
    let grid_id = `grid-${row_idx}-${col_idx}`;
    let value_id = `value-${row_idx}-${col_idx}`;
    let temp_class_name = `grid level-${data}`;
    let value = data;

    // #########################
    // # 1 #2 Modify everything here (including the above one) yourself
    // #########################
    if (value === 0) {
        value='';
    }
    // console.log(mapping[value]);
    return (
        <td>
            <div className={temp_class_name} id={grid_id}>
                <div className="school-name" id={value_id}>{mapping[value]}</div>
            </div>
        </td>
    );
}