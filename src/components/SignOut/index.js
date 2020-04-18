import React from 'react';

import { withFirebase } from '../Firebase';

const { log } = console;

const SignOutBtn = ({firebase}) => {

    // const signUserOut = (firebase) => {
    //     firebase.signOut().then(() => {
    //         log('user signed out')
    //     }).catch(err => {
    //         log(err.message);
    //     })
    // }
    return (<button type="button" onClick={() => firebase.signOut()} className="waves-effect waves-light btn-small">
            Sign Out
        </button>)
}

export default withFirebase(SignOutBtn);