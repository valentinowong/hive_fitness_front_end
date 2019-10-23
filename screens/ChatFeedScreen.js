import React from 'react';
import { Text, View, ScrollView, FlatList, AsyncStorage } from 'react-native';
import { Button, ListItem, Card } from 'react-native-elements';
import { refreshWorkouts, fetchWorkouts } from '../redux/actions/workoutActions';
import { styles } from '../styles';
import { connect } from 'react-redux';

class ChatFeedScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        
        return {
            title: 'Chat Feed',
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
        const url = item.attributes.image_url ? {uri: item.attributes.image_url } : require('../assets/images/dumbbell-workout.png')
        return (
            <Card
                image={url}
                imageStyle={{width: 300, height: 300}}
                imageProps={{resizeMode: 'contain'}}
            >
                <View style={styles.feedDetailsContainer}>
                    <Text style={styles.feedUserName}>{`${user.attributes.first_name} ${user.attributes.last_name}`}</Text>
                    <Text style={styles.feedDatetime}>{this.renderDatetime(item.attributes.datetime)}</Text>
                </View>
                <Text style={styles.feedWorkoutDescription}>{item.attributes.description}</Text>
        </Card>  
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

    renderDatetime = (datetimeStr) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        // Add leading zero to hours & minutes
        function addZero(i) {
            if (i < 10) {
              i = "0" + i;
            }
            return i;
        }
        function convertHours(i) {
            if (i > 12) {
                i -= 12;
            } else if (i === 0 ){
                i = 12;
            }
            return i;
        }
        const datetime = new Date(datetimeStr)
        const day = days[datetime.getDay()]
        const month = months[datetime.getMonth()]
        const date = datetime.getDate()
        const hour = addZero(datetime.getHours())
        const displayHours = convertHours(datetime.getHours())
        const minutes = addZero(datetime.getMinutes())
        return `${displayHours}:${minutes} ${hour < 12 ? 'AM' : 'PM'}, ${day}, ${month} ${date}`
    }

    handleRefresh = async () => {
        this.props.refreshWorkouts()
        const token = await AsyncStorage.getItem('token')
        this.props.fetchWorkouts(token, this.props.selectedGroupId)
        // this.setState({
        //     refreshing: true,
        // }, () => {
        //     await this.props.fetchWorkouts(token, this.props.selectedGroupId)
        //     this.setState({refreshing: false})
        // })
    }

}

const mapStateToProps = state => ({
    users: state.users,
    workouts: state.workouts,
    selectedGroupId: state.groups.selectedGroupId
})

export default connect(mapStateToProps, { refreshWorkouts, fetchWorkouts } )(ChatFeedScreen);