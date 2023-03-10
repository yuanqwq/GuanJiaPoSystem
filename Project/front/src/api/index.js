const axios = require('axios');

axios.defaults.baseURL="http://127.0.0.1:85";

export default{
    getAllItems(item){
        const temp = {};
        Object.keys(item).forEach(key => {
            if(item[key] !== null && item[key] !== "" && item[key] !== [] && typeof item[key] !== "undefined"){
                temp[key] = item[key];          
            }
        });
        return axios({
            method:'get',
            url:'/record',
            params:temp
        })
    },
    addItem(item){
        const temp = {};
        Object.keys(item).forEach(key => {
            if(key == 'type' || key == 'method' || key == 'people'){
                temp[key] = item[key][item[key].length - 1];
            }else{
                temp[key] = item[key];
            }
        });
        return axios({
            method:'post',
            url:'/series',
            data:temp
        })
    },
    delItem(RID){
        return axios({
            method:'delete',
            url:'/delete',
            params:{
                RID
            }
        })
    },
    analyseMonth(month,year){
        return axios({
            method:'get',
            url:'/statistic/month',
            params:{
                month,
                year
            }
        })
    },
    analyseYear(year){
        console.log(year);
        return axios({
            method:'get',
            url:'/statistic/year',
            params:{
                year
            }
        })
    }
}