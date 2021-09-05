<template>
  <div id="app">
    <p class="title">로그인</p>
    <div class="form-box">
    <div class="inputBox">
        <input class="inputForm" type="text" placeholder="아이디" v-model="id" :onKeyup="this.id = this.id.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\s]/,'')">
    </div>
    <div class="blankSet" v-show="idBlank">
        <span class="failedSet">아이디를 입력해 주세요.</span>
    </div>
    
    <div class="inputBox">
        <input class="inputForm" type="password" placeholder="비밀번호" v-model="password" :onKeyup="this.password = this.password.replace(/\s/g,'')">
    </div>
    <div class="blankSet" v-show="passwordBlank">
        <span class="failedSet">비밀번호를 입력해 주세요.</span>
    </div>
    <span v-show="failed" class="failedSet">아이디 혹은 비밀번호가 일치하지 않습니다.</span>
    <button class="disabledSet loginBtn" v-on:click="loginClick">로그인</button>
    <br>
    <span class="spanSet">계정이 없다면 <router-link to="/signup" class="signupSet"> 회원가입</router-link> 을 먼저 진행해 주세요>_0</span>
    <!-- <button v-on:click="tt">hihi</button> -->
    </div>
  </div>
</template>

<script>
import { getDatabase, ref, onValue } from "firebase/database";

export default {
    data(){
        return{
            id:'',
            password:'',
            failed:false,
            idBlank:false,
            passwordBlank:false
        }
    },
    methods:{
       loginClick:function(){
           if(this.id === ''){
               this.idBlank = true;
               this.passwordBlank = false;
           }
           else if(this.password === ''){
               this.idBlank = false;
               this.passwordBlank = true;
           }else{
               this.idBlank = false;
               this.passwordBlank = false;
               this.readDB();
           }
       },
       readDB:function(){
            const db = getDatabase();
            const already = ref(db, 'users/' + this.id);
            // const data = tt.val();
            onValue(already, (check) => {
                const data = check.val();
                if(data === null){
                    this.failed = true;
                    this.password = '';
                }else if(data != null) {
                    if(data.password === this.password){
                        localStorage.setItem('user_ID', this.id);
                        this.$router.push({path:'/'});
                    }else{
                        this.failed = true;
                        this.password = '';
                    }
                }
            })
       }
    }

}
</script>

<style scoped>
#app{
    
    width: 100%;
    text-align:center;
}
.title{
    font-family: 'S-CoreDream-9Black';
    font-size:25px;
    background: linear-gradient(to right, rgb(248, 201, 225), rgb(255, 77, 122));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    /* -webkit-text-stroke: 1px rgb(70, 44, 44); */
    margin-top:50px;
    margin-bottom: 80px;
}
.title:hover{
    background: linear-gradient(to right, rgb(248, 201, 225), rgb(114, 3, 189));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
.inputBox{
    /* border:none; */
    width: 70%;
    font-family: 'IM_Hyemin-Bold';
    border-radius:5px;
    height:40px;
    font-size:18px;
    margin:40px 0 10px 0;
    border: 2px solid transparent;
    border-radius: 5px;
    background-image: linear-gradient(#ffffff, #ffffff), linear-gradient(to right, #fcccb9be, #ffcdf3aa, #65d3ffaa);
    background-origin: border-box;
    background-clip: content-box, border-box;
    margin: 10px;
    margin-left:auto;
    margin-right:auto;
}
.inputForm{
    height: 35px;
    width:95%;
    caret-color:rgb(95, 37, 231);
    font-family: 'IM_Hyemin-Bold';
    font-size: 16px;
    border:none;
    /* border-bottom: 1.5px solid rgb(192, 98, 255); */
}
.disabledSet{
    border:none;
    width: 70%;
    font-family: 'IM_Hyemin-Bold';
    border-radius:10px;
    height:40px;
    font-size:18px;
    font-weight:bolder;
    margin:40px 0 10px 0;
    background-image:linear-gradient(to left, #d8d8d8 0%, #d8d8d8 100%);
    color:rgba(143, 143, 143);
}
.loginBtn{
    cursor: pointer;
    color:rgb(58, 38, 41);
    box-shadow : 2px 2px 5px rgb(177, 177, 177);
    /* -webkit-text-stroke: 1px rgb(250, 117, 117); */
    background-image: linear-gradient(to left, #ff9a9e 0%, #fecfef 99%, #fecfef 100%);
}
.loginBtn:active{
    background-image: linear-gradient(to left, #cd9cf2 0%, #e2d9ff 100%);
}
.loginBtn:hover{
    background-image: linear-gradient(to left, #cd9cf2 0%, #e2d9ff 100%);
}
.failedSet{
    color:rgb(255, 64, 64);
}
.spanSet{
    font-size:12px;
}
.signupSet{
    font-size:15px;
}
.signupSet:hover{
    color:rgb(246, 84, 125);
}
.signupSet:active{
    color:rgb(246, 84, 125);
}
.blankSet{
    width:70%;
    margin-right: auto;
    margin-left:auto;
    text-align: left;
    font-size:13px;
}
</style>