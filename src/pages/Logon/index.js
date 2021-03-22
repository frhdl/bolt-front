import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import boltImg from '../../assets/bolt.svg';

import api from '../../services/api';

export default function Logon() {
    const [id, setId] = useState('');
    const [secret, setSecret] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('/api/v1/auth/login', { "client_id": id, "client_secret": secret });

            localStorage.setItem('userID', id);
            localStorage.setItem('userName', response.data.user_name)
            localStorage.setItem('userEmal', response.data.user_email)
            localStorage.setItem('bearerToken', response.data.access_token);
            localStorage.setItem('isLoggedIn', true);

            history.push('/projects');
        } catch (err) {
            if (err.response.status === 400) {
                alert(`Falha no login: ${err.response.data.error_description}. Tente novamente.`);
            } else {
                alert('Falha inesperada no login. Tente novamente mais tarde.')
            }
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="bolt" width="400" />

                <form onSubmit={handleLogin}>
                    <h1>Sing In</h1>

                    <input 
                    placeholder="User"
                    value={id}
                    onChange={e => setId(e.target.value)}
                    />
                    <input 
                    placeholder="Password"
                    type="password"
                    value={secret}
                    style={{marginTop: '15px'}}
                    onChange={e => setSecret(e.target.value)}
                    />
                    <button className="button" type="submit">Continue</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#5453FE" />
                        Get Started
                    </Link>
                </form>
            </section>

            <img src={boltImg} alt="bolt" />
        </div>
    );
}