import React from "react";
import {
    FormControlLabel,
    Switch,
    TextField,
    Button,
} from '@mui/material';
const TransactionForm =({handleAddTransaction,handleChange, form})=> {


return (
    <form onSubmit={handleAddTransaction} style={styles.form}>
    <FormControlLabel
        control={
            <Switch
                name="type"
                checked={form.type === 'credit'}
                onChange={handleChange}
                color="primary"
            />
        }
        label={form.type.charAt(0).toUpperCase() + form.type.slice(1)}
    />
    <TextField
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        margin="normal"
        InputLabelProps={{shrink: true}}
    />
    <TextField
        name="person"
        value={form.person}
        onChange={handleChange}
        placeholder="Person"
        variant="outlined"
        fullWidth
        margin="normal"
    />
    <TextField
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        variant="outlined"
        fullWidth
        margin="normal"
    />
    <TextField
        name="amount"
        type="number"
        value={form.amount}
        onChange={handleChange}
        placeholder="Amount"
        variant="outlined"
        fullWidth
        margin="normal"
    />
    <Button type="submit" variant="contained" color="primary" style={styles.button}>
        Add
    </Button>
</form>);};

const styles = {

    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px', // Space between items
        padding: '16px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        alignItems: 'flex-end',
        marginBottom: '20px'

    },
    button: {
        marginTop: '16px',
    },

};
export default  TransactionForm;