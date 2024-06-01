import styles from './TextField.module.scss';

interface TextFieldProps {
    name?: string;
    value?: string;
    inputType?: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
    handleInputChange: (e: any) => void;
    step?: string;
    min?: string;
    max?: string;
}

export default function TextField({
    name = '',
    value = '',
    inputType = 'text',
    label = 'Label',
    placeholder = '',
    required = true,
    handleInputChange,
    step = '',
    min = '',
    max = '',
}: TextFieldProps) {
    return (
        <div className={styles.container}>
            <label className={styles.label}>
                {label}
                {required ? <span className={styles.required}>*</span> : <></>}
            </label>
            <input
                name={name}
                value={value}
                className={styles.textField}
                type={inputType}
                placeholder={placeholder}
                step={step}
                min={min}
                max={max}
                onChange={handleInputChange}
            />
        </div>
    );
}
