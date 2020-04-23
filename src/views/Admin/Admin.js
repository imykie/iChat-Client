import React, { Component } from 'react';
import { ForgotPassword } from '../ForgotPassword';
import ChangePassword from '../../components/ChangePassword';
import { withAuthorization, AuthUserContext } from '../../components/Session';

class Admin extends Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return (
            <AuthUserContext.Consumer>
                { authUser => 
                    (
                        <div>
                            <h3 className="center-align">Account Page: {authUser.email}</h3>
                            <ForgotPassword />
                            <ChangePassword />
                        </div>
                    )
                }
                
            </AuthUserContext.Consumer>
        )
    }
}

const condition = authUser => !!authUser;

export default  withAuthorization(condition)(Admin);