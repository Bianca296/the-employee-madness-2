import { useEffect, useState } from 'react';
import Loading from '../Components/Loading';
import EquipmentsTable from '../Components/EquipmentsTable/EquipmentsTable';

const fetchEquipments = () => {
    return fetch("/api/equipments").then((res) => res.json());
};

const deleteEquipments = (id) => {
    return fetch(`/api/equipments/${id}`, { method: "DELETE" }).then((res) => res.json());
};

const EmployeeEquipment = () => {

    const [loading, setLoading] = useState(true);
    const [equipments, setEquipments] = useState([]);

    const handleDelete = (id) => {
        deleteEquipments(id);
        setEquipments((equipments) => {
            return equipments.filter((equipment) => equipment._id !== id);
        });
    };

    useEffect(() => {
        fetchEquipments().then((equipments) => {
            setEquipments(equipments);
            setLoading(false);
        })
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <EquipmentsTable equipments={equipments} onDelete={handleDelete} />
        </>
    )
};

export default EmployeeEquipment;