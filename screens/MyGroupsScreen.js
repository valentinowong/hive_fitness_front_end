import React from 'react';
import {
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    Text,
    StyleSheet,
    View, 
    Button
} from 'react-native';
import {AsyncStorage} from 'react-native';
import { ListItem } from 'react-native-elements'
import { connect } from 'react-redux';
import { fetchGroups, selectGroup } from '../redux/actions/groupActions';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';

class MyGroupsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        
        return {
            title: 'My Groups',
            headerTitleStyle: {
                color: '#fff'
            },
            headerRight: (
                <Ionicons onPress={() => navigation.navigate('MyAccount')} name='ios-contact' size={40}/>
            )
        };
    };

    async componentDidMount() {
        let token = await AsyncStorage.getItem('token')
        
        if (token) {
            this.props.fetchGroups(token);
        }

    }

    keyExtractor = (item, index) => index.toString()

    render(){
        console.log('My Groups Screen groups props:', this.props.groups, 'My Groups Screen users props:', this.props.users)
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    ListHeaderComponent={<Text style={styles.listHeader} >My Groups</Text>}
                    keyExtractor={this.keyExtractor}
                    data={this.props.groups.groupsArray ? this.props.groups.groupsArray : null}
                    renderItem={this.renderItem}
                />
            </SafeAreaView>
        )
    }

    renderItem = ({ item }) => (
        <ListItem
            key={item.id}
            title={item.attributes.name}
            subtitle={`${this.formatDate(item.attributes.start_date)} - ${this.formatDate(item.attributes.end_date)}`}
            // style={styles.item}
            titleStyle={styles.title}
            leftIcon={{ name: 'group'}}
            onPress={() => this.handleGroupPress(item.id)}
            bottomDivider
            chevron
        />
    )

    formatDate = (dateString) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        const date = new Date(dateString)
        return `${days[date.getUTCDay()]}, ${months[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`
    }

    handleGroupPress = async (id) => {
        const token = await AsyncStorage.getItem('token')
        this.props.selectGroup(id, token)
        this.props.navigation.navigate('Main')
    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: Constants.statusBarHeight,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
    listHeader: {
        fontSize: 32,
        fontWeight: "bold"
    }
});

const mapStateToProps = state => ({
    groups: state.groups,
    users: state.users
})

export default connect(mapStateToProps, { fetchGroups, selectGroup })(MyGroupsScreen);