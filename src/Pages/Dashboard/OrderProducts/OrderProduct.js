import React,{useEffect,useState} from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import { Table, TableContainer } from '@mui/material';
import  Paper  from '@mui/material/Paper';
import TableBody from '@mui/material/TableBody';

const OrderProduct = () => {

        const [order, setOrder] = useState([]);

        useEffect(() => {
        const url ='https://murmuring-waters-69615.herokuapp.com/shipping'
        fetch(url)
            .then(res => res.json())
            .then(data => setOrder(data))
        }, [])
    return (
        <div>
            <h2>Total Orders: {order.length}</h2>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>custmer Name</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Phone</TableCell>
                        <TableCell align="right">Date</TableCell>
                        <TableCell align="right">Address</TableCell>
                        <TableCell align="right">Bill</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {order.map((row) => (
                        <TableRow
                        key={row._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.displayName}
                        </TableCell>
                        <TableCell align="right">
                            {row.email}
                        </TableCell>
                        <TableCell align="right">{row.phoneNumbe}</TableCell>
                        <TableCell align="right">{row.date}</TableCell>
                        <TableCell align="right">{row.adress}</TableCell>
                        <TableCell align="right">$ {row.total}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
        </div>
    );
};

export default OrderProduct;