import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    async function handleRegister (e) {
        e.preventDefault();

        const data ={
            "name": name,
            "email": email,
            "client_id": user,
            "client_secret": password,
        };

        try {
            await api.post('/api/v1/user', data);

            alert(`You have been registered, use your user to login.`);

            history.push('/')
        } catch (err) {
            if (err.response.status === 400) {
                alert(`Erro no cadastro: ${err.response.data.error_description}. Tente novamente.`);
            } else {
                alert('Erro inesperado no cadastro. Tente novamente mais tarde.')
            }
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Bolt" width="400"/>

                    <h1>Get Started</h1>
                    <p>Click “Sign Up” to agree to Bolt’s <u>Terms of Service</u></p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#5453fe" />
                        Already have an account?
                    </Link>

                </section>

                <form onSubmit={handleRegister}>
                    <input 
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    />
                    <input 
                    type="email" 
                    placeholder="E-mail" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                    placeholder="User" 
                    value={user}
                    onChange={e => setUser(e.target.value)}
                    />
                    
                    <input 
                    placeholder="Password" 
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    />

                    <button className="button" type="submit">Sing Up</button>
                </form>
            </div>
        </div>
    );
}