import React, { Component } from 'react';
import { ForgotPassword } from '../ForgotPassword';
import ChangePassword from '../../components/ChangePassword';
class Admin extends Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }


    render(){
        return (
            <div>
                <h3 className="center-align">Account Page</h3>
                <ForgotPassword />
                <ChangePassword />
            </div>
        )
    }
}

export default Admin;