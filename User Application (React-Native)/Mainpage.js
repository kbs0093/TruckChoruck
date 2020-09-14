import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from "react-native";
import {createStackNavigator, createAppContainer} from 'react-navigation';


class Mainpage extends React.Component{
  static navigationOptions = {
    title : '메인 페이지 화면',
  };
    constructor(props) {
        super(props);
        this.state = {
                        customerID : ""
  
                    } 
      };
    component
    componentDidMount() {
        const { navigation } = this.props;
        console.log(navigation.getParam('customerID', null))
        this.state.customerID = navigation.getParam('customerID', null);
        
    }
    
    pushCheck = (ID) => {
        console.log("Check : " + this.state.customerID)
            this.props.navigation.navigate(
                'CheckTab',
                {
                    customerID : this.state.customerID
                }
            )
    }

    
    pushWait = (ID) => {
        console.log("Wait : " + this.state.customerID)
            this.props.navigation.navigate(
                'WaitTab',
                {
                    customerID : this.state.customerID
                }
            )
        
    }

    pushRequest = (ID) => {
        console.log("Request : " + this.state.customerID)
            this.props.navigation.navigate(
                'RequestTab',
                {
                    customerID : this.state.customerID
                }
            )
        
    }

    pushCarcheck = (ID) => {
          this.props.navigation.navigate(
              'CarCheckTab',
              {
                  customerID : this.state.customerID
              }
          )
      
    }

    pushLogout = (ID) =>{
        this.props.navigation.goBack();
    }

    render() {
        
        return (
        <View>
        <TouchableOpacity style={styles.submitButton} onPress={() => this.pushRequest(this.state.customerID)}>
          <Text style={styles.submitButtonText}>화물 의뢰</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={() => this.pushCheck(this.state.customerID)}>
          <Text style={styles.submitButtonText}>화물 상태 확인</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={() => this.pushCarcheck(this.state.customerID)}>
          <Text style={styles.submitButtonText}>내 차 확인</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={() => this.pushWait(this.state.customerID)}>
          <Text style={styles.submitButtonText}>화물 의뢰 대기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={() => this.pushLogout(this.state.customerID)}>
          <Text style={styles.submitButtonText}>로그아웃</Text>
        </TouchableOpacity>
        </View>
        );
      }

}

export default Mainpage;
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
      height: 40
    },
    submitButtonText: {
      color: "white"
    }
    
  });