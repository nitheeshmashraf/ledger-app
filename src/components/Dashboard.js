// src/components/Dashboard.js

import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import Ledger from "./Ledger";
import {Button, IconButton} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

const Dashboard = () => {
    const [user] = useAuthState(auth);

    const handleSignOut = () => {
        signOut(auth);
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1>Welcome, {user.displayName}</h1>
                <IconButton onClick={handleSignOut} color="primary">
                    <LogoutIcon />
                </IconButton>
            </header>
            <Ledger />
        </div>
    );
};

const styles = {
    container: {
        padding: "20px",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    button: {
        padding: "8px",
        cursor: "pointer",
    },
};

export default Dashboard;
