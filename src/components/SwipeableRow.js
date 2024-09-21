import React, { useState } from 'react';
import { TableRow, TableCell, Button, Box } from '@mui/material';
import { useSwipeable } from 'react-swipeable';

const SwipeableRow = ({ transaction, onDelete, isMobile }) => {
    const [offset, setOffset] = useState(0);
    const [showButtons, setSetShowButtons] = useState(100);
    const [swiped, setSwiped] = useState(false);

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
        onTouchMove: (event) => {
            const deltaX = event.deltaX || 0;
            if (deltaX < 0 && !swiped) {
                setOffset(Math.max(deltaX, -100));
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

    return (
        <TableRow
            {...handlers}
            style={{
                transform: `translateX(${offset}px)`,
                transition: 'transform 0.3s ease-in-out',
                position: 'relative',
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
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: 'error.main',
                    color: 'white',
                    padding: '0 16px',
                    width: '100px',
                    transform: `translateX(${showButtons}%)`,
                    transition: 'transform 0.3s ease',
                    zIndex: 1,
                }}
            >
                <Button
                    onClick={handleDelete}
                    color="inherit"
                    sx={{ textTransform: 'none' }}
                >
                    Delete
                </Button>
            </Box>
        </TableRow>
    );
};

export default SwipeableRow;
