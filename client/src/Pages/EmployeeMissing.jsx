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

const EmployeeMissing = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [isDescOrder, setIsDescOrder] = useState({});

  const handleChange = (event) => {
    setFilteredEmployees(employees.filter((employee) => !employee.present && (employee.position.toLowerCase().includes(event.target.value) ||
      employee.level.toLowerCase().includes(event.target.value))));
  };

  const handleDelete = (id) => {
    deleteEmployee(id);

    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  const handleSort = (column) => {
    setFilteredEmployees([...filteredEmployees].sort((a, b) => {
      if (isDescOrder[column]) {
        return b[column].localeCompare(a[column]);
      } else {
        return a[column].localeCompare(b[column]);
      }
    }));
    if (isDescOrder[column]) {
      setIsDescOrder({ ...isDescOrder, [column]: false })
    } else {
      setIsDescOrder({ ...isDescOrder, [column]: true })
    }
  };

  const handleAttendance = (event, id) => {
    return fetch(`/api/employees/${id}/present`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ present: event.target.checked }),
    }).then((res) => res.json());
  };

  useEffect(() => {
    fetchEmployees()
      .then((employees) => {
        setEmployees(employees);
        setLoading(false);
        setFilteredEmployees(employees.filter((employee) => !employee.present));
      })
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <input type="text" placeholder="Search by Position/Level" onChange={handleChange} />
      <EmployeeTable employees={filteredEmployees} onDelete={handleDelete} handleSort={handleSort} handleAttendance={handleAttendance}/>
    </>
  )
};

export default EmployeeMissing;
