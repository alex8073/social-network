import React from 'react';
// import bgImage from '../../../assets/images/mertvmore.jpg';
import avatar from './../../../assets/images/samurai-08.jpg';
import Preloader from '../../common/Preloader/Preloader';
// import ProfileStatus from './ProfileStatus';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader/>
    } else {
        return (
            <div>
                {/*<div>*/}
                {/*    <img src={bgImage} alt="" style={{width: 80 + '%'}}/>*/}
                {/*</div>*/}
                <div>
                    <img src={!props.profile || !props.profile.photos.large ? avatar : props.profile.photos.large}
                         alt="" style={{width: 30 + '%'}}/>
                    <ProfileStatusWithHooks status={props.status}
                                   updateStatus={props.updateStatus}/>
                </div>
            </div>
        );
    }
};

export default ProfileInfo;