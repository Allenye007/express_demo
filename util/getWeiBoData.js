
const superagent = require('superagent');
const cheerio = require('cheerio');
// const async = require('async');
const fs = require('fs');
// const url = require('url');
// const request =require('request');

const URL = 'http://s.weibo.com/top/summary?cate=topicband'; // 微博热搜

var content = [];
superagent.get(URL)
    .end((err, res) => {

        if(err) {
            return console.error(err, 122323);
        }

        let $ = cheerio.load(res.text);

        for(var i = 0; i < $('.td-02').length; i++) {
            let href = $(`tbody tr:nth-child(${[i]}) .td-02 a`).attr('href');
            let title = $(`tbody tr:nth-child(${[i]}) .td-02 a`).text();
            let num = $(`tbody tr:nth-child(${[i]}) .td-02 span`).text();
            var obj = {
                href: href,
                title: title,
                num: num,
            }
            content.push(obj);
        }

        fs.appendFile('../DATA//weibo.json', JSON.stringify(content), 'utf-8', (err) => {
            if(err) {
                console.log(err)
            };
        } )
    })
