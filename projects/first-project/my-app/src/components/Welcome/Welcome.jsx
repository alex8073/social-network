import React from 'react';
import classes from './Welcome.module.css';

const Welcome = () => {
    return (
        <div className={classes.welcome}>
            <div className={classes.welcome_inner_wrapper}>
                <h1 className={classes.welcome_caption}>Кроссплатформенная разработка<br></br> для вашего бизнеса</h1>
            </div>
        </div>
    )
}

export default Welcome;