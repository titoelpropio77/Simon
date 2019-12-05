import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class MenuAdmLte extends Component {
    render() {
        return (
            <ul className='nav nav-pills nav-sidebar flex-column' data-widget='treeview' role='menu' data-accordion='false'>
	          <li className="nav-item has-treeview">
	            <a href="#" className="nav-link active">
	              <i className="nav-icon fas fa-tachometer-alt"></i>
	              <p>
	                Dashboard
	                <i className="right fas fa-angle-left"></i>
	              </p>
	            </a>
	            <ul className="nav nav-treeview">
	              <li className="nav-item">
	                <a href="./modelo" className="nav-link active">
	                  <i className="far fa-circle nav-icon"></i>
	                  <p>Dashboard v1</p>
	                </a>
	              </li>
	              <li className="nav-item">
	                <a href="./index2.html" className="nav-link">
	                  <i className="far fa-circle nav-icon"></i>
	                  <p>Dashboard v2</p>
	                </a>
	              </li>
	              <li className="nav-item">
	                <a href="./index3.html" className="nav-link">
	                  <i className="far fa-circle nav-icon"></i>
	                  <p>Dashboard v3</p>
	                </a>
	              </li>
	            </ul>
	          </li>
            </ul>
        );
    }
}

if (document.getElementById('navBarAdmLte')) {
    ReactDOM.render(<MenuAdmLte/>, document.getElementById('navBarAdmLte'));
}
