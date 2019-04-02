import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Button } from 'react-native-elements';

class MapScreen extends Component {
  state = {
    mapLoaded: false,
    region: {
      longitude: -119.417931,
      latitude: 36.778259,
      longitudeDelta: 4.5516,
      latitudeDelta: 41.7324
    }
  }

  componentDidMount() {
    this.setState({ mapLoaded: true });
  }

  onRegionChangeComplete = (region) => {
    this.setState({ region })
  }

  onButtonPress = () => {
    this.props.fetchJobs(this.state.region);
  }

  render() {
    if (!this.state.mapLoaded) {
      return(
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return(
      <View style={{ flex: 1 }}>
        <MapView 
          region={this.state.region}
          style={{ flex: 1 }}
          onRegionChangeComplete={this.onRegionChangeComplete}
        />
        <View style={styles.buttonContainer}>
          <Button 
            large
            title="Search my area"
            backgroundColor="#009688"
            icon={{ name: 'search' }}
            onPress={this.onButtonPress}
          />
        </View>
      </View>
    )
  }
}


const styles = {
  buttonContainer: {
    position: 'absolute',
    bottom: 35,
    left: 5,
    right: 5,
    paddingTop: 5,
    paddingBottom: 5
  }
}

export default connect(null, actions)(MapScreen);