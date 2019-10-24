import React, { Component } from 'react'
import { Text, View } from 'react-native';
import { styles } from '../styles';

class Calendar extends Component {
    render() {
        const days = this.daysArray()
        return (
            <View style={{width: '90%', borderWidth: 1, padding: 5}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{alignItems: 'center'}}>
                        <Text style={{fontWeight: 'bold'}}>Week</Text>
                        {this.renderWeekNumbersColumn()}
                    </View>
                    {this.renderDaysOfTheWeekColumns(days)}
                    <View style={{alignItems: 'center'}}>
                        <Text style={{fontWeight: 'bold'}}>Goals</Text>
                        {this.renderGoalsColumn()}
                    </View>
                </View>
            </View>
        )
    }

    weeksArray = () => {
        const startDate = this.props.group.attributes.start_date;
        const endDate = this.props.group.attributes.end_date;
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
                        <Text>{week}</Text>
                    </View>
        })
    }

    renderGoalsColumn = () => {
        const weeks = this.weeksArray();
        return weeks.map( week => {
            const goal = this.props.goals.find( goal => goal.attributes.week_number === week )
            return  <View
                        key={`Goal ${week}`}
                        style={{
                            width: 30,
                            height: 30,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Text>{goal.attributes.goal_days}</Text>
                    </View>
        })
    }

    renderDayOfTheWeekColumn = (daysArray, dayOfTheWeek) => {
        const daysOfTheWeek = daysArray.filter( day => day.getUTCDay() === dayOfTheWeek )
        return daysOfTheWeek.map( day => {
            return  <View 
                        key={`${dayOfTheWeek}${day.getUTCDate()}`}
                        style={this.styleDate(day)}
                    >
                        <Text>{day.getUTCDate()}</Text>
                    </View>
        })
    }

    renderDaysOfTheWeekColumns = daysArray => {
        const weekdays = ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su']
        return weekdays.map( (day, idx) => {
            const dayOfTheWeek = idx < 6 ? idx + 1 : idx - 6
            return (
                    <View key={`${day}${idx}`} style={{alignItems: 'center'}}>
                        <Text style={{fontWeight: 'bold'}}>{day}</Text>
                        {this.renderDayOfTheWeekColumn(daysArray, dayOfTheWeek)}
                    </View>
                )
            })
            
    }

    styleDate = (day) => {
        const workoutDatesArray = this.props.workouts.map(workout => new Date(workout.attributes.datetime).toLocaleDateString())
        if (new Date(day) > new Date(new Date().toLocaleDateString())) {
            return styles.futureDate
        } else if (workoutDatesArray && workoutDatesArray.find(date => date === (new Date(new Date(day).getTime()+14400000).toLocaleDateString()))) {
            return styles.workoutDate
        } else {
            return styles.pastDate
        }
    }

    daysArray = () => {
        const startDate = this.props.group.attributes.start_date;
        const endDate = this.props.group.attributes.end_date;
        let daysArray = [];
        let i
        for (i = new Date(startDate).getTime(); i <= new Date(endDate); i += 86400000) {
            daysArray.push(new Date(i))
        }
        return daysArray
    }

}

export default Calendar;