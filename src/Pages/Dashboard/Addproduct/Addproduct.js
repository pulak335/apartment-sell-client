import { Container, Typography } from '@mui/material';
import React from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';

const Addproduct = () => {

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

        axios.post('https://murmuring-waters-69615.herokuapp.com/properety', data )
        .then((res)=> {
            if(res.data.insertedId){
                alert('data insert success !')
                reset()
            }

            
          })
    }
    return (
        <Container sx={{mt:4}}>
            <Typography sx={{mb:4}} variant='h3'>Add Products</Typography>
            <form style={formStyle} onSubmit={handleSubmit(onSubmit)}>
                <input style={inputStyle} {...register("name")} type="text" placeholder="Property Name"/>
                <textarea style={inputStyle} rows='3' className="mt-3" {...register("details")} type="text" placeholder="Property Details"/>
                <input style={inputStyle} {...register("price")} type="number" placeholder="Property Price"/>
                <input style={inputStyle} {...register("img")} type="text" placeholder="Image url"/>
                
                <button style={inputStyle} value="Add Product" type="submit"> Add Product </button>
            </form>
        </Container>
    );
};

export default Addproduct;