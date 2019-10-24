import React from 'react';
import { Text, View, FlatList, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { styles } from '../styles';
import { Ionicons } from '@expo/vector-icons';
import Calendar from '../components/Calendar'


class MemberProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    const user = navigation.getParam('user')
    return {
        title: `${user ? `${user.attributes.first_name}'s` : 'My'} Profile`,
    };
  };

  keyExtractor = (item, index) => index.toString()
  
  render(){
    const { navigation, users, workouts, goals, groups } = this.props;
    const user_id = navigation.getParam('selectedUserId', users.currentUserId)
    const user = users.usersArray.find(user => user.id === user_id )
    const {email, first_name, last_name} = user.attributes
    const userWorkouts = workouts.workoutsArray.filter(workout => workout.relationships.user.data.id === user_id)
    const userGoals = goals.goalsArray.filter( goal => goal.relationships.user.data.id === user_id)
    const group = groups.groupsArray.find( group => group.id === groups.selectedGroupId)
    return (
      <ScrollView>
        <View 
          style={styles.centerContainer}
        >
          <Ionicons name='ios-person' size={300}/>
          <View
              style={styles.hairLineBorder}
          />
          <View style={styles.doubleButtonContainer}>
            <Button
              title="Edit Goal Days"
              buttonStyle={styles.singleSmallButton}
              titleStyle={styles.singleSmallButtonTitle}
              onPress={() => this.handleEditGoalsButtonPress(user, userGoals, group)}
            />
            <Button
              title={`${user_id === users.currentUserId ? 'My' : `${first_name}'s`} Workouts`}
              buttonStyle={styles.singleSmallButton}
              titleStyle={styles.singleSmallButtonTitle}
              onPress={() => this.handleWorkoutsButtonPress(user_id)}
            />
          </View>
        </View>
        <View style={styles.bodyContainer}>
          <View style={styles.detailsContainer}>
              <Text style={styles.detailsLabel} >Name</Text>
              <Text style={styles.detailsText}>
                  {`${first_name} ${last_name}`}
              </Text>
          </View>
          <View style={styles.detailsContainer}>
              <Text style={styles.detailsLabel}>Email</Text>
              <Text style={styles.detailsText}>{email}</Text>
          </View>
        </View>
        <View style={styles.centerContainer}>
          <Calendar user={user} workouts={userWorkouts} goals={userGoals} group={group}/>
        </View>
      </ScrollView>
    )
  }
    
  handleWorkoutsButtonPress = (id) => {
    this.props.navigation.navigate('MemberWorkouts', {
      selectedUserId: id,
    })
  }

  handleEditGoalsButtonPress = (user, userGoals, group) => {
    this.props.navigation.navigate('EditGoals', {
      user: user,
      userGoals: userGoals,
      group: group,
    })
  }

  renderGoalsData = () => {
    const { navigation, users } = this.props;
    const user_id = navigation.getParam('selectedUserId', users.currentUserId)
    return this.props.goals.goalsArray.filter(goal => goal.relationships.user.data.id === user_id)
  }

  renderItem = ({ item }) => {
    return (
      <Text>{`Week ${item.attributes.week_number} - ${item.attributes.goal_days} days`}</Text>
    )
  }

}

const mapStateToProps = state => ({
  groups: state.groups,
  workouts: state.workouts,
  users: state.users,
  goals: state.goals,
})

export default connect(mapStateToProps, null)(MemberProfileScreen);