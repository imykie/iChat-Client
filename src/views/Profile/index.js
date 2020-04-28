import React, { Component } from 'react';
import './profile.css';
import { withFirebase } from '../../components/Firebase';
import LinkWithGoogle from './linkGoogle';
import LinkWithFacebook from './linkFacebook';
import LinkWithGithub from './linkGithub';
import LinkWithTwitter from './linkTwitter';
import LinkWithEmailAndPassword from './linkEmailAndPassword';
import { withAuthorization, AuthUserContext } from '../../components/Session';


const ProfilePage = () => {
    return (
        <div>
            <Profile />
            <LinkGoogle />
            <LinkFacebook />
            <LinkGithub />
            <LinkTwitter />
            <LinkEmailAndPassword />
        </div>
    )
}
class ProfileBase extends Component {

    constructor(props){
        super(props)

        this.state = {
            user: JSON.parse(localStorage.getItem('authUser'))
        }
    }

    render(){

        const { user } = this.state
        return(
            <div>
                <h3>Profile</h3>
                <p>{user.providerData.email}</p>
                <ProfilePage />
            </div>
        )
    }
}

const Profile = withFirebase(ProfileBase);
const LinkGoogle = withFirebase(LinkWithGoogle);
const LinkFacebook = withFirebase(LinkWithFacebook);
const LinkGithub = withFirebase(LinkWithGithub);
const LinkTwitter = withFirebase(LinkWithTwitter);
const LinkEmailAndPassword = withFirebase(LinkWithEmailAndPassword);

// const condition = authUser => !!authUser;

export default ProfileBase;