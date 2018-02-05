import React, { Component } from "react";
import { ImageBackground, View, StatusBar } from "react-native";
import { Container, Button, H3, Text } from "native-base";

import styles from "./styles";
import sorage from "../util/MySorage";

const launchscreenBg = require("../../../assets/launchscreen-bg.png");
const launchscreenLogo = require("../../../assets/logo-kitchen-sink.png");
let storage;

class Home extends Component {
    constructor(props) {
        super(props);
    this.state={
        session:''
        }
    }
    componentDidMount() {
        storage= sorage._getStorage();
            this.getSession("sessionid");
             this.timer = setTimeout(
            () => {
              this.props.navigation.navigate("Login")
            },
            1000);
    }
     componentWillUnMount() {
        this.timer && clearTimeout(this.timer);
    }
getSession(key){
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

        this.setState({session: ret})

        return ret;
    }).catch(err => {
        //如果没有找到数据且没有sync方法，
        //或者有其他异常，则在catch中返回
        console.log(err.message);
        switch (err.name) {
            case 'NotFoundError':
                // TODO;
                break;
            case 'ExpiredError':
                // TODO
                break;
        }
    });
}
  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content" />
        <ImageBackground source={launchscreenBg} style={styles.imageContainer}>
        <View
          style={{
            alignItems: "center",
            marginBottom: 10,
            backgroundColor: "transparent"
          }}
        >
          <H3 style={styles.text}></H3>
          <View style={{ marginTop: 8 }} />

          <H3 style={styles.text}>App</H3>
          <View style={{ marginTop: 8 }} />
        </View>
          <View style={styles.logoContainer}>
          </View>

          <View style={{ marginBottom: 80 }}>
            <Button
              style={{ backgroundColor: "transparent", alignSelf: "center" }}
              onPress={()=> {if(this.state.session==''){
                  this.props.navigation.navigate("Login")

              }else{
                  this.props.navigation.navigate("Main")
              }}}
            >
              <Text></Text>
            </Button>
          </View>
        </ImageBackground>
      </Container>
    );
  }
}
export default Home;
