import React, { Component } from "react";
import {Image,View}  from 'react-native';
import {Container,Header,Title,Toast,Content,Button,Item,Label,Input,Body,Left,Right,Icon,Form,Text} from "native-base";
import style from "../style";
import sorage from "../util/MySorage";
const dismissKeyboard = require('dismissKeyboard');
class CompleteInfo extends Component {
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
            <Title>complete Info</Title>
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
              onChangeText={(text) => {this.userName = text;  }} placeholder="userName" style={style.input} />
            </Item>
             <Item style={style.ItemStyle}>
              <Input
              onPress={()=>{
                this.setState({untext:'Useless Multiline Placeholder'})}}
              onChangeText={(text) => {this.userName = text;  }} placeholder="Email" style={style.input} />
            </Item>
            <Item style={style.ItemStyle}>
              <Input
              onPress={()=>{
                this.setState({untext:'Useless Multiline Placeholder'})}}
              onChangeText={(text) => {this.userName = text;  }} placeholder="Confirm" style={style.input} />
            </Item>
            <Button block style={style.btn}  onPress={() =>this.props.navigation.navigate('Login')}>
            <Text>Next</Text>
          </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
export default CompleteInfo;
