import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import { ProfileType } from "../../types/types";

type ProfilePropsType = {
    isOwner: boolean;
    profile: ProfileType | null;
    status: string;
    updateStatus: (status: string) => void;
    savePhoto: (file: File) => void;
    saveProfile: (formData: ProfileType) => Promise<any>;
};

const Profile: React.FC<ProfilePropsType> = ({ isOwner, profile, status, updateStatus, saveProfile, savePhoto }) => {
    return (
        <div>
            <ProfileInfo
                isOwner={isOwner}
                profile={profile}
                status={status}
                updateStatus={updateStatus}
                saveProfile={saveProfile}
                savePhoto={savePhoto}
            />
            <MyPostsContainer />
        </div>
    );
};

export default Profile;
