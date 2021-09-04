import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        record_list : []
    },
    // mutations: {
    //     setFirstData: function(state, accountName, accountWord, remitMoney, message){
    //         return state.accountName = accountName, 
    //                 state.accountWord = accountWord, 
    //                 state.remitMoney = remitMoney,
    //                 state.message = message
    //     }
    // },
    // getters: {
    //     getFirstData(state){
    //         return state.accountName, this.accountWord, state.remitMoney, state.message;
    //     }
    // }
})