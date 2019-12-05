import React,{Component} from "react";
import ReactDOM  from 'react-dom';

export default class Fields extends Component{
    render(){
    const dataInput = this.props.dataField;
    console.log(dataInput);
    return (
            <div className="col-md-6">
                <label>Nombre</label>
                <input type="text" className="form-control" name="nombre"
                value={dataInput.nombre}
                onChange={this.props.onChangeValue.bind(this)}
                //  onChange={(text) => {
                //      this.props.onChangeValue(text).bind(text);
                // }}
                >
                </input>
            </div>

        );
    };
}
//   const  field = ({onChangeValue}) => {
//     return (
//         <div>
//             <div className="col-md-6">
//                 <label>Nombre</label>
//                 <input type="text" className="form-control" name="nombre"  onChange={() =>onChangeValue(this)}></input>
//             </div>

//         </div>
//     );
// };
// export default field;
