import React from 'react';
import avatar from './../../../assets/images/samurai-08.jpg';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = ({profile, status, updateStatus}) => {
    if (!profile) {
        return <Preloader/>
    } else {
        return (
            <div>
                <img src={!profile || !profile.photos.large ? avatar : profile.photos.large}
                     alt="" style={{width: 30 + '%'}}/>
                <ProfileStatusWithHooks status={status}
                                        updateStatus={updateStatus}/>
            </div>
        );
    }
};

export default ProfileInfo;