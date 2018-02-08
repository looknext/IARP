
import React, { Component } from "react";
import {Image,View,StyleSheet}  from 'react-native';
import {Container,Header,Title,Toast,Content,Button,Item,Label,Input,Body,Left,Right,Icon,Form,Text} from "native-base";
import style from "../style";
import sorage from "../util/MySorage";
const dismissKeyboard = require('dismissKeyboard');
class ForgetPwd extends Component {


    onPressCallback = () => {

        dismissKeyboard();
        sorage._getStorage();
        let formData = new FormData();
        formData.append("phone", this.userName);
        let url = "http://192.168.0.95:8080/Evolution-server/server/login/phone";
        fetch(url, {
            body: formData,
            method: 'POST',
        }).then((response) => {
            return response.json();
        })
            .then((responseText) => {
                // alert(response.text());
                // for (let k of Object.keys(reslut)) {
                //     alert(k);
                //     alert(reslut[k]);
                // }
                if(responseText){
                    Toast.show({
                        text: "Verification code is send!",
                        buttonText: "Okay"
                    })
                }
            }).catch(function (err) {
            alert(err);
            //错误处理
        });

    };

    constructor(props) {
        super(props);
        this.userName = "";
        this.password = "";
        this.caheCode = "";
        this.state = {
            timerCount: this.props.timerCount || 60,
            timerTitle: this.props.timerTitle || 'send',
            selfEnable: false,
            backgroundColor:'#4a81f8'

        };

    }
  render() {
    return (
      <Container style={style.container}>
        <Header style={style.bgc}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Forget password</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form style={{marginTop:50}}>
            <Text style={{textAlign:'center',marginBottom:40}}>
                <Image source={require('../img/logo.jpg')} style={style.imgSize}/>
            </Text>
            <Item style={style.ItemStyle}>
              <Input
              onPress={()=>{
                this.setState({untext:'Useless Multiline Placeholder'})}}
              onChangeText={(text) => {this.userName = text;  }} placeholder="Mobile Phone" style={style.input} />
            </Item>
            <Item style={style.ItemStyle}>
              <Input
              onPress={()=>{
                this.setState({untext:'Useless Multiline Placeholder'})}}
              onChangeText={(text) => {this.userName = text;  }} placeholder="Code" style={style.input} />
               <Button disabled={this.state.selfEnable} style={[styles.btnSend,style.btnSend,{backgroundColor: this.state.backgroundColor}]}  onPress={() => {
                   dismissKeyboard();

                   if (this.userName==''){
                       Toast.show({
                           text: "phone is null!",
                           buttonText: "Okay"
                       })
                   }else if (this.userName.length!=11){
                       Toast.show({
                           text: "phone is not phone!",
                           buttonText: "Okay"
                       })
                   }else {
                       this.onPressCallback();
                       const codeTime = this.state.timerCount;
                       this.setState({

                           selfEnable: true,
                           backgroundColor: 'gray',
                           timerTitle: `regain(60s)`,

                       });
                       this.interval = setInterval(() => {
                           const timer = this.state.timerCount - 1;
                           if (timer === 0) {
                               this.interval && clearInterval(this.interval);
                               this.setState({
                                   timerCount: codeTime,
                                   timerTitle: this.props.timerTitle || 'send',
                                   selfEnable: false,
                                   backgroundColor: '#4a81f8'

                               })
                           } else {
                               console.log("---- timer ", timer);
                               this.setState({
                                   timerCount: timer,
                                   timerTitle: `regain(${timer}s)`,
                               })
                           }
                       }, 1000)
                   }
               }}>
                <Text style={{width:120,textAlign:'center',}}>{this.state.timerTitle}</Text>
               </Button>
            </Item>
            <Button block style={style.btn}  onPress={() =>this.props.navigation.navigate('Reset')}>
            <Text> Reset your password</Text>
          </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
export default ForgetPwd;
const styles = StyleSheet.create({
   txtfirst:{
    flex:1,
    textAlign:'left'
  },
  txtsecond:{
    flex:1,
    textAlign:'right'
  },
  View:{
    margin:20,
    flex:1,
    flexDirection:'row'
  },
  btnSend:{
    margin:0,
    borderRadius:14,
    width:120,
    marginTop:4,
    height:40
  }
});

