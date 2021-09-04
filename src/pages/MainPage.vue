<template>
  <div id="app">
      <div class="centerSet">
          <p class="title">코인기록 -! {{name}}의 웰시코기 >_0</p>
      </div>
      <div class="iconDiv">
          기록하러 가기 <i class="fas fa-plus-square recordIcon" v-on:click="recordClick"></i>
      </div>
    
    <div class="main-box" v-if="exist">
        <div>
            현재 총 손익 : {{totalAmount}}
        </div>
        <div class="recordSet" v-for="(record, i) in recordList" v-bind:key="i">
            <label>날짜 : {{record.date}}</label>
            <br>
            <label>보유 KRW : {{record.KRW}}</label>
            <br>
            <label>매수 금액 : {{record.buy_amount}}</label>
            <br>
            <label>전 기록 대비 손익 : {{record.profit_loss}}</label>
        </div>
    </div>
    <div v-else class="centerSet">
        <button class="noneBtn" v-on:click="recordClick">기록을 시작해보세요!</button>
    </div>
   
  </div>
</template>

<script>
import { getDatabase, ref, onValue } from "firebase/database";

export default {
    data(){
        return{
            id : '',
            failed : false,
            totalAmount : 0,
            recordList:[],
            lastAmount: 0,
            exist:false
        }
    },
    created(){
        this.id = localStorage.getItem('user_ID')
        if(this.id === null){
            this.$router.push({path:'/login'});
        }
        else{
            this.loading();
        }
    },
    methods:{
        recordClick:function(){
            this.$router.push({path:'/record'});
        },
        loading:function(){
            const db = getDatabase();
            const list = ref(db, 'record/' + this.id);
            // const data = tt.val();
            onValue(list, (check) => {
                const data = check.val();
                console.log(data);
                if(data != ""){
                    this.recordList = data.coin_record;
                    this.$store.state.record_list = data;
                    this.name = data.name;
                    this.lastAmount = data.last_amount;
                    this.totalAmount = data.total_profit_loss;
                    this.exist = true;
                }else{
                    this.exist = false;
                }
            })
       }
    }
}
</script>

<style scoped>
#app{
    
    width: 100%;
}
.main-box{
    padding:20px;
}
.centerSet{
    /* display: flex; */
    width: 100%;
    /* align-items: center; */
    text-align: center;
}
.iconDiv{
    padding-left: 20px;
    display: flex;
    align-items: center;
}
.recordIcon{
    padding-left: 10px;
    font-size: 20px;
    cursor: pointer;
     background: linear-gradient(to right, rgb(248, 201, 225), rgb(114, 3, 189));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
.recordIcon:hover{
    background: linear-gradient(to right, rgb(248, 201, 225), rgb(255, 77, 122));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
   
}
.noneBox{
    background: linear-gradient(to right, rgb(248, 201, 225), rgb(255, 77, 122));
    margin-top:90px;
    width: 100%;
    /* align-items: center; */
    text-align: center;
    font-size: 20px;
}
.title{
    align-items: center;
    font-family: 'S-CoreDream-9Black';
    font-size:25px;
    background: linear-gradient(to right, rgb(248, 201, 225), rgb(255, 77, 122));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    /* -webkit-text-stroke: 1px rgb(70, 44, 44); */
    margin-top:30px;
    margin-bottom: 30px;
}
.title:hover{
    background: linear-gradient(to right, rgb(248, 201, 225), rgb(114, 3, 189));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
.recordSet{
    /* border: 1px solid black; */
    background-image: linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%);
    /* background-image: linear-gradient(to right, #fbfcb9be, #ffcdf3aa, #65d3ffaa); */
    border-radius: 10px;
    margin-top:10px;
    padding:10px;
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
.noneBtn{
    margin-top:100px;
    margin-left: auto;
    margin-right: auto;
    border:none;
    width: 50%;
    font-family: 'IM_Hyemin-Bold';
    border-radius:10px;
    height:100px;
    font-size:18px;
    font-weight:bolder;
    margin:40px 0 10px 0;
    cursor: pointer;
    color:rgb(58, 38, 41);
    /* box-shadow : 2px 2px 5px rgb(177, 177, 177); */
    /* -webkit-text-stroke: 1px rgb(250, 117, 117); */
    background-image: linear-gradient(to left, #ff9a9e 0%, #fecfef 99%, #fecfef 100%);
}
.noneBtn:active{
    background-image: linear-gradient(to left, #cd9cf2 0%, #e2d9ff 100%);
}
.noneBtn:hover{
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
</style>