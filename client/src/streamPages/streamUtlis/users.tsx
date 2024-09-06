import { useMemo } from 'react';
import UserIcon from './userIcons';
import styles from '../style/participants.module.css';

type UsersProp = {
    users: { value: string, score: number }[] | undefined;
    handleGetUser: (username: string) => void;
}



const primeColors = ['#D32F2F', '#7B1FA2', '#1976D2', '#388E3C', '#FFA000', '#E64A19', '#5D4037', '#455A64'];
const regularColors = ['#FFCDD2', '#E1BEE7', '#BBDEFB', '#C8E6C9', '#FFECB3', '#FFCCBC', '#D7CCC8', '#CFD8DC'];

export default function Users({ users, handleGetUser }: UsersProp) {
    const parseValue = (value: string) => {
        try {
            return JSON.parse(value);
        } catch {
            return { username: value, message: null };
        }
    };

    const updatedUsers = useMemo(() => {
        return users?.map((user) => ({
            value: parseValue(user.value),
            score: user.score
        }));
    }, [users]);

    return (
        <div className={styles.container}>
            <div className={styles.userGrid}>
                {updatedUsers?.map(({ value, score }, index) => (
                    <div
                        key={value.username}
                        className={styles.userItem}
                        onClick={() => handleGetUser(value.username)}
                    >
                        <UserIcon
                            name={value.username}
                            message={value.message}
                            isPrime={score > 0}
                            color={score > 0
                                ? primeColors[index % primeColors.length]
                                : regularColors[index % regularColors.length]}
                            soalQuantity={score}
                        />
                        <span className={styles.userName}>{value.username}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}