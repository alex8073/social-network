const reviewsReducer = (state, action) => {
    if (action.type === ADD_MESSAGE) {
        let newMessage = {
            id: 4,
            message: this._state.reviewsPage.newMessageText
        };
        this._state.reviewsPage.messagesData.push(newMessage);
        this._state.reviewsPage.newMessageText = '';
        this._callSubscriber(this._state);
    } else if (action.type === UPDATE_NEW_MESSAGE_TEXT) {
        this._state.reviewsPage.newMessageText = action.newText;
        this._callSubscriber(this._state);
    } else if (action.type === UPDATE_NEW_POST_BODY) {
        this._state.testPagePage.newPostBody = action.body;
        this._callSubscriber(this._state);
    } else if (action.type === ADD_POST) {
        let body = this._state.testPagePage.newPostBody;
        this._state.testPagePage.posts.push({
            id: 4,
            message: body
        });
        this._state.testPagePage.newPostBody = '';
        this._callSubscriber(this._state);
    }


    return state;
}