import React, { Component } from 'react';
import './signup.css'
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../../components/Firebase';
import { compose } from 'recompose';
import * as ROUTES from '../../constants/routes';


const { log, warn } = console;

const INITIAL_STATE = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: null
}

const SignUpPage = () => (
    <div>
        <h3 className="center-align">Sign Up</h3>
        <SignUpForm />
    </div>
);

class SignUpFormBase extends Component{
    constructor(props){
        super(props)
        this.state = { ...INITIAL_STATE }
    }

    onSubmit = event => {
        event.preventDefault();
        const {username, email, password} = this.state;
        
        this.props.firebase.signUpWithEmailAndPassword(email, password)
            .then(user => {
                log(this.state);
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(err => {
                this.setState({error: err});
            })

    }

    onChange = event => {
        this.setState({[event.target.name]: event.target.value })
    }


    render(){
        const {username, email, password, confirmPassword, error } = this.state;
        const inValid = password !== confirmPassword || username === '' || email === '' || password ==='';
        return (

            <div className="signup-container">
                <div className="row mt-4">
                    <form onSubmit={this.onSubmit} className="col s12">
                        <div className="row rm-margin">
                            <div className="input-field col s12">
                                <input name="username" value= {username} onChange={this.onChange} id="username" type="text" />
                                <label for="username">Full Name</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input name="email" value= {email} onChange={this.onChange} type="email" id="email" />
                                <label for="email">Email</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                               <input name="password" value= {password} onChange={this.onChange} type="password" id="password" />
                                <label for="password">Password</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input name="confirmPassword" value= {confirmPassword} onChange={this.onChange} type="password" id="confirmPassword" />
                                <label for="confirmPassword">Confirm Password</label>
                            </div>
                        </div>
                        {error && <p>{error.message}</p>}
                        <div className="center-align">
                            <button disabled={inValid} type="submit" className="waves-effect waves-light btn-large ">Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
            
        )
    }
}

const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);

const SignUpLink = () => (
    <p>Don't have account yet <Link to={ROUTES.SIGN_UP}>Sign Up</Link> </p>
);


export default SignUpPage;

export { SignUpPage, SignUpLink };