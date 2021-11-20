import React, { useRef } from 'react'
import { Link, useLocation } from 'react-router-dom';
import MenuSharpIcon from '@mui/icons-material/MenuSharp';


function Navbar({ apiData, token }) {
    let mailUlRef = useRef();
    let location = useLocation();

    const handleClick = (e) => {
        for (let i = 0; i < mailUlRef.current.childNodes.length; i++) {
            mailUlRef.current.childNodes[i].classList.remove("active");
        }
        e.target.parentNode.classList.add("active")
    }
    const handleLogout = () => {
        localStorage.removeItem("survey-user-token");
        window.location = "/login";
    }
    return (
        <ul ref={mailUlRef} className="navbar">
            {
                apiData?.role === "Admin" ?
                    <div className="navContainer">
                        <span>
                            <li className={location.pathname === "/admin-home" ? "active" : ""} >
                                <Link to="/admin-home" className="navbar__link "
                                    onClick={handleClick}

                                >
                                    Admin-Home
                                </Link>
                            </li>
                            <li className={location.pathname === "/create-survey" ? "active" : ""}>
                                <Link to="/create-survey" className="navbar__link"
                                    onClick={handleClick}
                                >
                                    Create-Survey
                                </Link>
                            </li>
                            <li>
                                <p onClick={handleLogout} className="logoutBtn">Logout</p>
                            </li>
                        </span>
                        <p className="nameOnNavbar">
                            <strong>Welcome, </strong> {apiData?.name}
                        </p>
                    </div>
                    :
                    apiData &&
                        apiData?.role === "User" ?
                        <div className="navContainer">
                            <span>
                                <li className={location.pathname === "/user-home" ? "active" : ""} >
                                    <Link to="/user-home" className="navbar__link "
                                        onClick={handleClick}
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <p onClick={handleLogout} className="logoutBtn">Logout</p>
                                </li>
                            </span>
                            <p className="nameOnNavbar">
                                <strong>Welcome, </strong> {apiData?.name}
                            </p>
                        </div>
                        : !token &&
                        <>
                            <li className={location.pathname === "/" ? "active" : ""} >
                                <Link to="/" className="navbar__link "
                                    onClick={handleClick}
                                >
                                    Register
                                </Link>
                            </li>
                            <li className={location.pathname === "/login" ? "active" : ""}>
                                <Link to="/login" className="navbar__link"
                                    onClick={handleClick}
                                >
                                    Login
                                </Link>
                            </li>
                        </>
            }

        </ul >
    )
}

export default Navbar
