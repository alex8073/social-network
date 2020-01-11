import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import ReviewsContainer from './Reviews/ReviewsContainer';


const Profile = (props) => {
    return (
        <div>
            <ProfileInfo profile={props.profile}/>
            <ReviewsContainer />
        </div>
    )
};

export default Profile;