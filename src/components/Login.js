// src/components/Login.js

import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, provider);
            navigate("/");
        } catch (error) {
            console.error("Error signing in with Google", error);
        }
    };

    return (
        <div style={styles.container}>
            <h2>React Ledger App</h2>
            <button onClick={signInWithGoogle} style={styles.button}>
                Sign in with Google
            </button>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
    },
    button: {
        padding: "10px 20px",
        fontSize: "16px",
        cursor: "pointer",
    },
};

export default Login;
