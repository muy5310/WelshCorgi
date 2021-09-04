import Vue from 'vue'
import App from './App.vue'
import './js/registerServiceWorker.js'
import VueRouter from 'vue-router'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {store} from "./js/store";

import {MainPage, RecordPage, LoginPage, SignupPage} from './js'

Vue.config.productionTip = false

Vue.use(VueRouter);


const router = new VueRouter({
  mode:'history',
  routes:[{
    path:'/',
    component:MainPage
  },{
    path:'/record',
    component:RecordPage
  },{
    path:'/login',
    component:LoginPage
  },{
    path:'/signup',
    component:SignupPage
  }]
})

const config = {
  apiKey: "AIzaSyA83To6uXLK64qgIUhrzJhUH8yG5Q8muBw",
  authDomain: "welshcorgi-b9d51.firebaseapp.com",
  databaseURL: "https://welshcorgi-b9d51-default-rtdb.firebaseio.com",
  projectId: "welshcorgi-b9d51",
  storageBucket: "welshcorgi-b9d51.appspot.com",
  messagingSenderId: "751291080608",
  appId: "1:751291080608:web:d474fbe4314ac631980ec5",
  measurementId: "G-F6RQ10ZE09"
};

const app = initializeApp(config);
const analytics = getAnalytics(app);

new Vue({
  store: store,
  render: h => h(App),
  router,
  analytics
}).$mount('#app')