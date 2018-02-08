import React, { Component } from "react";
import {AppRegistry,Image,View,}  from 'react-native';
import {Container,Header,Title,Toast,Content,Button,Item,Label,Input,Body,Left,Right,Icon,Form,Text,H3} from "native-base";
import sorage from "../util/MySorage";
import style from "../style";
const dismissKeyboard = require('dismissKeyboard');
export default class Create extends Component {
    constructor(props) {
        super(props);
        this.userName = "";
        this.password = "";
        this.cpassword = "";

        this.caheCode = "";
        this.state = {
            timerCount: this.props.timerCount || 60,
            timerTitle: this.props.timerTitle || 'send',
            selfEnable: false,
            backgroundColor:'#4a81f8'

        };

    }
    onPressCallback = () => {

            dismissKeyboard();
            sorage._getStorage();
            let formData = new FormData();
            formData.append("phone", this.userName);
            let url = "http://192.168.0.169:8080/Evolution-server/server/login/phone";
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

    onPressaddUser = () => {

        if(this.caheCode==''){
            Toast.show({
                text: "caheCode is null!",
                buttonText: "Okay"
            })
        }else if (this.userName==''){
            Toast.show({
                text: "phone is null!",
                buttonText: "Okay"
            })
        }else if (this.password==''){
            Toast.show({
                text: "password is null!",
                buttonText: "Okay"
            })
        }else if (this.password!=this.cpassword){
            Toast.show({
                text: "The confirm password is different from the password!",
                buttonText: "Okay"
            })
        }else if (this.caheCode.length!=4){
            Toast.show({
                text: "caheCode length is not four!",
                buttonText: "Okay"
            })
        }else {
            dismissKeyboard();
            sorage._getStorage();
            let formData = new FormData();
            formData.append("phone", this.userName);
            formData.append("loginName", this.userName);
            formData.append("pwd", this.password);

            formData.append("caheCode", this.caheCode);

            let url = "http://192.168.0.169:8080/Evolution-server/server/login/adduser";
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
                    if(responseText.message=="101"){
                        sorage._sava("sessionid",responseText.sessionid);
                        sorage._sava("userid",responseText.userid);
                        this.props.navigation.navigate("CompleteInfo")
                    }else if(responseText.message=="201"){
                        Toast.show({
                            text: "Wrong userName!",
                            buttonText: "Okay"
                        })
                    }else if(responseText.message=="202"){
                        Toast.show({
                            text: "Wrong password!",
                            buttonText: "Okay"
                        })
                    }
                }).catch(function (err) {
                alert(err);
                //错误处理
            });
        }
    };
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
            <Title>Create Account</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form style={{marginTop:50}}>
            <Text style={{textAlign:'center',marginBottom:15}}>
                <Image source={require('../img/logo.jpg')} style={style.imgSize}/>
            </Text>
             <H3 style={{textAlign:'center',marginBottom:45,color:'#666'}}>Create Account</H3>
            <Item style={style.ItemStyle}>
              <Input
              onPress={()=>{
                this.setState({untext:'Useless Multiline Placeholder'})}}
              onChangeText={(text) => {this.userName = text;  }} placeholder="Mobile phone" style={style.input}/>
            </Item>
            <Item style={style.ItemStyle}>
              <Input
                  onPress={()=>{
                      this.setState({untext:'Useless Multiline Placeholder'})}}
                  onChangeText={(text) => {this.password = text;  }} secureTextEntry  placeholder="Password" style={style.input} />
          </Item>
              <Item style={style.ItemStyle}>
                  <Input
                      onPress={()=>{
                          this.setState({untext:'Useless Multiline Placeholder'})}}
                      onChangeText={(text) => {this.cpassword = text;  }} secureTextEntry placeholder="Confirm Password" style={style.input} />
              </Item>
              <Item style={style.ItemStyle}>
              <Input
                  onPress={()=>{
                      this.setState({untext:'Useless Multiline Placeholder'})}}
                  onChangeText={(text) => {this.caheCode = text;  }} placeholder="Verification code " style={style.input}/>
                  <Button block disabled={this.state.selfEnable} style={[style.btnV,{backgroundColor: this.state.backgroundColor}]}  onPress={() => {
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

                      <Text>{this.state.timerTitle}</Text>
                  </Button>
              </Item>
            <Button block style={style.btn}  onPress={() =>this.props.navigation.navigate('CompleteInfo')}>
            <Text>Next</Text>
          </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
AppRegistry.registerComponent('Create', () => Create);
