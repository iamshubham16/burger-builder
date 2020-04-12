import React, { Component } from "react";
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }

    render () {
        return (
            <div className = {classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                <form>
                    <input className = {classes.Input} type = "text" name = "Name" placeholder="Your Name" />
                    <input className = {classes.Input} type = "email" name = "Email" placeholder="Your email" />
                    <input className = {classes.Input} type = "text" name = "Street" placeholder="Street" />
                    <input className = {classes.Input} type = "text" name = "Postal" placeholder="Postal Code" />
                    <Button btnType = "Success">ORDER</Button>
                </form>    
            </div>
        );
    }
}

export default ContactData;