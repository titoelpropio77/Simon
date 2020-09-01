import React from 'react'
import {getAllByClass} from "../tools/tools.js";

const ModelClasificacionActivo = () => {
    const getAllClasificacion = async () => {
        const url = path_url_base+'/get-all-clasificacion_activo' ;
        const response = await getAllByClass( url, {}  );
        if ( response.status  )
        {
            const data = response.data;
            return data;
        }
        return false;
    }

    return {
        getAllClasificacion
    }
}
export default ModelClasificacionActivo;