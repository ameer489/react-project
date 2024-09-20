import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EmployeeForm = () => {
  const [employee, setEmployee] = useState({
    name: '', email: '', mobile: '', designation: '', gender: '', course: '', image: null
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/employees/${id}`)
        .then(response => setEmployee(response.data))
        .catch(error => console.error('Error fetching employee:', error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    setEmployee(prevState => ({ ...prevState, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(employee).forEach(key => {
      formData.append(key, employee[key]);
    });

    try {
      if (id) {
        // Update existing employee
        await axios.put(`http://localhost:5000/api/employees/${id}`, formData);
      } else {
        // Create new employee
        await axios.post('http://localhost:5000/api/employees', formData);
      }
      navigate('/'); // Redirect to the employee list page after submission
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit Employee' : 'Register Employee'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={employee.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={employee.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Mobile No:</label>
          <input type="text" name="mobile" value={employee.mobile} onChange={handleChange} required />
        </div>
        <div>
          <label>Designation:</label>
          <select name="designation" value={employee.designation} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
        <div>
          <label>Gender:</label>
          <select name="gender" value={employee.gender} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <label>Course:</label>
          <input type="text" name="course" value={employee.course} onChange={handleChange} required />
        </div>
        <div>
          <label>Image Upload:</label>
          <input type="file" name="image" onChange={handleFileChange} required />
        </div>
        <button type="submit">{id ? 'Update' : 'Submit'}</button>
      </form>
    </div>
  );
};

export default EmployeeForm;
