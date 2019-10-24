import React from 'react';
import { Text, View, ScrollView, FlatList, AsyncStorage } from 'react-native';
import { Button, ListItem, Card } from 'react-native-elements';
import { refreshWorkouts, fetchWorkouts } from '../redux/actions/workoutActions';
import { styles } from '../styles';
import { connect } from 'react-redux';
import WorkoutCard from '../components/WorkoutCard'

class ChatFeedScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        
        return {
            title: 'Workouts',
        };
    };

    keyExtractor = (item, index) => index.toString()

    render() {
        console.log('Chat Feed Props: ', this.props)
        return (
            <FlatList
                keyExtractor={this.keyExtractor}
                data={this.renderWorkoutsData()}
                renderItem={this.renderItem}
                refreshing={this.props.workouts.refreshing}
                onRefresh={this.handleRefresh}
            />
        )
    }

    renderItem = ({ item }) => {
        const user = this.props.users.usersArray.find(user => user.id === item.relationships.user.data.id)
        const imageUrl = item.attributes.image_url ? {uri: item.attributes.image_url } : require('../assets/images/dumbbell-workout.png')
        return (
            <WorkoutCard user={user} workout={item}/>
        )
        
    }

    sortedWorkoutsArray = () => {
        return this.props.workouts.workoutsArray.sort((a,b) => {
            a = new Date(a.attributes.datetime);
            b = new Date(b.attributes.datetime);
            return a > b ? -1 : a < b ? 1 : 0;
        })
    }

    renderWorkoutsData = () => {
        const { navigation } = this.props;
        const user_id = navigation.getParam('selectedUserId', null)

        if (user_id) {
            return this.sortedWorkoutsArray().filter(workout => workout.relationships.user.data.id === user_id)
        } else if (this.props.workouts.workoutsArray) {
            return this.sortedWorkoutsArray()
        } else {
            return null
        }

    }

    handleRefresh = async () => {
        this.props.refreshWorkouts()
        const token = await AsyncStorage.getItem('token')
        this.props.fetchWorkouts(token, this.props.selectedGroupId)
    }

}

const mapStateToProps = state => ({
    users: state.users,
    workouts: state.workouts,
    selectedGroupId: state.groups.selectedGroupId
})

export default connect(mapStateToProps, { refreshWorkouts, fetchWorkouts } )(ChatFeedScreen);