import { Container, Typography } from '@mui/material';
import React from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import Navbar from '../../Components/Navbar/Navbar';

const AddReview = () => {

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        rowGap: '20px'
    }
    const inputStyle = {
        border: '1px solid #fd8980',
        color: '#fd8980',
        padding: '10px',
        fontWeight:'bold'
    }

    const { register, handleSubmit,reset } = useForm();
        const onSubmit = (data) => {
        console.log(data)

        axios.post('https://murmuring-waters-69615.herokuapp.com/review', data )
        .then((res)=> {
            if(res.data.insertedId){
                alert('data insert success !')
                reset()
            }

            
          })
    }
    return (
        <>
        <Navbar></Navbar>
        <Container sx={{mt:4}}>
            <Typography sx={{mb:4}} variant='h3'>Give your Feedback</Typography>
            <form style={formStyle} onSubmit={handleSubmit(onSubmit)}>
                <input style={inputStyle} {...register("name")} type="text" placeholder="Your Name" />
                
                <textarea style={inputStyle} rows='3' className="mt-3" {...register("details")} type="text" placeholder="Write Feedback"/>
                <input style={inputStyle} {...register("rate")} type="number" placeholder="Rate 1 to 5"/>
                
                <input style={inputStyle} {...register("img")} type="text" placeholder="Your Image url"/>
                
                <button style={inputStyle} value="Add Product" type="submit"> Add Review </button>
            </form>
        </Container>
        </>
    );
};

export default AddReview;
