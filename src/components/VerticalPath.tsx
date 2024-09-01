import { StyleSheet, View } from 'react-native'
import React, { memo, useMemo } from 'react'
import Cell from './Cell';

interface VerticalPathProps {
    color: string;
    player: number;
    cells: number[];
}

const VerticalPath: React.FC<VerticalPathProps> = ({ color, cells, player }) => {

    const groupCells = useMemo(() => {
        const groups = [];
        for (let i = 0; i < cells.length; i += 3) {
            groups.push(cells.slice(i, i + 3));
        }
        return groups;
    }, [cells]);

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                {groupCells.map((group, idx) => {
                    return (
                        <View key={`group-${idx}`} style={styles.cellContainer}>
                            {
                                group.map((cell, index) => <Cell key={`${index}-${cell}`} player={player} cell={true} id={cell} color={color} />)
                            }
                        </View>
                    )
                })}
            </View>
        </View>
    )
}

export default memo(VerticalPath)

const styles = StyleSheet.create({
    container: {
        width: '20%',
        height: '100%',
        alignItems: 'center',
        flexDirection: 'row'
    },
    cellContainer: {
        flexDirection: 'row',
        width: '33.3%',
        height: '16.6%'
    }
})