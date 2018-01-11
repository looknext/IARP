import React, { Component } from "react";
import AMapLocation from 'react-native-amap-location';


import {
  Container,
  Header,
  Title,
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

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tab1: false,
      tab2: false,
      tab3: true,
      tab4: false
    };
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
  this.unlisten = AMapLocation.addEventListener((data) => console.log('data', data));
  AMapLocation.startLocation({
    accuracy: 'HighAccuracy',
    killProcess: true,
    needDetail: true,
  });
}

componentWillUnmount() {
  AMapLocation.stopLocation();
  this.unlisten();
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

        <Footer>
          <FooterTab>
            <Button active={this.state.tab1} onPress={() => this.toggleTab1()}>
              <Icon active={this.state.tab1} name="apps" />
            </Button>
            <Button active={this.state.tab2} onPress={() => this.toggleTab2()}>
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
