import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { API_URL } from './api_config'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

function Login() {

    const [showError, setShowError] = useState(false);
    const [state, setstate] = useState({
        email: "",
        password: "",
    })
    const handleChange = (e) => {
        setstate({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            let resData = await axios.post(`${API_URL}/login`, state)
            localStorage.setItem("survey-user-token", resData.data.token)
            if (resData.data?.user?.role === "Admin") {
                window.location = "/admin-home"
            } else {
                window.location = "/user-home"
            }
        } catch (error) {
            setShowError(true)
        }
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            setShowError(false);
        }
        setShowError(false);
    };
    return (
        <div>
            <form>
                {showError &&
                    <Snackbar
                        anchorOrigin={{ vertical: "top", horizontal: "right" }}
                        open={showError}
                        onClose={handleClose}
                        autoHideDuration={3000}
                        TransitionComponent={Slide}
                    >
                        <MuiAlert onClose={handleClose} variant="filled" severity="error">
                            Email or Password is Wrong/Invalid...!
                        </MuiAlert>
                    </Snackbar >
                }
                <div className="container">
                    <h1>Login</h1>
                    <p>Please fill in this form to Login an account.</p>
                    <label htmlFor="email"><b>Email</b></label>
                    <input className="input" onChange={handleChange} type="text" placeholder="Enter Email" name="email" id="email" required />
                    <label htmlFor="password"><b>Password</b></label>
                    <input className="input" onChange={handleChange} type="password" placeholder="Enter Password" name="password" id="password" required />
                    <button onClick={handleSubmit} type="submit" className="registerbtn">Login</button>
                </div>
                <div className="container signin">
                    <p>Not Signed up yet? <Link to="/register">Sign up</Link>.</p>
                </div>
            </form>
        </div>
    )
}

export default Login
