<template>
  <div id="app">
    <div class="main-box">
        <p class="title">코인기록 -! 코기<label v-on:click="eggClick">!</label><br><label style="font-size:30px">{{name}}</label> 의 웰시코기 >_0</p>
        <div v-if="exist">
            <div class="topLabel">
            
                <label v-if="recordList.length != 1"><i class="fas fa-star-and-crescent moonIcon"></i>총 손익 : <label class="profitSet red" v-bind:class="{'blue': totalAmount < 0}" style="font-size:16px">{{priceTosignString(totalAmount)}}</label></label>
                <label v-else><i class="fas fa-star-and-crescent moonIcon"></i>두번 째 기록부터 <br>손익이 표시 됩니다:)</label>
                <button class="pensilBtn" v-on:click="recordClick">
               <!-- <i class="fas fa-pencil-alt recordIcon" v-on:click="recordClick"></i> -->
                기록하기
                </button>
            
            <!-- <i class="fas fa-plus-square recordIcon" v-on:click="recordClick"></i> -->
            </div>
            <div class="recordBox">
            <div class="recordBoard" v-for="(record, i) in recordList" v-bind:key="i">
                <div class="dateLine">
                    <label class="dateSet">#{{recordList.length - i}}. {{record.date}}</label>
                    <i class="far fa-times-circle removeIcon" v-if="i === 0" v-on:click="removeClick"></i>
                </div>
                <div class="moonLine" v-if="recordList.length - i != 1">
                    <label>
                        <i class="far fa-moon moonIcon"></i>
                    <!-- <label class="profitSet red" v-bind:class="{'blue': record.profit_loss < 0}">{{priceTosignString(record.profit_loss)}}</label> -->
                        <label class="profitSet">{{priceTosignString(record.profit_loss)}}</label>
                    </label>
                </div>
                <div class="moonLine" v-else>
                    <label>
                        <i class="far fa-moon moonIcon"></i>
                        <!-- <label class="profitSet red" v-bind:class="{'blue': record.profit_loss < 0}">{{priceTosignString(record.profit_loss)}}</label> -->
                        <label class="profitSet firstSet">첫 기록!</label>
                    </label>
                </div>
                <div class="totalLine">
                    <label>
                        <i class="fas fa-coins totalIcon"></i>{{priceToString(record.buy_amount + record.KRW)}} <label style="font-size:11px">원</label></label>
                </div>
                <div class="infoDiv">
            <!-- <div class="infoLine">
                <label><i class="fab fa-kickstarter iconSet"></i>{{priceToString(record.KRW)}}</label>
            </div>
            <div class="infoLine">
                <label><i class="fas fa-coins iconSet"></i>{{priceToString(record.buy_amount)}}</label>
            </div></div> -->
                <div class="infoLine">
                    <label><label style="font-size:9px">- 보유 KRW : </label>{{priceToString(record.KRW)}}</label>
                </div>
                <div class="infoLine">
                    <label><label style="font-size:9px">- 총 매수 : </label>{{priceToString(record.buy_amount)}}</label>
                </div>
                </div>
            </div>
            </div>
        </div>
    <div v-else class="centerSet">
        <div class="noneBtn" v-on:click="recordClick"><label class="noneLabel">기록을 시작해 보세요!</label></div>
    </div>
  </div></div>
</template>

<script>
import { getDatabase, ref, onValue, set } from "firebase/database";

