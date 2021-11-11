import { Alert, Button, TextField } from '@mui/material';
import React,{useState} from 'react';

const MakeAdmin = () => {
    const [email, setEmail] = useState('')
    const [success, setSuccess] = useState(false)
    const handleOnBlur = (e) => {
        setEmail(e.target.value)
    }
    const handleFormSubmit = (e) => {
        const user = { email }
        fetch('https://murmuring-waters-69615.herokuapp.com/users/admin', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
            .then(data => {
                if (data.modifidCount) {
                setSuccess(true)
            }
        })
        e.preventDefault();
     }
    return (
        <div>
            <div>
            <h1>Make an Admin</h1>
            {
                success && <Alert severity="success">Admin create Successfull</Alert>
            }
            <form onSubmit={handleFormSubmit}>
                <TextField style={{ width:'80%'}} label="Email" variant="standard" onBlur={handleOnBlur} type='email' />
                <br/>
                <br />
                <Button type="submit" variant="contained">Add Admin</Button>
            </form>
        </div>
        </div>
    );
};

export default MakeAdmin;