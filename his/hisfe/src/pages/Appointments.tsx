import Card from '@/components/core/Card';
import Table from '@/components/core/Table';
import DashboardLayout from '@/layouts/DashboardLayout';
import styles from './Appointments.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function Appointments() {
    const navigate = useNavigate();
    const tableHeader = [
        'Id',
        'Name',
        'Consulting Doctor',
        'Treatment',
        'Mobile',
        'Email',
        'Date',
        'Time',
        'Action',
    ];
    const [tableRows, setTableRows] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/appointments/').then((response) => {
            console.log(response);
            if (response.status === 200) {
                setTableRows(response.data);
            }
        });
    }, []);

    const handleEdit = (id: any) => {
        navigate('/appointment', { state: { appointment_id: id } });
    };

    const handleDelete = (id: any) => {
        const data = {
            action: 'delete',
            id: id,
        };
        axios.post(`http://localhost:8000/api/appointments/`, data).then((response) => {
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
                    title="Appointments"
                    to="/appointment"
                    tableHeader={tableHeader}
                    tableRows={tableRows}
                    type={'appointments'}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            </Card>
        </DashboardLayout>
    );
}
