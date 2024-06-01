import Form from '@/components/core/Form';
import DashboardLayout from '@/layouts/DashboardLayout';
import TextField from '@/components/core/TextField';
import styles from './BookAppointment.module.scss';
import Dropdown from '@/components/core/Dropdown';
import { useLocation, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function BookAppointment() {
    const navigate = useNavigate();
    const location = useLocation();
    const [appointment, setAppointment] = useState({
        patient_name: '',
        patient_mobile: '',
        patient_email: '',
        patient_address: '',
        patient_dob: '',
        dateOfAppointment: '',
        fromTime: '',
        toTime: '',
        doctor_id: '',
        treatment: '',
        note: '',
    });

    useEffect(() => {
        const appointment_id = location.state?.appointment_id;
        if (appointment_id) {
            const data = {
                action: 'get',
                id: appointment_id,
            };
            axios.post('http://localhost:8000/api/appointments/', data).then((response) => {
                setAppointment(response.data);
            });
        }
    }, []);

    const handleInput = (e: any) => {
        console.log(e.target.name);
        console.log(e.target.value);
        setAppointment((appointment) => ({
            ...appointment,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = () => {
        const action = location.state?.appointment_id ? 'update' : 'add';
        const data = {
            action: action,
            appointment: appointment,
        };

        if (!appointment.doctor_id || appointment.doctor_id === '0') {
            alert('Please select a doctor');
            return;
        }
        console.log(data);

        axios.post('http://localhost:8000/api/appointments/', data).then((response) => {
            if (response.status === 200) {
                alert('Cập nhật thành công!!');
                navigate('/appointments');
            }
        });
    };
    return (
        <DashboardLayout>
            <Form title="Patient Detail" haveButtons={false}>
                <div>
                    <div className={styles.section}>
                        <TextField
                            label="Name"
                            name="patient_name"
                            value={appointment?.patient_name}
                            handleInputChange={handleInput}
                        />
                        <TextField
                            label="Date of Birth"
                            inputType="date"
                            name="patient_dob"
                            value={appointment?.patient_dob}
                            handleInputChange={handleInput}
                        />
                    </div>
                    <div className={styles.section}>
                        <TextField
                            label="Mobile"
                            name="patient_mobile"
                            value={appointment?.patient_mobile}
                            handleInputChange={handleInput}
                        />
                        <TextField
                            label="Email"
                            name="patient_email"
                            value={appointment?.patient_email}
                            handleInputChange={handleInput}
                        />
                    </div>
                    <div className={styles.section}>
                        <TextField
                            label="Address"
                            name="patient_address"
                            value={appointment?.patient_address}
                            handleInputChange={handleInput}
                        />
                    </div>
                </div>
            </Form>
            <Form title="Appointment Detail" className={styles.form} handleSubmit={handleSubmit}>
                <div>
                    <div className={styles.section}>
                        <TextField
                            label="Date of appointment"
                            inputType="date"
                            name="dateOfAppointment"
                            value={appointment?.dateOfAppointment}
                            handleInputChange={handleInput}
                        />
                        <TextField
                            label="From"
                            inputType="time"
                            name="fromTime"
                            value={appointment?.fromTime}
                            handleInputChange={handleInput}
                        />
                        <TextField
                            label="To"
                            inputType="time"
                            name="toTime"
                            value={appointment?.toTime}
                            handleInputChange={handleInput}
                        />
                    </div>
                    <div className={styles.section}>
                        <Dropdown
                            name="doctor_id"
                            value={appointment?.doctor_id}
                            type="doctors"
                            handleInputChange={handleInput}
                        />
                        <TextField
                            label="Treatment"
                            name="treatment"
                            value={appointment?.treatment}
                            handleInputChange={handleInput}
                        />
                    </div>
                    <div className={styles.section}>
                        <TextField
                            label="Note"
                            name="note"
                            value={appointment?.note}
                            handleInputChange={handleInput}
                        />
                    </div>
                </div>
            </Form>
        </DashboardLayout>
    );
}
