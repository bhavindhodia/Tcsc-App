import React from "react";
import { createBottomTabNavigator, createAppContainer, createDrawerNavigator, createStackNavigator, createSwitchNavigator, DrawerItems, createMaterialTopTabNavigator } from 'react-navigation';

import HomeScreenS, { PaymentScreen, ELibScreen, ComingSoonScreen } from '../app/Dashboard/Home'
import HomeScreenT from '../app/Dashboard/HomeTeacher'
import HomeScreenA from '../app/Dashboard/HomeAdmin'

import ProfileScreen from '../app/Profile/ProfieScreen'

import DeptNotice, { DepartmentalNoticeForm, viewNoticeScreen, UpdateNoticeScreen } from '../app/Notice/DeptNotice'
import ClgNotice from '../app/Notice/ClgNotice'

import { Icon } from 'react-native-elements'
import AuthLoadingScreen, { LoginScreen, SignUpScreen } from '../app/Auth/AuthLoading'

import AttandanceRouteScreen, { QRCodeScreen, QRCodeScannerScreen, ListAttandanceScreen, CheckAttandanceScreen, ActivateStudentScreen } from '../app/Attandance/AttandanceRoute'
import { ScrollView, Dimensions } from "react-native";

// const { width, height } = Dimensions.get('window')

const width = Math.round(Dimensions.get('window').width);

console.disableYellowBox = true

//**********************************//
// COMMON NOTICE TABS
const NoticeTab = createMaterialTopTabNavigator(
    {
        Departmental: DeptNotice,
        College: ClgNotice
    },
    {
        header: null,
        tabBarPosition: 'top',
        swipeEnabled: true,
        animationEnabled: true,
        tabBarOptions: {
            activeTintColor: '#FFFFFF',
            inactiveTintColor: '#F8F8F8',
            style: {
                backgroundColor: '#009c5d',

            },
            tabStyle: {
                marginTop: 10,
            },
            labelStyle: {
                textAlign: 'center',
                fontSize: 18,
                fontFamily: 'TisaWeb W03 Bold',
            },

            indicatorStyle: {
                borderBottomColor: '#87B56A',
                borderBottomWidth: 2,
            },
        },
    }
);
//  **********************************  //
// COMMON NOTICE STACK
const NoticeStack = createStackNavigator({

    theNotice: NoticeTab,
    DeptNoticeForm: DepartmentalNoticeForm,
    viewNotice: viewNoticeScreen,
    updateNotice: UpdateNoticeScreen
},
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        },

        initialRouteName: 'theNotice'

    })

// *********************************************//
// COMMON  ATTANDANCE //
const AttandanceStack = createStackNavigator({
    AttandanceAuth: AttandanceRouteScreen,
    QRCode: QRCodeScreen,
    QRCodeScanner: QRCodeScannerScreen,
    ListAttandance: ListAttandanceScreen,
    CheckAttandance: CheckAttandanceScreen,
    ActivateStudent: ActivateStudentScreen
}, {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    },
})



//**********************************//
// STUDENT Bottom Tab Navigator

const HomeScreenSStack = createStackNavigator({
    Home: HomeScreenS,
    Pay: PaymentScreen,
    ELib: ELibScreen,
    ComingSoon: ComingSoonScreen
}, {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    },
})


const TabNavigatorS = createBottomTabNavigator({

    HS: {
        screen: HomeScreenSStack,
        navigationOptions: {

            tabBarIcon: ({ tintColor }) => (
                <Icon name='home'
                    type='antdesign' color={tintColor} size={25} />
            )
        },
    },

    Notice: {
        screen: NoticeStack,
        navigationOptions: {

            tabBarIcon: ({ tintColor }) => (
                <Icon name='clipboard'
                    type='entypo' color={tintColor} size={25} />
            ),
        },
    },

    Profile: {
        screen: ProfileScreen,
        navigationOptions: {

            tabBarIcon: ({ tintColor }) => (
                <Icon name='account'
                    type='material-community' color={tintColor} size={25} />
            ),
        },
    },



}, {
    initialRouteName: 'HS',
    labeled: false,

    tabBarOptions: {

        showLabel: false,
        showIcon: true,
        tintColor: '#333',
        activeTintColor: '#aaa',
    },
    activeColor: '#f0edf6',
    inactiveColor: '#000',


});

