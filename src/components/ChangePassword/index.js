import React, { Component } from 'react';
import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
    password:'',
    confirmPassword:'',
    message: '',
    error: null
}

class ChangePasswordForm extends Component{
    constructor(props){
        super(props)
        this.state = { ...INITIAL_STATE }
    }

    onSubmit = event => {
        event.preventDefault();
        const { password, message } = this.state

        this.props.firebase.updatePassword(password)
            .then(() => {
                message = "Password changed successfullly";
                this.setState({...INITIAL_STATE});
            })
            .catch(err => {
                this.setState({error: err})
            })
    }

    onChange = event => {
        this.setState({[event.target.name]: event.target.value});
    }

    render(){
        const { password, confirmPassword, message, error } = this.state
        const inValid = password === '' || confirmPassword === '' || password !== confirmPassword;
        return (
            <div className="forgot-password-container">
                <div className="row mt-4">
                    <form onSubmit={this.onSubmit} className="col s12">
                        <div className="row">
                            <div className="input-field col s12">
                               <input name="password" value= {this.state.password} onChange={this.onChange} type="password" id="password" />
                                <label for="password">New Password</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input name="confirmPassword" value= {this.state.confirmPassword} onChange={this.onChange} type="password" id="confirmPassword" />
                                <label for="confirmPassword">Confirm New Password</label>
                            </div>
                        </div>
                        {message && <p>{message}</p>}
                        {error && <p>{error.message}</p>}
                        <div className="center-align">
                            <button disabled={inValid} type="submit" className="waves-effect waves-light btn-large">Change Password</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default withFirebase(ChangePasswordForm);
