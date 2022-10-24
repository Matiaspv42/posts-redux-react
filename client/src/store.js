import {createSlice, createAsyncThunk, configureStore} from '@reduxjs/toolkit'
import axios from 'axios'

const URL = 'http://localhost:3001/posts'

const initialStatePosts = {
    posts: [],
    status: 'idle',
    error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async ()=>{
    try {
        const response = await axios.get(URL)
        return [...response.data]
    } catch (error) {
        return error.message
    }
}) 

export const createPost = createAsyncThunk('posts/createPost', async (post)=>{
    try {
        const response = await axios.post(URL, post)
        return response.data
    } catch (error) {
        return error.message
    }
})

export const deletePost = createAsyncThunk('posts/deletePost', async (id) =>{
    try {
        const response = await axios.delete(`${URL}/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
})

const postsSlice = createSlice({
    name: 'posts',
    initialState: initialStatePosts,
    reducers: {
        crearPost: (state,action) => {
            state.posts.push(action.payload)
        }
    },
    extraReducers(builder){
        builder
            .addCase(fetchPosts.pending, (state, action)=>{
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action)=>{
                state.status = 'succeeded'
                state.posts = action.payload
            })
            .addCase(fetchPosts.rejected, (state, action)=>{
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(createPost.fulfilled, (state, action) =>{
                state.status = 'succeeded'
                state.posts.push(action.payload)
            })
            .addCase(deletePost.fulfilled, (state, action)=>{
                state.status = 'succeeded'
                if(state.status === 'succeeded'){
                    state.posts = state.posts.filter((post)=> post.id !== action.payload.id)
                }
            })
    }
})

const initialStateFilter = {
    filter: ''
}

const filterSlice = createSlice({
    name: 'filter',
    initialState: initialStateFilter,
    reducers: {
        addFilter: (state,action) => {
            state.filter = action.payload
        },
    },
})

export const store = configureStore({
    reducer: {
        posts: postsSlice.reducer,
        filter: filterSlice.reducer
    }
})


export const { addFilter } = filterSlice.actions

export const selectAllPosts = (state) => state.posts.posts
export const getPostsStatus = (state) => state.posts.status
export const getPostsError = (state) => state.posts.error