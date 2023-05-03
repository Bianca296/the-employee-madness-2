import { Link } from "react-router-dom";
import "./EmployeeTable.css";

const EmployeeTable = ({ employees, onDelete, handleSort, handleAttendance }) => (
  <div className="EmployeeTable">
    <table>
      <thead>
        <tr>
          <th className="SortAscDesc" onClick={() => handleSort("name")}>Name</th>
          <th className="SortAscDesc" onClick={() => handleSort("level")}>Level</th>
          <th className="SortAscDesc" onClick={() => handleSort("position")}>Position</th>
          <th>Present</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee._id}>
            <td>{employee.name}</td>
            <td>{employee.level}</td>
            <td>{employee.position}</td>
            <td> <input type="checkbox" onChange={(event) => handleAttendance(event, employee._id)} defaultChecked={employee.present} /> </td>
            <td>
              <Link to={`/update/${employee._id}`}>
                <button type="button">Update</button>
              </Link>
              <button type="button" onClick={() => onDelete(employee._id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default EmployeeTable;
