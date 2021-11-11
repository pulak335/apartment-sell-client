import { Card, CardActions, Grid, Typography, CardContent, Button, Container } from '@mui/material';
import React,{useState,useEffect} from 'react';
import CardMedia from '@mui/material/CardMedia';
import Navbar from '../../Components/Navbar/Navbar';
import useAuth from './../../hooks/useAuth';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Product = () => {

    const history = useHistory()

    const [properteis, setProperty] = useState([]);
    const {user} = useAuth()

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
        <>
            <Navbar></Navbar>
            <Container sx={{ mt:3}}>
            <Typography variant="h4">All Property</Typography>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {properteis.map((property) => (
                <Grid item xs={2} sm={4} md={4} key={property._id}>
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
                <Button style={{padding: '10px',border: '0px solid #fd8980', color: '#fd8980',textDecoration:'none'}} size="small" onClick={()=>handlePropertyCart(property)}>ADD TO CART</Button>
            </CardActions>
            </Card>
                </Grid>
            ))}
            </Grid>

        </Container>
        </>
    );
};

export default Product;