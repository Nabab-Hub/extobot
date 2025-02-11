import React from 'react';
import './ErrorPage.css';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from './store/auth';

export default function ErrorPage() {
    const navigate = useNavigate();
    // const {isLoggedIn} = useAuth();
    return (
        <div className="errorPage">
            <div className="main-container">
                <div className="text-container">
                    <h1 className="animated-404">404</h1>
                    <h3>Page Not Found</h3>
                    <p>
                        We are sorry. The page you are looking for doesn't exist or something went wrong.
                        Please go back to our <b>home page</b>.
                    </p>
                    <button className="back" onClick={() => navigate('/')}>
                        Go Back Home
                    </button>
                </div>
            </div>
        </div>
    );
}
