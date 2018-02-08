import React, { Component } from "react";
import { Image, Dimensions,StyleSheet,View,ImageBackground} from "react-native";
import {Container,Header,Title,Content,Button,Icon,Card,CardItem,Text,Thumbnail,Left,Right,Body,Footer,Input,Item} from "native-base";
import style from "../style";
const deviceWidth = Dimensions.get("window").width;
const logo = require("../img/user.jpg");
const chatBg = require("../../../assets/chat.jpg");
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

                  }]
            };
    }
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
                // alert(err);

                //错误处理
            });

        }, val => {
            let ValInfo = '获取坐标失败：' + val;
			console.err("sss")
			                // alert(ValInfo);a
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
        <ImageBackground source={chatBg} style={styles.imageContainer}>
        <Header style={style.bgc}>
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
        <Content style={styles.cont}>
          <View style={styles.pos}>
             <View>
              <View style={[styles.chatAnswer,styles.mb]}>
                <Image source={require('../img/user.jpg')} style={[styles.chatImg,styles.inlinl]}></Image>
                <View style={[styles.inlin,styles.pl]}>
                  <Text style={[styles.chatText,styles.textl]}>May I help you?</Text>
                </View>
              </View>
             </View>
             <View style={styles.boxpl}>
              <View style={[styles.chatQuestion,styles.mb]}>
                <Image source={require('../img/user.jpg')} style={[styles.chatImg,styles.inlinr]}></Image>
                <View style={[styles.inlin,styles.pr]}>
                  <Text style={[styles.chatText,styles.textr]}>What it is the weather today?</Text>
                </View>
              </View>
             </View>
             <View>
              <View style={[styles.chatAnswer,styles.mb]}>
                <Image source={require('../img/user.jpg')} style={[styles.chatImg,styles.inlinl]}></Image>
                <View style={[styles.inlin,styles.pl]}>
                  <Text style={[styles.chatText,styles.textl]}>It is sunny.</Text>
                </View>
              </View>
             </View>
             <View style={styles.boxpl}>
              <View style={[styles.chatQuestion,styles.mb]}>
                <Image source={require('../img/user.jpg')} style={[styles.chatImg,styles.inlinr]}></Image>
                <View style={[styles.inlin,styles.pr]}>
                  <Text style={[styles.chatText,styles.textr]}>What can I do for you?A merry heart goes all the way.</Text>
                </View>
              </View>
             </View>
          </View>
          <Card style={styles.card}>
            <CardItem style={styles.carditem}>
              <Body>
                <Image source={logo} style={{flex: 1,width:140,height:80,}}/>
                <View>
                  <Text style={styles.headline}>Donatello</Text>
                  <Text style={styles.rank}>
                    <Icon name="star" style={[styles.active,]}/>
                    <Icon name="star" style={[styles.active,]}/>
                    <Icon name="star" style={[styles.active,]}/>
                    <Icon name="star" style={[styles.active,]}/>
                    <Icon name="star" style={[styles.diactive,]}/>
                    <Text>$$·0.1mi</Text>
                  </Text>
                  <Text style={styles.kind}>Pizza</Text>
                </View>
              </Body>
            </CardItem>
          </Card>
        </Content>
        <Item rounded style={styles.say}>
          <Input placeholder='Si noe......' style={styles.inptxt}/>
        </Item>
        </ImageBackground>
      </Container>
    );
  }
}
export default NHCardShowcase;
const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    width: null,
    height: null
  },
  cont:{
    paddingHorizontal:15,
    paddingVertical:20,
    paddingBottom:320,
  },
  mb:{
    marginBottom:15
  },
  pl:{
    paddingLeft:8
  },
  pr:{
    paddingRight:8
  },
  boxpl:{
    paddingLeft:55,
  },
  text: {
    alignSelf: "center",
    marginBottom: 7
  },
  inlinl:{
    justifyContent:'center',  
    alignItems:'center',
  },
  inlinr:{
    alignItems:'flex-end',
    justifyContent:'center',  
  },
  chatAnswer:{
    paddingRight:55,
    flexDirection:'row',  
  },
  chatQuestion:{
    flexDirection:'row-reverse', 
  },
  chatText:{
    borderRadius:15,
    paddingVertical:8,
    paddingHorizontal:12,
    color:'#fff',
    overflow:'hidden'
  },
  textl:{
    backgroundColor:'#4286f3',
  },
  textr:{
    backgroundColor:'#02aac4',
  },
  chatImg:{
    width:40,
    height:40,
    borderRadius:20,
    alignSelf:'flex-start'
  },
  say:{
    position:'absolute',
    bottom:0,
    left:15,
    right:15,
  },
  inptxt:{
    backgroundColor:'#EFEFEF',
    paddingLeft:20,
    borderRadius:25,
  },
  card:{
    flex:0,
    width:180,
  },
  headline:{
    fontSize:16,
    color:'#000',
    paddingTop:5,
    paddingBottom:10,
  },
  rank:{
    fontSize:14,
    color:'#a7a7a7'
  },
  kind:{
    color:'#a7a7a7',
    fontSize:14
  },
  active:{
    color:'#ef6c00',
    fontSize:16,
    letterSpacing:3
  },
  diactive:{
    color:'#e0e0e0',
    fontSize:16,
    letterSpacing:3
  },
});
