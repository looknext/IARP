import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View
} from 'react-native';



import DeviceInfo from 'react-native-device-info';

import {
  Container,
  Button, Icon,
  Text,
  Header, Footer, Title,
  Content,
  Left, Body, Right,
  Switch
} from 'native-base';


////
// Import BackgroundGeolocation plugin
// Note: normally you will not specify a relative url ../ here.  I do this in the sample app
// because the plugin can be installed from 2 sources:
//
// 1.  npm:  react-native-background-geolocation
// 2.  private github repo (customers only):  react-native-background-geolocation-android
//
// This simply allows one to change the import in a single file.
import BackgroundGeolocation from "react-native-background-geolocation";
const TRACKER_HOST = 'http://192.168.0.95:8080/Evolution-server/server/gps/localtion';

export default class Localtion extends Component<{}> {

  constructor(props) {
    super(props);

    this.eventId = 1;

    this.state = {
      enabled: true,
      isMoving: true,
      username: "",
      events: []
    };
  }

  componentDidMount() {
    // Step 1:  Listen to events:
    BackgroundGeolocation.on('location', this.onLocation.bind(this));
    BackgroundGeolocation.on('motionchange', this.onMotionChange.bind(this));
    BackgroundGeolocation.on('activitychange', this.onActivityChange.bind(this));
    BackgroundGeolocation.on('providerchange', this.onProviderChange.bind(this));
    BackgroundGeolocation.on('powersavechange', this.onPowerSaveChange.bind(this));
    BackgroundGeolocation.on('http', this.onHttp.bind(this));
    BackgroundGeolocation.on('heartbeat', this.onHeartbeat.bind(this));

    // Step 2:  #configure:
    BackgroundGeolocation.configure({
      distanceFilter: 10,
      stopOnTerminate: false,
        // 单位分钟
        stopTimeout: 60,
      startOnBoot: true,
        preventSuspend:true,
      foregroundService: true,
      url: TRACKER_HOST + this.state.username,
      params: {
        // Required for tracker.transistorsoft.com
        device: {
          uuid: DeviceInfo.getUniqueID(),
          model: DeviceInfo.getModel(),
          platform: DeviceInfo.getSystemName(),
          manufacturer: DeviceInfo.getManufacturer(),
          version: DeviceInfo.getSystemVersion(),
          framework: 'ReactNative'
        }
      },
      autoSync: true,
      debug: false,
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE
    }, (state) => {
      console.log('- Configure success: ', state);
      this.setState({
        enabled: state.enabled,
        isMoving: state.isMoving
      });
    });
      this.onClickChangePace;
  }

  /**
  * @event location
  */
  onLocation(location) {
    console.log('[event] location: ', location);
    this.addEvent('location', new Date(location.timestamp), location);
  }
  /**
  * @event motionchange
  */
  onMotionChange(event) {
    console.log('[event] motionchange: ', event.isMoving, event.location);
    this.setState({
      isMoving: event.isMoving
    });
    this.addEvent('motionchange', new Date(event.location.timestamp), event.location);
  }
  /**
  * @event activitychange
  */
  onActivityChange(event) {
    console.log('[event] activitychange: ', event);
    this.addEvent('activitychange', new Date(), event);
  }
  /**
  * @event providerchange
  */
  onProviderChange(event) {
    console.log('[event] providerchange', event);
    this.addEvent('providerchange', new Date(), event);
  }
  /**
  * @event powersavechange
  */
  onPowerSaveChange(isPowerSaveMode) {
    console.log('[event] powersavechange', isPowerSaveMode);
    this.addEvent('powersavechange', new Date(), {isPowerSaveMode: isPowerSaveMode});
  }
  /**
  * @event heartbeat
  */
  onHttp(response) {
    console.log('[event] http: ', response);
    this.addEvent('http', new Date(), response);
  }
  /**
  * @event heartbeat
  */
  onHeartbeat(event) {
    console.log('[event] heartbeat: ', event);
    this.addEvent('heartbeat', new Date(), event);
  }

  onToggleEnabled(value) {
    let enabled = !this.state.enabled;
    this.setState({
      enabled: enabled,
      isMoving: false
    });
    if (enabled) {
      BackgroundGeolocation.start();
    } else {
      BackgroundGeolocation.stop();
    }
  }

  onClickGetCurrentPosition() {
    BackgroundGeolocation.getCurrentPosition((location) => {
      console.log('- getCurrentPosition success: ', location);
    }, (error) => {
      console.warn('- getCurrentPosition error: ', error);
    }, {
      persist: true,
      samples: 1,
      maximumAge: 5000
    });
  }

  onClickChangePace() {
    console.log('- onClickChangePace');
    let isMoving = !this.state.isMoving;
    this.setState({isMoving: isMoving});
    BackgroundGeolocation.changePace(isMoving);
  }

  onClickClear() {
    this.setState({events: []});
  }

  /**
  * Add an event to list
  */
  addEvent(name, date, object) {
    let event = {
      key: this.eventId++,
      name: name,
      timestamp: date.toLocaleTimeString(),
      json: JSON.stringify(object, null, 2)
    };
    let rs = this.state.events;
    rs.unshift(event);
    this.setState({
      events: rs
    });
  }

  renderEvents() {
    return this.state.events.map((event) => (
      <View key={event.key} style={styles.listItem}>

      </View>
    ));
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
            <Left>
                <Button transparent
                        onPress={() => this.props.navigation.navigate("DrawerOpen")}
                >
                    <Icon name="menu" />
                </Button>
            </Left>
          <Body>
            <Title style={styles.title}>Record Location</Title>
          </Body>
          <Right>
            <Switch onValueChange={() => this.onToggleEnabled()} value={this.state.enabled} />
          </Right>
        </Header>

        <Content style={styles.content}>
          <View style={styles.list}>
            {this.renderEvents()}
          </View>
        </Content>

        <Footer style={styles.footer}>
          <Left style={{flex:0.3}}>
            <Button small info>
              <Icon active name="md-navigate" style={styles.icon} onPress={this.onClickGetCurrentPosition.bind(this)} />
            </Button>
          </Left>
          <Body style={styles.footerBody}>
            <Button small danger bordered onPress={this.onClickClear.bind(this)}><Icon name="trash" /></Button>
          </Body>
          <Right style={{flex:0.3}}>
            <Button small danger={this.state.isMoving} success={!this.state.isMoving} onPress={this.onClickChangePace.bind(this)}>
              <Icon active name={(this.state.isMoving) ? 'pause' : 'play'} style={styles.icon}/>
            </Button>
          </Right>
        </Footer>
      </Container>
    );
  }

  /**
  * Navigate back to home-screen app-switcher
  */
 }

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#272727'
  },
  header: {
    backgroundColor: '#EFEFEF'
  },
  title: {
    color: '#000'
  },
  listItem: {
    marginBottom: 10
  },
  itemHeader: {
    backgroundColor: '#EFEFEF',
    padding: 5
  },
  eventName: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  eventTimestamp: {
    fontSize: 12
  },
  eventJson: {
    fontFamily: 'Courier New',
    fontSize: 12,
    color: '#e6db74'
  },
  footer: {
    backgroundColor: '#EFEFEF',
    paddingLeft: 10,
    paddingRight: 10
  },
  footerBody: {
    justifyContent: 'center'
  },
  icon: {
    color: '#fff'
  }
});
