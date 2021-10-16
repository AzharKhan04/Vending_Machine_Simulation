import './App.css';
import Bottom from './UIComponent/Bottom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import React from 'react';
import ProductContainer from './ProductContainer/ProductContainer';
import ProductSelectedInfo from './ProductSelectedInfo';
import Welcome from './Welcome';
import Header from './Header';

function App() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return ( <
        div className = "App" >
        <
        Welcome > < /Welcome> <
        ProductContainer / >
        <
        Bottom >
        <
        ProductSelectedInfo / >
        <
        /Bottom> <
        /div>
    );
}

export default App;