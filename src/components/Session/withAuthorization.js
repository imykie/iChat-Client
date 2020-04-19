import React  from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const withAuthorization = condition => Component => {

    class Authorization extends React.Component{

        constructor(props){
            super(props);

            this.state = {

            }

            this.listener = Function;
        }
        componentDidMount(){
            this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
                if(!condition(authUser)){
                    this.props.history.push(ROUTES.LOGIN)
                }
            })
        }

        componentWillUnmount(){
            this.listener();
        }

        render(){
            return ( <Component {...props} />)
        }
    }

    return compose(withRouter, withFirebase)(Authorization);
}

export default withAuthorization
