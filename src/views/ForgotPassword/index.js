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
    message: '',
    error: null
}

class ForgotPasswordForm extends Component{

    constructor(props){
        super(props)
        this.state = { ...INITIAL_STATE }
    }

    onSubmit = event => {
        event.preventDefault();
        const { email, message } = this.state

        this.props.firebase.resetPassword(email)
            .then(() => {
                message = "You've been sent a mail reset your password";
                this.setState({...INITIAL_STATE});
            })
            .catch(err => {
                this.setState({error: err})
                console.log(err)
            })
    }

    onChange = event => {
        this.setState({[event.target.name]: event.target.value});
    }

    render(){
        const { email, message, error } = this.state
        const inValid = email === '';
        return (
            <div className="forgot-password-container">
                <div className="row mt-4">
                    <form onSubmit={this.onSubmit} className="col s12">
                        <div className="row">
                            <div className="input-field col s12">
                                <input name="email" value={this.state.email} onChange={this.onChange} type="email" id="email" />
                                <label for="email">Enter your email</label>
                            </div>
                        </div>
                        {message && <p>{message}</p>}
                        {error && <p>{error.message}</p>}
                        <div className="center-align">
                            <button disabled={inValid} type="submit" className="waves-effect waves-light btn-large">Send Email</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const ForgotPasswordLink = () => (
    <p>
        <Link to={ROUTES.ADMIN}>Forgot Password?</Link>
    </p>
)
const ForgotPassword = withFirebase(ForgotPasswordForm);

export default ForgotPasswordPage

export { ForgotPasswordLink, ForgotPassword }

