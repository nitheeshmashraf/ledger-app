import config from "../Config/Config";
import React from "react";
import { Table, TableBody, TableCell, TableRow, TableContainer, Paper } from '@mui/material';

const Summary = ({credit, debit, balance})=>{
    return (<TableContainer component={Paper} style={{ marginBottom: '16px' }}>
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell variant="head">Credit</TableCell>
                    <TableCell align="right">
                        {config.currency} {credit.toFixed(2)}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell variant="head">Debit</TableCell>
                    <TableCell align="right">
                        {config.currency} {debit.toFixed(2)}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell variant="head">Balance</TableCell>
                    <TableCell align="right">
                        {config.currency} {balance.toFixed(2)}
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>);
}

export default Summary;