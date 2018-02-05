import React from "react";
import Setup from "./src/boot/setup";
import Expo from "expo";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            readyFlag: false,
        };
    }
    async componentWillMount() {
        await Expo.Font.loadAsync({
            'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf'),
            // 'Roboto_medium': require('@expo/vector-icons/fonts/Roboto-Medium.ttf'),
        });
        this.setState({ readyFlag: true });
    }


    render() {
        if (!this.state.readyFlag) {
            return <Expo.AppLoading />;
        }
    return <Setup />;
  }


}
