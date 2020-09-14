import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import MapView, { Marker } from 'react-native-maps';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export default class RequestTab extends Component {
  
  static navigationOptions = {
    title : '화물 위치 입력',
  };
  constructor(props) {
    super(props);

    this.state = {
      company_id : "",//화물주 ID
      lat : 37.392835,
      lng : 127.111996,
      markers: []
    }
    this.handlePress = this.handlePress.bind(this);
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.state.company_id = navigation.getParam('customerID', null);
  }

  handlePress(e) {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
        }
      ],
      lat : e.nativeEvent.coordinate.latitude,
      lng : e.nativeEvent.coordinate.longitude
    })
  }

  request(state)
  {
    console.log(state)
    this.props.navigation.replace(
      'RequestStep2',
      {
          company_id : this.state.company_id,
          content_lat : this.state.lat,
          content_lng : this.state.lng
      })
  }


  render() {
    return (
      <View>
      <MapView 
        style={styles.map}
        region={{
            latitude: this.state.lat,
            longitude: this.state.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }} 
          onPress={this.handlePress}
      >
      {this.state.markers.map((marker) => {
        return (
          <Marker {...marker} >
            <View style={styles.marker}>
              <Text>화물 위치</Text>
            </View>
          </Marker>
        )
      })}
      
      </MapView>
      
      <TouchableOpacity
      style = {styles.submitButton}
      onPress = {() => this.request(this.state)}
      >
        <Text style={styles.submitButtonText}>화물 현재위치 확인</Text>
      </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  marker: {
    backgroundColor: "#9aa9ff",
    padding: 5,
    borderRadius: 5,
  },
  text: {
    color: "#FFF",
    fontWeight: "bold"
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
  },
  map : {
    //marginTop : Constants.statusBarHeight,
    width : 390,
    height : 390
  }
});

AppRegistry.registerComponent('maps', () => maps);