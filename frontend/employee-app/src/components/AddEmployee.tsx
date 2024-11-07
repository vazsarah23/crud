import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const AddEmployee: React.FC = () => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [dept, setDepartment] = useState('');

  const addEmployee = async () => {
    await axios.post('http://localhost:4000/api/employees', { name, position, dept });
    setName('');
    setPosition('');
    setDepartment('');
  };

  return (
    <div className='addemp'>
      <h1 className='heading'>Employee CRUD App</h1>
      <div className='container-emp'>
      <h2>Add Employee</h2>
      <label htmlFor="name">Enter Name: </label>
      <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required minLength={3} maxLength={50} pattern="^[A-Za-z]+$" title='only name and spaces' />
      <br />

      <label htmlFor="position">Enter position: </label>
      <input type="text" placeholder="Position" value={position} onChange={e => setPosition(e.target.value)} required />
      <br />

      {/* <label htmlFor="department">Enter Department: </label> */}
      <label htmlFor="department">Select Department: </label>
        <select
          value={dept}
          onChange={e => setDepartment(e.target.value)}
          required
        >
          <option value="">Select a department</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="Engineering">Engineering</option>
          <option value="Sales">Sales</option>
        </select>
        <br />
      {/* <input type="text" placeholder="Department" value={dept} onChange={e => setDepartment(e.target.value)} required /> */}
      <br />
      <button className='addbtn' onClick={addEmployee}>Add Employee</button>
      </div>
    </div>
  );
};

export default AddEmployee;