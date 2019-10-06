import React, { Fragment } from "react";
import { PermissionsAndroid } from 'react-native';

export async function requestPermissions() {
    try {
        const granted = await PermissionsAndroid.requestMultiple(
            [PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            ]);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.warn('Granted');
        } else {

            await PermissionsAndroid.requestMultiple(
                [PermissionsAndroid.PERMISSIONS.CAMERA,
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                ]);

        }
    } catch (err) {
        console.warn(err);
    }

}