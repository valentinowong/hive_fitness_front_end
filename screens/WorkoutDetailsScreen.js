import React from 'react';
import {
  Text,
  View
} from 'react-native';
import { Button } from 'react-native-elements';



class WorkoutDetailsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        
        return {
            title: 'Workout Details',
            headerLeft: (
                <Button
                    onPress={() => navigation.navigate('ChatStack')}
                    title="Chat Feed"
                    type="clear"
                />
            ),
        };
    };
    
    render(){
      return (
          <View>
              <Text>
                  This is the Workout Details Screen!
              </Text>
          </View>
      )
    }
    
}

export default WorkoutDetailsScreen;