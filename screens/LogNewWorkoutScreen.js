import React from 'react';
import { Text, View, Picker, TextInput, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import DateTimePicker from "react-native-modal-datetime-picker";
import { connect } from 'react-redux';
import { openNewWorkoutForm, changeWorkoutFormDatetime, changeWorkoutFormDescription, submitNewWorkout } from '../redux/actions/workoutActions';


class LogNewWorkoutScreen extends React.Component {
    state = {
        isDateTimePickerVisible: false
    };

    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        
        return {
            title: 'Log New Workout',
        };
    };

    componentDidMount() {
        this.props.openNewWorkoutForm()
    }
    
    render(){
        const currentUser = this.props.users.usersArray.find(user => user.id === this.props.users.currentUserId)
        const {first_name, last_name} = currentUser.attributes

        console.log("LogNewWorkoutScreen Props: ", this.props)
        return (
            <View>
                <View style={{margin: 10}}>
                    <Text
                        style={styles.textLabel}
                    >
                        {`${first_name} ${last_name}`}
                    </Text>
                </View>
                <TextInput
                    multiline
                    placeholder='Example Workout Description'
                    style={styles.textInput}
                    value={this.props.workouts.workoutDescription}
                    onChangeText={(text) => this.props.changeWorkoutFormDescription(text)}
                />
                <View>
                    <Text style={styles.textLabel}>When?</Text>
                    <Text style={styles.datetime} onPress={this.toggleShowDateTimePicker} >{this.renderDatetime()}</Text>
                </View>

                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.toggleShowDateTimePicker}
                    mode='datetime'
                />
                <Button
                        title="Save"
                        buttonStyle={styles.buttonView}
                        onPress={this.handleSubmit}
                />

                <Text>
                    This is the Log New Workout Screen!
                </Text>
            </View>
      )
    }

    toggleShowDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: !this.state.isDateTimePickerVisible})
    }

    handleDatePicked = datetime => {
    console.log("A date has been picked: ", datetime);
    this.props.changeWorkoutFormDatetime(datetime)
    this.toggleShowDateTimePicker();
    };

    renderDatetime = () => {
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
            } else if (i === "00" ){
                i = 12;
            }
            return i;
        }
        const workoutDateTime = this.props.workouts.formData.datetime
        const day = days[workoutDateTime.getDay()]
        const month = months[workoutDateTime.getMonth()]
        const date = workoutDateTime.getDate()
        const hour = addZero(workoutDateTime.getHours())
        const displayHours = convertHours(hour)
        const minutes = addZero(workoutDateTime.getMinutes())
        return `${day}, ${month} ${date}, ${displayHours}:${minutes} ${hour < 12 ? 'AM' : 'PM'}`
    }

    handleSubmit = async () => {
        const token = await AsyncStorage.getItem('token')
        const data = {
            user_id: this.props.users.currentUserId,
            group_id: this.props.selectedGroupId,
            datetime: this.props.workouts.formData.datetime,
            description: this.props.workouts.formData.workoutDescription,
        }
        this.props.submitNewWorkout(token, data, this.props.selectedGroupId)
        // this.props.navigation.navigate('WorkoutDetails')
    }
}

const styles = {
    textLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
        padding: 5,
    },
    textInput: {
        fontSize: 20,
        height: 75, 
        borderRadius: 10, 
        backgroundColor: '#D9D9D9',
        margin: 10,
        padding: 5,
    },
    datetime: {
        fontSize: 20,
        margin: 10,
        padding: 5,
        color: '#007AFF',
    },
    buttonView: {
        width: '90%',
        backgroundColor: '#007AFF',
        margin: 10,
    }
}

const mapStateToProps = state => ({
    users: state.users,
    workouts: state.workouts,
    selectedGroupId: state.groups.selectedGroupId
})

export default connect(mapStateToProps, { openNewWorkoutForm, changeWorkoutFormDatetime, changeWorkoutFormDescription, submitNewWorkout } )(LogNewWorkoutScreen);