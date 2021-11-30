## Project
사용자가 지역 또는 아파트를 검색하면 특정시, 상세행정동, 검색한아파트 층별집값, 검색한 행정동에서 최신 집값이 내가 원하는 집값 사이에 있는 곳, 에측집값을 보여준다. 또한 지역별 부동산 뉴스도 함께 확인할 수 있어 사용자는 다양한 정보를 이용하여 부동산 거래에 정보로 활용할 수 있다.


## Installing

```
$ git clone https://github.com/philjjoon/2021-01-GROUP-01

$ wget http://archive.apache.org/dist/hadoop/core/hadoop-2.7.6/hadoop-2.7.6.tar.gz

$ spark 2.2.2 is required (http://spark.apache.org/downloads.html)

$ zeppelin 0.8.2 is required (https://zeppelin.apache.org/download.html)

$ curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
$ sudo apt-get install -u nodejs
$ sudo npm install -g express
$ sudo npm install -g express-generator

$ Python 3.7 is required

$ set up java-8-oracle on /usr/lib/jvm/java-8-oracle
```


## Running

1. data processing
```
cd /home/hadoop/zeppelin-0.8.2-bin-all/bin
./zeppelin-daemon.sh start
```

![image](https://user-images.githubusercontent.com/70676394/121698213-bf06c180-cb08-11eb-91ea-6d378e0cbb2b.png)

```
zeppelin web ui에서 최초 1회 tempview 생성후에 웹 기능을 사용할 수 있다.
```

2. visualization
```
cd project_web_advanced/project_web
node app {YOUR PORT NUMBER}
```




## Data Processing

1. Data Acquisition and preprocessing (658MB)
  - 국토교통부 부동산 실거래가 공개시스템 (http://rtdown.molit.go.kr/)
  - 다음 부동산 지역별 뉴스 (https://realestate.daum.net/news/region/nation)
  ```
  {
  "news": [
    {
      "title": "고공행진하는 아파트 가격, 속도 못내는 공급대책",
      "url": "https://realestate.daum.net/news/detail/region/nation/20210611144041734"
    },
    {
      "title": "단기자금 1300조 돌파, 상업시설로 눈 돌리는 수요자들",
      "url": "'https://realestate.daum.net/news/detail/region/nation/20210611113608981"
    }
   ]
}

  ```
  ```
  다음 뉴스가 지역별로 잘 분류되어 있고, 업데이트도 활발히 진행되고 있어,
  각 지역별로 뉴스를 크롤링해 json 파일로 저장했다.
  또한, crontab을 사용하여 일정 시간 마다 다음 뉴스를 크롤링한다.
  ```

2. Data Analysis
  - 데이터 분석 기준

  ![image](https://user-images.githubusercontent.com/70676394/121704591-dd6fbb80-cb0e-11eb-85e6-1c9a51efb94a.png)

  ![image](https://user-images.githubusercontent.com/70676394/121704771-042df200-cb0f-11eb-9e3f-39143454fec1.png)

  ![image](https://user-images.githubusercontent.com/70676394/121704687-f1b3b880-cb0e-11eb-8c60-d4af2dc3ea38.png)


    1. 특정시에 대한 집값 추이
    2. 상세 행정동에 대한 집값 추이
    3. 상세 행정동의 특정 아파트 집값 추이
    4. 검색한 아파트의 층별 집값
    5. 검색한 행정동에서 최신집값이 내가 원하는 집값 사이에 있는 곳

  - Ml에서는 선형모델을 써서 집값을 예측했다.


## Visualization

1. Zeppelin
- Data Analysis를 통해 나온 테이블을 zeppelin을 통해 그래프를 도출한다.
- Web에서 사용자가 데이터를 입력하면 zeppelin에서 해당 input paragraph가 동작하고, zeppelin의 그래프를 처리하는 paragraph를 실행하는 run 함수를 input paragraph에 넣어 입력과 데이터 분석 처리가 동시에 이루어지도록 한다.


2. Web
- iframe을 사용하여 zeppelin과 사용자를 연결해서 입력값을 받고, zeppelin이 처리한 결과를 보여준다.
- node.js의 router.all로 사용자가 부동산 관련 소식을 접할 수 있도록 뉴스를 크롤링하여 지역별로 제공한다.
- node.js의 jade파일에서 크롤링한 뉴스 데이터에서 각 지역별로, 각 뉴스의 title 문자에 url을 href로 연결하여 바로 클릭하면 뉴스로 이동할 수 있도록 하였다.


## Demo
- 시/도 input 입력을 먼저 진행해야한다. 이후 상세주소, 아파트, 집 값 범위의 입력 순서는 자유.
- ex) 사용자가 경기도 용인시에서 2.5억 ~ 3.5억 사이의 아파트를 찾고, 건축년도, 가격 기준으로 내림차순으로 정렬하여 상위 3개의 아파트에 대한 정보를 찾음.
- 해당 시/도, 상세주소, 아파트의 평균 추이, 아파트 층별 가격, 그 아파트의 한 달뒤의 집값 예측 값, 집값 범위의 아파트 테이블을 찾을 수 있다. 
![KakaoTalk_20210611_232502047](https://user-images.githubusercontent.com/70676394/121701880-53265800-cb0c-11eb-8cf2-712e26aa86b9.gif)


