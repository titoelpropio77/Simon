// import './datatables.min.css';
import React, {Component} from "react";
import ReactDOM  from 'react-dom';

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
    }
    async componentDidMount  ()  {
        this.$el = $(this.el)
        let token = document
        .querySelector("meta[name='csrf-token']")
        .getAttribute("content");
        const _props = this.props;
        this.$el.DataTable(
            {
                responsive: true,
                "columns":_props.propertiesDataTable().columns,
                columnDefs : [
                {
                    'targets': _props.propertiesDataTable().targets,
                    createdCell : (td, cellData, rowData, row, col) => {
                        // <button  className="btn btn-primary" onClick={() => this.props.getBydId(rowData.id)}>Editar</button>
                        // onClick ={() => this.alertSth('hey!')}
                        // console.log(this.props.propertiesDataTable().btnAction);
                    ReactDOM.render(
                    (<div >
                    {this.props.propertiesDataTable(rowData.id).btnActionUpdate}
                    {this.props.propertiesDataTable(rowData.id).btnActionDelete}
                    {this.props.propertiesDataTable(rowData.id).btnActionOthers}
                    </div>),td
                    );


                    }
                },

            ],
            serverSide: true,
            'ajax': {
                url: _props.url,
                headers: {
                    "X-CSRF-TOKEN": token
                },
                type: 'POST',
                data:  _props.propertiesDataTable(1).dataSend
            }
            }
        )
    };

    render() {

        return (
            <div className="row">
            <div id="dataTable" className="table">
                <table  className="display nowrap dataTable dtr-inline collapsed responsive" witch="100%" ref={el => this.el = el}>
                    {this.props.propertiesDataTable().head}
                </table>
            </div>
            </div>
        );
    }
}





