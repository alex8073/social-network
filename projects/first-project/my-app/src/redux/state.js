let rerenderEntireTree = () => {}

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
        ],
        newMessageText: 'Senticode.by'
    }
}

window.state = state;

export const addMessage = () => {
    let newMessage = {
        id: 4,
        message: state.reviewsPage.newMessageText
    };
    state.reviewsPage.messagesData.push(newMessage);
    state.reviewsPage.newMessageText = '';
    rerenderEntireTree(state);
}

export const updateNewMessageText = (newText) => {
    state.reviewsPage.newMessageText = newText;
    rerenderEntireTree(state);
}

export const subscribe = (observer) => {
    rerenderEntireTree = observer;
}

export default state;