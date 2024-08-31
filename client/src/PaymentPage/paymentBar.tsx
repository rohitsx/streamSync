import React, { useState } from 'react';
const SoalSendingComponent = () => {
    const [amount, setAmount] = useState(40.00);
    const [message, setMessage] = useState('');

    function sendSoal(e: React.FormEvent) {
        e.preventDefault();

        console.log({ amount, message });
    }

    return (
        <div className="soal-sending-component">
            <div className="soal-amount">$ {amount.toFixed(2)} Sol</div>
            <input
                type="text"
                placeholder="Add your message"
                onChange={(e) => setMessage(e.target.value)}
                className="soal-message-input"
            />
            <input
                type="range"
                min="0"
                max="100"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="soal-amount-range"
            />
            <button onClick={sendSoal} className="send-soal-button">Send Soal</button>
        </div>

    );
};

export default SoalSendingComponent;