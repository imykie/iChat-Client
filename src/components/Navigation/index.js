import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import SignOutBtn from '../SignOut';

const Navigation = ({authUser}) => (
    <div>
        {authUser? <NavigationAuth /> : <NavigationNonAuth />}
        {console.log(authUser)}
    </div>
)
const NavigationAuth = () => (
    <div>
        <ul>
            <li>
                <Link to={ROUTES.LANDING}>Landing</Link>
            </li>
            <li>
                <Link to={ROUTES.HOME}>Home</Link>
            </li>
            <li>
                <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
            </li>
            <li>
                <Link to={ROUTES.LOGIN}>Login</Link>
            </li>
            <li>
                <Link to={ROUTES.CHAT}>Chat</Link>
            </li>
            <li>
                <Link to={ROUTES.SETTINGS}>Settings</Link>
            </li>
            <li>
                <Link to={ROUTES.ADMIN}>Admin</Link>
            </li>
            <li>
                <SignOutBtn />
            </li>
        </ul>
    </div>
)

const NavigationNonAuth = () => (
    <div>
        <ul>
            <li>
                <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
            </li>
            <li>
                <Link to={ROUTES.LOGIN}>Login</Link>
            </li>
        </ul>
    </div>
)

export default Navigation;