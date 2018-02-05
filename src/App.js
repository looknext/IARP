import React from "react";
import { Root } from "native-base";
import { StackNavigator, DrawerNavigator } from "react-navigation";



// import Main from "./screens/main/";

import Main from "./screens/main/card-showcase";

import Home from "./screens/home/";
import Login from "./screens/login/";
import ForgetPwd from "./screens/forgetpwd/";
import Reset from "./screens/reset/";
import Create from "./screens/create/";
import Vertification from "./screens/vertification/";
import CompleteInfo from "./screens/completeinfo/";
import SideBar from "./screens/sidebar";

const Drawer = DrawerNavigator(
  {
    Home: { screen: Home },
      Login: { screen: Login },
      Main: { screen: Main},
      ForgetPwd: {screen:ForgetPwd},
      Reset:{screen:Reset},
      Create:{screen:Create},
      Vertification:{screen:Vertification},
      CompleteInfo:{screen:CompleteInfo},
  },
  {
    initialRouteName: "Home",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

const AppNavigator = StackNavigator(
  {
    Drawer: { screen: Drawer },


  },
  {
    initialRouteName: "Drawer",
    headerMode: "none"
  }
);

export default () =>
  <Root>
    <AppNavigator />
  </Root>;
