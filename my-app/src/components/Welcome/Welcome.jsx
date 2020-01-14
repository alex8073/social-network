import React from 'react';
import styles from './Welcome.module.css';

const Welcome = () => {
    return (
        <div className={styles.welcome}>
            <div className={styles.welcome_inner_wrapper}>
                <h1 className={styles.welcome_caption}>Кроссплатформенная разработка<br></br> <span>Быстрые, надежные, расширяемые системы</span></h1>

                <div className={styles.welcome_icons}>
                    <div>
                        <img src={require("../../assets/images/icon_apple.svg")} alt="" />
                        <p>IOS</p>
                    </div>
                    <div>
                        <img src={require("../../assets/images/icon_android.svg")} alt="" />
                        <p>Android</p>
                    </div>
                    <div>
                        <img src={require("../../assets/images/icon_windows.svg")} alt="" />
                        <p>Windows</p>
                    </div>
                    <div>
                        <img src={require("../../assets/images/icon_linux.svg")} alt="" />
                        <p>Linux</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Welcome;