import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from "react-native";
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';

class CompanyTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                        //customerID : this.props.
  
                    } 
      };

    pushRequest = (ID) => {
        console.log("Request : " + this.state.customerID)
            this.props.navigation.navigate(
                'RequestTab',
                {
                    customerID : this.state.customerID
                }
            )
        
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

    render(){
        <View>
        <TouchableOpacity style={styles.submitButton} onPress={() => this.pushRequest(this.state.customerID)}>
          <Text style={styles.submitButtonText}>화물 의뢰</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={() => this.pushCheck(this.state.customerID)}>
          <Text style={styles.submitButtonText}>화물 상태 확인</Text>
        </TouchableOpacity>
        </View>
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
      height: 40
    },
    submitButtonText: {
      color: "white"
    }
})