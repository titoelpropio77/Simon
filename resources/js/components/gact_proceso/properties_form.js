import React,{useState} from 'react';
import {deletedElement,saveDataForm,getById} from "../tools/tools";
import ModalBT from "../modal/modal";
const properties_form = (urlSave, dataInput = {}) => {
    const [ showModal, setShowModal ] = useState(false);
    const [ validated, setValidated ] = useState(false);
    const [ inputs, setInputs ] = useState({});
    const [ elementId, setElementId ] = useState(0);
    const onChangeValue = (event,dataPersonalizate = {}) => {
        if( Object.entries( dataPersonalizate ).length == 0 ){
            event.persist();
            setInputs(inputs => ({
                ...inputs,
                [event.target.name]: event.target.value
            }));
        }else
        {
            //recorre todo le json
            for (var key in dataPersonalizate) {
                setInputs(inputs => ({
                    ...inputs,
                    [key] : dataPersonalizate[key]
                }));
            }
        }
        console.log("valor de los inputs");
        console.log(inputs);
    };
    /**
     * ejectuta la accion de guardar y o modificar
     * @param {objeto} event 
     */
    const handleSubmit= async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === true) 
        {
            setValidated(false);
            const response = await saveDataForm(
                urlSave,
                inputs,
                elementId,
                ''
            );
            if( response.status )
            {
                getAllConfinaciadoresByProy();
                cleanForm();
            }
            return;

        }
            setValidated(true);
        console.log( inputs );
    }
    const modalBT =( fields ) =>
    {
        return (<ModalBT
                state={showModal}
                closeModal={() => setShowModal(false) }
                field={fields( onChangeValue, inputs )}
                validated ={validated}
                title={'Guardar Proceso'}
                handleSubmit = {handleSubmit}
            />);
    }
    /**
     * retorna la etiqueta button de añadir nuevo elemento
     * @param {sgring} title 
     */
    const btnOpenModal =(title) => {
        return (<button
            onClick={() => {
                setShowModal(true);
                setElementId(0);
                }
            }
            className="btn btn-success"
        >
            Adicionar {title}
        </button>);
    }
    /**
     * obtiene la data dado un id de un elemento de la lista de la tabla
     * @param {int} id 
     */
    const getByIdElement = async (id)  =>   {
        const response = await getById(urlSave,id);
        if( response.status )
        {
            setShowModal(true);
            setInputs({nombre: response.data.proc_nombre});
            setInputs({macroproceso: { label :'prueba' , value: 1 }});

            setElementId( response.data.id );
        }
    }
    const propertiesDataTable = (elementId)  => {
        const columns = [
            {
                data: "proc_nombre",
                render : function(type, data, row)
                {
                    return row.proc_grado_automatizacion ;
                }
            },
            {
                data: "proc_grado_automatizacion"
            },
            {
                data: "proc_grado_automatizacion"
            },
            {
                data: "proc_grado_automatizacion"
            },
            {
                data: "proc_periodo_ejecucion"
            },
    
        ];
        let head = (
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Nombre del proceso</th>
                    <th>Grado acutomatizacion</th>
                    <th>Estado</th>
                    <th>Accion</th>
                </tr>
            </thead>
        );
        
        const btnActionUpdate = (
            <button
            className="btn btn-primary"
            onClick={() => getByIdElement(elementId)}
            >
                <i className="fas fa-edit"></i>
            </button>
        );
        const btnActionDelete = (
            <button
                className="btn btn-danger"
                onClick={() => deletedElement(elementId)}
            >
                <i className="fas fa-trash-alt"></i>
            </button>
        );
        // const btnActionOthers = (
        //     <button
        //         className="btn btn-success"
        //         href="exportReportProyect"
        //         onClick={() => window.open( 'exportReportProyByType/'+elementId+'/proyectoAll' )}
        //     >
        //        <i class="far fa-file-excel"></i>
        //     </button>
        // );
        return {
            columns: columns,
            head: head,
            targets: [4],
            btnActionDelete: btnActionDelete,
            btnActionUpdate: btnActionUpdate,
            // btnActionOthers: btnActionOthers
        };
        
    }
    return {
        btnOpenModal, modalBT,  propertiesDataTable
    };
}





export  default properties_form;