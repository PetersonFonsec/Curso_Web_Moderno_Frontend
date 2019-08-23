import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isMenuVisible: false,
        user: null
    },
    mutations: {
        toggleMenu( state, isVisible ){
            
            if(!state.user) return state.isMenuVisible = false
            
            isVisible === undefined 
                ? state.isMenuVisible = !state.isMenuVisible
                : state.isMenuVisible = isVisible
        },
        setUser(state, user){
            state.user = user

            if(user){
                axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
                state.isMenuVisible = true
            }else{
                delete axios.defaults.headers.common['Authorization']
                state.isMenuVisible = false
            }
        }
    }
})