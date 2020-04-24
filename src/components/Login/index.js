import React from 'react';
import { Button, InputGroup, InputGroupAddon, InputGroupText, Input, ButtonToolbar } from 'reactstrap';

function Login(props) {

  const sendRequest = () => {
    let username = document.getElementById('loginUsername').value;        
    let password = document.getElementById('loginPassword').value;
    let responseCode;
    fetch('http://localhost:5000/user/login', {
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
                props.setJwt(data);
                document.getElementById('loginOutput').innerHTML = `Login succesful: ${username}`;
                document.getElementById('loginUsername').value = "";
                document.getElementById('loginPassword').value = "";
            } else {
              document.getElementById('loginOutput').innerHTML = `Login failed: ${data}`;
            }
        }
    );
  }

  return (
      <div className="col-10">
        <h2>2. Login</h2>
        <br/>
        <InputGroup className="mb-2">
          <Input id="loginUsername" placeholder="Username" />
        </InputGroup>
        <InputGroup className="mb-4">
            <Input id="loginPassword" type="password" placeholder="Password" />
        </InputGroup>
        <Button color="primary" onClick={sendRequest}>Login</Button>
        <p className="mt-5" id="loginOutput"></p>
      </div>
    
  );
}

export default Login;