import Login from './login';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeeList from './employeeform';
import EmployeeForm from './employeelist';
// function App() {
//   return (
//     <>
//     <h1>hii,this is my first react</h1>
//     </>
//   );
// }
import React, { useState, useEffect } from 'react';
import axios from 'axios';
axios.get('/api/data');
function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/api/data')
      .then(response => {
        setData(response.data.message);
      })
      .catch(error => {
        console.error('There was an error fetching data!', error);
      });
  }, []);

  return (
    // <div className="App">
    //   <h1>{data ? data : 'Loading...'}</h1>
    //   <Login/>
    // </div>
    <Router>
      <Routes>
        <Route path="/" element={<EmployeeList />} />
        <Route path="/register" element={<EmployeeForm />} />
        <Route path="/edit/:id" element={<EmployeeForm />} />
      </Routes>
      <Login></Login>
    </Router>


  );
}



export default App
