let XMLHttpRequest=require("xmlhttprequest").XMLHttpRequest;

function makePromiseCall(methodType,url,async=true,data=null){
    return new Promise(function(resolve,reject){
        let xhr=new XMLHttpRequest();
        xhr.onreadystatechange=function(){
            console.log("State change called. Ready State: "+xhr.readyState+" Status: "+xhr.status);
            if(xhr.readyState === 4){
                if(xhr.status === 200 || xhr.status === 201){
                    resolve(xhr.responseText);
                }else if (xhr.status >=400){
                    reject({
                        status:xhr.status,
                        statusText:xhr.statusText
                    });
                    console.log("XHR failed.")
                }
            }
        }
        xhr.open(methodType,url,async);
        if(data){
            console.log(JSON.stringify(data));
            xhr.setRequestHeader("Content-Type","application/json");
            xhr.send(JSON.stringify(data));
        }
        else xhr.send();
        console.log(methodType+" request sent to the server.");
    });
}

const getURL="http://localhost:3000/employees/1";
makePromiseCall("GET",getURL,true)
    .then(responseText =>{
        console.log("Get employee data: "+responseText);
    })
    .catch(error => console.log("GET Error status: "+JSON.stringify(error)));

const deleteURL="http://localhost:3000/employees/4";
makePromiseCall("DELETE",deleteURL,false)
    .then(responseText =>{
        console.log("Employee deleted: "+responseText);
    })
    .catch(error => console.log("DELETE Error status: "+JSON.stringify(error)));

const postURL="http://localhost:3000/employees";
const employeeData={"name":"Gunjan","salary":"5000000"}
makePromiseCall("POST",postURL,true,employeeData)
    .then(responseText =>{
        console.log("Employee added: "+responseText);
    })
    .catch(error => console.log("POST Error status: "+JSON.stringify(error)));