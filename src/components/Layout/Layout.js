import React from 'react';
import Aux from '../../hoc/ReactAux'
import classes from './Layout.module.css'

const layout = (props) => (
    <Aux>
        <div>Toolbar, Sidedrawer, backdrop</div>
        <main className = {classes.Content}>
            {props.children}
        </main>
    </Aux>    
);

export default layout;