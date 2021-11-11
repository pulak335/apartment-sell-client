import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import useAuth from './../../hooks/useAuth';
// #fd8980
const Navbar = () => {
    const { user, logout } = useAuth();
    
    const navbtn = {
        padding: '10px',
        border: '1px solid #fd8980',
        color: '#fd8980',
        textDecoration:'none'
    }
    return (
        <div> 
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" style={{background:"#fd8980"}}>
                    <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Apartment Sell
                    </Typography>
                        <Box>
                        <Link style={navbtn} to='/home'>
                            <button style={navbtn}>Home</button>
                        </Link>
                            {user?.email && 
                                <><Link style={navbtn} to='/order'>
                            <button style={navbtn}>My Order</button>
                        </Link>
                        <Link style={navbtn} to='/addreview'>
                            <button style={navbtn}>Add Review</button>
                        </Link></>
                                
                        }
                        <Link style={navbtn} to='/dashboard'>
                        <button style={navbtn}>Dashboard</button>
                        </Link>
                            
                        { user?.email ? <button onClick={logout} style={navbtn} >Log Out</button>
                        :
                        <Link style={navbtn} to='/login'>
                        <button style={navbtn}>Get Started</button>
                        </Link> }
                       
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
};

export default Navbar;