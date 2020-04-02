import React from 'react';
import {Switch, Route} from 'react-router-dom';

import SignIn from '../../components/sign-in/sign-in.components';

const SignInAndSignUp = () => (
     <div className="sign-in-and-sign-up">
        <SignIn />
     </div>
);

export default SignInAndSignUp;