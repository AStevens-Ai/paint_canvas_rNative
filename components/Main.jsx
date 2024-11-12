import { StyleSheet, Text, View, Dimensions, Button, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { Canvas, Path } from '@shopify/react-native-skia';

function Main({ isDarkMode }) {

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: isDarkMode ? '#000' : '#fff',
        },
        canvasContainer: {
            flex: 1,
        },
        canvas: {
            width: '100%',
            height: '100%',
        },
        colorButton: {
            padding: 10,
            marginHorizontal: 5,
            borderRadius: 5,
            alignItems: 'center',
        },
        buttonContainer: {
            flexDirection: 'row',
            position: 'absolute',
            top: 10,
            left: 0,
            right: 0,
            justifyContent: 'center',
            zIndex: 1,  // Ensure it stays above the canvas
        },
        resetButtonContainer: {
            padding: 10,
            position: 'absolute',
            bottom: 20,
            left: 0,
            right: 0,
            alignItems: 'center',
            zIndex: 1,
        },
    });


    const radioButtons = ['black', 'red', 'green', 'blue']

    const [color, setColor] = useState('black')
    function changeColor(color) {
        switch (color) {
            case 'black':
                setColor('black')
                break;
            case 'red':
                setColor('red')
                break;
            case 'green':
                setColor('green')
                break
            case 'blue':
                setColor('blue')
                break
            default:
                setColor('black')
        }
    }


    const [paths, setPaths] = useState([])

    const panGesture = Gesture.Pan()
        .onBegin((e) => {
            const newPath = { points: [{ x: e.absoluteX, y: e.absoluteY }], color }
            setPaths((current) => [...current, newPath])
        })
        .onUpdate((e) => {
            setPaths(current => {
                const lastPath = current[current.length - 1];
                lastPath.points.push({ x: e.absoluteX, y: e.absoluteY });
                return [...current.slice(0, -1), lastPath];
            }
            )
        })


    return (
        <View>
            <View style={styles.buttonContainer}>
                {radioButtons.map((name) => {
                    return (
                        <TouchableOpacity
                            key={name}
                            style={[styles.colorButton, { backgroundColor: name }]}
                            onPress={() => changeColor(name)}
                        >
                            <Text style={{ color: 'white' }}>
                                {name.charAt(0).toUpperCase() + name.slice(1)}
                            </Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
            <GestureDetector gesture={panGesture}>
                <Canvas style={styles.canvas}>
                    {paths.map((path, index) => {
                        const pathData = path.points.length > 0
                            ? `M ${path.points[0].x} ${path.points[0].y} ` +
                            path.points.slice(1).map(p => `L ${p.x} ${p.y}`).join(" ")
                            : '';

                        return (
                            <Path
                                key={index}
                                path={pathData}
                                strokeWidth={4}
                                color={path.color}
                                style="stroke"
                            />
                        );
                    })}
                </Canvas>
            </GestureDetector>
            <View style={styles.resetButtonContainer}>
                <Button
                    title="Reset Canvas"
                    onPress={() => setPaths([])}
                    color={isDarkMode ? 'white' : 'black'}
                />
            </View>
        </View>
    );
}

export default Main;
