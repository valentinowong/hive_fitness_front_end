import React from 'react';
import {
  Text,
  View
} from 'react-native';
import { Button } from 'react-native-elements';



class LogNewWorkoutScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        
        return {
            title: 'Log New Workout',
        };
    };
    
    render(){
      return (
          <View>
              <Text>
                  This is the Log New Workout Screen!
              </Text>
          </View>
      )
    }
    
}

export default LogNewWorkoutScreen;