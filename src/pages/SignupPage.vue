<template>
  <div id="app">
    <p class="title">회원가입</p>
    <div class="form-box">
    
    <div class="form-div">
        <label class="labelSet">아이디</label>
        <!-- <button v-if="id != ''&&!doubleCheck" class="doubleBtn" v-on:click="doubleCheckClick">중복 확인</button>  -->
        <!-- :onKeyup="this.id=this.id.replace(/\s/g,'')" -->
        <!-- <i v-if="doubleCheck" class="fas fa-check-circle checkIcon checkTrue"></i> -->
        <input class="input-form" type="text" placeholder="아이디" v-model="id" :onKeyup="this.id = this.id.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\s]/,'')">
    </div>
    <div class="form-div">
        <label class="labelSet">비밀번호</label>
        <input class="input-form" type="password" placeholder="비밀번호" v-model="password_one" :onKeyup="this.password_one = this.password_one.replace(/\s/g,'')">
    </div>
    <div class="form-div">
        <label class="labelSet">비밀번호 확인</label>
        <i class="fas fa-check-circle checkIcon" v-bind:class="{'checkTrue':passCheck}"></i>
        <input class="input-form" type="password" placeholder="비밀번호 확인" v-model="password_two" :onKeyup="this.password_two = this.password_two.replace(/\s/g,'')">
    </div>
    <div class="form-div">
        <label class="labelSet">별명</label>
        <input class="input-form" type="text" placeholder="별명" v-model="name" :onKeyup="this.name = this.name.replace(/\s/g,'')">
    </div>
    <label class="cautionSet" v-show="caution">**베타모드 비밀번호는 1234 로 설정해주세요**</label>
    <br>
    <label class="cautionSet" v-show="caution">**실제 사용하는 비밀번호 입력시 정보 유출의 위험이 있습니다.**</label>
    </div>
    <button class="disabledSet" v-bind:class="{'signup-btn': passCheck && id != '' && name != ''}" v-on:click="signupClick" :disabled="passCheck === false">회원가입</button>
    <br>
    <span class="spanSet">또는 <router-link to="/login" class="loginSet"> 로그인</router-link> 으로 돌아가기</span>
    <!-- <button v-on:click="tt">hihi</button> -->
  </div>
</template>

<script>
import { getDatabase, ref, set, onValue } from "firebase/database";

