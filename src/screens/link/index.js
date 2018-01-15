import React, { Component } from "react";
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Icon,
    Text,
    Left,
    Right,
    Body,
    List,
    ListItem
} from "native-base";
import styles from "./styles";




constructor(props) {
    super(props);

    this.state = {

        LocalPosition:'',

        latitude:'fasdf',
        longitude:'fasdf',
        timeout:'1'

    };
}
GetGeolocation(){
    /*
    说明：getCurrentPosition(fun_success,fun_error,geo_options)
    成功回调函数与失败回调函数的写法， 应该使用箭头函数方式，因为回调结果可以供当前页面的this所调用，否则当前页面使用不了。
    例：getCurrentPosition(function(val){ this.setState....  },function(val){ this.setState....})
    会提示未定义函数或找不到对像，错误位置为this.setState

    */
    Geolocation.getCurrentPosition(val => {
        let ValInfo = "速度：" + val.coords.speed +
            "\n经度：" + val.coords.longitude +
            "\n纬度：" + val.coords.latitude +
            "\n准确度：" + val.coords.accuracy +
            "\n时间戳：" + val.timestamp;
        this.setState({LocalPosition: ValInfo});
    }, val => {
        let ValInfo = '获取坐标失败：' + val;
        this.setState({LocalPosition: ValInfo});
    });
}


componentDidMount() {

    this.timer = setInterval(
        ()=>{
            // this.unlisten = AMapLocation.addEventListener((data) =>   this.setState({
            //    latitude: data.latitude ,
            //    longitude: data.longitude
            //  }));
            // AMapLocation.startLocation({
            //   accuracy: 'HighAccuracy',
            //   killProcess: true,
            //   needDetail: true,
            // });
            this.GetGeolocation();
        },
        2000,
    );





}



componentWillUnmount() {
    // AMapLocation.stopLocation();
    this.timer && clearTimeout(this.timer)

    // this.unli();
}


class Link extends Component {
    render() {
        return (
            <Container style={styles.container}>

            </Container>
        );
    }
}

export default Link;
