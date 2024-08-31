import React, { useState } from 'react';
import './sendSoal.css'
const SoalSendingComponent = () => {
    const [amount, setAmount] = useState(40.00);
    const [message, setMessage] = useState('');

    function sendSoal(e: React.FormEvent) {
        e.preventDefault();
    }

    return (
        <div className="">
            <div >$ {amount.toFixed(2)} Sol</div>
            <input type="text" placeholder="add you message" onChange={(e) => setMessage(e.target.value)} />
            <input
                type="range"
                min="0"
                max="100"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full"
            />

            <button onClick={sendSoal}>
                Send Soal
            </button>
        </div>
    );
};

export default SoalSendingComponent;