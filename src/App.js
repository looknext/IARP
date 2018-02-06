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
    Home: { screen: Home , navigationOptions: {
              gesturesEnabled :false,
              drawerLockMode:'locked-closed'//hide header if not needed so whole screen slide

          },},
      Login: { screen: Login ,
          navigationOptions: {
              gesturesEnabled :false,
              drawerLockMode:'locked-closed'//hide header if not needed so whole screen slide

          },},
      Main: { screen: Main},
      ForgetPwd: {screen:ForgetPwd,
          navigationOptions: {
              gesturesEnabled :false,
              drawerLockMode:'locked-closed'//hide header if not needed so whole screen slide

          }},
      Reset:{screen:Reset,
          navigationOptions: {
              gesturesEnabled :false,
              drawerLockMode:'locked-closed'//hide header if not needed so whole screen slide

          }},
      Create:{screen:Create,
          navigationOptions: {
              gesturesEnabled :false,
              drawerLockMode:'locked-closed'//hide header if not needed so whole screen slide

          }},
      Vertification:{screen:Vertification,
          navigationOptions: {
              gesturesEnabled :false,
              drawerLockMode:'locked-closed'//hide header if not needed so whole screen slide

          }},
      CompleteInfo:{screen:CompleteInfo,
          navigationOptions: {
              gesturesEnabled :false,
              drawerLockMode:'locked-closed'//hide header if not needed so whole screen slide

          }},
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
