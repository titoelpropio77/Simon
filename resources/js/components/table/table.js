// import './datatables.min.css';
import React, {Component} from "react";
import ReactDOM  from 'react-dom';
const $ = require("jquery");
$.DataTable = require("datatables.net");

// import 'datatables.net';// se carga el js
require( 'datatables.net-buttons/js/dataTables.buttons.min' );// dataTBLE.buttons

const jzip = require( 'jzip');// quiere el jzip

require( 'datatables.net-buttons/js/buttons.html5.min' );

import 'datatables.net-bs4';// se carga el bootstrap4
import 'datatables.net-select'; //net-select
import 'datatables.net-select-bs4'; //net-select
// style
import 'datatables.net-buttons-bs4/css/buttons.bootstrap4.css'
// import 'datatables.net/css/datatables.min.css'
import 'datatables.net-dt/css/jquery.dataTables.css'// se carga el css

// import 'pdfmake/build/pdfmake.js';
// import 'pdfmake/build/vfs_fonts.js';
// import 'datatables.net-buttons-bs4';
// import 'jszip';
// import 'datatables.net-buttons';
// import 'datatables.net-buttons-dt/css/buttons.dataTables.css'
// const jszip = require( 'jszip');

// import 'datatables.net-bs4/css/dataTables.bootstrap4.css'// css boostrap4
// import 'datatables.net-buttons/css/buttons.bootstrap4.css'// css buttons.bootstrap4
// import 'datatables.net-buttons-bs4/css/buttons.bootstrap4.css'// css buttons.bootstrap4
window.JSZip = jzip;
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
        console.log("propiedades datatable");
        console.log(_props);
        var table = this.$el.DataTable(
            {
                responsive: true,
                "columns":_props.propertiesDataTable().columns,

                serverSide: true,
                    'ajax': {
                    url: _props.url,
                    headers: {
                        "X-CSRF-TOKEN": csrf_token
                    },
                    type: 'POST',
                    data:  _props.data_send_datatable
                },
                dom: 'Bfrtip',
                buttons: [
                    'copy','excelHtml5', {
                        extend: 'pdf',
                        text: 'PDF',
                        action : function() {
                            alert(1)
                        }

                    },
                ],
                columnDefs : [
                    {
                        'targets': _props.propertiesDataTable().targets,
                        createdCell : (td, cellData, rowData, row, col) => {
                            // <button  className="btn btn-primary" onClick={() => this.props.getBydId(rowData.id)}>Editar</button>
                            // onClick ={() => this.alertSth('hey!')}
                            // console.log(this.props.propertiesDataTable().btnAction);
                        const getColumn = this.props.propertiesDataTable(rowData.id).getColumn;
                        ReactDOM.render(
                        (<div >
                        {this.props.propertiesDataTable(rowData.id).btnActionUpdate}
                        {this.props.propertiesDataTable(rowData.id, rowData[getColumn]).btnActionDelete}
                        {this.props.propertiesDataTable(rowData.id).btnActionOthers}
                        </div>),td
                        );
                     }
                    },
                    // {
                    //     targets: 0,
                    //     checkboxes: {
                    //       selectRow: true
                    //  }
                    // }


                ],
                // select: {
                //     style: "multi"
                //   },

            }
        );

        // const DT = $ ('#dataTable')
        //           .find ('table')
        //           .DataTable ();
        //     new $.fn.dataTable.Buttons( table, {
        //     buttons: [
        //         'copy', 'excel', 'pdf'
        //     ]
        // } );

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





