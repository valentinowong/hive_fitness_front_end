import React from 'react';
import { Text, View } from 'react-native';
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
    const { navigation, users } = this.props;
    const user_id = navigation.getParam('selectedUserId', users.currentUserId)
    const user = users.usersArray.find(user => user.id === user_id )
    
    return (
      <View>
          <Text>
              This is the {user.attributes.first_name}'s Profile Screen!
          </Text>
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