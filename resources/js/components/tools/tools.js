import alertify from 'alertifyjs';
import  { reloadTableData } from "../table/table.js";

/**
 * guardar los datos en la funcion store de laravel
 * @param urlSave = la url a la que se va dirigir la peticion
 * @param dataForm = son los datos que se van a enviar al servidor
 *
 */
let token = document
    .querySelector("meta[name='csrf-token']")
    .getAttribute("content");

export const saveDataForm = async (urlSave, dataForm, elementId, messageSend = null) => {
    var request = "";
    if( messageSend )
    {
        if( !messageSend.status )
        {
            alertify
            .alert(messageSend.error, function(){
                alertify.message('OK');
            });
            return { status: false }
        }
    }
    console.log('valor del elementId');
    console.log(elementId);
    let token = document
        .querySelector("meta[name='csrf-token']")
        .getAttribute("content");
    var url = elementId ? urlSave + "/" + elementId : urlSave;
    var method = elementId ? "PUT" : "POST";
    try {
        request = await fetch(url, {
            method: method,
            headers: {
                "X-CSRF-TOKEN": token,
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataForm)
        })
            .then(response => {
                return response.json();
            })
            .then(response => {
                if ( response.errors )
                {
                    var dataError = response.errors;
                    console.log("dataError: " + dataError);
                    var message_error_html = "";
                    for (var key in  dataError)
                    {
                        var errors_array = dataError[key];
                        console.log("error_array: " + errors_array);
                        errors_array.forEach(element => {
                            message_error_html += element+"<br>";
                        });
                    }
                    alertify.alert('Error',message_error_html);
                    return response;
                }
                alertify.success(response.message);
                return response;
            });
    } catch (error) {
        console.log( error);
        return error;
    }

    return request;
};
export const getById = async (url, id) => {
    const request = await fetch(url + "/" + id + "/edit", {
        method: "GET",
        headers: {
            "X-CSRF-TOKEN": token,
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(
            result => {
                return result;
            },
            error => {
                console.log(error);
            }
        );
    return request;
};
export const deletedElement =   (url, id, nombre= "") => {
    alertify.confirm('Eliminar item', '¿Esta seguro que desea eliminar ' + nombre + '?',
    async function(){
         var request = await fetch(url + "/" + id, {
            method: "DELETE",
            headers: {
                "X-CSRF-TOKEN": token,
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(
                result => {
                    if( result.status )
                    {
                        alertify.success(result.message);
                        reloadTableData();
                    }
                    return result;
                },
                error => {

                    console.log(error);
                }
            );
         return request;
    },
        function(){
            alertify.error('Cancelado');
        });

};

export const getAllByClass = async (url, dataForm) => {
    const request = await fetch(url, {
        method: "POST",
        headers: {
            "X-CSRF-TOKEN": token,
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataForm)
    })
        .then(res => res.json())
        .then(
            result => {
                return result;
            },
            error => {
                console.log(error);
            }
        );
    return request;
};


export const saveTypeDataForm = async (urlSave, dataForm, elementId, messageSend = null) => {
    var request = "";
    if( messageSend )
    {
        if( !messageSend.status )
        {
            alertify
            .alert("Error",messageSend.error, function(){
                alertify.message('OK');
            });
            return { status: false }
        }
    }
    let token = document
        .querySelector("meta[name='csrf-token']")
        .getAttribute("content");
    if (!elementId) {
        try {
            request = await fetch(urlSave, {
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN": token,
                    // Accept: "application/json",
                },
                body: dataForm
            })
                .then(response => {
                    // if (response.ok) {
                    return response.json();
                    // }
                    // console.log(response);
                    // throw new Error('A ocurrido un error');
                })
                .then(result => {
                    alertify.success(result.message);
                    return result;
                });
        } catch (error) {
            console.log(await request);
            return error;
        }
    } else {
        request = await fetch(urlSave , {
            method: "POST",
            headers: {
                "X-CSRF-TOKEN": token,
            },
            body: dataForm
        })
            .then(res => res.json())
            .then(
                result => {
                    return result;
                },
                error => {
                    console.log(error);
                }
            );
    }
    return request;
};
