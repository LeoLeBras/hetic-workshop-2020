/**
 * @format
 * @flow
 */

import React from 'react'
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Animated,
  TouchableOpacity,
} from 'react-native'

import * as theme from './theme'
import type { NavigationState } from './Carrousel'

const dimensions = Dimensions.get('window')

const MARGIN = 12

const styles = StyleSheet.create({
  root: {
    padding: 12,
  },
  container: {
    flexDirection: 'row',
  },
  item: {
    marginRight: MARGIN,
  },
  text: {
    fontSize: 18,
    fontFamily: theme.fontFace,
    color: theme.neutralColor00,
  },
  indicator: {
    marginTop: 8,
    backgroundColor: theme.primaryColor50,
    height: 2,
  },
})

type Props = {
  navigationState: NavigationState,
  position: Animated.Value,
  onIndexChange: (index: number) => void,
}

function TabBar(props: Props) {
  const { navigationState, position, onIndexChange } = props

  const [widths, setWidths] = React.useState(() =>
    Array.from({ length: navigationState.routes.length }, a => 0),
  )

  const inputRange = Array.from(
    { length: navigationState.routes.length },
    (_, index) => index * Number(dimensions.width),
  )

  const width = position.interpolate({
    inputRange,
    outputRange: widths,
  })

  const translateX = position.interpolate({
    inputRange,
    outputRange: widths.reduce(
      (acc, _, index) => [
        ...acc,
        index === 0 ? 0 : acc[acc.length - 1] + widths[index - 1] + MARGIN,
      ],
      [],
    ),
  })

  function onLayout(event, index) {
    const { layout } = event.nativeEvent
    setWidths(preWidths => [
      ...preWidths.slice(0, index),
      layout.width,
      ...preWidths.slice(index + 1),
    ])
  }

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        {navigationState.routes.map((route, index) => (
          <TouchableOpacity
            key={route.key}
            onPress={() => onIndexChange(index)}
          >
            <View
              style={styles.item}
              onLayout={event => onLayout(event, index)}
            >
              <Text style={styles.text}>{route.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <Animated.View
        style={[styles.indicator, { width, transform: [{ translateX }] }]}
      />
    </View>
  )
}

export default React.memo<Props>(TabBar, () => true)
