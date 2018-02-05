import React, { Component } from "react";
import {Image,View,StyleSheet}  from 'react-native';
import {Container,Header,Title,Toast,Content,Button,Item,Label,Input,Body,Left,Right,Icon,Form,Text} from "native-base";
import style from "../style";
import sorage from "../util/MySorage";
const dismissKeyboard = require('dismissKeyboard');
class Login extends Component {
  constructor(props) {
   super(props);
   this.userName = "";
   this.password = "";
 }
 onPressCallback = () => {
     dismissKeyboard();
     sorage._getStorage();
     let formData = new FormData();
     formData.append("loginName",this.userName);
     formData.append("pwd",this.password);
     let url = "http://psa.youbiai.com/Evolution-server/server/login/login";
     fetch(url, {
         body: formData,
         method:'POST',
      }).then((response) => {
         return response.json();
     })
     .then((responseText)=> {
                // alert(response.text());
                // for (let k of Object.keys(reslut)) {
                //     alert(k);
                //     alert(reslut[k]);
                // }
                if(responseText.message=="101"){
                    sorage._sava("sessionid",responseText.sessionid)
                    sorage._sava("userid",responseText.userid)
                    this.props.navigation.navigate("Main")
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
     }).catch(function(err) {
         alert(err);
         //错误处理
     });
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
            <Title>Login</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form style={{marginTop:50}}>
            <Text style={{textAlign:'center',marginBottom:40}}>
                <Image source={require('../img/logo.jpg')} style={style.imgSize}/>
            </Text>
            <Item style={style.ItemStyle}>
              <Icon active name="person" style={style.fontc}/>
              <Input
              onPress={()=>{
                this.setState({untext:'Useless Multiline Placeholder'})}}
              onChangeText={(text) => {this.userName = text;  }} placeholder="UserName" style={style.input}
               />
            </Item>
            <Item style={style.ItemStyle}>
              <Icon active name="lock" style={{color:'#999'}}/>
              <Input onChangeText={(text) => {
            this.password = text;
        }} secureTextEntry placeholder="Password" style={style.input} />
            </Item>
            <View style={styles.View}>
              <View style={{flex:1}}>
                <Text style={{color:'#999'}}   onPress={() =>this.props.navigation.navigate('ForgetPwd')}>forget password?</Text>
              </View>
              <View style={{flex:1,}}>
                  <Text style={{textAlign:'right',color:'#999'}}  onPress={() => this.props.navigation.navigate('Create')}>sign up</Text>
              </View>
            </View>
            <Button block style={style.btn}
                  onPress={() =>this.onPressCallback() }
          >
            <Text>Sign In</Text>
          </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
export default Login;
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
});
