import React from "react";

export const saveDataForm = async (urlSave, dataForm, elementId) => {
    var request =  "";
    console.log(elementId);
    let token = document
        .querySelector("meta[name='csrf-token']")
        .getAttribute("content");
    if (!elementId) {
         request = await fetch(urlSave, {
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
    } else {
         request = await fetch(urlSave + '/' + elementId, {
            method: "PUT",
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

    }
    return request;
};
export const getById = async (url, id) => {
    console.log("getById");
    let token = document
        .querySelector("meta[name='csrf-token']")
        .getAttribute("content");
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
