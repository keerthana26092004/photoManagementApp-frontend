import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Header = () => {
    return (
        <header className="header">
            <nav>
                <ul>
                   
                    <li><Link to="/upload">Upload</Link></li>
                    <li><Link to="/gallery">Gallery</Link></li>
                    <li><Link to="/details">Details</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
