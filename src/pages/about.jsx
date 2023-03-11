import { Link } from 'react-router-dom';
// import { useEffect } from 'react';
// import axios from '../libs/api.js';

function About() {
  // useEffect(() => {
  //   axios
  //     .post('/api/user')
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   axios
  //     .post('/api/blockchain')
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // });
  return (
    <div>
      <h1>
        <Link className="app-link" to="/">
          Back Home
        </Link>
      </h1>
      <h2>Hello, i'm a dapp blocklet</h2>
    </div>
  );
}

export default About;
