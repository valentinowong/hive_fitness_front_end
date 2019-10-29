import React from 'react';
import {
  Text,
  View
} from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';



class PenaltiesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
      const params = navigation.state.params || {};
      
      return {
          title: 'Penalties'
      };
  };
    
  render(){
      return (
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                  
        <View style={{alignItems: 'center', margin: 10, padding: 10}}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>Goal Days</Text>
            {this.renderGoalDaysColumn()}
        </View>
        
        <View style={{alignItems: 'center', margin: 10, padding: 10}}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>Penalty</Text>
            {this.renderPenaltiesColumn()}
        </View>

    </View>
      )
  }

  renderGoalDaysColumn = () => {
    const goalDays = this.props.penalties.penaltiesArray.map(penaltyObj => penaltyObj.attributes.goal_days)
    return goalDays.map(day => {
      return (
        <View
          key={`Day-${day}`}
          style={{
              width: 30,
              height: 30,
              alignItems: 'center',
              justifyContent: 'center'
          }}
      >
          <Text style={{fontSize: 20}}>{day}</Text>
      </View>
      )
    })
  }

  renderPenaltiesColumn = () => {
    const penalties = this.props.penalties.penaltiesArray.map(penaltyObj => `$${penaltyObj.attributes.amount.toFixed(2)}`)
    return penalties.map(day => {
      return (
        <View
          key={`Day-${day}`}
          style={{
              width: 75,
              height: 30,
              alignItems: 'center',
              justifyContent: 'center'
          }}
      >
          <Text style={{fontSize: 20}}>{day}</Text>
      </View>
      )
    })
  }
    
}

const mapStateToProps = state => ({
  penalties: state.penalties,
})

export default connect(mapStateToProps, null )(PenaltiesScreen);