import React, {useState} from 'react';
import FormInput from '../form-input/form-input.components';
import './sign-in.styles.scss';
import CustomButton from '../custom-button/custom-button.components';
import {auth} from '../firebase/firebase-utils';
import {googleSignInStart, emailSignInStart} from '../../redux/user/user.action';
import {connect} from 'react-redux';

const SignIn = ({emailSignInStart, googleSignInStart}) => {
    const [userCredentials, setCredentials] = useState({
        email: '',
        password: ''
    })

    const handleSubmit = async event => {
        event.preventDefault();
        emailSignInStart(email, password);
    }

    const handleChange = event => {
        const {value, name} = event.target;
        setCredentials({...userCredentials, [name]: value});
    }
    const {email, password} = userCredentials;
    return(
        <div className='sign-in'>
            <h1>I already have an account</h1>
            <span>Sign in with email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                name='email' 
                type='email' 
                value={email} 
                required
                handleChange={handleChange}
                label='email'
                />
                <FormInput 
                name='password' 
                type='password' 
                value={password} 
                required
                handleChange={handleChange}
                label='password'
                />
                <div className="buttons">
                <CustomButton type='submit'>Sign In</CustomButton>
                <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn>Sign In With Google</CustomButton>
                </div>
            </form>
        </div>
    );
    
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
})

export default connect(null, mapDispatchToProps)(SignIn);