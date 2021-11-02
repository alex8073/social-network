import profileReducer, {addPostCreator, deletePost} from './profile-reducer';
import React from 'react';

let state = {
    posts: [
        {id: 1, message: 'первое сообщение'},
        {id: 2, message: 'второе сообщение'},
        {id: 3, message: 'третье сообщение'}
    ]
};

it('length of post should be incremented', () => {
    let action = addPostCreator('it-kamasutra.com');

    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(4);
});

it('message of new post should be correct', () => {
    let action = addPostCreator('it-kamasutra.com');

    let newState = profileReducer(state, action);
    expect(newState.posts[3].message).toBe('it-kamasutra.com');
});

it('after deleting length of messages should be decrement', () => {
    let action = deletePost(1);

    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(2);
});

it('after deleting length of messages shouldn`t be decrement', () => {
    let action = deletePost(1000);

    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(3);
});