export default {
    data(){
        return{
            id : '',
            failed : false,
            totalAmount : 0,
            recordList:[],
            lastAmount: 0,
            exist:false,
            name:''
        }
    },
    mounted(){
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
        priceToString:function(price){
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
        },
        priceTosignString:function(price){
            if(price > 0){
                price = '+' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
                return price
            }
            else if(price < 0){
                return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
            }
        },
        eggClick:function(){
            if(confirm("이스터에그!\n확인을 누른 후 새로 고침!!을 하고 재로그인 해주세요*><*") === true){
                localStorage.clear();
                this.$router.go();
            }
        },
        removeClick:function(){
            if(confirm("기록 삭제\n진짜?!로 기록을 지우시겠습니까?") === true){
                const db = getDatabase();
                if(this.recordList.length > 2){
                    this.totalAmount = parseInt(this.totalAmount) - parseInt(this.recordList[0].profit_loss);
                    this.lastAmount = parseInt(this.recordList[1].buy_amount) + parseInt(this.recordList[1].KRW);
                    this.recordList.shift();

                    set(ref(db, 'record/' + localStorage.getItem('user_ID')),{
                        name : this.name,
                        coin_record : this.recordList,
                        total_profit_loss : this.totalAmount,
                        last_amount : this.lastAmount
                    }).then()  
                }
                else{
                    set(ref(db, 'record/' + localStorage.getItem('user_ID')),{
                        name : this.name,
                        coin_record : "",
                        total_profit_loss : 0,
                        last_amount : 0
                    }).then()  
                }
            }
        },
        loading:function(){
            const db = getDatabase();
            const list = ref(db, 'record/' + this.id);
            // const data = tt.val();
            onValue(list, (check) => {
                const data = check.val();
                if(data.coin_record != ""){
                    this.recordList = data.coin_record;
                    this.$store.state.record_list = data;
                    this.name = data.name;
                    this.lastAmount = data.last_amount;
                    this.totalAmount = data.total_profit_loss;
                    this.exist = true;
                }else{
                    data.coin_record = [];
                    this.$store.state.record_list = data;
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
    padding-top:0;
}
.centerSet{
    /* display: flex; */
    width: 100%;
    /* align-items: center; */
    text-align: center;
}

.title{
    align-items: center;
    font-family: 'S-CoreDream-9Black';
    font-size:19px;
    background: linear-gradient(to right, rgb(248, 201, 225), rgb(114, 3, 189));
    /* background: linear-gradient(to right, rgb(248, 201, 225), rgb(255, 77, 122)); */
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    /* -webkit-text-stroke: 1px rgb(70, 44, 44); */
    margin-top:30px;
    margin-bottom: 30px;
}
.title:hover{
    background: linear-gradient(to right, rgb(248, 201, 225), rgb(255, 77, 122));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
.topLabel{
    display: flex;
    font-size:14px;
    /* border-bottom: 2px solid black; */
    /* font-family: 'S-CoreDream-9Black'; */
}
.pensilBtn{
    font-family: 'IM_Hyemin-Bold';
    margin-left: auto;
    margin-right: 10px;
    border:none;
    border-radius: 5px;
    font-size:12px;
    align-items: center;
    text-align: center;
    border:2px solid #ffbbf6;
    background: none;
    box-shadow : 2px 2px 5px rgb(177, 177, 177);
    /* background-image: linear-gradient(#ffffff, #ffffff), linear-gradient(to right, #fbfcb9be, #ffcdf3aa, #65d3ffaa);
    background-origin: border-box;
    background-clip: content-box, border-box; */
}
.pensilBtn:hover{
    border: 2px solid rgb(202, 123, 255);
}
.recordIcon{
    /* padding-left: 10px; */
    font-size: 13px;
    cursor: pointer;
    background: linear-gradient(to right, rgb(248, 201, 225), rgb(248, 48, 48));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    
}
.recordIcon:hover{
    background: linear-gradient(to right, rgb(248, 201, 225), rgb(255, 77, 122));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
.recordBox{
    display: flex;
    flex-wrap: wrap;
}
.recordBoard{
    box-shadow : 2px 2px 5px rgb(209, 191, 216);
    width:48%;
    margin:0 1%; 
    flex-wrap: wrap;
    font-family: 'BBTreeGB';
     font-family: 'BMJUA';
    /* border: 1px solid black; */
    background-image: linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%);
    /* background-image: linear-gradient(to right, #fbfcb9be, #ffcdf3aa, #65d3ffaa); */
    border-radius: 10px;
    margin-top:10px;
    /* padding:10px; */
    display:flex;
    height: 100%;
}
.dateLine{
    display:flex;
    box-shadow : 2px 2px 5px rgb(218, 202, 224);
    border-radius: 10px 10px 0 0;
    width: 100%;
    padding:3px 10px 5px 10px;
    background-image: linear-gradient(to left, #cd9cf2 0%, #e2d9ff 100%);
    /* background: linear-gradient(to top, rgb(248, 201, 248), rgb(185, 80, 255)); */
    height:20px;
    margin-bottom: 5px;
    font-size:23px;
}
.dateSet{
    font-family: 'S-CoreDream-9Black';
    font-family: 'Uiyeun';
    color:rgb(255, 255, 255);
    /* -webkit-text-stroke: 1px rgb(0, 0, 0); */
}
.removeIcon{
    font-size:13px;
    color: white;
    margin-left:auto;
    margin-top:5px;
}
.removeIcon:active{
    color:blueviolet;
}
.firstSet{
    font-family: 'Uiyeun';
    background-image: linear-gradient(to top, #9e00ce 0%, #fcb7b7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size:18px;
}
.totalLine{
    padding:7px 10px 3px 10px;
    width:100%;
    font-size:14px;
}
.totalIcon{
    margin-right:5px;
    background-image: linear-gradient(to left, #9e00ce 0%, #fcb7b7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
.infoDiv{
    padding: 0px 0px 5px 15px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}
.infoLine{
    padding:2px 0;
    width:100%;
    font-size:11px;
    background-image: linear-gradient(to top, #29323c 0%, #808181 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
.moonLine{
    padding:7px 10px;
    width: 100%;
    display:flex;
    align-items: center;
    /* justify-content: center; */
}
.moonIcon{
    margin-right:5px;
    background-image: linear-gradient(to left, #9e00ce 0%, #fcb7b7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
.profitSet{
    margin-bottom: 2px;
}
.iconSet{
    margin-right:5px;
    background-image: linear-gradient(to left, #ebaaff 0%, #ee9999 100%);
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
.noneBtn{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top:100px;
    border: 5px solid transparent;
    width: 95%;
    font-family: 'IM_Hyemin-Bold';
    border-radius:10px;
    height:100px;
    font-size:18px;
    font-weight:bolder;
    margin:40px 0 10px 0;
    cursor: pointer;
    font-family: 'SDSamliphopangche_Outline';
    color:rgb(58, 38, 41);
    box-shadow : 2px 2px 5px rgb(177, 177, 177);
    /* -webkit-text-stroke: 1px rgb(250, 117, 117); */
    background-image:linear-gradient(#ffffff, #ffffff), linear-gradient(-20deg, #fbfcb9be, #ffcdf3aa, #65d3ffaa);
    background-origin: border-box;
    background-clip: content-box, border-box;
    
    /* background-image: linear-gradient(to left, #ff9a9e 0%, #fecfef 99%, #fecfef 100%); */
}

.noneBtn:active{
    background-image: linear-gradient(to left, #cd9cf2 0%, #e2d9ff 100%);
}

.noneLabel{
    /* font-family: 'BMJUA'; */
    background:linear-gradient(20deg, #e1e28ebe, #ffcdf3aa, #65d3ffaa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
.noneBtn:hover{
    background-image:linear-gradient(-20deg, #fbfcb9be, #ffcdf3aa, #65d3ffaa);
    /* background-image: linear-gradient(to left, #cd9cf2 0%, #e2d9ff 100%); */
    /* color:white;     */
}
.noneBtn:hover .noneLabel{
    background:rgb(255, 251, 251);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
.red{
    font-family: 'Katuri';
    background: linear-gradient(to right, rgb(255, 157, 165), rgb(255, 9, 83));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
.blue{
    background: linear-gradient(to right, rgb(142, 181, 243), rgb(0, 100, 231));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
</style>