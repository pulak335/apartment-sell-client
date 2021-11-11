import { Alert, CircularProgress, Container, TextField, Typography } from '@mui/material';
import React,{useState} from 'react';
import { Link,useLocation,useHistory } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import useAuth from './../../hooks/useAuth';


const Login = () => {

    const location = useLocation()
    const history = useHistory()
    // 
    const { loginUser, authError, user, isLoading, signInWithGoogle } = useAuth()
    const [loginData, setLoginData] = useState({})
    
        const handleField = (e) =>{
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = {...loginData}
        newLoginData[field]=value;
        setLoginData(newLoginData)
    }

        const loginHandle = (e) =>{
        loginUser(loginData.email, loginData.password, location, history)
        e.preventDefault();
    }
    const googleSignin=()=>{
        signInWithGoogle(location,history)
    }

    return (
        <>
            <Navbar></Navbar>
        <Container>
                    <Typography style={{textAlign:'center', color:'#fd8980',marginTop:'90px'}} variant="h4">Login</Typography>
                    <div style={{display:"flex", justifyContent:"center", marginTop:'40px'}}>
                            {!isLoading && <form style={{ width: '90%' }} onSubmit={loginHandle}>
                                
                                <TextField name='email' onBlur={handleField} style={{ width: '100%', marginBottom: "5px" }} id="standard-basic" label="Email" type="email" variant="standard" />
                                
                                <TextField name='password' onBlur={handleField} style={{ width: '100%' }} id="standard-basic" label="Password" type="password" variant="standard" />
                                
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    
                            
                                <Link to='/lostpassword' style={{ textDecoration: 'none' }}> <Typography style={{ color: "#fd8980", marginTop: '10px' }} variant='body2'>Forget your password?</Typography> </Link>
                                    
                                <Link to='/signup' style={{ textDecoration: 'none' }}> <Typography style={{ color: "#fd8980", marginTop: '10px' }} variant='body2'>New Here? Create an account</Typography> </Link>
                                    
                            </div>
                            <button type="submit" variant="contained" style={{background:"#fd8980",padding:"15px",  width:'100%', marginTop:'60px'}}>Sign in</button>
                        </form>}
                        {
                            isLoading && <CircularProgress />
                        }
                        {
                            user?.email && <Alert severity="success">Login Successfull</Alert>
                        }
                        {
                          authError && <Alert severity="error">Password Incorrect!</Alert>
                        }
                    </div>
                        <p style={{ textAlign: 'center' }}>--------------------------------------------</p>
                        
                    <button onClick={googleSignin}variant="contained" style={{background:'#fd8980',padding:"15px", width:'100%', marginTop:'10px'}}>Sign in with google</button>
            </Container>
            </>
    );
};

export default Login;