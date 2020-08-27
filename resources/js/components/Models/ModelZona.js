import React from 'react'
import {getAllByClass} from "../tools/tools.js";

const ModelZona = () => {
    const getAllZona = async () => {
        const url = path_url_base+'/get-all-zona' ;
        const response = await getAllByClass( url, {}  );
        if ( response.status  )
        {
            const data = response.data;
            return data;
        }
        return false;
    }

    return {
        getAllZona
    }
}
export default ModelZona;