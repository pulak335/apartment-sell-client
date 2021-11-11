import { Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import useAuth from './../../hooks/useAuth';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const ProductHome = () => {
    const [properteis, setProperty] = useState([]);
    const {user} = useAuth()
    const history = useHistory()

        useEffect(() => {
        const url ='https://murmuring-waters-69615.herokuapp.com/properety'
        fetch(url)
            .then(res => res.json())
            .then(data => setProperty(data))
        }, [])
    
        const handlePropertyCart = (property) => {
        const cart = { property, email: user?.email }
        axios.post('https://murmuring-waters-69615.herokuapp.com/order', cart )
        .then((res)=> {
                console.log(res.data)
                history.push('/order')           
          })
        console.log( cart)
    }
    return (
        <Container>
            <Typography color="#fd8980" variant="h6">OUR PROPERTY</Typography>
            <Typography variant="h3">Our Property and Its Availabilities <br /> and All Other Details</Typography>
                <Box sx={{ my:5, flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {properteis.slice(0, 6).map((property) => (
                    <Grid item xs={12} sm={6} md={4} key={property._id}>
                        <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                component="img"
                                alt="green iguana"
                                height="200"
                                image={property.img}
                                />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            {property.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            {property.details}
                            </Typography>
                            <Typography sx={{fontWieght:'bold'}} variant="h4" color="text.secondary">
                            $ {property.price}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button  onClick={() => handlePropertyCart(property)} style={{padding: '10px',border: '0px solid #fd8980', color: '#fd8980',textDecoration:'none'}} size="small">ADD TO CART</Button>
                        </CardActions>
                        </Card>
                    </Grid>
                    ))}
                </Grid>
            </Box>
            <Link style={{ marginTop: '25px', padding: '10px', border: '1px solid #fd8980', color: '#fd8980', textDecoration: 'none' }} to='/properties'><button style={{ padding: '10px', border: '0px solid #fd8980', color: '#fd8980', textDecoration: 'none' }}> More Product</button></Link>
            
        </Container>
    );
};

export default ProductHome;