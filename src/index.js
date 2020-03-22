/**
 * @format
 * @flow
 */

import React from 'react'
import { SafeAreaView, StyleSheet, View, Text, StatusBar } from 'react-native'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0a0206',
  },
})

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.container}>
          <Text>Menu</Text>
        </View>
      </SafeAreaView>
    </>
  )
}
