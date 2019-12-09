import React from 'react';
import classes from './Welcome.module.css';

const Welcome = () => {
    return (
        <div className={classes.welcome}>
            <div className={classes.welcome_inner_wrapper}>
                <h1 className={classes.welcome_caption}>Кроссплатформенная разработка<br></br> для вашего бизнеса</h1>

                <div className={classes.icons}>
                    <div><img src="../../img/icon_android.svg" alt="" />IOS</div>
                    <div><img src="../../img/jubFc599Rto.jpg" alt="" />Android</div>
                    <div><img src="../../img/bg_main_2.jpg" alt="" />Windows</div>
                    <div><img src="../../img/4icon.png" alt="" />Linux</div>
                </div>
            </div>
        </div>
    )
}

export default Welcome;