/**
 * @format
 * @flow
 */

import React from 'react'
import { SafeAreaView, StyleSheet, View, Text, StatusBar } from 'react-native'

import * as theme from './theme'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.neutralColor100,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.neutralColor100,
  },
  text: {
    color: theme.neutralColor00,
    fontSize: 64,
  },
})

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.root}>
        <View style={styles.container}>
          <Text style={styles.text}>🏎</Text>
        </View>
      </SafeAreaView>
    </>
  )
}
