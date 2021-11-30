#!/usr/bin/env python
# coding: utf-8

# In[4]:

import requests
import urllib.parse as parse
from bs4 import BeautifulSoup
from subprocess import PIPE, Popen
import json

headers = [
    {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36'},
]

BASE_URL = "https://realestate.daum.net"
url = "/news/region/"
base_url = BASE_URL + url

region_list = {
    '전체': 'nation',
    '서울': 'seoul',
    '경기': 'gyeonggi',
    '인천': 'incheon',
    '부산': 'busan',
    '대구': 'daegu',
    '광주': 'gwangju',
    '대전': 'daejeon',
    '세종': 'sejong',
    '울산': 'ulsan',
    '강원': 'gangwon',
    '충청': 'chungcheong',
    '경상': 'gyeongsang',
    '전라': 'jeolla',
    '제주': 'jeju'
}

params = {
    'p': 1
}

for region in region_list.values():
    data = requests.get(base_url+region, params=params, headers=headers[0])
    html = data.content.decode('utf-8')
    soup = BeautifulSoup(html, 'html.parser')
    #mCenter > div.wrap_partnews > ul > li.fst > div > strong > a
    #mCenter > div.wrap_partnews > ul > li:nth-child(3) > div > strong > a
    news_list = soup.select('#mCenter > div.wrap_partnews > ul > li')

    json_data_list = []

    for news in news_list:
        data = {
            'title' : news.div.strong.a.string,
            'url' : BASE_URL + news.div.strong.a.attrs['href']
        }
        json_data_list.append(data)

    json_data = {
        'news' : json_data_list
    }
    json_data_list = json.dumps(json_data)
    file_name = region+'.json' 
    f = open('/home/hadoop/project_web_advanced/crawling/data/'+file_name, 'w')
    f.write(json_data_list)
    f.close()

#    put = Popen(["/home/hadoop/hadoop-2.7.6/bin/hadoop", "dfs", "-put", file_name, hdfs_path], stdin=PIPE, bufsize=-1)
#    put.communicate()
