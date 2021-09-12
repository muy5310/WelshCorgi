<template>
  <div id="app">
    <p class="title">입출금 기록</p>
    <div class="form-box">
    <label class="cautionSet">**저장 후 수정,삭제가 불가능 하니 주의해 주세요**<br></label>
    <label class="cautionSet">*입출금 내역 조회 기능은 나중에 . . *<br></label>
    <div class="radio-div">
        <!-- <label class="labelSet">보유 KRW</label> -->
        <!-- <button v-if="id != ''&&!doubleCheck" class="doubleBtn" v-on:click="doubleCheckClick">중복 확인</button>  -->
        <!-- :onKeyup="this.id=this.id.replace(/\s/g,'')" -->
        <!-- <i v-if="doubleCheck" class="fas fa-check-circle checkIcon checkTrue"></i> -->
       
        <input type="radio" id="deposit" v-model="radioValues" value="deposit"><label for="deposit">입금</label>
        <input type="radio" id="withdraw" v-model="radioValues" value="withdraw"><label for="withdraw">출금</label>
    </div>
    <div class="form-div">
        <input class="input-form" type="number" placeholder="금액" v-model="user_amount">
    </div>
    <label class="cautionSet" v-show="caution">**금액을 입력해 주세요.**</label>
    <br>
    <button class="saveBtn" v-on:click="saveClick">저장</button>
    <br>
    <span class="spanSet"> <router-link to="/" class="loginSet"> 메인화면</router-link> 으로 돌아가기</span>
  </div></div>
</template>

<script>
import { getDatabase, ref, set, } from "firebase/database";

export default {
    data(){
        return{
            user_krw:'',
            user_amount:'',
            user_total:'',
            user_profit:'',
            user_date:'',
            caution:false,
            radioValues:'deposit'
        }
    },
    methods:{
        saveClick(){
            if(this.user_amount != ''){
                var list = this.$store.state.record_list;
                if(this.radioValues === 'deposit'){
                    list.last_amount = parseInt(list.last_amount) + parseInt(this.user_amount);
                    this.dbWrite(list);
                }
                else{
                    list.last_amount = parseInt(list.last_amount) - parseInt(this.user_amount);
                    this.dbWrite(list);
                }
            }
            else{
                this.caution = true;
            }
        },
        
        dbWrite(list){
            const db = getDatabase();

            set(ref(db, 'record/' + localStorage.getItem('user_ID') ),{
                    name : list.name,
                    coin_record : list.coin_record,
                    total_profit_loss : list.total_profit_loss,
                    last_amount : list.last_amount
            }).then(this.$router.push({path:'/'}),alert('기록 완료!'))
            
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
    margin-bottom: 10px;
}
.title:hover{
    background: linear-gradient(to right, rgb(248, 201, 225), rgb(114, 3, 189));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
.radio-div{
    align-items: center;
    width:70%;
    /* max-width: 480px; */
    margin:0;
    margin-bottom:10px;
    /* margin:10px; */
    
    margin-top:10px;
    margin-left: auto;
    margin-right: auto;
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
    margin-right:auto;
    border:none;
    height: 40px;
    width:70%;
    caret-color:rgb(192, 98, 255);
    font-family: 'IM_Hyemin-Bold';
    border-bottom: 1.5px solid pink;
}
.saveBtn{
    border:none;
    width: 60%;
    font-family: 'IM_Hyemin-Bold';
    border-radius:10px;
    height:40px;
    font-size:18px;
    font-weight:bolder;
    margin:30px 0 15px 0;
    cursor: pointer;
    color:rgb(58, 38, 41);
    box-shadow : 2px 2px 5px rgb(177, 177, 177);
    /* -webkit-text-stroke: 1px rgb(250, 117, 117); */
    background-image: linear-gradient(to left, #ff9a9e 0%, #fecfef 99%, #fde5f6 100%);

    /* background-image: linear-gradient(to left, #ff9a9e 0%, #fecfef 99%, #fecfef 100%); */
}
.saveBtn:active{
        background-image: linear-gradient(to left, #cd9cf2 0%, #e2d9ff 100%);
}
.saveBtn:hover{
        background-image: linear-gradient(to left, #cd9cf2 0%, #e2d9ff 100%);
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