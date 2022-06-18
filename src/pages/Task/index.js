import React, { useState, useEffect } from 'react';
import { Checkbox } from 'pretty-checkbox-react';
import axios from 'axios';
import '@djthoms/pretty-checkbox';
import { FiEdit3, FiTrash2} from 'react-icons/fi';

import './styles.css';

import { Link } from 'react-router-dom';


export default function Task(id) {
    const [tasks, setTasks] = useState([]);
    const bearerToken = localStorage.getItem('bearerToken');

    useEffect(() => {

        axios.get(`/api/task?projectID=${id.id}&page=1&limit=100`, {
            headers: {
                Authorization: `bearer ${bearerToken}`,
            }
        }).then(response => {
            setTasks(response.data);
        })
    }, [bearerToken, id.id]);

    async function handlerDeleteTask(id){
        try {
            await axios.delete(`/api/task/${id}`, {
                headers: {
                    Authorization: `bearer ${bearerToken}`,
                }
            });

            setTasks(tasks.filter(task => task.id !== id));
        } catch (err) {
            alert('Erro ao deletar a task, tente novamente.');
        }
    }

    return (
        <div className="task-container">
            <ul>
                <h3>To do</h3>
                {tasks.map((task, index) => (
                task.done === false ? 
                    <li key={task.id}>
                        
                        <Checkbox>
                            <b>{task.description}</b> - Created: <i>{new Intl.DateTimeFormat("en-GB", {
                                year: "2-digit",
                                month: "short",
                                day: "numeric"
                            }).format(Date.parse(task.create_at))}</i>.
                        </Checkbox>
                        <Link to={"/task/edit/" + task.id}><FiEdit3 size={20} style={{paddingTop: '5px'}} color="#a8a8b3" /></Link>
                        <button onClick={() => handlerDeleteTask(task.id)} type="button">
                                <FiTrash2 size={15} color="#a8a8b3" />
                        </button>
                    </li>
                    : null
                ))}
            </ul>
        </div>
    );
}