const DashboardStackNavigatorS = createStackNavigator(
    {
        DashboardTabNavigator: TabNavigatorS
    },
    {
        headerMode: 'none',
        mode: 'card',
        navigationOptions: {
            gesturesEnabled: false,
        },


    }
)
//******************************************//
// STUDENT Draw Navigator
const AppDrawerNavigatorS = createDrawerNavigator({
    DashboardS: DashboardStackNavigatorS,
    Attandance: AttandanceStack,
    Notice: NoticeStack,
    Profile: ProfileScreen,
}, {

    drawerType: 'slide',
    // overlayColor: 'transperent',
    drawerWidth: width,
    contentOptions: {

        labelStyle: {
            fontWeight: '200',
            fontSize: 18,
            fontFamily: 'TisaWeb W03 Bold',
            textAlign: 'center'
        },
        itemsContainerStyle: {
            // opacity: 1
            marginTop: 100
        },
        iconContainerStyle: {
            // opacity: 1
        },
        itemStyle: {

            justifyContent: 'center'
        }
    },

})
//  **********************************  //


// TEACHER Bottom Tab Navigator
const TabNavigatorT = createBottomTabNavigator({

    HT: {
        screen: HomeScreenT,
        navigationOptions: {

            tabBarIcon: ({ tintColor }) => (
                <Icon name='home'
                    type='antdesign' color={tintColor} size={25} />
            )
        },
    },

    Notice: {
        screen: NoticeStack,
        navigationOptions: {

            tabBarIcon: ({ tintColor }) => (
                <Icon name='clipboard'
                    type='entypo' color={tintColor} size={25} />
            ),

        },
    },

    Profile: {
        screen: ProfileScreen,
        navigationOptions: {

            tabBarIcon: ({ tintColor }) => (
                <Icon name='account'
                    type='material-community' color={tintColor} size={25} />
            ),

        },
    },


}, {
    initialRouteName: 'HT',
    labeled: false,

    tabBarOptions: {
        shifting: true,
        showLabel: false,
        showIcon: true,
        tintColor: '#333',
        activeTintColor: '#aaa',
    },


});

const DashboardStackNavigatorT = createStackNavigator(
    {
        DashboardTabNavigator: TabNavigatorT
    },
    {
        headerMode: 'none',
        mode: 'card',
        navigationOptions: {
            gesturesEnabled: false,
            style: { fontFamily: 'TisaWeb W03 Regular', }
        },


    }
)
// TEACHER Draw Navigator
const AppDrawerNavigatorT = createDrawerNavigator({
    DashboardT: DashboardStackNavigatorT,
    Attandance: AttandanceStack,
    Notice: NoticeStack,
    Profile: ProfileScreen
}, {

    drawerType: 'slide',
    // overlayColor: 'transperent',
    drawerWidth: width,
    contentOptions: {

        labelStyle: {
            fontWeight: '200',
            fontSize: 18,
            fontFamily: 'TisaWeb W03 Bold',
            textAlign: 'center'
        },
        itemsContainerStyle: {
            // opacity: 1
            marginTop: 100
        },
        iconContainerStyle: {
            // opacity: 1
        },
        itemStyle: {

            justifyContent: 'center'
        }
    },

})
//**************************************************//

//  **********************************  //

// ADMIN Bottom Tab Navigator
const TabNavigatorA = createBottomTabNavigator({
    HomeScreenA,
    Notice: NoticeStack,
    Profile: ProfileScreen

}, {
    initialRouteName: 'HomeScreenA',

});

const DashboardStackNavigatorA = createStackNavigator(
    {
        DashboardTabNavigator: TabNavigatorA
    },
    {
        defaultNavigationOptions: ({ navigation }) => {
            return {
                headerMode: 'none',

                headerLeft: (
                    <Icon

                        name='navicon'
                        type='font-awesome'
                        color='#f50'
                        iconStyle={{ paddingLeft: 15 }}
                        onPress={() => navigation.openDrawer()}

                        size={30}
                    />
                )
            };
        }
    }
)

const CDC = (props) => {
    return (
        <ScrollView>
            <DrawerItems {...props} />
        </ScrollView>
    )
}

// ADMIN Draw Navigator
const AppDrawerNavigatorA = createDrawerNavigator({
    DashboardA: DashboardStackNavigatorA,
    Attandance: AttandanceStack
}, {

    drawerType: 'slide',
    // overlayColor: 'transperent',
    drawerWidth: width,
    contentOptions: {

        labelStyle: {
            fontWeight: '200',
            fontSize: 18,
            fontFamily: 'TisaWeb W03 Bold',
            textAlign: 'center'
        },
        itemsContainerStyle: {
            // opacity: 1
            marginTop: 100
        },
        iconContainerStyle: {
            // opacity: 1
        },
        itemStyle: {

            justifyContent: 'center'
        }
    },

})




const Main = createSwitchNavigator(
    {
        DashS: AppDrawerNavigatorS,
        DashT: AppDrawerNavigatorT,
        DashA: AppDrawerNavigatorA,


        Login: LoginScreen,
        SignUp: SignUpScreen,
        AuthLoading: AuthLoadingScreen
    },
    {
        initialRouteName: 'AuthLoading'
    },
)

export default createAppContainer(Main);