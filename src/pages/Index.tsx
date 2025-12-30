import React from 'react';
import { useNavigate } from 'react-router-dom';
import wel from '../assets/welcome/Welcome.png'
import startBtn from '../assets/welcome/start.svg'
import '../styles/welcome.css';

const Welcome: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="welcome-page">
            <img src={wel} alt="Wel" className="welcome-bg"/>
            <img src={startBtn} alt="Start" className="start-btn"
                 onClick={() => navigate('/home')}/>
        </div>
    );
};

export default Welcome;
