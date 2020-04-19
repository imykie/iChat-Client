import React from 'react'

import { withFirebase } from '../Firebase';
import AuthUserContext  from './context';

const { log } = console;

const withAuthentication = Component => {
    class Authentication extends React.Component{

        constructor(props){
            super(props)
            this.state = {
                authUser: null
            }

            this.listener = () => {}
        }

        componentDidMount(){
            this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
              if(authUser){
                this.setState({ authUser: authUser })
                log(this.state.authUser)
              }
              else{
                this.setState({ authUser: null })
                log(this.state.authUser)
              }
                
            })
        }

        componentWillUnmount(){
            this.listener();
        }

        render(){
            return (
                <AuthUserContext.Provider value={this.state.authUser}>
                    <Component {...this.props} authState={this.state.authUser}/>
                    {log(this.state)}
                </AuthUserContext.Provider>
                
            )
        }
    }

    return withFirebase(Authentication);
}

export default withAuthentication;
