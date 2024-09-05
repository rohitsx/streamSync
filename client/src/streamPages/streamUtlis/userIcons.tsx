import { useState } from "react";
import styles from '../style/participants.module.css';

const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
        console.log(names[0][0], names[names.length - 1][0]);

        return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name[0].toUpperCase();
};

export default function UserIcon({ name, isPrime, message, color, soalQuantity }: { name: string; isPrime: boolean; message?: string; color: string, soalQuantity?: number; }) {
    const [showFullMessage, setShowFullMessage] = useState(false);

    const handleMouseEnter = () => setShowFullMessage(true);
    const handleMouseLeave = () => setShowFullMessage(false);

    console.log(name, isPrime,message, soalQuantity);
    

    return (
        <div
            className={`${styles.userIcon} ${isPrime ? styles.premiumIcon : ''}`}
            style={{ backgroundColor: color }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {isPrime && message ? (
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
}