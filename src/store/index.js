import { createSlice, configureStore } from '@reduxjs/toolkit'

const sendedSlice = createSlice({
    name: 'sended',
    initialState: [],
    reducers: {
        add(state, action) {
            state.push(action.payload)
        },
        addArray(state, action) {
            action.payload.forEach(user => {
                state.push(user)
            })
        }
    }
})

const recievedSlice = createSlice({
    name: 'recieved',
    initialState: [],
    reducers: {
        add(state, action) {
            state.push(action.payload)
        },
        addArray(state, action) {
            action.payload.forEach(user => {
                state.push(user)
            })
        },
        delete(state, action) {
            const index = state.indexOf(action.payload);
            if (index > -1) {
            state.splice(index, 1);
            }
        }
    }
})

const credentialSlcie = createSlice({
    name: 'credential', 
    initialState: {username: '', email: '', password:''},
    reducers: {
        set(state, action) {
            state.username = action.payload.username,
            state.email = action.payload.email,
            state.password = action.payload.password
        }
    }
})

const friendSlice = createSlice({
    name: 'friends',
    initialState: [],
    reducers: {
        add(state, action) {
            state.push(action.payload)
        },
        addArray(state, action) {
            action.payload.forEach(user => {
                state.push({name: user.name, room: user.room})
            })
        }
    }
})


const store = configureStore({
    reducer: {
        sended: sendedSlice.reducer,
        recieved: recievedSlice.reducer,
        credential: credentialSlcie.reducer,
        friends: friendSlice.reducer
    }
})

export const sendedAction = sendedSlice.actions
export const recievedAction = recievedSlice.actions
export const credentialAction = credentialSlcie.actions
export const friendAction = friendSlice.actions

export default store