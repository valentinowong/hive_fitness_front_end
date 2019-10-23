import { colors } from './colors';
import { fontSize }from './typography';

const theme = {
    lightMode: {
        primaryColor: colors.white,
        secondaryColor: colors.black,
    },
    darkMode: {
        primaryColor: colors.black,
        secondaryColor: colors.white,
    },
}

export const styles = {
    loginContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.lightMode.primaryColor,
    },
    centerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.lightMode.primaryColor,
    },
    listContainer: {
        flex: 1,
        backgroundColor: theme.lightMode.primaryColor,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 30
    },
    hairLineBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#D9D9D9',
        width: '100%',
    },
    primaryImage: {
        width: 300, 
        height: 300,
    },
    secondaryImage: {
        width: 150,
        height: 150,
    },
    primaryListHeader: {
        fontSize: fontSize.extraLarge,
        fontWeight: 'bold',
    },
    primaryListTitle: {
        fontSize: fontSize.extraLarge,
    },
    primaryListSubtitle: {
        fontSize: fontSize.small,
    },
    secondaryListTitle: {
        fontSize: fontSize.large,
    },
    secondaryListSubtitle: {
        fontSize: fontSize.extraSmall,
    }, 
    feedUser: {
        fontSize: fontSize.medium,
        fontWeight: 'bold',
    },
    feedDatetime: {
        fontSize: fontSize.medium,
        color: colors.darkGray
    },
    feedDescription: {
        fontSize: fontSize.medium,
    },
    doubleButtonContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        alignItems: 'center', 
        padding: 10
    },
    largeButtonTitle: {
        fontSize: fontSize.large,
        color: theme.lightMode.primaryColor
    },
    loginButton: {
        width: '100%',
        backgroundColor: colors.orange,
        margin: 10,
    },
    saveButton: {
        width: '90%',
        margin: 10,
    },
    singleLargeButton: {
        width: '100%',
        backgroundColor: colors.lightGray,
        margin: 10,
    },
    singleLargeButtonTitle: {
        fontSize: fontSize.large,
        color: theme.lightMode.secondaryColor
    },
    singleSmallButton: {
        width: '75%',
        backgroundColor: colors.lightGray,
        margin: 10,
    },
    singleSmallButtonTitle: {
        fontSize: fontSize.small,
        color: theme.lightMode.secondaryColor
    },
    bodyContainer: {
        margin: 10,
    },
    detailsContainer: {
        justifyContent: 'center',
        margin: 10,
    },
    detailsLabel: {
        fontSize: fontSize.large,
        fontWeight: 'bold',
        color: theme.lightMode.secondaryColor,
    },
    detailsText: {
        fontSize: fontSize.large,
    },
    detailsTextInput: {
        fontSize: fontSize.large,
        color: colors.darkGray,
    },
    detailsLongTextInput: {
        fontSize: fontSize.medium,
        height: 75, 
        borderRadius: 10, 
        backgroundColor: colors.lightGray,
        margin: 10,
        padding: 5,
    },
    datetimeInput: {
        fontSize: fontSize.medium,
        margin: 10,
        padding: 5,
        color: '#007AFF',
    },
    feedDetailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    feedUserName: {
        fontSize: fontSize.medium,
        fontWeight: 'bold',
    },
    feedDatetime: {
        fontSize: fontSize.small,
        color: colors.darkGray,
    },
    feedWorkoutDescription: {
        fontSize: fontSize.small,
        margin: 5,
    }
}

// containers
// - title
// - header
// - body

// buttons
// - login
// - doubleButtons
// - singleButtons

// text
// - listHeader
// - listItemTitle
// - listItemSubtitle
// - textLabel
// - textDetails
// - textInput
// - editableTextInput