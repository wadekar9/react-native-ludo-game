import { StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import Cell from './Cell';

interface HorizontalPathProps {
    color: string;
    player: number;
    cells: number[];
}

const HorizontalPath: React.FC<HorizontalPathProps> = ({ color, cells, player }) => {

    const groupCells = useMemo(() => {
        const groups = [];
        for (let i = 0; i < cells.length; i += 6) {
            groups.push(cells.slice(i, i + 6));
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

export default HorizontalPath

const styles = StyleSheet.create({
    container: {
        width: '40%',
        height: '100%',
        alignItems: 'center',
        flexDirection: 'row'
    },
    cellContainer : {
        flexDirection: 'row',
        width: '16.7%',
        height: '33.3%'
    }
})