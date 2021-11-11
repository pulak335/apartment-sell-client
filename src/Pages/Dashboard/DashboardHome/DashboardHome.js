import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

const DashboardHome = () => {
    const [properteis, setProperty] = useState([]);

        useEffect(() => {
        const url ='https://murmuring-waters-69615.herokuapp.com/properety'
        fetch(url)
            .then(res => res.json())
            .then(data => setProperty(data))
        }, [])
    
    
    const handleDelete=(id) => {
      const uri = `https://murmuring-waters-69615.herokuapp.com/properety/${id}`
      fetch(uri,{
          method:'DELETE'
      })
      .then(res=>res.json())
      .then(data=>{

        if(data.deletedCount){
            alert('deleted')
            const properteisItem = properteis.filter(property => property._id !== id)
            setProperty(properteisItem)
        }
        else {
            alert("Deleted 0 documents.");
          }
      })
    }

    return (
        <div>
            <h2>Total Products: {properteis.length}</h2>
            
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Product Name</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {properteis.map((row) => (
                        <TableRow
                        key={row._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell align="right">{row.price}</TableCell>
                        <TableCell align="right"><Button onClick={()=>handleDelete(row._id)}>Delete</Button></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
        </div>
    );
};

export default DashboardHome;