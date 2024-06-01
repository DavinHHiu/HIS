import BookAppointment from '@/pages/BookAppointment';
import AddDoctor from '@/pages/AddDoctors';
import AddPatient from '@/pages/AddPatient';
import Appointments from '@/pages/Appointments';
import Dashboard from '@/pages/Dashboard';
import Doctors from '@/pages/Doctors';
import Patients from '@/pages/Patients';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />}></Route>
                <Route path="/patients" element={<Patients />}></Route>
                <Route path="/doctors" element={<Doctors />}></Route>
                <Route path="/appointments" element={<Appointments />}></Route>
                <Route path="/dashboard" element={<Dashboard />}></Route>
                <Route path="/patient" element={<AddPatient />}></Route>
                <Route path="/doctor" element={<AddDoctor />}></Route>
                <Route path="/appointment" element={<BookAppointment />}></Route>
            </Routes>
        </BrowserRouter>
    );
}
