import profileReducer, { actions } from "./profile-reducer";

let state = {
    posts: [
        { id: 1, message: "первое сообщение" },
        { id: 2, message: "второе сообщение" },
        { id: 3, message: "третье сообщение" },
    ],
    profile: null,
    status: "",
};

it("length of post should be incremented", () => {
    let action = actions.addPostCreator("it-kamasutra.com");

    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(4);
});

it("message of new post should be correct", () => {
    let action = actions.addPostCreator("it-kamasutra.com");

    let newState = profileReducer(state, action);
    expect(newState.posts[3].message).toBe("it-kamasutra.com");
});

it("after deleting length of messages should be decrement", () => {
    let action = actions.deletePost(1);

    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(2);
});

it("after deleting length of messages shouldn't be decrement", () => {
    let action = actions.deletePost(1000);

    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(3);
});
