import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GoalList from './components/GoalList';

class App extends Component {
    state = {
        age: 42,
    };
    
    render() {
        return (
            <div className='course-goals'>
                <h2>Course Goals</h2>
                <h1>{this.state.age}</h1>
                <GoalList />
            </div>
        );
    }
}

export default App;
