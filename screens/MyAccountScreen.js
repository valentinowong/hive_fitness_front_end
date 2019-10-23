import React from 'react';
import { Text, View } from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { connect } from 'react-redux';
import { auth0Domain, removeData } from '../redux/adapters/BaseConfig'
import { styles } from '../styles';


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
                    style={styles.centerContainer}
                >
                    <Ionicons name='ios-person' size={300}/>
                    <View
                        style={styles.hairLineBorder}
                    />
                    <Button
                        title="Logout"
                        buttonStyle={styles.singleLargeButton}
                        titleStyle={styles.singleLargeButtonTitle}
                        onPress={this.logout}
                    />
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
            </View>
        )
    }
    
}

const mapStateToProps = state => ({
    users: state.users
})

export default connect(mapStateToProps, null )(MyAccountScreen);