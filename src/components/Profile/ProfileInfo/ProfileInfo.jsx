import React, {useState} from 'react';
import avatar from './../../../assets/images/samurai-08.jpg';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import ProfileDataFormReduxForm from './ProfileDataForm';

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {

    let [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    };

    const onSubmit = (formData) => {
        saveProfile(formData).then(
            ()=> {setEditMode(false)}
        );
    };

    return (
        <div>
            <img src={!profile || !profile.photos.large ? avatar : profile.photos.large}
                 alt="" style={{width: 30 + '%'}}/>
            {isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}

            {editMode
                ? <ProfileDataFormReduxForm initialValues={profile}
                                            profile={profile}
                                            onSubmit={onSubmit}/>
                : <ProfileData goToEditMode={() => {
                    setEditMode(true)
                }}
                               profile={profile}
                               isOwner={isOwner}/>}

            <ProfileStatusWithHooks status={status}
                                    updateStatus={updateStatus}/>
        </div>
    );
};

const ProfileData = ({profile, isOwner, goToEditMode}) => {
    return <div>
        {isOwner &&
        <div>
            <button onClick={goToEditMode}>Edit</button>
        </div>
        }
        <div>
            <b>Full name: </b> {profile.fullName}
        </div>
        <div>
            <b>Looking for a job: </b> {profile.lookingForAJob ? 'yes' : 'no'}
        </div>
        {profile.lookingForAJobDescription &&
        <div>
            <b>My professional skills: </b> {profile.lookingForAJobDescription}
        </div>
        }
        <div>
            <b>About me: </b> {profile.aboutMe}
        </div>
        <div>
            <b>Contacts: </b> {Object.keys(profile.contacts).map(key => {
            return <Contacts key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
        })}
        </div>
    </div>
};

const Contacts = ({contactTitle, contactValue}) => {
    return <div>
        <b>{contactTitle}: </b>{contactValue}
    </div>
};

export default ProfileInfo;