import { ImageBackground, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import { IMAGES } from '$assets/images'
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '$constants/dimensions'

const Wrapper: React.FC<{ children: any, style?: any }> = ({ children, style }) => {
    return (
        <ImageBackground
            source={IMAGES.Background}
            resizeMode={'cover'}
            style={StyleSheet.absoluteFillObject}
        >
            <SafeAreaView style={[styles.container, { ...style }]}>
                {children}
            </SafeAreaView>
        </ImageBackground>
    )
}

export default Wrapper

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    safeArea : {
        width : DEVICE_WIDTH,
        height : DEVICE_HEIGHT
    }
})