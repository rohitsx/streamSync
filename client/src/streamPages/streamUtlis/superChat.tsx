import { useState } from 'react';
import styles from '../style/participants.module.css';

type ParticipantMessage = {
    username: string;
    message: string;
    soalQuantity: number;
};

const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
        return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name[0].toUpperCase();
};

const premiumColors = ['#D32F2F', '#7B1FA2', '#1976D2', '#388E3C', '#FFA000', '#E64A19', '#5D4037', '#455A64'];
const regularColors = ['#FFCDD2', '#E1BEE7', '#BBDEFB', '#C8E6C9', '#FFECB3', '#FFCCBC', '#D7CCC8', '#CFD8DC'];

const UserIcon = ({ name, isPremium, message, color, soalQuantity }: { name: string; isPremium: boolean; message?: string; color: string, soalQuantity?: number; }) => {
    const [showFullMessage, setShowFullMessage] = useState(false);

    const handleMouseEnter = () => setShowFullMessage(true);
    const handleMouseLeave = () => setShowFullMessage(false);

    return (
        <div
            className={`${styles.userIcon} ${isPremium ? styles.premiumIcon : ''}`}
            style={{ backgroundColor: color }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {isPremium && message ? (
                <>
                    <span className={styles.messagePreview}>{message.substring(0, 2)}</span>
                    {showFullMessage && (
                        <div className={styles.fullMessageTooltip}>
                            <p>{message}</p>
                            <p>${soalQuantity?.toFixed(2)}</p>
                        </div>
                    )}
                </>
            ) : (
                getInitials(name)
            )}
        </div>
    );
};

const SuperChat = ({ premiumUsers, users, handelgetuser }: {
    premiumUsers: Map<string, ParticipantMessage>;
    users: Set<string>;
    handelgetuser: (username: string) => void;
}) => {
    return (
        <div className={styles.container}>
            <div className={styles.userGrid}>
                {/* Premium Users */}
                {Array.from(premiumUsers.entries()).map(([username, data], index) => (
                    <div
                        key={`premium-${index}`}
                        className={styles.userItem}
                        onClick={() => handelgetuser(username)}
                    >
                        <UserIcon
                            name={username}
                            isPremium={true}
                            message={data.message}
                            color={premiumColors[index % premiumColors.length]}
                            soalQuantity={data.soalQuantity}
                        />
                        <span className={styles.userName}>{username}</span>
                    </div>
                ))}

                {/* Regular Users */}
                {Array.from(users).map((username, index) => (
                    <div
                        key={`regular-${index}`}
                        className={styles.userItem}
                        onClick={() => handelgetuser(username)}
                    >
                        <UserIcon
                            name={username}
                            isPremium={false}
                            color={regularColors[index % regularColors.length]}
                        />
                        <span className={styles.userName}>{username}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SuperChat;