export default {
    data(){
        return{
            id:'',
            name:'',
            password_one:'',
            password_two:'',
            passCheck : false,
            doubleCheck : false,
            alreadyCheck :false,
            writeData:'',
            caution:false
        }
    },
    watch:{
        password_one: function(){
            if(this.password_one === this.password_two){
                this.passCheck = true;
            }
            else{
                this.passCheck = false;
            }
        },
        password_two: function(){
            if(this.password_one === this.password_two){
                this.passCheck = true;
            }
            else{
                this.passCheck = false;
            }
        }
    },
    methods:{
        tt(){
            // console.log('hi');
            // const crypto = require('crypto');
            // const key2 = crypto.scryptSync(this.id,'salt',64,{ N : 1024 } ).toString('hex');
            // // const key = crypto.pbkdf2Sync(this.id, 'salt', 100000, 64, 'sha512').toString('hex');dddddddddddddd
            // console.log(key2)
        },
        // doubleCheckClick:function(){
        //     this.doubleCheck = true;
        // },
        signupClick(){
            const db = getDatabase();
            const already = ref(db, 'users/' + this.id);
            // const data = tt.val();
            onValue(already, (check) => {
                const data = check.val();
                console.log(data);
                if(data === null){
                    this.writeData = true;
                    this.dbWrite();
                }else if(data != null && this.writeData === '') {
                    alert('이미 존재하는 아이디 입니다.\n아이디를 변경해 주세요');
                }
            })
            // console.log(alreadyCheck);
            // if(alreadyCheck){
            //     console.log('jo');
            //     await set(ref(db, 'users/' + this.id),{
            //         id:this.id,
            //         password:this.password_two,
            //         name:this.name
            //     }).then(alert('성공'))

            //     await set(ref(db, 'record/'+this.id),{
            //         name:this.name,
            //         coin_record:[{date:'2021-07-02', KRW: 30000, buy_amount : 60000, profit_loss : 2000},
            //         {date:'2021-07-03', KRW: 20000, buy_amount : 90000, profit_loss : 20000}],
            //         total_profit_loss:22000,
            //         last_amount:11000
            //     }).then(alert('성공2'))
            // }
        },
        dbWrite:function(){
            if(this.password_two != '1234'){
                this.writeData = '';
                this.caution = true;
            }else{
            const db = getDatabase();
            set(ref(db, 'users/' + this.id),{
                    id:this.id,
                    password:this.password_two,
                    name:this.name
            }).then(alert('성공'))

            set(ref(db, 'record/'+this.id),{
                    name:this.name,
                    coin_record:[{date:'2021-07-02', KRW: 30000, buy_amount : 60000, profit_loss : 2000},
                    {date:'2021-07-03', KRW: 20000, buy_amount : 90000, profit_loss : 20000}],
                    total_profit_loss:22000,
                    last_amount:11000
            }).then(this.$router.push({path:'/'}))
            }
        },
        moveLoginClick:function(){
            this.$router.push({path:'/login'});
        },
        test(){
            // SecureRandom rnd = new SecureRandom();
            // byte[] temp = new byte[SALT_SIZE];
            // rnd.nextBytes(temp);
            // return

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
    background: linear-gradient(to right, rgb(248, 201, 225), rgb(114, 3, 189));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    /* -webkit-text-stroke: 1px rgb(70, 44, 44); */
    margin-top:50px;
    margin-bottom: 80px;
}
.title:hover{
    background: linear-gradient(to right, rgb(248, 201, 225), rgb(255, 77, 122));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
.form-div{
    display:flex;
    width:70%;
    /* max-width: 480px; */
    margin:0;
    margin-bottom:10px;
    /* margin:10px; */
    margin-left: auto;
    margin-right: auto;
}
.labelSet{
    /* margin-left: auto; */
    /* margin-right:20px; */
}
.input-form{
    margin-left:auto;
    margin-right:10px;
    border:none;
    width:100px;
    caret-color:pink;
    font-family: 'IM_Hyemin-Bold';
    border-bottom: 1.5px solid rgb(192, 98, 255);
}
.disabledSet{
    border:none;
    width: 75%;
    font-family: 'IM_Hyemin-Bold';
    border-radius:10px;
    height:40px;
    font-size:18px;
    font-weight:bolder;
    margin:40px 0 10px 0;
    background-image:linear-gradient(to left, #d8d8d8 0%, #d8d8d8 100%);
    color:rgba(143, 143, 143);
}
.signup-btn{
    cursor: pointer;
    color:rgb(58, 38, 41);
    box-shadow : 2px 2px 5px rgb(177, 177, 177);
    /* -webkit-text-stroke: 1px rgb(250, 117, 117); */
    background-image: linear-gradient(to left, #cd9cf2 0%, #e2d9ff 100%);
    /* background-image: linear-gradient(to left, #ff9a9e 0%, #fecfef 99%, #fecfef 100%); */
}
.signup-btn:active{
    background-image: linear-gradient(to left, #ff9a9e 0%, #fecfef 99%, #fecfef 100%);
}
.signup-btn:hover{
    background-image: linear-gradient(to left, #ff9a9e 0%, #fecfef 99%, #fecfef 100%);
}

.spanSet{
    font-size:12px;
}
.loginSet{
    font-size:15px;
}
.loginSet:hover{
    color:rgb(246, 84, 125);
}
.loginSet:active{
    color:rgb(246, 84, 125);
}
.checkIcon{
    margin: 2px 0 0 5px;
    color: rgb(199, 199, 199);
}
.checkTrue{
    color: rgb(253, 170, 209);
}
.cautionSet{
    color:rgb(253, 112, 112);
    margin-top:10px;
    font-size: 12px;
}
</style>