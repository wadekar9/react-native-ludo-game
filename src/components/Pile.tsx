import { Animated, Easing, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { BackgroundImage } from '$helpers/GetIcon';
import { COLORS } from '$constants/colors';
import { Svg, Circle } from 'react-native-svg';
import { useAppSelector } from '$hooks/useAppStore';
import { selectCellSelection, selectDiceNo, selectPocketPileSelection } from '$redux/reducers/gameSelectors';
import { RootState } from '$redux/store';

interface PileProp {
    color: string;
    player: number;
    cell: boolean;
    pieceId: string;
    onPress: () => void;
}

const Pile: React.FC<PileProp> = ({ color, player, cell, pieceId, onPress }) => {

    const PileIcon = BackgroundImage.getImage(color);
    const rotation = useRef(new Animated.Value(0)).current;
    const currentPlayerPileSelection = useAppSelector(selectPocketPileSelection);
    const currentPlayerCellSelection = useAppSelector(selectCellSelection);
    const diceNo = useAppSelector(selectDiceNo);
    const playerPieces = useAppSelector((state: RootState) => state.game[`player${player}`]);

    const isPileEnabled = useMemo(() => player === currentPlayerPileSelection, [currentPlayerPileSelection, player]);
    const isCellEnabled = useMemo(() => player === currentPlayerCellSelection, [currentPlayerCellSelection, player]);

    const isForwardable = useCallback(() => {
        const piece = playerPieces?.find((item: PLAYER_PIECE) => item.id === pieceId);
        return piece && ((piece.travelCount + diceNo) <= 7);
    }, [playerPieces, diceNo, pieceId]);

    useEffect(() => {
        const rotateAnimation = Animated.loop(
            Animated.timing(rotation, {
                toValue: 1,
                duration: 1500,
                easing: Easing.linear,
                useNativeDriver: true
            })
        )

        rotateAnimation.start();

        return () => rotateAnimation.stop();
    }, [rotation]);

    const rotateInterpolate = useMemo(() => {
        return rotation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })
    }, [rotation])

    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.6}
            disabled={!(cell ? isCellEnabled && isForwardable() : isPileEnabled)}
            onPress={onPress}
        >
            <View style={[styles.hollowCircle,{borderColor: cell ? COLORS.transparent : COLORS.black}]}>
                {(cell ? isCellEnabled && isForwardable() : isPileEnabled) &&
                    (
                        <View style={styles.dashedCircleContainer}>
                            <Animated.View
                                style={[
                                    styles.dashedCircle,
                                    {
                                        transform: [{ rotate: rotateInterpolate }]
                                    }
                                ]}
                            >
                                <Svg height={"18"} width={"18"}>
                                    <Circle
                                        cx={'9'}
                                        cy={'9'}
                                        r={'8'}
                                        stroke={'white'}
                                        strokeWidth={'2'}
                                        strokeDasharray={'4 4'}
                                        strokeDashoffset={'0'}
                                        fill={'transparent'}
                                    />
                                </Svg>
                            </Animated.View>
                        </View>
                    )
                }
            </View>
            <Image
                source={PileIcon}
                style={styles.imageStyle}
                resizeMode={'contain'}
            />
        </TouchableOpacity>
    )
}

export default memo(Pile);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageStyle: {
        width: 32,
        height: 32,
        position: 'absolute',
        top: -16
    },
    hollowCircle: {
        position: 'absolute',
        width: 15,
        height: 15,
        borderRadius: 25,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dashedCircleContainer: {

    },
    dashedCircle: {

    }
})