import UserIcon from './userIcons';
import styles from '../style/participants.module.css';

type PremiumUserProp = {
    message: string;
    soalQuantity: number;
};

type UsersProp = {
    primeUsers: { [username: string]: PremiumUserProp };
    users: Set<string>;
    handleGetUser: (username: string) => void;
}

const primeColors = ['#D32F2F', '#7B1FA2', '#1976D2', '#388E3C', '#FFA000', '#E64A19', '#5D4037', '#455A64'];
const regularColors = ['#FFCDD2', '#E1BEE7', '#BBDEFB', '#C8E6C9', '#FFECB3', '#FFCCBC', '#D7CCC8', '#CFD8DC'];

export default function Users({ primeUsers, users, handleGetUser }: UsersProp) {
    return (
        <div className={styles.container}>
            <div className={styles.userGrid}>
                {/* Prime Users */}
                {Object.entries(primeUsers).map(([username, data], index) => (
                    <div key={`prime-${username}`} className={styles.userItem} onClick={() => handleGetUser(username)}>
                        <UserIcon
                            name={username}
                            message={data.message}
                            isPrime={true}
                            color={primeColors[index % primeColors.length]}
                            soalQuantity={data.soalQuantity}
                        />
                        <span className={styles.userName}>{username}</span>
                    </div>
                ))}

                {/* Regular Users */}
                {Array.from(users).map((username, index) => (
                    <div
                        key={`regular-${username}`}
                        className={styles.userItem}
                    >
                        <UserIcon
                            name={username}
                            isPrime={false}
                            color={regularColors[index % regularColors.length]}
                        />
                        <span className={styles.userName}>{username}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}