import Card from '@/components/core/Card';
import Table from '@/components/core/Table';
import DashboardLayout from '@/layouts/DashboardLayout';
import styles from './Patients.module.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

export default function Patients() {
    const navigate = useNavigate();
    const tableHeader = ['Id', 'Name', 'Date of Birth', 'Mobile', 'Email', 'Action'];
    const [tableRows, setTableRows] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/patients/').then((response) => {
            if (response.status === 200) {
                setTableRows(response.data);
            }
        });
    }, []);

    const handleEdit = (id: any) => {
        navigate('/patient', { state: { patient_id: id } });
    };

    const handleDelete = (id: any) => {
        const data = {
            action: 'delete',
            id: id,
        };
        axios.post(`http://localhost:8000/api/patients/`, data).then((response) => {
            if (response.status === 200) {
                setTableRows(response.data);
                alert('Xóa thành công!!');
            }
        });
    };

    return (
        <DashboardLayout>
            <Card className={styles.card}>
                <Table
                    title="Patients"
                    to="/patient"
                    tableHeader={tableHeader}
                    tableRows={tableRows}
                    type={'patients'}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            </Card>
        </DashboardLayout>
    );
}
