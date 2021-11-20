import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom';
import { API_URL } from './api_config'
import ShowLoader from './loader';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

function Register() {

    let navigate = useNavigate();
    const [Loading, setLoading] = useState(false);
    const [showError, setShowError] = useState(false);

    const [state, setstate] = useState({
        name: "",
        email: "",
        password: "",
        gender: "Male",
        age: "",
        role: "User",
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
            setLoading(true);
            await axios.post(`${API_URL}/register`, state)
            navigate("/login")
        } catch (error) {
            setShowError(true)
            setLoading(false);
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
            {Loading ?
                <ShowLoader />
                :
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
                                Email is already exist...!
                            </MuiAlert>
                        </Snackbar >
                    }
                    <div className="container">
                        <h1>Register</h1>
                        <p>Please fill in this form to create an account.</p>
                        <label htmlFor="name"><b>Name</b></label>
                        <input className="input" onChange={handleChange} type="text" placeholder="Enter Name" name="name" id="name" required />

                        <label htmlFor="email"><b>Email</b></label>
                        <input className="input" onChange={handleChange} type="text" placeholder="Enter Email" name="email" id="email" required />

                        <label htmlFor="password"><b>Password</b></label>
                        <input className="input" onChange={handleChange} type="password" placeholder="Enter Password" name="password" id="password" required />

                        <label htmlFor="gender"><b>Gender</b></label>
                        <select className="Selectinput" onChange={handleChange} name="gender" id="gender">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        <label htmlFor="age"><b>Age</b></label>
                        <input className="input" onChange={handleChange} type="number" placeholder="Enter Age" name="age" id="age" required />
                        <label htmlFor="role"><b>Role</b></label>
                        <select className="Selectinput" onChange={handleChange} name="role" id="role">
                            <option className="option" value="User">User</option>
                            <option className="option" value="Admin">Admin</option>
                        </select>
                        <button onClick={handleSubmit} type="submit" className="registerbtn">Register</button>
                    </div>
                    <div className="container signin">
                        <p>Already have an account? <Link to="/login">Sign in</Link>.</p>
                    </div>
                </form>
            }
        </div >
    )
}

export default Register
