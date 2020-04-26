import React, { Component } from 'react';
import './profile.css';
import { withFirebase } from '../../components/Firebase';
import LinkWithGoogle from './linkGoogle';
import LinkWithFacebook from './linkFacebook';
import LinkWithGithub from './linkGithub';


const Profileapge = () => {
    return (
        <div>
            <Profile />
            <LinkGoogle />
            <LinkFacebook />
            <LinkGithub />
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
const linkFacebook = withFirebase(LinkWithFacebook);
const LinkGithub = withFirebase(LinkWithGithub);

export default ProfilePage;