import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EquipmentsForm from "../Components/EquipmentsForm";
import Loading from "../Components/Loading";


const updateEquipment = (equipment) => {
    return fetch(`/api/equipments/${equipment._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(equipment),
    }).then((res) => res.json());
};

const fetchEquipment = (id) => {
    return fetch(`/api/equipments/${id}`).then((res) => res.json());
};

const EquipmentUpdater = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [equipment, setEquipment] = useState(null);
    const [equipmentLoading, setEquipmentLoading] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);

    useEffect(() => {
        fetchEquipment(id).then((equipment) => {
            setEquipment(equipment);
            setEquipmentLoading(false);
        });
        setEquipmentLoading(true);
    }, [id]);

    const handleUpdateEquipment = (equipment) => {
        updateEquipment(equipment).then(() => {
            setUpdateLoading(false);
            navigate("/equipments");
        });
        setUpdateLoading(true);
    };

    if (equipmentLoading) {
        return <Loading />;
    }

    return (
        <EquipmentsForm equipment={equipment} onSave={handleUpdateEquipment} disabled={updateLoading} onCancel={() => navigate("/equipments")} />
    );
};

export default EquipmentUpdater;