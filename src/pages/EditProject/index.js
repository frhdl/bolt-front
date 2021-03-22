import React, { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

export default function EditProject() {
    const { id } = useParams();
    const [name, setName] = useState('');

    const history = useHistory();

    const bearerToken = localStorage.getItem('bearerToken');

    async function handleEditProject(e) {
        e.preventDefault();

        const projectID = parseInt(id)

        const data = {
            "id": projectID,
            "name": name,
        };

        try {
            await api.put('/api/v1/project', data, {
                headers: {
                    Authorization: `bearer ${bearerToken}`,
                }
            });

            history.push('/projects');
        } catch (err) {
            alert('Erro ao atualizar projeto, tente novamente.');
        }
    }

    return (
        <div className="edit-project-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="bolt" width="400"/>

                    <h1>Edit project</h1>
                    <p>Manage projects, and reach new productivity peaks.</p>

                    <Link className="back-link" to="/projects">
                        <FiArrowLeft size={16} color="#5453FE" />
                        Return
                    </Link>

                </section>

                <form onSubmit={handleEditProject}>
                    <input 
                        placeholder="New name" 
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />

                    <button className="button" type="submit">Save</button>
                </form>
            </div>
        </div>
    );
}