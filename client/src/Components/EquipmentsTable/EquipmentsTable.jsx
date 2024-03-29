import { Link } from "react-router-dom";
import "./EquipmentsTable.css";

const EquipmentsTable = ({ equipments, onDelete }) => (
    <div className="EquipmentsTable">
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th />
                </tr>
            </thead>
            <tbody>
                {equipments.map((equipment) => (
                    <tr key={equipment._id}>
                        <td>{equipment.name}</td>
                        <td>{equipment.type}</td>
                        <td>{equipment.amount}</td>
                        <td>
                            <Link to={`/equipments/update/${equipment._id}`}>
                                <button type="button">Update</button>
                            </Link>
                            <button type="button" onClick={() => onDelete(equipment._id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default EquipmentsTable;