import React, { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

export default function NewTask() {
    const { id } = useParams();
    const [description, setDescription] = useState('');

    const history = useHistory();

    const bearerToken = localStorage.getItem('bearerToken');

    async function handlerNewTask(e) {
        e.preventDefault();

        const projectID = parseInt(id)

        const data ={
            "project_id": projectID,
            "description": description,
        };

        try {
            await api.post('/api/v1/task', data, {
                headers: {
                    Authorization: `bearer ${bearerToken}`,
                }
            });

            history.push('/projects');
        } catch (err) {
            alert('Erro ao criar task, tente novamente.');
        }
    }

    return (
        <div className="new-task-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Bolt" width="400"/>

                    <h1>Create new task</h1>
                    <p>Bolt tasks are your portal to more organized work—where every single part of your task can be managed.</p>

                    <Link className="back-link" to="/projects">
                        <FiArrowLeft size={16} color="#5453FE" />
                        Return
                    </Link>

                </section>

                <form onSubmit={handlerNewTask}>
                    <input 
                        placeholder="Description" 
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />

                    <button className="button" type="submit">Save</button>
                </form>
            </div>
        </div>
    );
}