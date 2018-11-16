// 搞笑数据
const superagent = require('superagent');
const cheerio = require('cheerio');
// const async = require('async');
const fs = require('fs');
// const url = require('url');
// const request =require('request');


var content = [];

const U1 = 'https://bj.fang.lianjia.com/loupan/pg1/'  // 北京链家

// 页数
// https://bj.fang.lianjia.com/loupan/pg3/  // 第三页


for(var i = 1; i <= 10; i++) {
    // 把每一页网址获取
    var url = `https://bj.fang.lianjia.com/loupan/pg${i}/`;
    // var url = `https://bj.fang.lianjia.com/loupan/pg${1}/`;

    superagent.get(url)
        .end(((err, res) => {
            if(err) {
                console.log(err);
            }
            let $ = cheerio.load(res.text);

            for(var i = 1; i < $('.resblock-list-wrapper>.resblock-list').length; i++) {
                let href = $(`ul li:nth-child(${[i]}) .resblock-img-wrapper `).attr('href');
                href = 'https://bj.fang.lianjia.com'+`${href}`; // 全网址  
                let imgSrc = $(`ul li:nth-child(${[i]}) .lj-lazy`).attr('data-original');

                let title = $(`ul li:nth-child(${[i]}) .resblock-name .name`).text();   // 万科大都会滨江N2
                let lab1 = $(`ul li:nth-child(${[i]}) .resblock-name .resblock-type`).text(); // 住宅
                let lab2 = $(`ul li:nth-child(${[i]}) .resblock-name span:nth-child(3)`).text(); // 在售

                let address1 = $(`ul li:nth-child(${[i]}) .resblock-location span:nth-child(1)`).text(); // 通州
                let address2 = $(`ul li:nth-child(${[i]}) .resblock-location span:nth-child(3)`).text(); // 北关
                let address3 = $(`ul li:nth-child(${[i]}) .resblock-location a`).text(); // 具体地址

                let area = $(`ul li:nth-child(${[i]}) .resblock-area span`).text(); // 建面 128-275㎡

                let price = $(`ul li:nth-child(${[i]}) .resblock-price .number`).text(); // 总价
                let priceSec = $(`ul li:nth-child(${[i]}) .resblock-price .second`).text(); // 总价

                var obj = {
                    href: href,
                    imgSrc: imgSrc,
                    title: title,
                    lab1: lab1,
                    lab2: lab2,
                    address1: address1,
                    address2: address2,
                    address3: address3,
                    area: area,
                    price: price,
                    priceSec: priceSec,
                }

                content.push(obj);
            }

            fs.appendFile('../DATA//lianjia.json', JSON.stringify(content), 'utf-8', (err) => {
                if(err) {
                    console.log(err)
                };
            } )
            
        }))
}
// console.log(content)

// return;

