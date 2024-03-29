import { useEffect, useState } from 'react';
import Loading from '../Loading';

const EmployeeForm = ({ onSave, disabled, employee, onCancel }) => {

  const [equipments, setEquipments] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEquipments = async () => {
    const res = await fetch("/api/equipments");
    return await res.json();
  };

  const fetchBrands = async () => {
    const res = await fetch("/api/brands");
    return await res.json();
  };

  useEffect(() => {
    fetchEquipments().then((equipments) => {
      setEquipments(equipments);
      setLoading(false);
    })
  }, []);

  useEffect(() => {
    fetchBrands().then((brands) => {
      setBrands(brands);
      setLoading(false);
    })
  }, []);


  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = [...formData.entries()];

    const employee = entries.reduce((acc, entry) => {
      const [k, v] = entry;
      acc[k] = v;
      return acc;
    }, {});

    return onSave(employee);
  };

  if(loading)
    return <Loading />

  return (
    <form className="EmployeeForm" onSubmit={onSubmit}>
      {employee && (
        <input type="hidden" name="_id" defaultValue={employee._id} />
      )}

      <div className="control">
        <label htmlFor="name">Name:</label>
        <input
          defaultValue={employee ? employee.name : null}
          name="name"
          id="name"
        />
      </div>

      <div className="control">
        <label htmlFor="level">Level:</label>
        <input
          defaultValue={employee ? employee.level : null}
          name="level"
          id="level"
        />
      </div>

      <div className="control">
        <label htmlFor="position">Position:</label>
        <input
          defaultValue={employee ? employee.position : null}
          name="position"
          id="position"
        />
      </div>

      <div className="control">
        <label htmlFor="equipment">Equipment:</label>
        <select name="equipment" defaultValue={employee ? employee.equipment : null}>
          {equipments.map(equipment => (
            <option value={equipment._id} key={equipment._id}>{equipment.name}</option>
          ))
          }
        </select>
      </div>

      <div className="control">
        <label htmlFor="brand">Favorite brand:</label>
        <select name="brand" defaultValue={employee ? employee.brand : null}>
          {brands.map(brand => (
            <option value={brand._id} key={brand._id}>{brand.name}</option>
          ))
          }
        </select>
      </div>

      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {employee ? "Update Employee" : "Create Employee"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
