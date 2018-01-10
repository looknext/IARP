import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
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

class Login extends Component {
    _onPressButton() {
        console.log("You tapped the button!");
    }
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
            <Title>Floating Label</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input secureTextEntry />
            </Item>
          </Form>
          <Button block style={{ margin: 15, marginTop: 50 }}
                  onPress={() => this.props.navigation.navigate("Main")}

          >
            <Text>Sign In</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default Login;
