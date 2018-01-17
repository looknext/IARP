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
let Geolocation = require('Geolocation');  //要引用定位连接，否则会提示找不到对象，很多资料都没说到这一点。


import sorage from "../util/MySorage";
let storage;

let userId ='';
let sessionId='';
class NHCardShowcase extends Component {

    constructor(props) {
        super(props);

            this.state = {

                showText: [
                  {headlogo: 'https://pic4.zhimg.com/50/eac5b8263_im.jpg',
                      title:'sprise',
                      datatime:'April 15, 2016',
                      cardImage:'https://reactnative.cn/static/docs/0.51/img/react-native-congratulations.png',
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

<<<<<<< HEAD
    /*add(){
        let add={
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
        let tmps=this.state.showText;

        tmps.unshift(add);
        this.setState({showText:tmps};
    }*/
=======

>>>>>>> b4e4db1ff0807df60960accb7913c1a0ec126961

    GetGeolocation(){
        /*
        说明：getCurrentPosition(fun_success,fun_error,geo_options)
        成功回调函数与失败回调函数的写法， 应该使用箭头函数方式，因为回调结果可以供当前页面的this所调用，否则当前页面使用不了。
        例：getCurrentPosition(function(val){ this.setState....  },function(val){ this.setState....})
        会提示未定义函数或找不到对像，错误位置为this.setState

        */
        Geolocation.getCurrentPosition(val => {
          
            let formData = new FormData();
            formData.append("sessionid",sessionId);

            formData.append("userid",userId);

            formData.append("speed",val.coords.speed);
            formData.append("longitude",val.coords.longitude);
            formData.append("latitude",val.coords.latitude);

            formData.append("timestamp",val.timestamp);

            let url = "http://192.168.0.168:8080/Evolution-server/server/gps/gps";
            fetch(url, {
                method: 'post',
                body: formData
            }).then((response) => {
                return response.json();
            })


                .then((responseText)=> {
                let result=responseText;
				if(result.takeable==null){
					   sorage._remove("sessionid");
						  sorage._remove("userid");
						  this.props.navigation.navigate("Home")
				}else if(!result.takeable){
                    let add={
                        headlogo: result.headLogo,
                        title:result.title,
                        datatime:result.dataTime,
                        cardImage:result.cardImage,
                        content:result.content,
                        score:result.score

                    };
                    let tmps=this.state.showText;

                    tmps.unshift(add);
                    if(tmps.length>20){
                        tmps.pop();
                    }
                    this.setState({showText:tmps});
                }

              //  获取数据,数据处理
            }).catch(function(err) {
                alert(err);

                //错误处理
            });



        }, val => {
            let ValInfo = '获取坐标失败：' + val;
			console.err("sss")
			                alert(ValInfo);

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
                this.GetGeolocation();



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
