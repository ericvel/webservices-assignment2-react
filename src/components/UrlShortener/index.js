import React, { useState } from 'react';
import { Button, InputGroup, Input, InputGroupAddon, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, FormGroup, Label  } from 'reactstrap';

function UrlShortener(props) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState('GET');

    const toggle = () => setDropdownOpen(prevState => !prevState);
    let inputPrompt = '';
    let updateInputType = "";

    switch (selectedMethod) {
        case 'GET':
            inputPrompt = 'ID of URL (blank to get all IDs)';
            break;
        case 'POST':
            inputPrompt = 'URL to shorten';
            break;
        case 'PUT':
            inputPrompt = 'ID of URL to update';
            break;
        case 'DELETE':
            inputPrompt = 'ID of URL (blank to delete all)'
            break;
    }

    if (selectedMethod == 'PUT') {        
        updateInputType = "";
    } else {        
        updateInputType = "hidden";
    }

    const sendRequest = () => {
        let input = document.getElementById('urlInput').value;
        let output = '';
        let responseCode;

        switch(selectedMethod) {
            case 'GET':
                if (input != '') {
                    fetch(`http://localhost:5000/url/${input}`, {
                        method: 'GET'
                    })
                    .then(function (response) {
                        responseCode = response.status;
                        return response.json();
                    })
                    .then(
                        data => {
                            console.log(data);
                            if (responseCode == 301) {
                                output = `URL: ${data}`;
                                
                            } else {
                                output = `Error: ${data}`;
                            }

                            document.getElementById('urlOutput').value = output;
                        }
                    );
                } else {
                    // Gets all shortened URL ids
                    fetch('http://localhost:5000/url/', {
                        method: 'GET',
                        headers: {
                            'Content-Type':'application/json; charset=utf-8',
                            'X-Access-Token': props.jwt
                        }
                    })
                    .then(function (response) {
                        responseCode = response.status;
                        return response.json();
                    })
                    .then(
                        data => {
                            console.log(data);
                            if (responseCode == 200) {
                                output = `Keys: ${data}`;
                            } else if(responseCode == 403) {
                                output = `Error: ${data}\nYou must be logged in to perform this action.`;
                            } else {
                                output = `Error: ${data}`;
                            }
                            
                            document.getElementById('urlOutput').value = output;
                        }
                    );
                }
                break;
            case 'POST':
                fetch('http://localhost:5000/url', {
                    method: 'POST',
                    headers: {
                        'Content-Type':'application/json; charset=utf-8',
                        'X-Access-Token': props.jwt
                    },
                    body: `{
                        "longUrl":"${input}"
                    }` 
                })
                .then(function (response) {
                    responseCode = response.status;
                    return response.json();
                })
                .then(
                    data => {
                        console.log(data);
                        if (responseCode == 201) {
                            output = `Short URL created with ID: ${data.urlCode}`;
                        } else if (responseCode == 403) {
                            output = `Error: ${data}\nYou must be logged in to perform this action.`;
                        } else {
                            output = `Error: ${data}`;
                        }
                        
                        document.getElementById('urlOutput').value = output;
                    }
                );
                break;
            case 'PUT':
                let updatedUrl = document.getElementById('updateInput').value;
                fetch(`http://localhost:5000/url/${input}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type':'application/json; charset=utf-8',
                        'X-Access-Token': props.jwt
                    },
                    body: `{
                        "longUrl":"${updatedUrl}"
                    }`
                })
                .then(function (response) {
                    responseCode = response.status;
                    return response.json();
                })
                .then(
                    data => {
                        console.log(data);
                        if (responseCode == 200) {
                            output = `URL with ID ${data.urlCode} has been updated to:\n${data.longUrl}`;
                        } else if (responseCode == 403) {
                            output = `Error: ${data}\nYou must be logged in to perform this action.`;
                        } else {
                            output = `Error: ${data}`;
                        }
                        
                        document.getElementById('urlOutput').value = output;
                    }
                );
                break;
            case 'DELETE':
                if (input != '') {
                    fetch(`http://localhost:5000/url/${input}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type':'application/json; charset=utf-8',
                            'X-Access-Token': props.jwt
                        }
                    })
                    .then(function (response) {
                        responseCode = response.status;
                        return response.text();
                    })
                    .then(
                        data => {
                            console.log(data);
                            if (responseCode == 204) {
                                output = `Succesfully deleted URL with ID: ${input}`;
                            } else if (responseCode == 403) {
                                output = `Error: ${data}\nYou must be logged in to perform this action.`;
                            } else {
                                output = `Error: ${data}`;
                            }
                            
                            document.getElementById('urlOutput').value = output;
                        }
                    );
                } else {
                    // Delete all URLs
                    fetch(`http://localhost:5000/url`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type':'application/json; charset=utf-8',
                            'X-Access-Token': props.jwt
                        }
                    })
                    .then(function (response) {
                        responseCode = response.status;
                        return response.text();
                    })
                    .then(
                        data => {
                            console.log(data);
                            if (responseCode == 204) {
                                output = `Succesfully deleted all URLs`;
                            } else if (responseCode == 403) {
                                output = `Error: ${data}\nYou must be logged in to perform this action.`;
                            } else {
                                output = `Error: ${data}`;
                            }
                            
                            document.getElementById('urlOutput').value = output;
                        }
                    );
                }
                break;
        }
    }

    return (
        <div className="col-10">
            <h2>3. URL shortener</h2>
            <br/>
            <Label for="method">Select HTTP method</Label>
            <Dropdown addonType="prepend" id="method" isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle outline caret color="primary">
                    {selectedMethod}
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={() => setSelectedMethod('GET')}>GET</DropdownItem>
                    <DropdownItem onClick={() => setSelectedMethod('POST')}>POST</DropdownItem>
                    <DropdownItem onClick={() => setSelectedMethod('PUT')}>PUT</DropdownItem>
                    <DropdownItem onClick={() => setSelectedMethod('DELETE')}>DELETE</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <br/>
            <Label>Enter value</Label>
            <Input id="urlInput" placeholder={inputPrompt} className="mb-2" />           
            <Input id="updateInput" placeholder="New URL" type={updateInputType} className="mb-2" />
            <Button onClick={() =>sendRequest()} color="primary" className="mb-3">Send request</Button>
            <br/>
            <FormGroup>
                <Label for="urlOutput">Output</Label>
                <Input type="textarea" name="text" id="urlOutput" rows="5" readOnly value={""}></Input>
            </FormGroup>
        </div>
        
    );
}

export default UrlShortener;