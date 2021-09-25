const init_state = {
    username: "",
    fullname: "",
    email: "",
    role: "",
    id: ""
}

export default (state = init_state, action) => {
    switch (action.type) {
        case "USER_LOGIN":
            return { ...state, ...action.payload}
        default:
            return state;
    }
}