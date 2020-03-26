import React from 'react';
import burgerLogo from '../../assests/Images/burger-logo.png'
import classes from './Logo.module.css'

const logo = (props) => (
    <div className = {classes.Logo} style = {{height:props.height}}>
        <img src = {burgerLogo} alt = "Brawsis" />
    </div>   
);


export default logo;