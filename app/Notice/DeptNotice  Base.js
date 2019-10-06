import React from "react";
import {
    View,
    Text,
    ActivityIndicator,
    Dimensions
} from "react-native";
import styles from '../Forms/Style'






import { Icon } from 'react-native-elements'


const { width, height } = Dimensions.get('window');

const NoticeBase = props => {
    return (


        <View style={{ flex: 1 }} >

            {props.aiVisible && (
                <ActivityIndicator
                    style={{ position: "absolute", top: height / 2, left: width / 2 }}
                    size="large"
                />
            )}

            <View style={styles.topContainer} >
                {/* <StatusBar animated={true} backgroundColor="#c25dfc" /> */}
                {props.currentTime === null ?
                    <Text style={{ fontFamily: 'TisaWeb W03 Bold' }} >{props.lastTime !== "Invalid date" ? "Last Updated " + props.lastTime : "Please Refresh"}</Text>
                    :
                    <Text style={{ fontFamily: 'TisaWeb W03 Bold' }} >Last Updated {props.currentTime}</Text>
                }
            </View>

            {props.children}


            {
                props.userRole === 'ADMIN' || props.userRole === 'TEACHER' ?

                    <Icon
                        reverse
                        containerStyle={{
                            width: 60,
                            position: 'absolute',
                            bottom: 20,
                            right: 20,
                            height: 60,
                        }}
                        size={30}
                        name='plus'
                        type='font-awesome'
                        color='#009c5d'
                        onPress={props.onCreate} />

                    // </TouchableOpacity>

                    :
                    <View >

                    </View>

            }
        </View>
    )
}



export default NoticeBase;
