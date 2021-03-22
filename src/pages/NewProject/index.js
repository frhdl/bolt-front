import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

export default function NewProject() {
    const [name, setName] = useState('');

    const history = useHistory();

    const bearerToken = localStorage.getItem('bearerToken');

    async function handleNewProject(e) {
        e.preventDefault();

        const data = {
            "name": name,
        };

        try {
            await api.post('/api/v1/project', data, {
                headers: {
                    Authorization: `bearer ${bearerToken}`,
                }
            });

            history.push('/projects');
        } catch (err) {
            alert('Erro ao criar projeto, tente novamente.');
        }
    }

    return (
        <div className="new-project-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="bolt" width="400"/>

                    <h1>Create a new project</h1>
                    <p>Manage projects, and reach new productivity peaks.</p>

                    <Link className="back-link" to="/projects">
                        <FiArrowLeft size={16} color="#5453FE" />
                        Return
                    </Link>

                </section>

                <form onSubmit={handleNewProject}>
                    <input 
                        placeholder="Project name" 
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />

                    <button className="button" type="submit">Save</button>
                </form>
            </div>
        </div>
    );
}