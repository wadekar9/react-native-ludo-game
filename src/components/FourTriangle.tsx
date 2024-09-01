import { StyleSheet, Text, View } from 'react-native'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { COLORS } from '$constants/colors'
import LottieView from 'lottie-react-native'
import { ANIMATATIONS } from '$assets/animation'
import { Polygon, Svg } from 'react-native-svg'
import { useAppDispatch, useAppSelector } from '$hooks/useAppStore'
import { selectFireworks } from '$redux/reducers/gameSelectors'
import { updateFireworks } from '$redux/reducers/gameSlice'
import Pile from './Pile'
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '$constants/dimensions'

const SIZE = 300;

interface FourTriangleProps {
    player1: PLAYER_PIECE[];
    player2: PLAYER_PIECE[];
    player3: PLAYER_PIECE[];
    player4: PLAYER_PIECE[];
}

interface PlayerPiecesItem {
    player: PLAYER_PIECE[];
    top: number;
    left: number;
    right: number;
    bottom: number;
    pieceColor: string;
    translate: any;
}

interface PlayerPiecesProps {
    player: PLAYER_PIECE[];
    style: any;
    pieceColor: string;
    translate: any;
}

const PlayerPieces: React.FC<PlayerPiecesProps> = memo(({ player, style, pieceColor, translate }) => {
    return (
        <View style={[styles.mainContainer, style]}>
            {player.map((piece, idx) => {
                return (
                    <View
                        pointerEvents={'none'}
                        key={piece.id}
                        style={{
                            top: 0,
                            zIndex: 99,
                            position: 'absolute',
                            bottom: 0,
                            transform: [{ scale: 0.5 }, { [translate]: 14 * idx }]
                        }}
                    >
                        <Pile
                            cell={true}
                            player={player}
                            onPress={() => null}
                            pieceId={piece.id}
                            color={pieceColor}
                        />
                    </View>
                )
            })}
        </View>
    )
})

const FourTriangle: React.FC<FourTriangleProps> = ({ player1, player2, player3, player4, }) => {

    const [showFirework, setShowFirework] = useState<boolean>(false);
    const isFirework = useAppSelector(selectFireworks);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isFirework) {
            setShowFirework(true);

            const timer = setTimeout(() => {
                setShowFirework(false);
                dispatch(updateFireworks(false));
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [isFirework]);

    const playersData = useMemo(
        () => [
            {
                player: player1,
                top: 55,
                left: 15,
                right: 0,
                bottom: 0,
                pieceColor: COLORS.red,
                translate: 'translateX'
            },
            {
                player: player3,
                top: 52,
                left: 15,
                right: 0,
                bottom: 0,
                pieceColor: COLORS.yellow,
                translate: 'translateX'
            },
            {
                player: player2,
                top: 20,
                left: -2,
                right: 0,
                bottom: 0,
                pieceColor: COLORS.green,
                translate: 'translateY'
            },
            {
                player: player3,
                top: 20,
                left: -2,
                right: 0,
                bottom: 0,
                pieceColor: COLORS.blue,
                translate: 'translateX'
            },
        ],
        [player1, player2, player3, player4])

    const renderPlayerPieces = useCallback((data: PlayerPiecesItem, index: number) => {
        return (
            <PlayerPieces
                key={index}
                player={data.player.filter((e) => e.travelCount === 57)}
                style={{
                    top: data.top,
                    bottom: data.bottom,
                    left: data.left,
                    right: data.right,
                }}
                pieceColor={data.pieceColor}
                translate={data.pieceColor}
            />
        )
    }, [playersData])

    return (
        <View style={styles.container}>
            {showFirework && <LottieView
                source={ANIMATATIONS.Firework}
                speed={1}
                style={styles.lottieView}
                autoPlay
                loop
                hardwareAccelerationAndroid
            />}
            <Svg height={SIZE} width={SIZE - 5}>
                <Polygon
                    points={`0,0,${SIZE / 2},${SIZE / 2},${SIZE},0`}
                    fill={COLORS.yellow}
                />
                <Polygon
                    points={`${SIZE},0 ${SIZE},${SIZE} ${SIZE / 2},${SIZE / 2}`}
                    fill={COLORS.blue}
                />
                <Polygon
                    points={`0,${SIZE} ${SIZE / 2},${SIZE / 2} ${SIZE}, ${SIZE}`}
                    fill={COLORS.red}
                />
                <Polygon
                    points={`0,0 ${SIZE / 2},${SIZE / 2} 0,${SIZE}`}
                    fill={COLORS.green}
                />
            </Svg>
            {playersData.map(renderPlayerPieces)}
        </View>
    )
}

export default memo(FourTriangle);

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '20%',
        height: '100%',
        borderWidth: 0.8,
        overflow: 'hidden',
        backgroundColor: COLORS.white,
        borderColor: COLORS.borderColor
    },
    lottieView: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 2
    },
    mainContainer: {
        width : DEVICE_WIDTH * 0.063,
        height : DEVICE_HEIGHT * 0.032,
        justifyContent : 'center',
        alignItems: 'center',
        position: 'absolute',
    }
})