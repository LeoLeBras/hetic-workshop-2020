/**
 * @format
 * @flow
 */

import React from 'react'
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Animated,
} from 'react-native'

import * as theme from './theme'

const OFFSET_PAGE = 3

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: theme.neutralColor100,
    flexDirection: 'row',
  },
  item: {
    marginRight: 12,
  },
  text: {
    fontFamily: theme.fontFace,
    fontWeight: '700',
    fontSize: 32,
    color: theme.neutralColor00,
  },
  activeText: {
    color: theme.neutralColor00,
  },
})

type Props = {
  position: Animated.Value,
}

function App(props: Props) {
  const opacityA = props.position.interpolate({
    inputRange: [
      0,
      width * (OFFSET_PAGE - 1),
      width * OFFSET_PAGE,
      width * (OFFSET_PAGE + 1),
    ],
    outputRange: [1, 1, 0.5, 0.5],
  })
  const opacityB = props.position.interpolate({
    inputRange: [0, width * (OFFSET_PAGE - 1), width * OFFSET_PAGE],
    outputRange: [0.5, 0.5, 1],
  })

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.item, { opacity: opacityA }]}>
        <Text style={styles.text}>Music</Text>
      </Animated.View>
      <Animated.View style={[styles.item, { opacity: opacityB }]}>
        <Text style={styles.text}>Podcasts</Text>
      </Animated.View>
    </View>
  )
}

export default React.memo<Props>(App, () => true)
