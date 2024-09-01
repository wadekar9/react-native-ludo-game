import { DEVICE_HEIGHT, DEVICE_WIDTH } from "$constants/dimensions";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    iconContainer : {
        position : 'absolute',
        top : 60,
        left : 20
    },
    container : {
        alignSelf : 'center',
        justifyContent : 'center',
        height : DEVICE_HEIGHT * 0.5,
        width : DEVICE_WIDTH
    },
    flexRow : {
        justifyContent : 'space-between',
        alignItems : 'center',
        flexDirection : 'row',
        paddingHorizontal : 30
    },
    ludoBoardContainer : {
        width : '100%',
        height : '100%',
        alignItems : 'center',
        padding : 10,
        backgroundColor : 'white'
    },
    plotContainer : {
        width : '100%',
        height : '40%',
        flexDirection : 'row',
        justifyContent : 'space-between',
        backgroundColor : '#ccc'
    },
    pathContainer : {
        flexDirection: 'row',
        width : '100%',
        height : '20%',
        backgroundColor : '#1E5162'
    }
})