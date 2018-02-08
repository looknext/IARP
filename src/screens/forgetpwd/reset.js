
import React, { Component } from "react";
import {Image, StyleSheet, View} from 'react-native';
import {Container,Header,Title,Toast,Content,Button,Item,Label,Input,Body,Left,Right,Icon,Form,Text} from "native-base";
import style from "../style";
import sorage from "../util/MySorage";
const dismissKeyboard = require('dismissKeyboard');
class Reset extends Component {
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
            <Title>Reset Password</Title>
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
              onChangeText={(text) => {this.userName = text;  }} placeholder="New Password" style={style.input} />
            </Item>
              <Item style={style.ItemStyle}>
                  <Input
                      onPress={()=>{
                          this.setState({untext:'Useless Multiline Placeholder'})}}
                      onChangeText={(text) => {this.userName = text;  }} placeholder="New Password" style={style.input} />
              </Item>

            <Button block style={style.btn}>
            <Text>Confirm</Text>
          </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
export default Reset;
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
