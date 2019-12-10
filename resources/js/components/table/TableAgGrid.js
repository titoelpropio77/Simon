import React,{Component} from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModules } from "@ag-grid-community/all-modules";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
class TableAgGrid extends Component {
    constructor(props) {
      super(props);
      this.state = {
        modules: AllCommunityModules,
        columnDefs: [
          { headerName: "Make", field: "make" },
          { headerName: "Model", field: "model" },
          { headerName: "Price", field: "price" }],
        rowData: [
          { make: "Toyota", model: "Celica", price: 35000 },
          { make: "Ford", model: "Mondeo", price: 32000 },
          { make: "Porsche", model: "Boxter", price: 72000 }],
          defaultColDef: {
            editable: true,
            resizable: true
          },
    //       pinnedTopRowData: getPinnedTopData(),
    //   pinnedBottomRowData: getPinnedBottomData()
      }
    }
    onGridReady (params) {
        console.log(params);
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.sizeColumnsToFit();
      };
    render() {
      return (
        <div className="ag-theme-balham" style={ {height: '200px', width: '100%'} }>
          <AgGridReact
              modules= {this.state.AllCommunityModules}
              columnDefs={this.state.columnDefs}
              rowData={this.state.rowData}
              defaultColDef={this.state.defaultColDef}
              onGridReady={this.onGridReady}
              >
          </AgGridReact>
        </div>
      );
    }
  }
  export default TableAgGrid;
