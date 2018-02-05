import React, { Component } from "react";

// import test baidu Voice module

// import AMapLocation from 'react-native-amap-location';
import {AppRegistry,StyleSheet,ActivityIndicator,PermissionsAndroid, NativeModules} from 'react-native';
import sorage from "../util/MySorage";
const { SpeechModule } = NativeModules;

var Geolocation = require('Geolocation');  //要引用定位连接，否则会提示找不到对象，很多资料都没说到这一点。

import {
  Container,
  Header,
  Title,
  Text,
  Content,
  Button,
  Footer,
  FooterTab,
  Body,
  Left,
  Right,
  Icon
} from "native-base";
import styles from "./styles";
var storage;

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tab1: false,
      tab2: false,
      tab3: true,
      tab4: false,
      LocalPosition:'',
      latitude:'fasdf',
      longitude:'fasdf',
      timeout:'1'
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
            let ValInfo = "速度：" + val.coords.speed +
                "\n经度：" + val.coords.longitude +
                "\n纬度：" + val.coords.latitude +
                "\n准确度：" + val.coords.accuracy +
                "\n时间戳：" + val.timestamp;
            this.setState({LocalPosition: ValInfo});
        }, val => {
            let ValInfo = '获取坐标失败：' + val;
            this.setState({LocalPosition: ValInfo});
        });
    }
  toggleTab1(){
    this.setState({
      tab1: true,
      tab2: false,
      tab3: false,
      tab4: false
    });
  }
  toggleTab2(){
    this.setState({
      tab1: false,
      tab2: true,
      tab3: false,
      tab4: false
    });
  }
  toggleTab3(){
    this.setState({
      tab1: false,
      tab2: false,
      tab3: true,
      tab4: false
    });
  }
  toggleTab4(){
    this.setState({
      tab1: false,
      tab2: false,
      tab3: false,
      tab4: true
    });
  }

  componentDidMount() {





      alert("dd");

     // SpeechModule.speak({text:"欢迎李总，我们在测试",language:"zh-CH",rate:0.5},(call)=>{alert(call);});
      // this.timer = setInterval(
      //     ()=>{
		//
      //
      //
      //       // this.unlisten = AMapLocation.addEventListener((data) =>   this.setState({
      //       //    latitude: data.latitude ,
      //       //    longitude: data.longitude
      //       //  }));
      //       // AMapLocation.startLocation({
      //       //   accuracy: 'HighAccuracy',
      //       //   killProcess: true,
      //       //   needDetail: true,
      //       // });
      //       //   this.GetGeolocation();
      //
      //     },
      //     2000,
      //   );

}



componentWillUnmount() {




  // AMapLocation.stopLocation();
  this.timer && clearTimeout(this.timer)

  // this.unlisten();
}


  render(){
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
            <Title>Footer</Title>
          </Body>
          <Right />
        </Header>

        <Content padder />
          <Text style={{padding: 10, fontSize: 42}}>
                  {this.state.LocalPosition}
          </Text>
          <Text style={{padding: 10, fontSize: 42}}>
                          {this.state.latitude}
          </Text>
          <Text style={{padding: 10, fontSize: 42}}>
                          {this.state.longitude}
          </Text>
        <Footer>
          <FooterTab>
            <Button active={this.state.tab1} onPress={() => this.componentDidMount()}>
              <Icon active={this.state.tab1} name="apps" />
            </Button>
            <Button active={this.state.tab2} onPress={() => this.componentWillUnmount()}>
              <Icon active={this.state.tab2} name="camera" />
            </Button>
            <Button active={this.state.tab3} onPress={() => this.toggleTab3()}>
              <Icon active={this.state.tab3} name="compass" />
            </Button>
            <Button active={this.state.tab4} onPress={() => this.toggleTab4()}>
              <Icon active={this.state.tab4} name="contact" />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}


export default Main;
