import React from 'react';
import avatar from './../../../assets/images/samurai-08.jpg';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto}) => {
    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    };


    return (
        <div>
            <img src={!profile || !profile.photos.large ? avatar : profile.photos.large}
                 alt="" style={{width: 30 + '%'}}/>
            {isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
            <ProfileStatusWithHooks status={status}
                                    updateStatus={updateStatus}/>
        </div>
    );
};

export default ProfileInfo;