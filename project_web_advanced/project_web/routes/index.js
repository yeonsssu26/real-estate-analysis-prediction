var express = require('express');
const fs = require('fs');
var router = express.Router();

/* GET home page. */
router.all('/', function(req, res, next) {
  const path = '/home/hadoop/project_web_advanced/crawling/data/';

  var nationData = fs.readFileSync(path+'nation.json', 'utf8');
  nationData = JSON.parse(nationData);

  var seoulData = fs.readFileSync(path+'seoul.json', 'utf8');
  seoulData = JSON.parse(seoulData);

  var gyeonggiData = fs.readFileSync(path+'gyeonggi.json', 'utf8');
  gyeonggiData = JSON.parse(gyeonggiData);

  var incheonData = fs.readFileSync(path+'incheon.json', 'utf8');
  incheonData = JSON.parse(incheonData);

  var busanData = fs.readFileSync(path+'busan.json', 'utf8');
  busanData = JSON.parse(busanData);

  var daeguData = fs.readFileSync(path+'daegu.json', 'utf8');
  daeguData = JSON.parse(daeguData);

  var gwangjuData = fs.readFileSync(path+'gwangju.json', 'utf8');
  gwangjuData = JSON.parse(gwangjuData);

  var daejeonData = fs.readFileSync(path+'daejeon.json', 'utf8');
  daejeonData = JSON.parse(daejeonData);

  var sejongData = fs.readFileSync(path+'sejong.json', 'utf8');
  sejongData = JSON.parse(sejongData);

  var ulsanData = fs.readFileSync(path+'ulsan.json', 'utf8');
  ulsanData = JSON.parse(ulsanData);

  var gangwonData = fs.readFileSync(path+'gangwon.json', 'utf8');
  gangwonData = JSON.parse(gangwonData);

  var chungcheongData = fs.readFileSync(path+'chungcheong.json', 'utf8');
  chungcheongData = JSON.parse(chungcheongData);

  var gyeongsangData = fs.readFileSync(path+'gyeongsang.json', 'utf8');
  gyeongsangData = JSON.parse(gyeongsangData);

  var jeollaData = fs.readFileSync(path+'jeolla.json', 'utf8');
  jeollaData = JSON.parse(jeollaData);

  var jejuData = fs.readFileSync(path+'jeju.json', 'utf8');
  jejuData = JSON.parse(jejuData);

  res.render('index', { nation_news: nationData.news, seoul_news: seoulData.news, gyeonggi_news: gyeonggiData.news, incheon_news: incheonData.news, busan_news: busanData.news, daegu_news: daeguData.news, gwangju_news: gwangjuData.news, daejeon_news: daejeonData.news, sejong_news: sejongData.news, ulsan_news: ulsanData.news, gangwon_news: gangwonData.news, chungcheong_news: chungcheongData.news, gyeongsang_news: gyeongsangData.news, jeolla_news: jeollaData.news, jeju_news: jejuData.news });
});

module.exports = router;
