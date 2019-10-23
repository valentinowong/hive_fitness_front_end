import React from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import { Avatar, Button, Input } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { styles } from '../styles';

class EditAccountScreen extends React.Component {
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
    
    render(){
        console.log('My Account Screen', this.props.users)

        const currentUser = this.props.users.usersArray.find(user => user.id === this.props.users.currentUserId)
        const {email, first_name, last_name} = currentUser.attributes
        return (
            <View>
                <View style={styles.rowContainer}>
                    <Ionicons name='ios-person' size={150}/>
                    <View style={styles.bodyContainer}>
                        <View style={styles.detailsContainer}>
                            <Input
                                defaultValue={first_name}
                                label='First Name'
                                labelStyle={styles.detailsLabel}
                                inputStyle={styles.detailsTextInput}
                            />
                        </View>
                        <View style={styles.detailsContainer}>
                            <Input
                                defaultValue={last_name}
                                label='Last Name'
                                labelStyle={styles.detailsLabel}
                                inputStyle={styles.detailsTextInput}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.hairLineBorder}/>
                <View style={styles.detailsContainer}>
                    <Input
                        defaultValue={email}
                        label='Email'
                        labelStyle={styles.detailsLabel}
                        inputStyle={styles.detailsTextInput}
                    />
                </View>
            </View>
        )
    }
    
}
// const styles = StyleSheet.create({
//     header: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         margin: 30
//     },
//     hairLineBorder: {
//         borderBottomWidth: 1,
//         borderBottomColor: '#D9D9D9',
//         width: '100%',
//     },
//     buttonView: {
//         width: '100%',
//         backgroundColor: '#D9D9D9',
//         margin: 10,
//     },
//     buttonTitle: {
//         color: '#000'
//     },
//     accountDetailsContainer: {
//         justifyContent: 'center',
//         margin: 10,
//     },
//     accountDetailLabel: {
//         fontSize: 24,
//         fontWeight: 'bold'
//     },
//     accountDetail: {
//         fontSize: 24
//     }

// });

const mapStateToProps = state => ({
    users: state.users
})

export default connect(mapStateToProps, null )(EditAccountScreen);