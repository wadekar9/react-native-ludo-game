import { StyleSheet, View } from 'react-native'
import React, { memo, useCallback, useMemo } from 'react'
import { COLORS } from '$constants/colors';
import Pile from './Pile';
import { arrowSpots, safeSpots, starSpots } from '$helpers/PlotData';
import { StarIcon, ArrowRightIcon } from 'react-native-heroicons/outline';
import { RFValue } from 'react-native-responsive-fontsize';
import { useAppDispatch, useAppSelector } from '$hooks/useAppStore';
import { selectCurrentPosition } from '$redux/reducers/gameSelectors';
import { handleForwardThunk } from '$redux/reducers/gameActions';

interface CellProps {
    cell: boolean;
    id: number;
    player: number;
    color: string;
}

const Cell: React.FC<CellProps> = ({ id, cell, color, player }) => {

    const dispatch = useAppDispatch();
    const plotedPieces = useAppSelector(selectCurrentPosition);

    const isSafeSpot = useMemo(() => safeSpots.includes(id), [id]);
    const isStarSpot = useMemo(() => starSpots.includes(id), [id]);
    const isArrowSpot = useMemo(() => arrowSpots.includes(id), [id]);

    const arrowValue = id === 38 ? '180deg' : id === 25 ? '90deg' : id === 12 ? '0deg' : '-90deg';

    const peicesAtPosition: any[] = useMemo(() => plotedPieces.filter((item: any) => item.pos == id), [plotedPieces, id])

    const handlePress = useCallback((playerNo: number, pieceId: string) => {
        dispatch(handleForwardThunk(playerNo, pieceId, id));
    }, [dispatch, id]);

    return (
        <View
            style={[styles.container, { backgroundColor: isSafeSpot ? color : COLORS.white }]}
        >
            {isStarSpot && <StarIcon size={20} color={COLORS.grey} />}
            {isArrowSpot && <ArrowRightIcon size={RFValue(12)} color={COLORS.grey} style={{ transform: [{ rotate: arrowValue }] }} />}
            {peicesAtPosition.map((piece, index) => {

                const playerNo = piece.id[0] === "A" ? 1 : piece.id[0] === "B" ? 2 : piece.id[0] === "C" ? 3 : 4;
                const pieceColor = piece.id[0] === "A" ? COLORS.red : piece.id[0] === "B" ? COLORS.green : piece.id[0] === "C" ? COLORS.yellow : COLORS.blue;

                return (
                    <View
                        key={piece.id}
                        style={[
                            styles.pieceContainer,
                            {
                                transform: [
                                    {
                                        scale: peicesAtPosition.length === 1 ? 1 : 0.7
                                    },
                                    {
                                        translateX: peicesAtPosition.length === 1 ? 0 : index % 2 === 0 ? -6 : 6
                                    },
                                    {
                                        translateY: peicesAtPosition.length === 1 ? 0 : index < 2 ? -6 : 6
                                    }
                                ]
                            }
                        ]}
                    >
                        <Pile
                            cell={true}
                            player={playerNo}
                            onPress={() => handlePress(playerNo, piece.id)}
                            pieceId={piece.id}
                            color={pieceColor}
                        />
                    </View>
                )
            })}
        </View>
    )
}

export default memo(Cell)

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: COLORS.grey
    },
    pieceContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        zIndex: 99
    }
})