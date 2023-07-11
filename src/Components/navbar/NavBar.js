import React from "react";
import { Link } from "react-router-dom";

export function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <span className="navbar-brand" style={{marginLeft: '20px'}}>ReactUI</span>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link to="/" className="nav-link">All</Link>
                    </li>
                    <li className="nav-item active">
                        <Link to="/add" className="nav-link">Add</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}