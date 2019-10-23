import React from 'react';
import { Text, View, Image, Picker, TextInput, ScrollView, TouchableHighlight, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import DateTimePicker from "react-native-modal-datetime-picker";
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { connect } from 'react-redux';
import { styles } from '../styles';
import { openNewWorkoutForm, changeWorkoutFormDatetime, changeWorkoutFormDescription, selectWorkoutImage, submitNewWorkout, refreshWorkouts, fetchWorkouts } from '../redux/actions/workoutActions';


class LogNewWorkoutScreen extends React.Component {
    state = {
        isDateTimePickerVisible: false,
    };

    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        
        return {
            title: 'Log New Workout',
        };
    };

    componentDidMount() {
        this.getPermissionAsync();
        this.props.openNewWorkoutForm();
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
    }
    
    render(){
        const currentUser = this.props.users.usersArray.find(user => user.id === this.props.users.currentUserId)
        const {first_name, last_name} = currentUser.attributes
        const image = this.props.workouts.formData.image ? {uri: this.props.workouts.formData.image.uri } : require('../assets/images/dumbbell-workout.png')

        console.log("LogNewWorkoutScreen Props: ", this.props)
        return (
            <ScrollView>

                <View style={styles.centerContainer}>
                    <Image source={image} style={{ width: 300, height: 300 }} />
                    <Button
                        title="Add Workout Image"
                        onPress={this._pickImage}
                        buttonStyle={styles.singleSmallButton}
                        titleStyle={styles.singleSmallButtonTitle}
                    />
                    <View style={styles.hairLineBorder} />
                </View>
                
                <View style={styles.detailsContainer}>
                    <Text style={styles.detailsLabel}>
                        {`${first_name} ${last_name}`}
                    </Text>
                    <TextInput
                        multiline
                        placeholder='Example Workout Description'
                        style={styles.detailsLongTextInput}
                        value={this.props.workouts.formData.workoutDescription}
                        onChangeText={(text) => this.props.changeWorkoutFormDescription(text)}
                    />
                    <Text style={styles.detailsLabel}>When?</Text>
                    <Text style={styles.datetimeInput} onPress={this.toggleShowDateTimePicker} >{this.renderDatetime()}</Text>
                    <Button
                        title="Save"
                        buttonStyle={styles.saveButton}
                        onPress={this.handleSubmit}
                    />  
                </View>

                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.toggleShowDateTimePicker}
                    mode='datetime'
                />

            </ScrollView>
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
        const user = this.props.users.usersArray.find(user => user.id === this.props.users.currentUserId)
        let workout = { 
            user_id: this.props.users.currentUserId,
            group_id: this.props.selectedGroupId,
            datetime: this.props.workouts.formData.datetime,
            description: this.props.workouts.formData.workoutDescription,
        }
        if (this.props.workouts.formData.image) {
            workout.image = this.props.workouts.formData.image.base64,
            workout.file_name = `${new Date().toUTCString()}-${user.attributes.first_name}${user.attributes.last_name}`
        }
        const data = {
            workout: workout
        }
        this.props.submitNewWorkout(token, data, this.props.selectedGroupId)
        this.props.navigation.navigate('ChatFeed')
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            base64: true,
            quality: 0.1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
            this.props.selectWorkoutImage(result);
        }
      };

}

const mapStateToProps = state => ({
    users: state.users,
    workouts: state.workouts,
    selectedGroupId: state.groups.selectedGroupId
})

export default connect(mapStateToProps, { openNewWorkoutForm, changeWorkoutFormDatetime, changeWorkoutFormDescription, selectWorkoutImage, submitNewWorkout, refreshWorkouts, fetchWorkouts } )(LogNewWorkoutScreen);