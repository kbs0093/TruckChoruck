import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList
} from "react-native";

export default class AR extends React.Component {

    state = {
        num : 0
    }
    componentDidMount() {
        // need to make the initial call to getData() to populate
        // data right away
        this.getData();

        // Now we need to make it run at a specified interval
        setInterval(this.getData, 3000); // runs every 5 seconds.
      }

      getData = () => {
        // do something to fetch data from a remote API.
        this.setState({num : this.state.num + 1})
      }

      render() {
        return (
          <View>
            <TouchableOpacity style={styles.submitButton}>
                <Text style={styles.submitButtonText}>{this.state.num}</Text>      
            </TouchableOpacity>
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
          height: 140
        },
        submitButtonText: {
          color: "white"
        }
        
      });
