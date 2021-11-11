
import { Container, TextField, Typography, Alert, CircularProgress } from '@mui/material';
import { pink } from '@mui/material/colors';
import React, { useState } from 'react';
import { Link,useHistory } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import useAuth from '../../hooks/useAuth';

const Register = () => {
    
    const {registerUser,isLoading,user,authError} = useAuth();

    const [signupData, setSigupData] = useState({})

    const history = useHistory()

    const handleField = (e) =>{
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = {...signupData}
        newLoginData[field]=value;
        setSigupData(newLoginData)
    }
    const signupHandle = (e) =>{
        if(signupData?.password !== signupData?.reRassword){
            alert('your password not match');
            return
        }
        registerUser(signupData?.email, signupData?.password, signupData?.name, history)
        e.preventDefault();
    }

    return (
        <>
            <Navbar></Navbar>
          <Container>
              
                  <Typography style={{textAlign:'center', color:'#fd8980',marginTop:'90px'}} variant="h4">Registration</Typography>
                  
                  <div style={{display:"flex", justifyContent:"center", marginTop:'40px'}}>
                      
                    { !isLoading && <form style={{width:'90%'}} onSubmit={signupHandle}>
                      
                          <TextField name='name' onBlur={handleField} style={{width:'100%',marginBottom:"5px"}} id="standard-basic" label="Full Name" type="text" variant="standard" />
                          
                          <TextField name='email' onBlur={handleField} style={{width:'100%',marginBottom:"5px"}} id="standard-basic" label="Email" type="email" variant="standard" />
                          
                          <TextField name='password' onBlur={handleField} style={{width:'100%', marginBottom:"5px"}} id="standard-basic" label="Password" type="password" variant="standard" />

                          <TextField name='reRassword' onBlur={handleField} style={{width:'100%'}} id="standard-basic" label="Re-Password" type="password" variant="standard" />
                          
                          
                        <button sx={{ color: pink[800], '&.Mui-checked': { color: pink[600] }}} type="submit" variant="contained" style={{ width: '100%',marginTop:'10px',padding:"15px",  background: "#fd8980" }}>Sign up</button>
                        
                        <Link to='/login' style={{textDecoration:'none'}}> <Typography style={{color:"#fd8980",marginTop:'10px'}} variant='h5'>Existing User? Log In your Account</Typography> </Link>
                          
                    </form>} 
                      {
                          isLoading && <CircularProgress />
                      }
                      {
                          user?.email && <Alert severity="success">Registartion Successfull</Alert>
                      }
                      {
                        authError && <Alert severity="error">Registartion Failed</Alert>
                      }
                  </div>
      </Container>
        </>
    );
};

export default Register;