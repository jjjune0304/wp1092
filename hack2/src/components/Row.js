import Grid from '../components/Grid'
export default function Row (props) {
    const {row_vec, index} = props;
    return (
        <tr>
          {row_vec.map((v, col_idx) => 
            (<Grid key={"R"+index+"C"+col_idx} data={v} row_idx={index} col_idx={col_idx}/>))}
        </tr>
    );
};