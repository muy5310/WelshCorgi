<template>
  <div id="app">
    <p class="title">기록하기</p>
    <div class="form-box">
    <label class="cautionSet">**저장 후 수정, 삭제가 불가능 하니 주의해 주세요**<br>(나한테 따로 말하면 해줌^0^)</label>
    <div class="form-div">
        <!-- <label class="labelSet">보유 KRW</label> -->
        <!-- <button v-if="id != ''&&!doubleCheck" class="doubleBtn" v-on:click="doubleCheckClick">중복 확인</button>  -->
        <!-- :onKeyup="this.id=this.id.replace(/\s/g,'')" -->
        <!-- <i v-if="doubleCheck" class="fas fa-check-circle checkIcon checkTrue"></i> -->
        <input class="input-form" type="number" placeholder="보유 KRW" v-model="user_krw">
    </div>
    <div class="form-div">
        <input class="input-form" type="number" placeholder="총 매수 금액" v-model="user_amount">
    </div>
    <label class="cautionSet" v-show="caution">**모두 입력해 주세요.**</label>
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
            caution:false
        }
    },
    methods:{
        saveClick(){
            if(this.user_krw != '' && this.user_amount != ''){
                this.user_date = this.getDate();
                console.log(this.user_date);
                this.user_total = parseInt(this.user_krw) + parseInt(this.user_amount);
                var list = this.$store.state.record_list;

                this.user_profit = parseInt(this.user_total) - parseInt(list.last_amount);
                list.last_amount = parseInt(this.user_total);
                list.coin_record.unshift({'KRW' : parseInt(this.user_krw), 'buy_amount' : parseInt(this.user_amount), 'date' : this.user_date, 'profit_loss' : parseInt(this.user_profit)})
                if(list.coin_record.length === 1){
                    list.total_profit_loss = 0;
                }
                else{
                    list.total_profit_loss = parseInt(this.user_profit) + parseInt(list.total_profit_loss);
                }
                this.dbWrite(list);

            }
            else{
                this.caution = true;
            }
            
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
        getDate:function(){
            let today = new Date();
            let week =[ '일', '월', '화', '수', '목', '금', '토',]
            let year = today.getFullYear();
            let month = today.getMonth() + 1;
            let date = today.getDate();
            let day = week[today.getDay()];

            return year + "-" + this.zeroAdd(month) + "-" + this.zeroAdd(date) + " " + day;
        },
        zeroAdd(num){
            if (num < 10){
                return "0" + String(num);
            }
            return
        },
        dbWrite(list){
            const db = getDatabase();

            set(ref(db, 'record/' + localStorage.getItem('user_ID')),{
                    name : list.name,
                    coin_record : list.coin_record,
                    total_profit_loss : list.total_profit_loss,
                    last_amount : list.last_amount
            }).then(alert('저장 완료!'),this.$router.push({path:'/'}))
            
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