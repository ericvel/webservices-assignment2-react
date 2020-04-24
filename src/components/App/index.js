import React, {useState} from 'react';
import './styles.css';
import CreateUser from '../CreateUser';
import Login from '../Login';
import UrlShortener from '../UrlShortener';


function App() {
  
  const [jwt, setJwt] = useState('');

  return (
    <div className="container-lg">
      <div className="row mt-5">
        <div className="col d-flex justify-content-center border-right">
          <CreateUser />
        </div>
        <div className="col d-flex justify-content-center border-right">
          <Login setJwt={setJwt}/>
        </div>
        <div className="col d-flex justify-content-center">
          <UrlShortener jwt={jwt} />
        </div>
      </div>
    </div>
  );
}

export default App;