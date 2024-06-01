import React, { useEffect, useState } from 'react';
import styles from './Dropdown.module.scss';
import axios from 'axios';

interface DropdownProps {
    name?: string;
    value?: string;
    type?: string;
    handleInputChange?: (e: any) => void;
}

const Dropdown = ({ name, value, type, handleInputChange }: DropdownProps) => {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        if (type) {
            axios.get(`http://localhost:8000/api/${type}/`).then((response) => {
                if (response.status === 200) {
                    setOptions(response.data);
                }
            });
        }
    }, []);

    return (
        <div className={styles.container}>
            <label className={styles.label}></label>
            <select className={styles.dropdown} name={name} onChange={handleInputChange} required>
                <option className={styles.option} value={0}>
                    Select doctor
                </option>
                {options.map((option: any) => (
                    <option value={option?.id} selected={option?.id === value}>
                        {option?.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;
