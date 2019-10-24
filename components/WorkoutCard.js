import React, { Component } from 'react'
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';

import { styles } from '../styles';

class Calendar extends Component {
    
    render() {
        const { user, workout } = this.props
        const imageUrl = workout.attributes.image_url ? {uri: workout.attributes.image_url } : require('../assets/images/dumbbell-workout.png')
        return (
            <Card
                image={imageUrl}
                imageStyle={{width: 300, height: 300}}
                imageProps={{resizeMode: 'contain'}}
            >
                <View style={styles.feedDetailsContainer}>
                    <Text style={styles.feedUserName}>{`${user.attributes.first_name} ${user.attributes.last_name}`}</Text>
                    <Text style={styles.feedDatetime}>{this.renderDatetime(workout.attributes.datetime)}</Text>
                </View>
                <Text style={styles.feedWorkoutDescription}>{workout.attributes.description}</Text>
            </Card> 
        )
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
}

export default Calendar;