import { Animated, Easing, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useEffect, useRef, useState } from 'react'
import { LinearGradient } from 'react-native-linear-gradient';
import { BackgroundImage } from '$helpers/GetIcon';
import LottieView from 'lottie-react-native';
import { ANIMATATIONS } from '$assets/animation';
import { IMAGES } from '$assets/images';
import { useAppDispatch, useAppSelector } from '$hooks/useAppStore';
import { selectCurrentPlayerChance, selectDiceNo, selectDiceRolled } from '$redux/reducers/gameSelectors';
import { enableCellSelection, enablePileSelection, updateDiceNumber, updatePlayerChance } from '$redux/reducers/gameSlice';
import { playSound } from '$helpers/SoundUtils';

interface DiceProps {
    color: string;
    rotate?: boolean;
    player: number;
    data: PLAYER_PIECE[];
}

const Dice: React.FC<DiceProps> = ({ color, rotate, player, data }) => {

    const dispatch = useAppDispatch();

    const currentPlayerChance = useAppSelector(selectCurrentPlayerChance);
    const isDiceRolled = useAppSelector(selectDiceRolled);
    const diceNo = useAppSelector(selectDiceNo);
    const playerPieces: PLAYER_PIECE[] = useAppSelector((state: any) => state.game[`player${currentPlayerChance}`])

    const pileIcon = BackgroundImage.getImage(color);
    const diceIcon = BackgroundImage.getImage(diceNo);

    const arrowAnimation = useRef(new Animated.Value(0)).current;

    const [diceRolling, setDiceRolling] = useState<boolean>(false);

    useEffect(() => {
        function animateArrow() {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(arrowAnimation, {
                        toValue: 10,
                        duration: 600,
                        easing: Easing.out(Easing.ease),
                        useNativeDriver: true
                    }),
                    Animated.timing(arrowAnimation, {
                        toValue: -10,
                        duration: 600,
                        easing: Easing.in(Easing.ease),
                        useNativeDriver: true
                    })
                ])
            ).start()
        }

        animateArrow()
    }, [currentPlayerChance, isDiceRolled])

    const delay = (duration: number) => new Promise(resolve => setTimeout(resolve, duration));

    const handleDicePress = async (predice: number) => {

        const diceNumber = predice || Math.floor(Math.random() * 5) + 1;
        playSound('dice_roll');
        setDiceRolling(true)
        await delay(800);
        dispatch(updateDiceNumber({ diceNo: diceNumber }));
        setDiceRolling(false);
        const isAnyPieceAlive = data?.findIndex((e) => e.pos !== 0 && e.pos !== 57);
        const isAnyPieceLocked = data?.findIndex((e) => e.pos !== 0);

        if (isAnyPieceAlive == -1) {
            if (diceNumber === 6) {
                dispatch(enablePileSelection({ playerNo: player }))
            } else {
                let chancePlayer = player + 1;
                if (chancePlayer > 4) {
                    chancePlayer = 1;
                }
                await delay(600);
                dispatch(updatePlayerChance({ chancePlayer }))
            }
        } else {
            const canMove = playerPieces.some((pile) => pile.travelCount + diceNumber <= 57 && pile.pos !== 0)

            if (
                (!canMove && diceNumber === 6 && isAnyPieceLocked == -1) ||
                (!canMove && diceNumber !== 6 && isAnyPieceLocked != -1) ||
                (!canMove && diceNumber !== 6 && isAnyPieceLocked == -1)
            ) {
                let chancePlayer = player + 1;
                if (chancePlayer > 4) {
                    chancePlayer = 1;
                }
                await delay(600);
                dispatch(updatePlayerChance({ chancePlayer }))
                return
            }


            if (diceNumber === 6) {
                dispatch(enablePileSelection({ playerNo: player }));
            }
            dispatch(enableCellSelection({ playerNo: player }));
        }
    }


    return (
        <View style={[styles.flexRow, { transform: [{ scaleX: rotate ? -1 : 1 }] }]}>
            <View style={styles.border1}>
                <LinearGradient
                    style={styles.linearGradient}
                    colors={['#0052BE', '#5F9FCB', '#97C6C9']}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                >
                    <View style={styles.pileContainer}>
                        <Image
                            source={pileIcon}
                            style={styles.pileIcon}
                        />
                    </View>
                </LinearGradient>
            </View>

            <View style={styles.border2}>
                <LinearGradient
                    style={styles.diceGradient}
                    colors={['#aac8ab', '#aac8ab', '#aac8ab']}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                >
                    <View style={styles.diceContainer}>
                        {((currentPlayerChance === player) && !diceRolling) && (
                            <TouchableOpacity
                                disabled={isDiceRolled}
                                activeOpacity={0.5}
                                onPress={() => handleDicePress(0)}
                                onLongPress={() => handleDicePress(6)}
                            >
                                <Image
                                    source={diceIcon}
                                    style={styles.diceIcon}
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                </LinearGradient>
            </View>

            {
                (diceRolling) &&
                <LottieView
                    source={ANIMATATIONS['Diceroll']}
                    loop={false}
                    autoPlay={true}
                    style={styles.rollingDice}
                    cacheComposition={true}
                    hardwareAccelerationAndroid={true}
                />
            }

            {((currentPlayerChance === player) && !isDiceRolled) &&
                <Animated.View style={{ transform: [{ translateX: arrowAnimation }] }}>
                    <Image
                        source={IMAGES.Arrow}
                        style={{ width: 50, height: 30 }}
                    />
                </Animated.View>
            }
        </View>
    )
}

export default memo(Dice)

const styles = StyleSheet.create({
    flexRow: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    border1: {
        borderWidth: 3,
        borderRightWidth: 0,
        borderColor: '#f0ce2c'
    },
    border2: {
        borderWidth: 3,
        padding: 1,
        backgroundColor: '#aac8ab',
        borderRadius: 10,
        borderLeftWidth: 3,
        borderColor: '#aac8ab'
    },
    linearGradient: {

    },
    pileIcon: {
        width: 30,
        height: 30,
    },
    pileContainer: {
        paddingHorizontal: 3,
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center'
    },
    diceContainer: {
        backgroundColor: '#e8c0c1',
        borderWidth: 1,
        borderRadius: 5,
        width: 55,
        height: 55,
        paddingVertical: 4,
        paddingHorizontal: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    diceGradient: {
        borderWidth: 3,
        borderLeftWidth: 3,
        borderColor: '#f0ce2c',
        justifyContent: 'center',
        alignItems: 'center'
    },
    diceIcon: {
        height: 45,
        width: 45
    },
    rollingDice: {
        height: 80,
        width: 80,
        zIndex: 99,
        top: -19,
        left: 38,
        position: 'absolute'
    }
})