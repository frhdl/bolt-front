import React, { useState, useEffect } from 'react';
import { Link, useHistory} from 'react-router-dom';
import { FiPower, FiTrash2, FiEdit3 } from 'react-icons/fi';
import Task from '../Task';

import './styles.css';
import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

export default function Project() {
    const [projects, setProjects] = useState([]);

    const history = useHistory();

    const userName = localStorage.getItem('userName');
    const bearerToken = localStorage.getItem('bearerToken');

    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn || isLoggedIn === null) {
        history.push('/');
    }

    useEffect(() => {
        api.get('/api/v1/project?page=1&limit=100', {
            headers: {
                Authorization: `bearer ${bearerToken}`,
            }
        }).then(response => {
            setProjects(response.data);
        })
    }, [bearerToken]);

    async function handleDeleteProject(id){
        try {
            await api.delete(`/api/v1/project/${id}`, {
                headers: {
                    Authorization: `bearer ${bearerToken}`,
                }
            });

            setProjects(projects.filter(project => project.id !== id));
        } catch (err) {
            alert('Erro ao deletar projeto, tente novamente.');
        }
    }

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="project-container">
            <header>
                <img src={logoImg} alt="bolt"/>
                <span>Hi, {userName}!</span>

                <Link className="button" to="/project/new">New Project</Link>
                <button onClick={handleLogout} type="button">
                <FiPower size={18} color="#5453FE" />
                </button>
            </header>
            <h1>Projects</h1>

            <ul>
                {projects.map(project => (
                    <li key={project.id}>
                        <div className="project-header">
                            <h2>{project.name}</h2>
                            
                            <Link to={"/project/edit/" + project.id}><FiEdit3 size={20} style={{paddingLeft: '5px'}} color="#a8a8b3" /></Link>
                            <button onClick={() => handleDeleteProject(project.id)} type="button">
                                <FiTrash2 size={20} color="#a8a8b3" />
                            </button>
                        </div>
                        <Task id={project.id}></Task>
                        <div>
                            <Link className="button" to={"/task/new/" + project.id}>New Task</Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}