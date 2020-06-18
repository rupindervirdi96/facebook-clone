import {
    NEW_CHAT,
    NEW_MESSAGE,
    REMOVE_CHAT
}

    from "./types";
// import io from "socket.io-client";

import axios from "axios";
import io from "socket.io-client";

export const getMessages = (chatId) => async dispatch => {
    axios.defaults.headers.common['x-auth-token'] = JSON.parse(sessionStorage.getItem('auth'));
    var res = await axios.get(`http://localhost:5000/messages/${chatId}`)

    dispatch({
        type: NEW_CHAT,
        data: res.data
    }

    )
}

export const saveMessage = (data) => async dispatch => {
    
    io("http://localhost:5000").emit("input chat message", data);



}

export const sendMessage = (data) => async dispatch => {


    dispatch({
        type: NEW_MESSAGE,
        data: data
    })
    document
        .querySelector(".messagesWindow")
        .scrollTo(0, document.querySelector(".messagesWindow").scrollHeight);

}

export const removeChat = (id) => dispatch => {
    dispatch({
        type: REMOVE_CHAT,
        data: id
    })
}