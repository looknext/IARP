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
        this.caheCode = "";

    }
    onPressCallback = () => {
        dismissKeyboard();
        sorage._getStorage();
        let formData = new FormData();
        formData.append("phone",this.userName);
        let url = "http://192.168.0.95:8080/Evolution-server/server/login/phone";
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
                  onChangeText={(text) => {this.password = text;  }} placeholder="Password" style={style.input} />
          </Item>
              <Item style={style.ItemStyle}>
              <Input
                  onPress={()=>{
                      this.setState({untext:'Useless Multiline Placeholder'})}}
                  onChangeText={(text) => {this.caheCode = text;  }} placeholder="Verification code " style={style.input}/>
                  <Button block style={style.btn}  onPress={() =>this.onPressCallback()}>

                      <Text>Next</Text>
                  </Button>
              </Item>
            <Button block style={style.btn}  onPress={() =>this.props.navigation.navigate('Vertification')}>
            <Text>Next</Text>
          </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
AppRegistry.registerComponent('Create', () => Create);
