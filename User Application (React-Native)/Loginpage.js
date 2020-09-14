import React, { Component } from "react";
import {View,Text,TouchableOpacity,TextInput,StyleSheet} from "react-native";

class Loginpage extends React.Component {
  static navigationOptions = {
    title : '로그인 화면',
  };
    constructor(props) {
        super(props); 
      }
  state = {
    email: "",
    password: "",
    customerID : "",
  };

  
  
  server = `http://uryotruck.ap-northeast-2.elasticbeanstalk.com`

  handleEmail = text => {
    this.setState({ email: text });
  };
 
  handlePassword = text => {
    this.setState({ password: text });
  };

  login = (email, pass) => {
    const post ={
        Id: email,
        pw: pass
    }

    fetch(this.server + `/login?id=${email}&password=${pass}`)
    .then(result => result.json())
    .then(data => {
        console.log(data);
        if(data === 1){
            this.state.customerID = this.state.email
            console.log("login : " + this.state.customerID)
            this.props.navigation.navigate(
                'Mainpage',
                {
                    customerID : this.state.customerID
                }
            )
        }
        else{
            alert("잘못된 정보입니다.")
        }
    })
    
  };

  register(){
    this.props.navigation.navigate(
        'Registerpage'
    )

  };
 
  render() {
      
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Email"
          placeholderTextColor="#9aa9ff"
          autoCapitalize="none"
          onChangeText={this.handleEmail}
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Password"
          placeholderTextColor="#9aa9ff"
          autoCapitalize="none"
          onChangeText={this.handlePassword}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this.login(this.state.email, this.state.password)}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this.register()}
        >
          <Text style={styles.submitButtonText}>register</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
 
export default Loginpage;
 
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