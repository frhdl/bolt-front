import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Project from './pages/Project';
import NewProject from './pages/NewProject';
import NewTask from './pages/NewTask';
import EditProject from './pages/EditProject';
import EditTask from './pages/EditTask';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon}/>
                <Route path="/register" component={Register}/>

                <Route path="/projects" component={Project}/>
                <Route path="/project/new" component={NewProject}/>
                <Route path="/project/edit/:id" component={EditProject}/>
                <Route path="/task/new/:id" component={NewTask}/>
                <Route path="/task/edit/:id" component={EditTask} />         
            </Switch>
        </BrowserRouter>
    );
}