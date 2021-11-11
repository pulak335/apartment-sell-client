import Navbar from '../../Components/Navbar/Navbar';
import {  Button, Grid, TextField, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from 'react';
import useAuth from './../../hooks/useAuth';
import { Avatar } from '@mui/material';
import { red } from '@mui/material/colors';
import { Box } from '@mui/system';
import { useHistory } from 'react-router-dom';

const Order = () => {
    const {user} = useAuth()
    const [cart, setCart] = useState([])
    useEffect(() => {
        const url = `https://murmuring-waters-69615.herokuapp.com/order?email=${user.email}`
        fetch(url)
        .then(res => res.json())
        .then(data => setCart(data))
    }, [user.email])
    
    

    const handleDelete=(id) => {
      const uri = `https://murmuring-waters-69615.herokuapp.com/order/${id}`
      fetch(uri,{
          method:'DELETE'
      })
      .then(res=>res.json())
      .then(data=>{
        console.log(data)

        if(data.deletedCount){
            alert('deleted')
            const orderItem = cart.filter(order => order._id !== id)
            setCart(orderItem)
        }
        else {
            alert("Deleted 0 documents.");
          }
      })
    }


    const history = useHistory()
    const date = new Date()
    const handleBookSubmit = (e) => {
          e.preventDefault();
          const shipped={
            ...shipingInfo,total,date
        }
        fetch('https://murmuring-waters-69615.herokuapp.com/shipping',
          {method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(shipped)}
        )
          .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                  history.push('/payment')
              }
          })
      }
          let total = 0;
    for (const price of cart) {
        const perPrice = parseInt(price.property?.price)
        total = total + perPrice;
        }

    const [shipingInfo, setBookingInfo] = useState(user)

        const onHandleBlur=(e)=>{
        const field = e.target.name;
        const value = e.target.value;
        const newBookingInfo = {...shipingInfo}
        newBookingInfo[field]=value;
        setBookingInfo(newBookingInfo)
    }

    
    return (
        <div>
            <Navbar></Navbar>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" sx={{ mt:3}}> My Order Page </Typography>
                <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">email</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.map((row) => (
            <TableRow
                        key={row._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                    <TableCell component="th" scope="row">
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe"><img src={row.property?.img} alt="" srcset="" /></Avatar> 
                    </TableCell>
                    <TableCell align="right">{row.property?.name}</TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{row.property?.price}</TableCell>
                    <TableCell align="right">Panding</TableCell>
                    <TableCell align="right"><Button onClick={()=>handleDelete(row._id)}>Delete</Button></TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
            </TableContainer>
            
            </Grid>
                <Grid item xs={12} md={6}>
                   <Typography variant="h6" sx={{ mt:3}}> Shipping </Typography> 
                <form onSubmit={handleBookSubmit}>
                <Box  sx={{display: 'flex' ,justifyContent: 'center', flexDirection: 'column' }}>
                
                <TextField
                    style={{width:"80%", margin:'5px auto'}}
                    id="outlined-size-small"
                    name="customerName"
                    defaultValue={user.displayName}
                    size="small"
                />
                
                <TextField
                    style={{width:"80%", margin:'5px auto'}}
                    id="outlined-size-small"
                    onBlur={onHandleBlur}
                    name="email"
                    defaultValue={user.email}
                    size="small"
                />
                
                <TextField
                    style={{width:"80%", margin:'5px auto'}}
                    id="outlined-size-small"
                    onBlur={onHandleBlur}
                    name="phone"
                    defaultValue='Phone Number'
                    size="small"
                />
                
                <TextField
                    style={{width:"80%", margin:'5px auto'}}
                    id="outlined-size-small"
                    onBlur={onHandleBlur}
                    name="address"
                    defaultValue= 'ShippingAddress'
                    size="small"
                />
                
                <TextField
                    disabled
                    style={{width:"80%", margin:'5px auto'}}
                    id="outlined-size-small"
                    name="orderDate"
                    onBlur={onHandleBlur}
                    defaultValue= {date.toDateString()}
                    size="small"
                    />
                            
                <TextField
                    disabled
                    style={{width:"80%", margin:'5px auto'}}
                    id="outlined-size-small"
                    name="price"
                    onBlur={onHandleBlur}
                    defaultValue= {`Total Bill:${total}`}
                    size="small"
                />
                
                <Button type='submit' sx={{px:3, ml:5}} variant="contained" >Confirm Order</Button>
                </Box>
            </form>
            </Grid>
            </Grid>
            
        </div>
    );
};

export default Order;