/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,TouchableOpacity,Alert,Button,Platform,PermissionsAndroid
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import NetInfo from "@react-native-community/netinfo";
import Geolocation from 'react-native-geolocation-service';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


export default  class App extends React.Component {
  constructor() {
    super();
    this.state = {
      deviceId: '',
      lat: '',
      long: '',
         
     
    };
   
  
    
   
  }
  

 componentDidMount () {
    this.getdeviceId()
   
 
   }

  getdeviceId = () => {
    //Getting the Unique Id from here
    var id = DeviceInfo.getDeviceId();
    
    this.setState({ deviceId: id, });
  
   
    Geolocation.getCurrentPosition(
      position => {
        const lat = JSON.stringify(position);
        this.setState({lat});
      },
      error => Alert.alert('Error', JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
   Geolocation.watchPosition(position => {
      const long = JSON.stringify(position);
      this.setState({long});
    });
  
      
    
    

    }

    componentWillUnmount() {
      Geolocation.clearWatch(this.watchID);
    }

  CheckConnectivity = () => {
    // For Android devices
    if (Platform.OS === "android") {
      NetInfo.isConnected.fetch().then(isConnected => {
        if (isConnected) {
          Alert.alert("You are online!");
        } else {
          Alert.alert("You are offline!");
        }
      });
    } else {
      // For iOS devices
      NetInfo.isConnected.addEventListener(
        "connectionChange",
        this.handleFirstConnectivityChange
      );
    }
  };
  handleFirstConnectivityChange = isConnected => {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleFirstConnectivityChange
    );

    if (isConnected === false) {
      Alert.alert("You are offline!");
    } else {
      Alert.alert("You are online!");
    }
  };
  
 
 
  render() {
   
    return (
    
      <View
      style={styles.container}
      >
      <View
      style={{flex:0.2}}
      >
        <Text style={{fontSize: 20,color:'black'}}>{this.state.deviceId}</Text>
      
        <Button
          onPress={() => this.CheckConnectivity()}
          title="Check Internet Connectivity"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
 <Text>{this.state.lat}</Text>
        <Text>{this.state.long}</Text>
        </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,flexDirection:'column'
  }
});

