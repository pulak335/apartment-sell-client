import { Card, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

const team = [
    {
        name: 'Kilin Ward',
        possition: 'CEO',
        img:'https://templates.hibootstrap.com/hemo/default/assets/img/team/team-img1.jpg'
    },
    {
        name: 'Jenifar Ambrina',
        possition: 'Chief Executive',
        img:'https://templates.hibootstrap.com/hemo/default/assets/img/team/team-img4.jpg'
    },
    {
        name: 'Johan Henry',
        possition: 'Managing Director',
        img:'https://templates.hibootstrap.com/hemo/default/assets/img/team/team-img3.jpg'
    }
]

const Teams = () => {
    return (
        <Container sx={{ mt:5 }}>
            <Typography color="#fd8980" variant="h6">OUR TEAM</Typography>
            <Typography variant="h3">Let's Meet Our Expert Team</Typography>
            <Box sx={{ flexGrow: 1,mt:5 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {team.map((team, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component="img"
                                height="300"
                                image={team.img}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                {team.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                {team.possition}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    ))}
                </Grid>
                </Box>
        </Container>
    );
};

export default Teams;