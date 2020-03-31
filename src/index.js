/**
 * @format
 * @flow
 */

import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  Animated,
} from 'react-native'

import Carrousel, { type Route } from './Carrousel'
import Header from './Header'
import * as theme from './theme'

const { event } = Animated
const { width, height } = Dimensions.get('window')

const INDEX_VALUE_CHANGED = 'INDEX_VALUE_CHANGED'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.neutralColor100,
  },
  container: {
    flex: 1,
    backgroundColor: theme.neutralColor100,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: theme.fontFace,
    fontSize: 42,
    color: theme.neutralColor00,
  },
})

type Props = {}

function App() {
  const position = new Animated.Value(0)

  const [navigationState, dispatch] = React.useReducer(
    (state, action) => {
      switch (action.type) {
        case INDEX_VALUE_CHANGED:
          return {
            ...state,
            index: action.payload.index,
          }
        default:
          return state
      }
    },
    {
      index: 0,
      routes: [
        { key: 0, title: 'Playlists' },
        { key: 1, title: 'Artists' },
        { key: 2, title: 'Albums' },
        { key: 3, title: 'Episodes' },
        { key: 4, title: 'Downloads' },
      ],
    },
  )

  function onIndexChange(index: number) {
    dispatch({ type: INDEX_VALUE_CHANGED, payload: { index } })
  }

  function renderPage(route: Route) {
    return (
      <View style={styles.page}>
        <Text style={styles.text}>{route.title}</Text>
      </View>
    )
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.root}>
        <View style={styles.container}>
          <Header position={position} />
          <Carrousel
            position={position}
            renderPage={renderPage}
            navigationState={navigationState}
            onIndexChange={onIndexChange}
          />
        </View>
      </SafeAreaView>
    </>
  )
}

export default React.memo<Props>(App, () => true)
