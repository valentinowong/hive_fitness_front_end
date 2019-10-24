import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';


class EditGoalsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        
        return {
            title: 'Edit Goals',
            headerRight: (
                <Button
                    // onPress={() => navigation.navigate('EditAccount')}
                    title="Save"
                    type="clear"
                />
            ),
        };
    };
    
    render(){
        return (
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    
                    <View style={{alignItems: 'center', margin: 5}}>
                        <Text style={{fontWeight: 'bold', fontSize: 20}}>Week</Text>
                        {this.renderWeekNumbersColumn()}
                    </View>
                    
                    <View style={{alignItems: 'center', margin: 5}}>
                        <Text style={{fontWeight: 'bold', fontSize: 20}}>Goals</Text>
                        {this.renderGoalsColumn()}
                    </View>

                </View>
        )
    }

    weeksArray = () => {
        const startDate = this.props.navigation.state.params.group.attributes.start_date;
        const endDate = this.props.navigation.state.params.group.attributes.end_date;
        const numberOfWeeks = (((new Date(endDate) - new Date(startDate))/1000/60/60/24) + 1)/7 ;
        let weeks = [];
        let i;
        for (i = 0; i < numberOfWeeks; i++) {
            weeks.push(i+1);
        };
        return weeks;
    }
    
    renderWeekNumbersColumn = () => {
        const weeks = this.weeksArray();
        return weeks.map( week => {
            return  <View
                        key={`Week ${week}`}
                        style={{
                            width: 30,
                            height: 30,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Text style={{fontSize: 20}}>{week}</Text>
                    </View>
        })
    }

    renderGoalsColumn = () => {
        const weeks = this.weeksArray();
        return weeks.map( week => {
            const goal = this.props.navigation.state.params.userGoals.find( goal => goal.attributes.week_number === week )
            return  <View
                        key={`Goal ${week}`}
                        style={{
                            width: 30,
                            height: 30,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Text style={{fontSize: 20}}>{goal.attributes.goal_days}</Text>
                    </View>
        })
    }
    
}

export default EditGoalsScreen;