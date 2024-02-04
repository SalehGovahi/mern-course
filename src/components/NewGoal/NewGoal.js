import React,{useState} from "react";
import './NewGoal.css'

const NewGoal = props => {
    const [enteredData,setEnteredData] = useState('');

    const addGoalHandler = event => {
        event.preventDefault();

        const newGoal = {
            id: Math.random().toString(),
            text: enteredData
        };

        setEnteredData('');

        props.onAddGoal(newGoal);
    }

    const textChangeHandler = event => {
        setEnteredData(event.target.value);
    }

    return (
    <form className="new-goal" onSubmit={addGoalHandler}>
        <input type="text" value={enteredData} onChange={textChangeHandler}/>
        <button type="submit">Add Goal</button>
    </form>
    );
};

export default NewGoal;