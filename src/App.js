import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GoalList from './components/GoalList/GoalList/GoalList';
import NewGoal from './components/GoalList/NewGoal/NewGoal';

class App extends Component {
    state = {
        courseGoals : [
            {id : 'cg1', text: 'Finish the course'},
            {id : 'cg2', text: 'Learn all about Course Main Topic'},
            {id : 'cg3', text: 'Help other students in the Course Q&A'},
        ],
    };
    
    render() {
        return (
            <div className='course-goals'>
                <h2>Course Goals</h2>
                <NewGoal />
                <GoalList goals={this.state.courseGoals}/>
            </div>
        );
    }
}

export default App;
