import React, { Component } from 'react';
import './login.css';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { SignUpLink } from '../Signup';
import { withFirebase } from '../../components/Firebase';
import SignInWithGoogle from './googleAuth';
import SignInWithFacebook from './facebookAuth';
import SignInWithGithub from './githubAuth';
import SignInWithTwitter from './twitterAuth';
import { ForgotPasswordLink } from '../ForgotPassword';
import * as ROUTES from '../../constants/routes';


const { log } = console;

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null
}

const LogInPage = () => (
    <div>
        <h3 className="center-align">Login</h3>
        <LogInForm />
        <LogInWithGoogle />
        <LogInWithFaceBook />
        <LogInWithGithub />
        <LogInWithTwitter />
        <div className="center-align">
            <ForgotPasswordLink />
            <SignUpLink />
        </div>
    </div>
)


class LogInFormBase extends Component{
    constructor(props){
        super(props)
        this.state = {...INITIAL_STATE};
    }

    onSubmit = event => {
        event.preventDefault();
        const { email, password } = this.state;

        this.props.firebase.signInWithEmailAndPassword(email, password)
            .then( user => {
                log(user);
                log('user signed in');
                this.setState({...INITIAL_STATE});
                this.props.history.push(ROUTES.HOME);
            })
            .catch( err => {
                this.setState({error: err})
            })
    }

    onChange = event => {
        this.setState({[event.target.name]: event.target.value});
    }

    render(){
        const { email, password, error } = this.state;
        const inValid = email === '' || password === '';

        return (
            <div className="login-container">
                <div className="row mt-4">
                    <form onSubmit={this.onSubmit} className="col s12">
                        <div className="row">
                            <div className="input-field col s12">
                                <input name="email" value={email} onChange={this.onChange} type="email" id="email" />
                                <label for="email">Email</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                            <input name="password" value={password} onChange={this.onChange} type="password" id="password" />
                                <label for="password">Password</label>
                            </div>
                        </div>
                        {error && <p>{error.message}</p>}
                        <div className="center-align">
                            <button disabled={inValid} type="submit" className="waves-effect waves-light btn-large">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        
        )
    }
}

const LogInForm = compose(withRouter, withFirebase)(LogInFormBase);
const LogInWithGoogle = compose(withRouter, withFirebase)(SignInWithGoogle);
const LogInWithFaceBook = compose(withRouter, withFirebase)(SignInWithFacebook);
const LogInWithGithub = compose(withRouter, withFirebase)(SignInWithGithub);
const LogInWithTwitter = compose(withRouter, withFirebase)(SignInWithTwitter);
export default LogInPage;

export { LogInForm, LogInWithGoogle, LogInWithFaceBook, LogInWithTwitter };