import React from 'react'
import {getAllByClass} from "../tools/tools.js";

const ModelUsuario = () => {
    const getAllUsuario = async () => {
        const url = path_url_base+'/get-all-user' ;
        const response = await getAllByClass( url, {}  );
        if ( response.status  )
        {
            const data = response.data;
            return data;
        }
        return false;
    }

    return {
        getAllUsuario
    }
}
export default ModelUsuario;