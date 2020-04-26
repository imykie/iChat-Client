import React, { Component } from 'react';
import './profile.css';
import { withFirebase } from '../../components/Firebase';
import LinkWithGoogle from './linkGoogle';
import LinkWithFacebook from './linkFacebook';
import LinkWithGithub from './linkGithub';
import LinkWithTwitter from './linkTwitter';


const ProfilePage = () => {
    return (
        <div>
            <Profile />
            <LinkGoogle />
            <LinkFacebook />
            <LinkGithub />
            <LinkTwitter />
        </div>
    )
}
class ProfileBase extends Component {

    constructor(props){
        super(props)

        this.state = {

        }
    }

    render(){
        return(
            <div>
                <h3>Profile Page</h3>
            </div>
        )
    }
}

const Profile = withFirebase(ProfileBase);
const LinkGoogle = withFirebase(LinkWithGoogle);
const LinkFacebook = withFirebase(LinkWithFacebook);
const LinkGithub = withFirebase(LinkWithGithub);
const LinkTwitter = withFirebase(LinkWithTwitter);

export default ProfilePage;