import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const Footer = () => {
    return (
        <Box style={{background:"#373737"}}>
            <Typography sx={{py:2, fontWeight:"bold"}}variant="body1" style={{color:"white"}}>Copyright @2021 Home. All Rights Reserved by Arafat</Typography>
        </Box>
    );
};

export default Footer;