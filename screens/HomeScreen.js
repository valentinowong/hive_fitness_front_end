import React from 'react';
import {
  Text,
  View
} from 'react-native';
import { Button } from 'react-native-elements';


class HomeScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        
        return {
            title: 'Home',
        };
    };
    
    render(){
        return (
            <View>
                <Button onPress={() => this.props.navigation.navigate('Home')}
                  title="Home"
                  type="outline"
                  raised
                />
                <Button onPress={() => this.props.navigation.navigate('Members')}
                  title="Members"
                  type="outline"
                  raised
                />
                <Button onPress={() => this.props.navigation.navigate('GroupStats')}
                  title="Group Stats"
                  type="outline"
                  raised
                />
                <Button onPress={() => this.props.navigation.navigate('WeekStats')}
                  title="Week Stats"
                  type="outline"
                  raised
                />
                <Button onPress={() => this.props.navigation.navigate('Penalties')}
                  title="Penalties"
                  type="outline"
                  raised
                />
            </View>
        )
    }
    
}

export default HomeScreen;