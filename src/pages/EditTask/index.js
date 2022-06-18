import React, { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import logoImg from '../../assets/logo.svg';

import axios from 'axios';

export default function EditTask() {
    const { id } = useParams();
    const [description, setDescription] = useState('');

    const history = useHistory();

    const bearerToken = localStorage.getItem('bearerToken');

    async function handlerEditTask(e) {
        e.preventDefault();

        const taskID = parseInt(id)

        const data ={
            "id": taskID,
            "description": description,
        };

        try {
            await axios.put('/api/task', data, {
                headers: {
                    Authorization: `bearer ${bearerToken}`,
                }
            });

            history.push('/projects');
        } catch (err) {
            alert('Erro ao editar a task, tente novamente.');
        }
    }

    return (
        <div className="new-task-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Bolt" width="400"/>

                    <h1>Edit task</h1>
                    <p>Bolt tasks are your portal to more organized work—where every single part of your task can be managed.</p>

                    <Link className="back-link" to="/projects">
                        <FiArrowLeft size={16} color="#5453FE" />
                        Return
                    </Link>

                </section>

                <form onSubmit={handlerEditTask}>
                    <input 
                        placeholder="New description" 
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />

                    <button className="button" type="submit">Save</button>
                </form>
            </div>
        </div>
    );
}