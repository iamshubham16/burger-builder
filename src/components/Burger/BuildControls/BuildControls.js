import React from 'react';
import classes from './BuildControls.module.css';
import BuildControllers from './BuildContollers/BuildControllers'

const controls = [
    {label: 'Salad', type:'salad'},
    {label: 'Bacon', type:'bacon'},
    {label: 'Cheese', type:'cheese'},
    {label: 'Meat', type:'meat'},
];

const buildControls = (props) => (
    <div className = {classes.BuildControls}>
        <p>Current Price : Rs {props.price}</p>
        {controls.map(ctrl => (
            <BuildControllers 
                key = {ctrl.label} 
                label = {ctrl.label} 
                addIngredientHandler = {() => props.addIngredientHandler(ctrl.type)}
                removeIngredientHandler = {() => props.removeIngredientHandler(ctrl.type)}
                disabled = {props.disabled[ctrl.type]}
            />
        ))}
    </div>
);

export default buildControls;