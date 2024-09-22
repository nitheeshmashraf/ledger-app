import React, { useState } from 'react';
import { TableRow, TableCell, Button, Box } from '@mui/material';
import { useSwipeable } from 'react-swipeable';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const SwipeableRow = ({ transaction, onDelete, isMobile, handleEdit }) => {
    const [offset, setOffset] = useState(0);
    const [showButtons, setSetShowButtons] = useState(100);
    const [swiped, setSwiped] = useState(false);
    let lastTap = 0;
    const handlers = useSwipeable({
        onSwipedLeft: (eventData) => {
            console.log(eventData.absX)
            if (eventData.absX > 100) {
                setSwiped(true);
                setOffset(-132);
            }
        },
        onSwipedRight: (eventData) => {
            if (swiped) {
                setSwiped(false);
                setOffset(0);
                setSetShowButtons(100)
            }
        },

        preventDefaultTouchmoveEvent: true,
        trackMouse: true,
    });

    const handleDelete = () => {
        onDelete(transaction.id);
        setSwiped(false);
        setOffset(0);
    };

    const onEdit = ()=>{
        handleEdit(transaction)
        console.log(transaction)
    }

    return (
        <TableRow
            {...handlers}
            style={{
                transform: `translateX(${offset}px)`,
                transition: 'transform 0.3s ease-in-out',
                position: 'relative',
                overflow:"hidden"

            }}
        >
            {!isMobile && <TableCell>{transaction.date}</TableCell>}
            <TableCell>{transaction.type}</TableCell>
            <TableCell>{transaction.person}</TableCell>
            {!isMobile && <TableCell>{transaction.description}</TableCell>}
            <TableCell style={{ textAlign: 'right' }}>
                {transaction.amount.toFixed(2)}
            </TableCell>

            {/* Delete option */}
            <Box
                component="div"
                sx={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    bottom: 0,
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    backgroundColor: '#e0e6e9',
                    padding: '0 16px',
                    width: '100px',
                    transform: `translateX(${showButtons}%)`,
                    transition: 'transform 0.3s ease',
                    zIndex: 1
                }}
            >
                    <DeleteIcon sx={{color:'error.main'}}  onClick={handleDelete} />
                    <EditIcon sx={{color:'#6c8763'}} onClick={onEdit}/>
            </Box>
        </TableRow>
    );
};

export default SwipeableRow;
