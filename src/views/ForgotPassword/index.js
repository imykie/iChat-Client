import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../../components/Firebase'
import * as ROUTES from '../../constants/routes';


const ForgotPasswordPage = () => (
    <div>
        <h3>Forgot Password</h3>
        <ForgotPassword />
    </div>
);

const INITIAL_STATE = {
    email: '',
    error: null
}

class ForgotPasswordForm extends Component{

    constructor(props){
        super(props)

        this.state = { ...INITIAL_STATE }
    }

    onSubmit = event => {
        event.preventDefault()
    }

    onChange = event => {
        this.setState({[event.target.name]: event.target.value});
    }

    render(){
        const { email } = this.state

        return (
            <div className="forgot-password-container">
                <div className="row mt-4">
                    <form onSubmit={this.onSubmit} className="col s12">
                        <div className="row">
                            <div className="input-field col s12">
                                <input name="email" value={email} onChange={this.onChange} type="email" id="email" />
                                <label for="email">Enter your email</label>
                            </div>
                        </div>
                        {error && <p>{error.message}</p>}
                        <div className="center-align">
                            <button disabled={inValid} type="submit" className="waves-effect waves-light btn-large">Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const ForgotPasswordLink = () => (
    <p>
        <Link to={ROUTES.FORGET_PASSWORD}>Forgot Password?</Link>
    </p>
)
const ForgotPassword = withFirebase(ForgotPasswordForm);

export default ForgotPasswordPage

export { ForgotPasswordLink, ForgotPassword }

