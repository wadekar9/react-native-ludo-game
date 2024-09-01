import React, { memo, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import GradientButton from './GradientButton';
import LinearGradient from 'react-native-linear-gradient';
import { useAppDispatch } from '$hooks/useAppStore';
import { announceWinner, resetGame } from '$redux/reducers/gameSlice';
import { playSound } from '$helpers/SoundUtils';
import { goBack } from '$helpers/navigationUtils';

interface MenuModalProps {
    visible: boolean;
    onPressHide: () => void;
}

const MenuModal: React.FC<MenuModalProps> = ({ visible, onPressHide }) => {

    const dispatch = useAppDispatch();

    const handleNewGame = useCallback(() => {
        dispatch(resetGame());
        playSound('game_start');
        dispatch(announceWinner(null))
        onPressHide();
    }, []);

    const handleHome = useCallback(() => {
        goBack();
    }, []);

    return (
        <Modal
            style={styles.bottomModalView}
            isVisible={visible}
            backdropColor="black"
            backdropOpacity={0.8}
            onBackdropPress={onPressHide}
            animationIn={'zoomIn'}
            animationOut={'zoomOut'}
            onBackButtonPress={onPressHide}
        >
            <View style={styles.modalContainer}>
                <LinearGradient
                    colors={['#0f0c29', '#302b63', '#24243e']}
                    style={styles.gradientContainer}>
                    <View style={styles.subView}>
                        <GradientButton title="RESUME" onPress={onPressHide} />
                        <GradientButton title="NEW GAME" onPress={handleNewGame} />
                        <GradientButton title="HOME" onPress={handleHome} />
                    </View>
                </LinearGradient>
            </View>
        </Modal>
    )
}

export default memo(MenuModal);

const styles = StyleSheet.create({
    bottomModalView: {
        justifyContent: 'center',
        width: '95%',
        alignSelf : 'center'
    },
    modalContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems : 'center',
    },
    gradientContainer: {
        borderRadius : 20,
        overflow : 'hidden',
        padding : 20,
        paddingVertical : 40,
        width : '96%',
        borderWidth : 2,
        borderColor : 'gold',
        justifyContent:'center',
        alignItems :'center'
    },
    subView: {
        width : '100%',
        alignSelf : 'center',
        justifyContent : 'center',
        alignItems : 'center'
    }
})