import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import MenuSharpIcon from '@mui/icons-material/MenuSharp';


function Navbar({ apiData, token }) {
    let navbarRef = useRef();
    let location = useLocation();
    const [state, setState] = useState("topnav");

    const handleClick = (e) => {
        for (let i = 0; i < navbarRef.current.childNodes.length; i++) {
            navbarRef.current.childNodes[i].classList.remove("active");
        }
        e.target.parentNode.classList.add("active")
        navbarRef.current.classList.remove("responsive");
    }
    const handleLogout = () => {
        localStorage.removeItem("survey-user-token");
        window.location = "/login";
    }

    const menubarHandler = () => {
        if (navbarRef.current.classList.contains("responsive")) {
            navbarRef.current.classList.remove("responsive");
        } else {
            navbarRef.current.classList.add("responsive");
        }
    }
    const hidePopup = () => {
        setState("topnav");
    }

    return (
        <ul ref={navbarRef} className="navbar">
            {
                apiData?.role === "Admin" ?
                    <div className="navContainer">
                        <span>
                            <li>
                                <MenuSharpIcon onClick={menubarHandler} className="menuicon" />
                            </li>
                            <li onClick={hidePopup} className={location.pathname === "/admin-home" ? "active" : ""} >
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
                                <li>
                                    <MenuSharpIcon onClick={menubarHandler} className="menuicon" />
                                </li>
                                <li onClick={hidePopup} className={location.pathname === "/user-home" ? "active" : ""} >
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
                        <div className="navContainer">
                            <span>
                                <li>
                                    <MenuSharpIcon onClick={menubarHandler} className="menuicon" />
                                </li>
                                <li onClick={hidePopup} className={location.pathname === "/register" ? "active" : ""} >
                                    <Link to="/register" className="navbar__link "
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
                            </span>
                            <p className="nameOnNavbar2">
                                <Link to="/">
                                    <strong>Survey</strong> App
                                </Link>
                            </p>
                        </div>
            }

        </ul >
    )
}

export default Navbar
