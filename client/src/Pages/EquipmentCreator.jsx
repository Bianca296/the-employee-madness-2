import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EquipmentsForm from "../Components/EquipmentsForm";

const createEquipment = (equipment) => {
  console.log(JSON.stringify(equipment));
  return fetch("/api/equipments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(equipment),
  }).then((res) => res.json());
  
};


const EquipmentCreator = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCreateEquipment = (equipment) => {
    createEquipment(equipment).then(() => {
      setLoading(false);
      navigate("/equipments");
    })
    setLoading(true);
  };

  return (
    <EquipmentsForm onCancel={() => navigate("/equipments")} disabled={loading} onSave={handleCreateEquipment} />
  );
};

export default EquipmentCreator;