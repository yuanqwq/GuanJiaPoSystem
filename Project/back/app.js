const express = require('express');
const cors = require('cors');
const response = require('./midware/response');
const moment = require('moment');
//* 引入错误处理中间件
const errorException = require('./midware/error');
//* 引入数据库
const knex = require('./db/index');

const app = express();
app.use(cors());
app.use(express.json());

// 添加响应中间件，用来返回响应结果
app.use(response);

app.get('/record', async (req, res) => {
    await errorException(req, async () => {
        let whereSql = "";
        let amount1 = Object.keys(req.query).some(key => key === 'amount1');
        let amount2 = Object.keys(req.query).some(key => key === 'amount2');
        let date1 = Object.keys(req.query).some(key => key === 'date1');
        let date2= Object.keys(req.query).some(key => key === 'date2');
        Object.keys(req.query).forEach(key => {
            if(key !== 'amount1' && key !== 'amount2' && key !== 'date1' && key !== 'date2'){
                if(whereSql === ""){
                    whereSql += `${key} = "${req.query[key]}"`;
                }else{
                    whereSql += ` and ${key} = "${req.query[key]}"`;
                }
            }
        });
        if(amount1){
            if(whereSql === ""){
                whereSql += "amount >= " + req.query.amount1;
            }else{
                whereSql += " and amount >= " + req.query.amount1;
            }
        }
        if(amount2){
            if(whereSql === ""){
                whereSql += "amount <= " + req.query.amount2;
            }else{
                whereSql += " and amount <= " + req.query.amount2;
            }
        }
        if(date1){
            if(whereSql === ""){
                whereSql += "date >= " + req.query.date1;
            }else{
                whereSql += " and date >= " + req.query.date1;
            }
        }
        if(date2){
            if(whereSql === ""){
                whereSql += "date <= " + req.query.date2;
            }else{
                whereSql += " and date <= " + req.query.date2;
            }
        }
        let results = await knex('Record2').leftOuterJoin('Card','Record2.CID','Card.CID').
        whereRaw(whereSql);
        results.forEach(item => {
            item.date = moment(item.date).format('YYYY-MM-DD');
        });
        req.success(results);
    })
})

app.post('/series', async (req, res) => {
    await errorException(req, async () => {
        const body = req.body;
        const option = JSON.parse(JSON.stringify(body));
        delete option.Cname;
        switch(body.method){
            case "微信":
                option.CID = 5;
                await knex.raw(`update Card set balance = balance - ${body.amount} where CID = ${option.CID}`);
                break;
            case "支付宝":
                option.CID = 4;
                await knex.raw(`update Card set balance = balance - ${body.amount} where CID = ${option.CID}`);
                break;
            case "现金" || "其他":
                option.CID = null;
                break;
            case "pos机":
                switch(body.Cname[0]){
                    case "中国工商银行":
                        option.CID = 0;
                        break;
                    case "中国农业银行":
                        option.CID = 1;
                        break;
                    case "中国建设银行":
                        option.CID = 2;
                        break;
                    case "中国银行":
                        option.CID = 3;
                        break;
                }
                await knex.raw(`update Card set balance = balance - ${body.amount} where CID = ${option.CID}`);
                break;
        }
        await knex('Record2').insert(option);
        req.success();
    })
})

app.delete('/delete',async (req, res) => {
    await errorException(req, async () => {
        const RID = req.query.RID;
        await knex('Record2').del().where({RID});
        req.success();
    })
})

app.get('/statistic/month', async (req, res) => {
    await errorException(req, async() => {
        const year = req.query.year;
        const month = req.query.month;
        const people = await knex('Record2').select(knex.raw('people as name,sum(amount) as value')).
            whereRaw(`year(date)=${year} and month(date)=${month}`).
            groupByRaw('people');
        const type = await knex('Record2').select(knex.raw('type as name,sum(amount) as value')).
            whereRaw(`year(date)=${year} and month(date)=${month}`).
            groupByRaw('type');
        const method = await knex('Record2').select(knex.raw('method as name,sum(amount) as value')).
            whereRaw(`year(date)=${year} and month(date)=${month}`).
            groupByRaw('method');
        req.success({people, type, method});
    })
})

app.get('/statistic/year', async (req, res) => {
    await errorException(req, async () => {
        const year = req.query.year;
        const data = await knex('Record2').select(knex.raw('month(date) as month, sum(amount) as amount')).
            whereRaw(`year(date)=${year}`).
            groupByRaw('month');
        const results = [];
        [...Array(12).keys()].forEach(item => {
            let temp = data.find(element => {
                return element.month-1 === item; 
            });
            if(temp){
                results.push(temp.amount);
            }else{
                results.push(0);
            }
        });
        req.success(results);
    })
})

//监听85端口,服务启动在该端口
app.listen(85,()=>{
    console.log('server start')
});