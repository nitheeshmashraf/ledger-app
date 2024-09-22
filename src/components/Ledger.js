// src/components/Ledger.js

import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
    collection,
    addDoc,
    query,
    where,
    onSnapshot,
    deleteDoc,
    doc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import config from "../Config/Config";

import SwipeableTable from "./SwipeableTable";
import TransactionForm  from "./TransactionForm";
import {Collapse, IconButton, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Summary from "./Summary";

const Ledger = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 10);
    const [user] = useAuthState(auth);
    const [transactions, setTransactions] = useState([]);
    const [form, setForm] = useState({
        type: "debit",
        person:"",
        description: "",
        amount: "",
        date: formattedDate,
    });

    useEffect(() => {
        if (!user) return;

        const q = query(
            collection(db, "transactions"),
            where("userId", "==", user.uid)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const trans = [];
            snapshot.forEach((doc) => {
                trans.push({ id: doc.id, ...doc.data() });
            });
            setTransactions(trans);
        });

        return () => unsubscribe();
    }, [user]);

    const handleChange = (e) => {
        if (e.target.name === "type") {
            console.log(e.target.checked)
            const isChecked = e.target.checked;
            setForm({
                ...form,
                type: isChecked ? 'credit' : 'debit',
            });
        }
        else
            setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleAddTransaction = async (e) => {
        e.preventDefault();
        if (!form.description || !form.amount || !form.date) {
            alert("Please fill in all fields");
            return;
        }

        try {
            await addDoc(collection(db, "transactions"), {
                ...form,
                amount: parseFloat(form.amount),
                userId: user.uid,
            });
            setForm({ type: "credit", person:"", description: "", amount: "", date: formattedDate });
        } catch (error) {
            console.log(form)
            console.error("Error adding transaction: ", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "transactions", id));
        } catch (error) {
            console.error("Error deleting transaction: ", error);
        }
    };

    const handleEdit = async (form) => {
        try{
            form.delete('userId');
            setForm(...form);
            console.log(form);
        } catch (error) {
            console.error("Error getting transaction: ", error);
        }
    }

    const credit = transactions
        .filter((t) => t.type === "credit")
        .reduce((acc, curr) => acc + curr.amount, 0);
    const debit = transactions
        .filter((t) => t.type === "debit")
        .reduce((acc, curr) => acc + curr.amount, 0);
    const balance = credit - debit;
    const [isExpandedSummary, setIsExpandedSummary] = useState(true);
    const [isExpandedSwipeableTable, setIsExpandedSwipeableTable] = useState(false);
    const [isExpandedTransactionForm, setIsExpandedTransactionForm] = useState(false);

    const handleToggle = (name) => {
        if(name==="summary") {
            setIsExpandedSummary(!isExpandedSummary);
            setIsExpandedTransactionForm(false);
            setIsExpandedSwipeableTable(false);
        }
        else if(name === "transactionForm") {
            setIsExpandedTransactionForm(!isExpandedTransactionForm);
            setIsExpandedSwipeableTable(false);
            setIsExpandedSummary(false);
        }
        else if(name === "transactionHistory") {
            setIsExpandedSwipeableTable(!isExpandedSwipeableTable);
            setIsExpandedTransactionForm(false);
            setIsExpandedSummary(false)
        }

    };

    return (
        <div style={styles.container}>
            <paper style={{padding: '16px', marginBottom: '16px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography variant="h6">Summary</Typography>
                    <IconButton onClick={()=>handleToggle("summary")}>
                        <ExpandMoreIcon
                            style={{
                                transform: isExpandedSummary ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.3s ease',
                            }}
                        />
                    </IconButton>
                </div>

                <Collapse in={isExpandedSummary}>
                    <Summary credit={credit} debit={debit} balance={balance}/>
                </Collapse>
            </paper>
            <paper style={{padding: '16px', marginBottom: '16px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography variant="h6">New transaction</Typography>
                    <IconButton  onClick={()=>handleToggle("transactionForm")}>
                        <ExpandMoreIcon
                            style={{
                                transform: isExpandedTransactionForm ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.3s ease',
                            }}
                        />
                    </IconButton>
                </div>

                <Collapse in={isExpandedTransactionForm}>
                    <TransactionForm form={form} handleAddTransaction={handleAddTransaction} handleChange={handleChange}/>
                </Collapse>
            </paper>

            <paper style={{padding: '16px', marginBottom: '16px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography variant="h6">Transaction History</Typography>
                    <IconButton onClick={()=>handleToggle("transactionHistory")}>
                        <ExpandMoreIcon
                            style={{
                                transform: isExpandedSwipeableTable ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.3s ease',
                            }}
                        />
                    </IconButton>
                </div>

                <Collapse in={isExpandedSwipeableTable}>
                    <SwipeableTable transactions={transactions} handleDelete={handleDelete} config={config} handleEdit={handleEdit}/>
                </Collapse>
            </paper>

        </div>
    );
};

const styles = {
    tableContainer: {
        maxHeight: '400px', // Adjust as needed
        margin: '20px',
    },
    container: {
        marginTop: "20px",
    },
    summary: {
        display: "flex",
        justifyContent: "space-around",
        marginBottom: "20px",
        flexDirection: "column",
        alignItems: 'flex-end'
    },

    input: {
        padding: "8px",
        fontSize: "16px",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
    },
    deleteButton: {
        padding: "4px 8px",
        color: "white",
        backgroundColor: "red",
        border: "none",
        cursor: "pointer",
    },
};

export default Ledger;
