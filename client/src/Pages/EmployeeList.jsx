import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";

const fetchEmployees = () => {
  return fetch("/api/employees").then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const handleChange = (event) => {
    setFilteredEmployees(employees.filter((employee) => employee.position.toLowerCase().includes(event.target.value) ||
      employee.level.toLowerCase().includes(event.target.value)));
  };

  const handleDelete = (id) => {
    deleteEmployee(id);

    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  useEffect(() => {
    fetchEmployees()
      .then((employees) => {
        setLoading(false);
        setEmployees(employees);
        setFilteredEmployees(employees);
      })
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <input type="text" placeholder="Search" onChange={handleChange} />
      <EmployeeTable employees={filteredEmployees} onDelete={handleDelete} />
    </>
  )
};

export default EmployeeList;
