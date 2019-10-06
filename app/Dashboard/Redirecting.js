import React, { Component } from "react";
import {
    ActivityIndicator
    , Alert, Linking,

} from "react-native";

alertBox = () => {
    return (
        <ActivityIndicator />
    )
}

const Redirecting = (props) => (

    <>
        {Alert.alert(
            'Redirecting',
            'You will be redirected to external URL',
            [
                {
                    text: 'Cancel',
                    onPress: () => props.navigation.goBack(),
                    style: { fontFamily: 'TisaWeb W03 Bold' },
                },
                {
                    text: 'OK', onPress: () => {
                        Linking.openURL(props.urls)
                        setTimeout(() => props.navigation.goBack(), 2000)
                    },
                    style: { fontFamily: 'TisaWeb W03 Bold' },
                },

            ],
            { cancelable: false },
        )}
    </>
)

export default Redirecting;
