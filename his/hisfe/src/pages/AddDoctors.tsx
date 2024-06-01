import Form from '@/components/core/Form';
import DashboardLayout from '@/layouts/DashboardLayout';
import TextField from '@/components/core/TextField';
import styles from './AddDoctor.module.scss';
import { useLocation, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AddDoctor() {
    const navigate = useNavigate();
    const location = useLocation();
    const [doctor, setDoctor] = useState({
        name: '',
        dateOfBirth: '',
        mobile: '',
        email: '',
        address: '',
        specializeIn: '',
    });

    useEffect(() => {
        const doctor_id = location.state?.doctor_id;
        if (doctor_id) {
            const data = {
                action: 'get',
                id: doctor_id,
            };
            axios.post('http://localhost:8000/api/doctors/', data).then((response) => {
                setDoctor(response.data);
            });
        }
    }, []);

    const handleInput = (e: any) => {
        setDoctor((doctor) => ({
            ...doctor,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = () => {
        const action = location.state?.doctor_id ? 'update' : 'add';
        const data = {
            action: action,
            doctor: doctor,
        };
        axios.post('http://localhost:8000/api/doctors/', data).then((response) => {
            if (response.status === 200) {
                alert('Cập nhật thành công!!');
                navigate('/doctors');
            }
        });
    };

    return (
        <DashboardLayout>
            <Form title="Doctor Detail" handleSubmit={handleSubmit}>
                <div>
                    <div className={styles.section}>
                        <TextField
                            label="Name"
                            name="name"
                            value={doctor?.name}
                            handleInputChange={handleInput}
                        />
                        <TextField
                            label="Date of Birth"
                            inputType="date"
                            name="dateOfBirth"
                            value={doctor?.dateOfBirth}
                            handleInputChange={handleInput}
                        />
                    </div>
                    <div className={styles.section}>
                        <TextField
                            label="Mobile"
                            name="mobile"
                            value={doctor?.mobile}
                            handleInputChange={handleInput}
                        />
                        <TextField
                            label="Email"
                            name="email"
                            value={doctor?.email}
                            handleInputChange={handleInput}
                        />
                    </div>
                    <div className={styles.section}>
                        <TextField
                            label="Address"
                            name="address"
                            value={doctor?.address}
                            handleInputChange={handleInput}
                        />
                    </div>
                    <div className={styles.section}>
                        <TextField
                            label="Specialize In"
                            name="specializeIn"
                            value={doctor?.specializeIn}
                            handleInputChange={handleInput}
                        />
                    </div>
                </div>
            </Form>
        </DashboardLayout>
    );
}
