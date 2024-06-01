import { Link } from 'react-router-dom';
import Button from './Button';
import styles from './Table.module.scss';
import axios from 'axios';

interface TableProps {
    title?: string;
    tableHeader?: any;
    tableRows?: any;
    to?: string;
    type?: string;
    handleEdit?: (id: any) => void;
    handleDelete?: (id: any) => void;
}

export default function Table({
    title,
    tableHeader,
    tableRows,
    to,
    type,
    handleEdit,
    handleDelete,
}: TableProps) {
    return (
        <div className={styles.container}>
            <div className={styles.title_container}>
                <div className={styles.title}>{title}</div>
                <Button children={'Add'} as={Link} to={to} />
            </div>
            <table className={styles.table}>
                <thead className={styles.thead}>
                    <tr className={styles.trhead}>
                        {tableHeader.map((headerItem: any, index: any) => (
                            <th className={styles.tcell} key={index}>
                                {headerItem}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className={styles.tbody}>
                    {tableRows.map((item: any, index: any) => (
                        <tr className={styles.trbody} key={index}>
                            <td className={styles.tcell}>{item?.id}</td>
                            {item?.patient_name && (
                                <td className={styles.tcell}>{item?.patient_name}</td>
                            )}
                            {item?.consulting_doctor && (
                                <td className={styles.tcell}>{item?.consulting_doctor}</td>
                            )}
                            {item?.treatment && <td className={styles.tcell}>{item?.treatment}</td>}
                            {item?.name && <td className={styles.tcell}>{item?.name}</td>}
                            {item?.dateOfBirth && (
                                <td className={styles.tcell}>{item?.dateOfBirth}</td>
                            )}
                            <td className={styles.tcell}>{item?.mobile || item?.patient_mobile}</td>
                            <td className={styles.tcell}>{item?.email || item?.patient_email}</td>
                            {item?.specializeIn && (
                                <td className={styles.tcell}>{item?.specializeIn}</td>
                            )}
                            {item?.dateOfAppointment && (
                                <td className={styles.tcell}>{item?.dateOfAppointment}</td>
                            )}
                            {item?.fromTime && <td className={styles.tcell}>{item?.fromTime}</td>}
                            <div className={styles.button_container}>
                                <Button
                                    color="warning"
                                    className={styles.button}
                                    onClick={() => handleEdit && handleEdit(item.id)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    color="danger"
                                    className={styles.button}
                                    onClick={() => handleDelete && handleDelete(item.id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
