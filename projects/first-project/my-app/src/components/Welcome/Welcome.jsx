import React from 'react';
import classes from './Welcome.module.css';

const Welcome = () => {
    return (
        <div className={classes.welcome}>
            <div className={classes.welcome_inner_wrapper}>
                <h1 className={classes.welcome_caption}>Кроссплатформенная разработка<br></br> для вашего бизнеса</h1>

                <div className={classes.icons}>
                    <div>
                        <img src={require("../../img/icon_apple.svg")} alt="" />
                        <p>IOS</p>
                    </div>
                    <div>
                        <img src={require("../../img/icon_android.svg")} alt="" />
                        <p>Android</p>
                    </div>
                    <div>
                        <img src={require("../../img/icon_windows.svg")} alt="" />
                        <p>Windows</p>
                    </div>
                    <div>
                        <img src={require("../../img/icon_linux.svg")} alt="" />
                        <p>Linux</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Welcome;