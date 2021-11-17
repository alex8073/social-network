import React, { ChangeEvent, useState } from "react";
import avatar from "./../../../assets/images/samurai-08.jpg";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataFormReduxForm from "./ProfileDataForm";
import { ContactsType, ProfileType } from "../../../types/types";

type PropsType = {
    profile: ProfileType | null;
    status: string;
    isOwner: boolean;
    updateStatus: (status: string) => void;
    savePhoto: (file: File) => void;
    saveProfile: (formData: ProfileType) => Promise<any>;
};

const ProfileInfo: React.FC<PropsType> = ({ profile, status, isOwner, updateStatus, savePhoto, saveProfile }) => {
    let [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader />;
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhoto(e.target.files[0]);
        }
    };

    const onSubmit = (formData: ProfileType) => {
        //TODO вынести then из компонента
        saveProfile(formData).then(() => {
            setEditMode(false);
        });
    };

    return (
        <div>
            <img src={!profile || !profile.photos.large ? avatar : profile.photos.large} alt="" style={{ width: 30 + "%" }} />
            {isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}

            {editMode ? (
                <ProfileDataFormReduxForm initialValues={profile} profile={profile} onSubmit={onSubmit} />
            ) : (
                <ProfileData
                    goToEditMode={() => {
                        setEditMode(true);
                    }}
                    profile={profile}
                    isOwner={isOwner}
                />
            )}

            <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
        </div>
    );
};

type ProfileDataPropsType = {
    profile: ProfileType;
    isOwner: boolean;
    goToEditMode: () => void;
};

const ProfileData: React.FC<ProfileDataPropsType> = ({ profile, isOwner, goToEditMode }) => {
    return (
        <div>
            {isOwner && (
                <div>
                    <button onClick={goToEditMode}>Edit</button>
                </div>
            )}
            <div>
                <b>Full name: </b> {profile.fullName}
            </div>
            <div>
                <b>Looking for a job: </b> {profile.lookingForAJob ? "yes" : "no"}
            </div>
            {profile.lookingForAJobDescription && (
                <div>
                    <b>My professional skills: </b> {profile.lookingForAJobDescription}
                </div>
            )}
            <div>
                <b>About me: </b> {profile.aboutMe}
            </div>
            <div>
                <b>Contacts: </b>{" "}
                {Object.keys(profile.contacts).map((key) => {
                    return <Contacts key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]} />;
                })}
            </div>
        </div>
    );
};

type ContactsPropsType = {
    contactTitle: string;
    contactValue: string;
};

const Contacts: React.FC<ContactsPropsType> = ({ contactTitle, contactValue }) => {
    return (
        <div>
            <b>{contactTitle}: </b>
            {contactValue}
        </div>
    );
};

export default ProfileInfo;
