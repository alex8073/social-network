const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';

let initialState = {
    users: [
        // {id: 1, photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Dmitry_Nagiev_2017_4.jpg/274px-Dmitry_Nagiev_2017_4.jpg',
        //     followed: false, fullName: 'Alex', status: 'boss', location: {city: 'Minsk', country: 'Belarus'}},
        // {id: 2, photoUrl: 'https://vokrug.tv/pic/person/9/d/5/0/9d5005ea3a93da03696c0c3194be3b8a.jpg',
        //     followed: true, fullName: 'Ivan', status: 'boss', location: {city: 'Moscow', country: 'Russia'}},
        // {id: 3, photoUrl: 'https://vokrug.tv/pic/person/6/2/d/c/62dc840fdbc7016571d8bd2031a1215b.jpg',
        //     followed: false, fullName: 'Elena', status: 'boss', location: {city: 'Kiev', country: 'Ukraine'}}
    ]
}

const UsersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true};
                    }
                    return u;
                }),
            };
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false};
                    }
                    return u;
                }),
            };
        case SET_USERS:
            return {...state, users: [...state.users, ...action.users]}
        default:
            return state;
    }
};

export const followAC = (userId) => ({type: FOLLOW, userId: userId});
export const unfollowAC = (userId) => ({type: UNFOLLOW, userId: userId});
export const setUsersAC =  (users) => ({type: SET_USERS, users: users});

export default UsersReducer;