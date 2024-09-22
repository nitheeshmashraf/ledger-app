import React from 'react';
import { Table, TableHead, TableBody, TableContainer, TableRow, TableCell, Paper, useMediaQuery } from '@mui/material';
import SwipeableRow from './SwipeableRow'; // Import the swipeable row component
import { useTheme } from '@mui/material/styles';

const SwipeableTable = ({ transactions, handleDelete, handleEdit }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // For mobile screens

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {!isMobile && <TableCell>Date</TableCell>}
                        <TableCell>Type</TableCell>
                        <TableCell>Person</TableCell>
                        {!isMobile && <TableCell>Description</TableCell>}
                        <TableCell style={{ textAlign: 'right' }}>Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.map((t) => (
                        <SwipeableRow
                            key={t.id}
                            transaction={t}
                            onDelete={handleDelete}
                            isMobile={isMobile} // Pass isMobile as a prop to control view
                            handleEdit = {handleEdit}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SwipeableTable;
