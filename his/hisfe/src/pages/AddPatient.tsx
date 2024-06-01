import Form from '@/components/core/Form';
import TextField from '@/components/core/TextField';
import DashboardLayout from '@/layouts/DashboardLayout';
import styles from './AddPatient.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router';

export default function AddPatient() {
    const navigate = useNavigate();
    const location = useLocation();
    const [patient, setPatient] = useState({
        name: '',
        dateOfBirth: '',
        mobile: '',
        email: '',
        address: '',
        healthInsuranceNumber: '',
        startBiography: '',
    });

    useEffect(() => {
        const patient_id = location.state?.patient_id;
        if (patient_id) {
            const data = {
                action: 'get',
                id: patient_id,
            };
            axios.post('http://localhost:8000/api/patients/', data).then((response) => {
                setPatient(response.data);
            });
        }
    }, []);

    const handleInput = (e: any) => {
        setPatient((patient) => ({
            ...patient,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = () => {
        const action = location.state?.patient_id ? 'update' : 'add';
        const data = {
            action: action,
            patient: patient,
        };
        axios.post('http://localhost:8000/api/patients/', data).then((response) => {
            if (response.status === 200) {
                alert('Cập nhật thành công!!');
                navigate('/patients');
            }
        });
    };

    return (
        <DashboardLayout>
            <Form title="Patient Detail" handleSubmit={handleSubmit}>
                <div>
                    <div className={styles.section}>
                        <TextField
                            label="Name"
                            name="name"
                            value={patient?.name}
                            handleInputChange={handleInput}
                        />
                        <TextField
                            label="Date of Birth"
                            inputType="date"
                            name="dateOfBirth"
                            value={patient?.dateOfBirth}
                            handleInputChange={handleInput}
                        />
                    </div>
                    <div className={styles.section}>
                        <TextField
                            label="Mobile"
                            name="mobile"
                            value={patient?.mobile}
                            handleInputChange={handleInput}
                        />
                        <TextField
                            label="Email"
                            name="email"
                            value={patient?.email}
                            handleInputChange={handleInput}
                        />
                    </div>
                    <div className={styles.section}>
                        <TextField
                            label="Address"
                            name="address"
                            value={patient?.address}
                            handleInputChange={handleInput}
                        />
                    </div>
                    <div className={styles.section}>
                        <TextField
                            label="Health Insurance Number"
                            inputType="number"
                            name="healthInsuranceNumber"
                            value={patient?.healthInsuranceNumber}
                            handleInputChange={handleInput}
                        />
                    </div>
                    <div className={styles.section}>
                        <TextField
                            label="Start Biography"
                            name="startBiography"
                            value={patient?.startBiography}
                            handleInputChange={handleInput}
                        />
                    </div>
                </div>
            </Form>
        </DashboardLayout>
    );
}
