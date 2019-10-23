import React, { Component } from 'react'
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

class Calendar extends Component {
    render() {
        const days = this.daysArray()
        console.log(this.props)
        console.log('days array: ',days)
        return (
            <View style={{width: '90%', borderWidth: 1}}>
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
        numberOfWeeks = 13;
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
            return  <View
                        key={`Goal ${week}`}
                        style={{
                            width: 30,
                            height: 30,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Text>4</Text>
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
        const startDate = '2019-09-30';
        const endDate = '2019-12-29';
        let daysArray = [];
        let i
        for (i = new Date(startDate).getTime(); i <= new Date(endDate); i += 86400000) {
            daysArray.push(new Date(i))
        }
        return daysArray
    }

}

const styles = {
    workoutDate: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30 / 2,
        backgroundColor: 'green',
        borderColor: 'black',
        borderWidth: 1,
    },
    pastDate: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30 / 2,
        backgroundColor: '#A9A9A9',
        borderColor: 'black',
        borderWidth: 1,
    },
    futureDate: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
}

export default Calendar;