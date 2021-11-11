import React,{useEffect,useState} from 'react';
import { Card, CardActionArea, Container, Grid, Typography } from '@mui/material';
import  CardMedia  from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Rating from 'react-rating';

const Review = () => {
    const [reviews, setReviews] = useState([]);

        useEffect(() => {
        const url ='https://murmuring-waters-69615.herokuapp.com/review'
        fetch(url)
            .then(res => res.json())
            .then(data => setReviews(data))
        }, [])
    return (
    
        <Container sx={{ mt:5}}>
            <Typography variant='h6' color="#fd8980">TESTIMONIALS</Typography>
            <Typography sx={{mb:5}} variant='h3'>Our Clients Reviews</Typography>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {reviews.slice(0, 6).map((review) => (
                <Grid item xs={2} sm={4} md={4} key={review._id}>
                        <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                            component="img"
                            height="200"
                            width="200"   
                            sx={{ borderRadius: '80px' }}
                            image={review.img}
                            alt="green iguana"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {review.name}
                                </Typography>
                                <Rating
                                emptySymbol="far fa-star"
                                fullSymbol="fas fa-star"
                                readonly
                                initialRating={review.rate}
                                />
                                <Typography variant="body2" color="text.secondary">
                                {review.details}
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        </Card>
                </Grid>
            ))}
            </Grid>
            </Container>
    );
};

export default Review;