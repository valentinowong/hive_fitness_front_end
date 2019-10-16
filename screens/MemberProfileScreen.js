import React from 'react';
import {
  Text,
  View
} from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';



class MemberProfileScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        
        return {
            title: 'Member Profile',
        };
    };
    
    render(){
      console.log("MemberProfileScreen: ", "Props: ", this.props, "Params: ", this.props.navigation.getParam('selectedUserId'))
      return (
          <View>
              <Text>
                  This is the Member Profile Screen!
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

const mapStateToProps = state => ({
  users: state.users
})

export default connect(mapStateToProps, null)(MemberProfileScreen);