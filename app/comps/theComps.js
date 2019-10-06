import React from 'react';
import {
    TouchableWithoutFeedback, Keyboard,

} from 'react-native';


const DismisKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }} accessible={false}>
        {children}
    </TouchableWithoutFeedback>
)

export default DismisKeyboard