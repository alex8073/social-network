import UsersReducer, { actions, InitialStateType } from "./users-reducer";

let state: InitialStateType;

beforeEach(() => {
    state = {
        users: [
            {
                id: 0,
                name: "Alexandr",
                status: "user",
                photos: { large: null, small: null },
                followed: false,
            },
            {
                id: 1,
                name: "Alexandr 1",
                status: "user",
                photos: { large: null, small: null },
                followed: false,
            },
            {
                id: 2,
                name: "Alexandr 2",
                status: "user",
                photos: { large: null, small: null },
                followed: true,
            },
            {
                id: 3,
                name: "Alexandr 3",
                status: "user",
                photos: { large: null, small: null },
                followed: true,
            },
        ],
        pageSize: 5,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [],
    };
});

test("follow success", () => {
    const newState = UsersReducer(state, actions.followSuccess(1));

    expect(newState.users[0].followed).toBeFalsy();
    expect(newState.users[1].followed).toBeTruthy();
});

test("unfollow success", () => {
    const newState = UsersReducer(state, actions.unfollowSuccess(2));

    expect(newState.users[1].followed).toBeFalsy();
    expect(newState.users[2].followed).toBeFalsy();
});
