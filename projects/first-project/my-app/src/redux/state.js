import { rerenderEntireTree } from "../render";

let state = {
    reviewsPage: {
        reviewsData: [
            { id: 1, name: 'Вася' },
            { id: 2, name: 'Петя' },
            { id: 3, name: 'Дима' },
            { id: 4, name: 'Вера' },
            { id: 5, name: 'Валя' },
        ],
        messagesData: [
            { id: 1, message: 'Замечательно' },
            { id: 2, message: 'Здорово' },
            { id: 3, message: 'Отлично' },
        ]
    }
}

export let addMessage = (newText) => {
    let newMessage = {
        id: 4,
        message: newText
    };
    state.reviewsPage.messagesData.push(newMessage);
    rerenderEntireTree(state);
}

export default state;