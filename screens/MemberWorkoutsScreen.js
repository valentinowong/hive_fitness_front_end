import React from 'react';
import {
  Text,
  View
} from 'react-native';
import { Button } from 'react-native-elements';


class MemberWorkoutsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        
        return {
            title: 'Member Workouts',
        };
    };
    
    render(){
        return (
            <View>
                <Text>
                    This is the Member Workouts Screen!
                </Text>
                <Button onPress={() => this.props.navigation.navigate('MyProfile')}
                  title="Member Profile"
                  type="outline"
                  raised
                />
                <Button onPress={() => this.props.navigation.navigate('MemberWorkouts')}
                  title="Member Workouts"
                  type="outline"
                  raised
                />
            </View>
        )
    }
    
}

export default MemberWorkoutsScreen;