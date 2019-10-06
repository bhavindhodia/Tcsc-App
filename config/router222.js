import React from "react";
import { createBottomTabNavigator, createAppContainer, createDrawerNavigator, createStackNavigator, createSwitchNavigator, createMaterialTopTabNavigator } from 'react-navigation';

import HomeScreenS from './Dashboard/Home'
import HomeScreenT from './Dashboard/HomeTeacher'
import HomeScreenA from './Dashboard/HomeAdmin'

import { DeptNotice, ClgNotice } from './Notice/Notice'

import LoginScreen from './Auth/Login'
import SignUpScreen from './Auth/SignUp'
import AuthLoadingScreen from './Auth/AuthLoading'



const LoginStack = createStackNavigator({

    Login: LoginScreen,


})

// STUDENT Top Tab Navigator

const NoticeTab = createMaterialTopTabNavigator(
    {
        Departmental: DeptNotice,
        College: ClgNotice
    },
    {
        tabBarPosition: 'top',
        swipeEnabled: true,
        animationEnabled: true,
        tabBarOptions: {
            activeTintColor: '#FFFFFF',
            inactiveTintColor: '#F8F8F8',
            style: {
                backgroundColor: '#633689',
            },
            tabStyle: {
                marginTop: 30,
            },
            labelStyle: {
                textAlign: 'center',
            },
            indicatorStyle: {
                borderBottomColor: '#87B56A',
                borderBottomWidth: 2,
            },
        },
    }
);

// STUDENT Bottom Tab Navigator
const TabNavigatorS = createBottomTabNavigator({
    HomeScreenS,
    Notice: NoticeTab,
});

// STUDENT Draw Navigator
const AppDrawerNavigatorS = createDrawerNavigator({
    Dashboard: TabNavigatorS,
})

//  **********************************  //


// TEACHER Bottom Tab Navigator
const TabNavigatorT = createBottomTabNavigator({
    HomeScreenT,
    Notice: NoticeTab,
});

// TEACHER Draw Navigator
const AppDrawerNavigatorT = createDrawerNavigator({
    DashboardT: TabNavigatorT,
})

// Admin Bottom Tab Navigator
const TabNavigatorA = createBottomTabNavigator({
    HomeScreenA,
    Notice: NoticeTab,
});

// ADMIN Draw Navigator
const AppDrawerNavigatorA = createDrawerNavigator({
    DashboardA: TabNavigatorA,
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