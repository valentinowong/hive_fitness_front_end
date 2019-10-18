import React from 'react';
import {
  Text,
  View
} from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

class ChatFeedScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        
        return {
            title: 'Chat Feed',
        };
    };

    render(){
        console.log('Chat Feed Props: ', this.props)
        return (
            <View>
                <Text>
                    This is the Chat Feed Screen!
                </Text>
                <View>
                    {this.renderWorkouts()}
                </View>
            </View>
        )
    }
    
    renderWorkouts = () => {
        return this.props.workouts.workoutsArray.map(workout => {
            const user = this.props.users.usersArray.find(user => user.id === workout.relationships.user.data.id)
            return (
                <View key={workout.id}>
                    <Text>{workout.id}</Text>
                    <Text>{workout.attributes.datetime}</Text>
                    <Text>{workout.attributes.description}</Text>
                    <Text>{`${user.attributes.first_name} ${user.attributes.last_name}`}</Text>
                </View>
            )
        })
    }
}

const mapStateToProps = state => ({
    users: state.users,
    workouts: state.workouts,
})

export default connect(mapStateToProps, null )(ChatFeedScreen);