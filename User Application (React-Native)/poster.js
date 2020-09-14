import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from "react-native";

export default class poster extends React.Component{
    static navigationOptions = {
        title : '의뢰 대기중',
      };
    state = {
        customerID : "",
        d1_lat : 0,
        d1_lng : 0,
        order1 : {
            orderid : "02495",
            company_id : "mistercle",
            content_type : 1,//화물 유형 (1 = 냉동, 2 = 냉장, 3 = 상온)
            content : "경기도 성남시 분당구 백현동 판교역로146번길 20",
            d2 : "경기도 수원시 팔달구 팔달로2가 정조로 780",
            paret_count : 3,
            paret_weight : 50,
            pay : 20000
        },
        order2 : {
            orderid : "23462",
            company_id : "qudcjf9000",
            content_type : 3,//화물 유형 (1 = 냉동, 2 = 냉장, 3 = 상온)
            content : "경기도 수원시 영통구 하동 법조로 105",
            d2 : "경기도 용인시 처인구 포곡읍 에버랜드로 199",
            paret_count : 2,
            paret_weight : 100,
            pay : 18000
        },
        order3 : {
            orderid : "04836",
            company_id : "rhqjatjr0093",
            content_type : 3,//화물 유형 (1 = 냉동, 2 = 냉장, 3 = 상온)
            content : "경기도 수원시 영통구 원천동 월드컵로 164", 
            d2 : "경기도 성남시 분당구 야탑3동 성남대로 808",
            paret_count : 1,
            paret_weight : 30,//화물 목적지의 경도
            pay : 20000
        },
        order4 : {
            orderid : "09345",
            company_id : "justin1016",
            content_type : 2,//화물 유형 (1 = 냉동, 2 = 냉장, 3 = 상온)
            content : "경기도 용인시 수지구 풍덕천1동 풍덕천로 119",
            d2 : "경기도 수원시 팔달구 우만1동 월드컵로 310",
            paret_count : 3,
            paret_weight : 140,//화물 목적지의 경도
            pay : 10000
        }
        

    }
    selectOrder = (driver_id, order) =>{
        const post = {
            orderid : order.orderid,
            driver_id : driver_id,
        }
        this.props.navigation.goBack();
    }

    showrequest(order){
        console.log(order)
        return (
            <TouchableOpacity style={styles.submitButton} onPress = {() => this.selectOrder(this.state.customerID, order)}>
                    <Text style={styles.submitButtonText}>주문 번호 : {order.orderid}</Text>
                    <Text style={styles.submitButtonText}>기업 번호 : {order.company_id}</Text>
                    <Text style={styles.submitButtonText}>화물 유형 : {order.content_type}</Text>
                    <Text style={styles.submitButtonText}>화물 위치 : {order.content}</Text>
                    <Text style={styles.submitButtonText}>목적지 : {order.d2}</Text>
                    <Text style={styles.submitButtonText}>파레트 갯수 : {order.paret_count}</Text>
                    <Text style={styles.submitButtonText}>파레트 무게 : {order.paret_weight}</Text>
                    <Text style={styles.submitButtonText}>수당 : {order.pay}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        //현재 운전자 정보를 서버로 보낸다음 적절한 의뢰를 order안에 집어넣음

        return (
            <View>
                {this.showrequest(this.state.order1)}
                {this.showrequest(this.state.order2)}
                {this.showrequest(this.state.order3)}
                {this.showrequest(this.state.order4)}
            </View>
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
      borderColor: "#7a42f4",
      borderWidth: 1
    },
    submitButton: {
      backgroundColor: "#7a42f4",
      padding: 10,
      margin: 15,
      height: 170
    },
    submitButtonText: {
      color: "white"
    }
    
  });