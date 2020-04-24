import React from 'react';
import { Button, InputGroup, InputGroupAddon, InputGroupText, Input, ButtonToolbar } from 'reactstrap';

function CreateUser() {

    const sendRequest = () => {
        let username = document.getElementById('createUsername').value;        
        let password = document.getElementById('createPassword').value;
        let responseCode;
        fetch('http://localhost:5000/user', {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: `username=${username}&password=${password}`
        })
        .then(function (response) {
            responseCode = response.status;
            return response.text();
        })
        .then(
            data => {
                console.log(data);
                if (responseCode == 200) {
                    document.getElementById('createUserOutput').innerHTML = `User has been created: ${username}`;
                    document.getElementById('createUsername').value = "";
                    document.getElementById('createPassword').value = "";
                } else {
                    document.getElementById('createUserOutput').innerHTML = `Error: could not create user`;
                }
            }
        );
    }

    return (
        <div className="col-10">
            <h2>1. Create user</h2>
            <br/>
            <InputGroup className="mb-2">
                <Input id="createUsername" placeholder="Username" />
            </InputGroup>
            <InputGroup className="mb-4">
                <Input id="createPassword" type="password" placeholder="Password" />
            </InputGroup>
            <Button color="primary" onClick={sendRequest}>Submit</Button>
            <p className="mt-5" id="createUserOutput"></p>
        </div>
    
  );
}

export default CreateUser;