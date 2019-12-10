import React,{useState} from "react";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
// import TabContainer from 'react-bootstrap/TabContainer'
const NavTabs = (props) => {
        const [key, setKey] = useState('localizacion');
        console.log(props);
        return (


    <Tabs id="controlled-tab-example" activeKey={key} onSelect={k => setKey(k)}>
      <Tab eventKey="home" title="Home">
        <div className="card-body">
            {props.fields.firstSection}
            <br/>
            <button className="btn btn-primary" onClick={() => setKey('localizacion')}>Grabar e ir a Localización</button>
        </div>
      </Tab>
      <Tab eventKey="localizacion" title="Localización">
            <div className="card-body">
            {props.fields.secondSection}
            </div>
      </Tab>
      <Tab eventKey="confinaciadores" title="Confinaciadores" >
      </Tab>
      <Tab eventKey="componentes" title="Componentes" >
      </Tab>
      <Tab eventKey="estructura_financiamiento" title="Estructura Financiamiento" >
      </Tab>
    </Tabs>
    );
};
export default NavTabs;
