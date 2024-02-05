import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import GoalList from './components/GoalList/GoalList';
import NewGoal from './components/NewGoal/NewGoal';

const App = () => {
  const [courseGoals, setCourseGoals] = useState([
    { id: 'cg1', text: 'Finish the course' },
    { id: 'cg2', text: 'Learn all about Course Main Topic' },
    { id: 'cg3', text: 'Help other students in the Course Q&A' },
  ]);

  const addNewGoalController = (newGoal) => {
    setCourseGoals((prevCourseGoals) => prevCourseGoals.concat(newGoal));
  };

  return (
    <div className='course-goals'>
      <h2>Course Goals</h2>
      <NewGoal onAddGoal={addNewGoalController} />
      <GoalList goals={courseGoals} />
    </div>
  );
};

export default App;