import React, { Component } from "react";
import { Image, Dimensions } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Card,
  CardItem,
  Text,
  Thumbnail,
  Left,
  Right,
  Body
} from "native-base";
import styles from "./styles";

const deviceWidth = Dimensions.get("window").width;
const logo = require("../../../assets/logo.png");
const cardImage = require("../../../assets/drawer-cover.png");
const buttonIocn='logo-github';
var Geolocation = require('Geolocation');  //要引用定位连接，否则会提示找不到对象，很多资料都没说到这一点。


import sorage from "../util/MySorage";
var storage;

var userId ='';
var sessionId='';
class NHCardShowcase extends Component {

    constructor(props) {
        super(props);

            this.state = {

                showText: [
                  {headlogo: 'https://pic4.zhimg.com/50/eac5b8263_im.jpg',
                      title:'sprise',
                      datatime:'April 15, 2016',
                      cardImage:'https://wx1.sinaimg.cn/mw690/006lIMa0gy1fmplxde49cj30nt0xcapa.jpg',
                      content:'NativeBase is a free and source framework that enable' +
                      'developers to build high-quality mobile apps using React' +
                      'Native iOS and Android apps with a fusion of ES6. NativeBase' +
                      'builds a layer on top of React Native that provides you with' +
                      'basic set of components for mobile application development.',
                      score:'4,923 stars'

                  }


                  ]
            };

    }

    add(){
        var add={
            headlogo: 'https://pic4.zhimg.com/50/eac5b8263_im.jpg',
            title:'sprise',
            datatime:'April 15, 2016',
            cardImage:'https://wx1.sinaimg.cn/mw690/006lIMa0gy1fmplxde49cj30nt0xcapa.jpg',
            content:'NativeBase is a free and source framework that enable' +
            'developers to build high-quality mobile apps using React' +
            'Native iOS and Android apps with a fusion of ES6. NativeBase' +
            'builds a layer on top of React Native that provides you with' +
            'basic set of components for mobile application development.',
            score:'4,923 stars'

        };
        var tmps=this.state.showText;

        tmps.unshift(add)
        this.setState({showText:tmps})
    }

    GetGeolocation(){
        /*
        说明：getCurrentPosition(fun_success,fun_error,geo_options)
        成功回调函数与失败回调函数的写法， 应该使用箭头函数方式，因为回调结果可以供当前页面的this所调用，否则当前页面使用不了。
        例：getCurrentPosition(function(val){ this.setState....  },function(val){ this.setState....})
        会提示未定义函数或找不到对像，错误位置为this.setState

        */
        Geolocation.getCurrentPosition(val => {
            let ValInfo = "speed=" + val.coords.speed +
                "&longitude=" + val.coords.longitude +
                "\n纬度：" + val.coords.latitude +
                "\n准确度：" + val.coords.accuracy +
                "\n时间戳：" + val.timestamp;


            let formData = new FormData();
            formData.append("sessionid",sessionId);

            formData.append("userid",userId);

            formData.append("speed",val.coords.speed);
            formData.append("longitude",val.coords.longitude);
            formData.append("latitude",val.coords.latitude);

            formData.append("timestamp",val.coords.timestamp);

            let url = "http://localhost:8080";
            fetch(url, {
                method: 'post',
                body: formData
            }).then(function(response) {
                var result=response.json();
                if(result.message){
                    var add={
                        headlogo: result.headlogo,
                        title:result.title,
                        datatime:result.dataTime,
                        cardImage:result.cardImage,
                        content:result.content,
                        score:result.score

                    };
                    var tmps=this.state.showText;

                    tmps.unshift(add)
                    this.setState({showText:tmps})
                }

              //  获取数据,数据处理
            });




        }, val => {
            let ValInfo = '获取坐标失败：' + val;
        });
    }
    getuser(key,callBack){
        storage.load({
            key: key,
            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
            autoSync: false,
            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用sync方法的同时先返回已经过期的数据。
            // 设置为false的话，则始终强制返回sync方法提供的最新数据(当然会需要更多等待时间)。
            syncInBackground: false,

            // 你还可以给sync方法传递额外的参数
            // syncParams:{ params,
            //     someFlag: someFlag,
            // },
        }).then(ret => {

            callBack( ret)

            return ret;
        }).catch(err => {
            //如果没有找到数据且没有sync方法，
            //或者有其他异常，则在catch中返回
            console.log(err.message);
            switch (err.name) {
                case 'NotFoundError':
                    this.props.navigation.navigate("Login")
                    break;
                case 'ExpiredError':
                    // TODO
                    break;
            }
        });
    }

    componentDidMount() {
        storage=sorage._getStorage();
        this.getuser("sessionid",function (data) {
            sessionId=data;
        });
        this.getuser("userid",function (data) {
            userId=data;
        });


            this.timer = setInterval(
            ()=>{
                // this.unlisten = AMapLocation.addEventListener((data) =>   this.setState({
                //    latitude: data.latitude ,
                //    longitude: data.longitude
                //  }));
                // AMapLocation.startLocation({
                //   accuracy: 'HighAccuracy',
                //   killProcess: true,
                //   needDetail: true,
                // });
                // this.GetGeolocation();

            this.add();


            },
            2000,
        );





    }



    componentWillUnmount() {
        // AMapLocation.stopLocation();
        this.timer && clearTimeout(this.timer)

        // this.unlisten();
    }




  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
              <Button transparent
                      onPress={() => this.props.navigation.navigate("DrawerOpen")}
              >
                  <Icon name="menu" />
              </Button>
          </Left>
          <Body>
            <Title></Title>
          </Body>
          <Right />
        </Header>

        <Content padder>



            {this.state.showText.map((cart,i)=>
          <Card  key={i} style={styles.mb}>
            <CardItem bordered>
              <Left>
                <Thumbnail source={{url:cart.headlogo}} />
                <Body>
                  <Text>{cart.title}</Text>
                  <Text note>{cart.datatime}</Text>
                </Body>
              </Left>
            </CardItem>

            <CardItem>
              <Body>
                <Image
                  style={{
                    alignSelf: "center",
                    height: 150,
                    resizeMode: "cover",
                    width: deviceWidth / 1.18,
                    marginVertical: 5
                  }}
                  source={{url:cart.cardImage}}
                />
                <Text>
                    {cart.content}
                </Text>
              </Body>
            </CardItem>
            <CardItem style={{ paddingVertical: 0 }}>
              <Left>
                <Button transparent>
                  <Icon name={buttonIocn} />
                  <Text>{cart.score}</Text>
                </Button>
              </Left>
            </CardItem>
          </Card>
                )}

        </Content>
      </Container>
    );
  }
}

export default NHCardShowcase;
