// import './datatables.min.css';
import React, {Component} from "react";
import ReactDOM  from 'react-dom';
import { useAlert } from "react-alert"
import { getById } from '../tools/tools'

const $ = require("jquery");
$.DataTable = require("datatables.net");
export const reloadTableData =  () => {
    const table = $ ('#dataTable')
                  .find ('table')
                  .DataTable ();
    table.clear ();
    table.draw ();
}
export default class Table extends Component{

    constructor(props)
    {
        const _props = super(props);
        console.log(_props);
    }
    async componentDidMount  ()  {
        console.log(this.el)
        this.$el = $(this.el)
        const _props = this.props;
        // console.log( await this.props.data);
        this.$el.DataTable(
            {
                responsive: true,
                "columns":_props.propertiesDataTable().columns,
                columnDefs : [
                {
                    'targets': [2],
                    createdCell : (td, cellData, rowData, row, col) => {

                        // onClick ={() => this.alertSth('hey!')}
                    ReactDOM.render(
                    (<div ><button  className="btn btn-primary" onClick={() => this.props.getBydId(rowData.id)}>Editar</button><button className="btn btn-danger" onClick={() =>getById('d',2)} >Eliminar</button></div>),td
                    );


                    }
                },

            ],
            serverSide: true,
            'ajax': {
                url: _props.url,
                type: 'GET'
            }
            }
        )
    };

    render() {

        return (
            <div  className="container">
            <div id="dataTable" className="table">
                <table  className="display table responsive" witch="100%" ref={el => this.el = el}>
                    {this.props.propertiesDataTable().head}
                </table>
            </div>
            </div>
        );
    }
}





