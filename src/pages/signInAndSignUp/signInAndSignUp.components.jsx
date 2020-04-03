import React from 'react';
import {Switch, Route} from 'react-router-dom';
import './signInAndSignUp.styles.scss';

import SignIn from '../../components/sign-in/sign-in.components';
import SignUp from '../../components/sign-up/sign-up.components';
const SignInAndSignUp = () => (
     <div className="sign-in-and-sign-up">
        <SignIn />
        <SignUp />
     </div>
);

export default SignInAndSignUp;