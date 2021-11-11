import { Button, Container, Grid, Typography } from '@mui/material';
import React from 'react';

const Cover = () => {
    return (
        <Grid container spacing={2}>
        <Grid item xs={12} md={6} sx={{my:10}} style={{padding:'10px',textAlign:'left'}}>
            <Container>
            <Typography style={{color:'#fd8980'}} variant='h6'>WELCOME TO US</Typography>
            <Typography variant='h2' sx={{fontWeight: 'bold' }}>Find Your Dream Home Easily</Typography>
            <Typography sx={{my:5}} variant='h6' color="#545454">We are one of the best service & property providers in the global market. We are effective.</Typography>
            <Button sx={{px:3}} style={{border:'1px solid #fd8980',color:'#fd8980'}}>Get Started</Button>
            </Container>
        </Grid>
        <Grid item xs={12} md={6}>
            <img style={{width:'100%', marginTop:'10px'}} src="https://i.ibb.co/h7jTLjP/site-cover.png" alt="" />
        </Grid>
        </Grid>
    );
};

export default Cover;