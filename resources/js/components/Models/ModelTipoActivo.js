import React from 'react'
import {getAllByClass} from "../tools/tools.js";

const ModelTipoActivo = () => {
    const getAllTipoActivo = async () => {
        const url = path_url_base+'/get-all-tipo_activo' ;
        const response = await getAllByClass( url, {}  );
        if ( response.status  )
        {
            const data = response.data;
            return data;
        }
        return false;
    }

    return {
        getAllTipoActivo
    }
}
export default ModelTipoActivo;