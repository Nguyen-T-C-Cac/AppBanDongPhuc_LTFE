import React, { useState } from "react";
import "../../styles/bank.css"

export interface BankAccount {
    id: number;
    bankName: string;
    accountNumber: string;
    accountName: string;
}

interface Props {
    accounts: BankAccount[];
    onAdd: (acc: BankAccount) => void;
}

const BANK_LIST = [
    "BIDV",
    "MB Bank",
    "Vietcombank",
    "VietinBank",
    "Techcombank",
    "ACB",
    "Sacombank"
];

const BankAccountSelector: React.FC<Props> = ({ accounts, onAdd }) => {
    const [showModal, setShowModal] = useState(false);

    const [form, setForm] = useState({
        bankName: "",
        accountNumber: "",
        accountName: ""
    });

    const handleSubmit = () => {
        if (!form.bankName || !form.accountNumber || !form.accountName) {
            alert("Please fill all fields");
            return;
        }

        onAdd({
            id: Date.now(),
            ...form
        });

        setForm({ bankName: "", accountNumber: "", accountName: "" });
        setShowModal(false);
    };

    return (
        <div className="bank-selector">
            <b>Bank Accounts</b>

            {/* LIST ACCOUNT */}
            {accounts.map(acc => (
                <div key={acc.id} className="bank-item">
                    <p><b>{acc.bankName}</b></p>
                    <p>{acc.accountNumber}</p>
                    <p>{acc.accountName}</p>
                </div>
            ))}

            {/* ADD BUTTON */}
            <button
                className="add-bank-btn"
                onClick={() => setShowModal(true)}
            >
                + Add new bank account
            </button>

            {/* MODAL OVERLAY */}
            {showModal && (
                <div className="bank-modal-overlay">
                    <div className="bank-modal">
                        <div className="modal-header">
                            <b>Add Bank Account</b>
                            <span
                                className="close-btn"
                                onClick={() => setShowModal(false)}
                            >✕</span>
                        </div>

                        {/* SELECT BANK */}
                        <select
                            value={form.bankName}
                            onChange={e =>
                                setForm({ ...form, bankName: e.target.value })
                            }
                        >
                            <option value="">-- Select Bank --</option>
                            {BANK_LIST.map(bank => (
                                <option key={bank} value={bank}>
                                    {bank}
                                </option>
                            ))}
                        </select>

                        <input
                            placeholder="Account Number"
                            value={form.accountNumber}
                            onChange={e =>
                                setForm({ ...form, accountNumber: e.target.value })
                            }
                        />

                        <input
                            placeholder="Account Name"
                            value={form.accountName}
                            onChange={e =>
                                setForm({ ...form, accountName: e.target.value })
                            }
                        />

                        <button className="save-btn" onClick={handleSubmit}>
                            Save
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BankAccountSelector;
