import React, { Component } from "react";
import { FlatList, View, Text, TouchableOpacity, TextInput, StyleSheet} from "react-native";
import { Constants } from 'expo'

export default class CheckTab extends React.Component {
    //화물주 전용
    static navigationOptions = {
        title : '내 화물 정보 확인 화면',
      };
    constructor(props) {
        super(props); 
        
    this.state = {
        company_id : "",
        orderList : []
        

    
    }
    this.getOrderlist = this.getOrderlist.bind(this)
    };

    server = `http://uryotruck.ap-northeast-2.elasticbeanstalk.com`

    componentDidMount() {
        const { navigation } = this.props;
        this.state.company_id = navigation.getParam('customerID', null);
        this.getOrderlist();
    }

    showInfo(order) {
        if(order.delivery_type === 0)//아직 화물이 대기중일때
        {
            console.log("화물이 대기중")
            this.props.navigation.navigate(
                'CheckInfo',
                {
                    content_lat : order.content_lat,
                    content_lng : order.content_lng,
                    orderType : order.delivery_type
                }
            )
        }
        else if(order.delivery_type === 1)//화물이 운송중일때
        {
            console.log("화물이 운반중")
            fetch(this.server + `/check/car?id=${order.driver_id}`)
            .then(res => res.json())
            .then(data => {
                console.log("Recieved : \n" + data + "\nEnd")
                this.props.navigation.navigate(
                    'CheckInfo',
                    {
                        content_lat : data.Latitude,
                        content_lng : data.Longitude,
                        orderType : order.delivery_type
                    }
                )
            })
        }
    }
    getOrderlist()
    {
        fetch(this.server + `/check?company_id=${this.state.company_id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.setState({orderList : data})
        })
    }

    
    renderList(order) {
        if(order.delivery_type !== 2)
        {
            return (
                <TouchableOpacity style={styles.submitButton} onPress = {() => this.showInfo(order)}>
                        <Text style={styles.submitButtonText}>주문 번호 : {order.delivery_id}</Text>
                        <Text style={styles.submitButtonText}>배송 상태 : {order.delivery_type}</Text>
                </TouchableOpacity>
            );
        }
    }
    
    render() {
        return (
            <FlatList style = {styles.container}
                      renderItem = {({ item }) => this.renderList(item)}
                      keyExtractor = { item => item}
                      data = { this.state.orderList}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
      paddingTop: 23
    },
    input: {
      margin: 15,
      height: 40,
      borderColor: "#9aa9ff",
      borderWidth: 1
    },
    submitButton: {
      backgroundColor: "#9aa9ff",
      padding: 10,
      margin: 15,
      height: 90
    },
    submitButtonText: {
      color: "white"
    }
    
  });