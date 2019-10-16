import React from 'react';
import {
  Text,
  View
} from 'react-native';
import { Button } from 'react-native-elements';



class ChatFeedScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        
        return {
            title: 'Chat Feed',
        };
    };
    
    render(){
      return (
          <View>
              <Text>
                  This is the Chat Feed Screen!
              </Text>
          </View>
      )
    }
    
}

export default ChatFeedScreen;