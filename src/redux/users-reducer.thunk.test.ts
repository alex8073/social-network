import { actions, follow, unfollow } from "./users-reducer";
import { usersAPI } from "../api/users-api";
import { APIResponseType, ResultCodeEnum } from "../api/api";

jest.mock("../api/users-api");
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

let dispatchMock = jest.fn();
let getStateMock = jest.fn();

beforeEach(() => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
    usersAPIMock.follow.mockClear();
    usersAPIMock.unfollow.mockClear();
});

const result: APIResponseType = {
    resultCode: ResultCodeEnum.Success,
    data: {},
    messages: [],
};

usersAPIMock.follow.mockReturnValue(Promise.resolve(result));
usersAPIMock.unfollow.mockReturnValue(Promise.resolve(result));

test("success follow thunk", async () => {
    const thunk = follow(1);
    const ExtraArgumentsMock = {};

    await thunk(dispatchMock, getStateMock, ExtraArgumentsMock);
    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1));
});

test("success unfollow thunk", async () => {
    const thunk = unfollow(2);
    const ExtraArgumentsMock = {};

    await thunk(dispatchMock, getStateMock, ExtraArgumentsMock);
    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 2));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(2));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 2));
});
