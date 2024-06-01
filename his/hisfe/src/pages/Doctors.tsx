import Card from '@/components/core/Card';
import Table from '@/components/core/Table';
import DashboardLayout from '@/layouts/DashboardLayout';
import styles from './Doctors.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function Doctors() {
    const navigate = useNavigate();
    const tableHeader = [
        'Id',
        'Name',
        'Date of Birth',
        'Mobile',
        'Email',
        'Specialize In',
        'Action',
    ];
    const [tableRows, setTableRows] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/doctors/').then((response) => {
            if (response.status === 200) {
                setTableRows(response.data);
            }
        });
    }, []);
    const handleEdit = (id: any) => {
        navigate('/doctor', { state: { doctor_id: id } });
    };

    const handleDelete = (id: any) => {
        const data = {
            action: 'delete',
            id: id,
        };
        axios.post(`http://localhost:8000/api/doctors/`, data).then((response) => {
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
                    title="Doctors"
                    to="/doctor"
                    tableHeader={tableHeader}
                    tableRows={tableRows}
                    type={'doctors'}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            </Card>
        </DashboardLayout>
    );
}
