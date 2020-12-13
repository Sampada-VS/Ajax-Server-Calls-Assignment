let XMLHttpRequest=require("xmlhttprequest").XMLHttpRequest;

function makeAJAXCall(methodType,url,callback,async=true,data=null){
    let xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        console.log("State change called. Ready State: "+xhr.readyState+" Status: "+xhr.status);
        if(xhr.readyState === 4){
            if(xhr.status === 200 || xhr.status === 201){
                callback(xhr.responseText);
            }else if (xhr.status >=400){
                console.log("Handle 400 Client error or 500 Server error.");
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
}

const getURL="http://localhost:3000/employees/1";
function getEmployeeDetails(data){
    console.log("Get employee data: "+data);
}
makeAJAXCall("GET",getURL,getEmployeeDetails);

const deleteURL="http://localhost:3000/employees/4";
function employeeDeleted(data){
    console.log("Employee deleted: "+data);
}
makeAJAXCall("DELETE",deleteURL,employeeDeleted,false);

const postURL="http://localhost:3000/employees";
const employeeData={"name":"Gunjan","salary":"5000000"}
function employeeAdded(data){
    console.log("Employee added: "+data);
}
makeAJAXCall("POST",postURL,employeeAdded,true,employeeData);
