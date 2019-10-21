import React from 'react';
import {
  Text,
  View, 
  FlatList
} from 'react-native';
import { Button, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';

class MembersScreen extends React.Component {
  
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    
    return {
      title: 'Members'
    };
  };

  keyExtractor = (item, index) => index.toString()
    
  render(){
    return (
      <View>
        <FlatList
          ListHeaderComponent={<Text>Group Members</Text>}
          keyExtractor={this.keyExtractor}
          data={this.props.users.usersArray ? this.props.users.usersArray : null}
          renderItem={this.renderItem}
        />
      </View>
    )
  }

  renderItem = ({ item }) => {
    return (
      <ListItem
        key={item.id}
        title={`${item.attributes.first_name} ${item.attributes.last_name}`}
        leftIcon={{ name: 'person'}}
        onPress={() => this.handleMemberPress(item.id)}
        bottomDivider
        chevron
      />
    )
  }

  handleMemberPress = (id) => {
    this.props.navigation.navigate('MemberProfile', {
      selectedUserId: id,
    })
}

}

const mapStateToProps = state => ({
  users: state.users,
})

export default connect(mapStateToProps, null )(MembersScreen);