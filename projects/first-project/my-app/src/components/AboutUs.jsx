import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
    return (
        <div className="about-us">
            <div className="about-us_inner-wrapper">
                <h1 className="about-us_caption">О нас</h1>
                <p className="about-us_description">Компания Senticode была основана в 2018 году группой разработчиков с целью создания качественных решений в области управления разработкой программного обеспечения.  Основная компетенция команды - разработка под .Net (C#) – это прежде всего desktop разработка с использованием технологии WPF, кроссплатформенная с Xamarin Forms, и web – ASP.Core. В области машинного обучения – это Python и C#. Кроме собственной разработки компания занимается выполнением работ на аутсорсинг под .Net (C#).</p>
            </div>
        </div>
    )
}

export default AboutUs;