import React, { Component } from 'react';

const INITIAL_STATE = {
    password: '',
    success:false, 
    error: null
}

class LinkWithEmailAndPassword extends Component{

    constructor(props){
        super(props);

        this.state = { ...INITIAL_STATE }
    }

    onSubmit = event => {
        event.preventDefault();

        this.props.firebase.linkEmailAndPassword(password)
            .then(socialAuthUser => {
                this.setState({success:true, error:null})
            })
            .catch(err => {
                this.setState({error: err})
            })
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render(){
        const { password, success, error } = this.state
        const invalid = password === '';
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="input-field col s12">
                            <input name="password" value={password} onChange={this.onChange} type="password" id="password" />
                            <label for="password">Password</label>
                        </div>
                    </div>
                    <button type="submit" disabled={invalid}>Link Account With Email And Password</button>
                    {error && <p>{error.message}</p>}
                    {success && <p>Account linking successful</p>}
                </form>
            </div>
        )
    }
}

export default LinkWithEmailAndPassword;