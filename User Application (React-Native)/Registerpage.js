import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from "react-native";


class Registerpage extends React.Component {
  static navigationOptions = {
    title : '회원가입 화면',
  };
    constructor(props) {
        super(props); 
      }
    state = {
        email: "",
        password: "",
        pNumber : "",
        car_id : ""//자동차 아이디, 화물주는 입력 안해도됨
    }


    handleEmail = text => {
        this.setState({ email: text });
    };
     
    handlePassword = text => {
        this.setState({ password: text });
    };

    handlePhoneNumber = text => {
        this.setState({ pNumber: text });
    };
    handleCarid = text => {
      this.setState({ car_id : text });
    };


    register = (email, pass, pNumber, car_id) => {
        const post ={
            id: email,
            password: pass,
            phone_number : pNumber,
            car_id : car_id
        }

        console.log(post)

        fetch(`http://uryotruck.ap-northeast-2.elasticbeanstalk.com/login`,{
            method :'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body:JSON.stringify(post)
        })
        .then(function(data) {
          if(data === "success") {
            //alert("회원가입 성공")
            
          }
          else
          {
            //alert("회원가입 실패")
            
          }
       }).catch(function(error) {
         console.log(`There has been a problem with your fetch operation : ${error.message}`);
       });
        

      this.props.navigation.goBack();
    }

    render() {
      
        return (
          <View style={styles.container}>
            <Text style = {styles.submitButtonText}>회원정보를 입력하세요</Text>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Email"
              placeholderTextColor="#9a73ef"
              autoCapitalize="none"
              onChangeText={this.handleEmail}
            />
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Password"
              placeholderTextColor="#9a73ef"
              autoCapitalize="none"
              onChangeText={this.handlePassword}
            />
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="PhoneNumber(No bar)"
              placeholderTextColor="#9a73ef"
              autoCapitalize="none"
              onChangeText={this.handlePhoneNumber}
            />
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Car ID(선택사항)"
              placeholderTextColor="#9a73ef"
              autoCapitalize="none"
              onChangeText={this.handleCarid}
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => this.register(this.state.email, this.state.password, this.state.pNumber, this.state.car_id)}
            >
              <Text style={styles.submitButtonText}>회원가입</Text>
            </TouchableOpacity>
          </View>
        );
      }

}

export default Registerpage;

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