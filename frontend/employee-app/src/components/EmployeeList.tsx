import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

interface Employee {
  id: number;
  name: string;
  position: string;
  dept: string;
  isDeleted?: boolean; // Optional for soft delete
}

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [editEmployee, setEditEmployee] = useState<Partial<Employee> | null>(null);
  const [viewDetails, setViewDetails] = useState<{ [key: number]: boolean }>({});
  const [searchQuery, setSearchQuery] = useState<string>('');

  const fetchEmployees = async () => {
    const response = await axios.get('http://localhost:4000/api/employees');
    setEmployees(response.data);
  };

  const updateEmployee = async (id: number) => {
    await axios.put(`http://localhost:4000/api/employees/${id}`, editEmployee);
    setEditEmployee(null);
    fetchEmployees();
  };

  const deleteEmployee = async (id: number) => {
    await axios.delete(`http://localhost:4000/api/employees/${id}`);
    fetchEmployees();
  };

  const toggleViewDetails = (id: number) => {
    setViewDetails((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Filter employees based on the search query
  const filteredEmployees = employees.filter(employee => {
    const query = searchQuery.toLowerCase();
    return (
      employee.name.toLowerCase().includes(query) ||
      employee.position.toLowerCase().includes(query) ||
      employee.dept.toLowerCase().includes(query)
    );
  });

  return (
    <div>
      <h2>Employee List</h2>
      
      {/* Search Input */}
      <div>
        <input
          type="text"
          placeholder="Search employees by name, position, or department"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      
      {filteredEmployees.map(employee => (
        <div key={employee.id}>
          <div className='wrapper'>
            <span>{employee.name}</span>
            <button onClick={() => toggleViewDetails(employee.id)}>
              {viewDetails[employee.id] ? 'Hide' : 'View'} Details
            </button>
            <button onClick={() => setEditEmployee(employee)}>Edit</button>
            <button onClick={() => deleteEmployee(employee.id)}>Delete</button>
          </div>

          {viewDetails[employee.id] && (
            <div>
              <p><strong>Position:</strong> {employee.position}</p>
              <p><strong>Department:</strong> {employee.dept}</p>
            </div>
          )}

          {editEmployee?.id === employee.id && (
            <div>
              <input
                type="text"
                value={editEmployee.name || ''}
                onChange={e => setEditEmployee({ ...editEmployee, name: e.target.value })}
              />
              <input
                type="text"
                value={editEmployee.position || ''}
                onChange={e => setEditEmployee({ ...editEmployee, position: e.target.value })}
              />
              {/* <input
                type="text"
                value={editEmployee.dept || ''}
                onChange={e => setEditEmployee({ ...editEmployee, dept: e.target.value })}
              /> */}
              <select
  id="department"
  value={editEmployee.dept || ''}
  onChange={e => setEditEmployee({ ...editEmployee, dept: e.target.value })}
  required
>
  <option value="">Select a department</option>
  <option value="HR">HR</option>
  <option value="Finance">Finance</option>
  <option value="Engineering">Engineering</option>
  <option value="Sales">Sales</option>
</select>

              <button className='editbtn' onClick={() => updateEmployee(employee.id)}>Save</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default EmployeeList;