import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Toast,
  Content,
  Button,
  Item,
  Label,
  Input,
  Body,
  Left,
  Right,
  Icon,
  Form,
  Text
} from "native-base";
import styles from "./styles";
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
     let url = "http://192.168.0.95:8080/Evolution-server/server/login/login";
     fetch(url, {
         body: formData,
         method:'POST',
      }).then((response) => {
         return response.json();
     })

     .then((responseText)=> {


                // alert(response.text());
                //
                // for (let k of Object.keys(reslut)) {
                //     alert(k);
                //
                //     alert(reslut[k]);
                // }

                if(responseText.message=="101"){
                    sorage._sava("sessionid",responseText.sessionid)
                    sorage._sava("userid",responseText.userid)
                    this.props.navigation.navigate("Main")

                }else if(responseText.message=="201"){
                    Toast.show({
                        text: "Invalid username!",
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
   // if(this.userName!='youbiai'){
   //   Toast.show({
   //     text: "Wrong password!",
   //     buttonText: "Okay"
   //   })
   // }else if(this.password!='sarp**'){
   //   Toast.show({
   //     text: "Wrong password!",
   //     buttonText: "Okay"
   //   })
   //
   // }else{
   //     sorage._sava("sessionid","eeee")
   //     sorage._sava("userid","eeee")
   //
   //
   //   this.props.navigation.navigate("Main")
   //
   // }

 };
  render() {
    return (
      <Container style={styles.container}>
        <Header>
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
          <Form>
            <Item  floatingLabel  >
              <Label>Username</Label>
              <Input
              onPress={()=>{

                this.setState({untext:'Useless Multiline Placeholder'})}}
              onChangeText={(text) => {this.userName = text;  }}
              />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input onChangeText={(text) => {
            this.password = text;
        }} secureTextEntry />
            </Item>
          </Form>
          <Button block style={{ margin: 15, marginTop: 50 }}
                  onPress={() =>this.onPressCallback() }

          >
            <Text>Sign In</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default Login;
