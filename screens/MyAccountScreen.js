import React from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { connect } from 'react-redux';
import { auth0Domain, removeData } from '../redux/adapters/BaseConfig'


class MyAccountScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        
        return {
            title: 'My Account',
            headerTitleStyle: {
                color: '#000'
            },
            headerRight: (
                <Button
                onPress={() => navigation.navigate('EditAccount')}
                  title="Edit"
                  type="clear"
                />
            ),
        };
    };

    logout = async () => {
        const logoutUrl = `${auth0Domain}/v2/logout?federated`
        await WebBrowser.openBrowserAsync(logoutUrl)
        removeData('token');
        this.props.navigation.navigate('Login')
    }
    
    render(){
        console.log('My Account Screen', this.props.users)

        const currentUser = this.props.users.usersArray.find(user => user.id === this.props.users.currentUserId)
        const {email, first_name, last_name} = currentUser.attributes
        return (
            <View>
                <View 
                    style={styles.container}
                >
                    <Ionicons name='ios-person' size={300}/>
                    <View
                        style={styles.hairLineBorder}
                    />
                    <Button
                        title="Logout"
                        buttonStyle={styles.buttonView}
                        titleStyle={styles.buttonTitle}
                        onPress={this.logout}
                    />
                </View>
                <View style={styles.accountDetailsContainer}>
                    <View style={styles.accountDetailsContainer}>
                        <Text style={styles.accountDetailLabel} >Name</Text>
                        <Text style={styles.accountDetail}>
                            {`${first_name} ${last_name}`}
                        </Text>
                    </View>
                    <View style={styles.accountDetailsContainer}>
                        <Text style={styles.accountDetailLabel}>Email</Text>
                        <Text style={styles.accountDetail}>{email}</Text>
                    </View>
                </View>
                <Text>
                    This is the My Account Screen!
                </Text>
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    hairLineBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#D9D9D9',
        width: '100%',
    },
    buttonView: {
        width: '100%',
        backgroundColor: '#D9D9D9',
        margin: 10,
    },
    buttonTitle: {
        color: '#000'
    },
    accountDetailsContainer: {
        justifyContent: 'center',
        margin: 10
    },
    accountDetailLabel: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    accountDetail: {
        fontSize: 24,
    }

});

const mapStateToProps = state => ({
    users: state.users
})

export default connect(mapStateToProps, null )(MyAccountScreen);