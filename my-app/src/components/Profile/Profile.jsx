import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import ReviewsContainer from './Reviews/ReviewsContainer';


const Profile = (props) => {
    return (
        <div>
            <ProfileInfo profile={props.profile}
                         status={props.status}
                         updateStatus={props.updateStatus}/>
            <ReviewsContainer />
        </div>
    )
};

export default Profile;