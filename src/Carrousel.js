/**
 * @format
 * @flow
 */

import React from 'react'
import {
  StyleSheet,
  Dimensions,
  Animated,
  View,
  Text,
  ScrollView,
} from 'react-native'

import TabBar from './TabBar'
import * as theme from './theme'

const dimensions = Dimensions.get('window')

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  page: {
    padding: 12,
    width: dimensions.width,
  },
})

export type Route = {
  key: number,
  title: string,
}

export type NavigationState = {
  index: number,
  routes: Array<Route>,
}

type Props = {
  position: Animated.Value,
  renderPage: (route: Route) => React$Element<any>,
  onIndexChange: (index: number) => void,
  navigationState: NavigationState,
}

function Carrousel(props: Props) {
  const { navigationState, position, renderPage, onIndexChange } = props

  const [index, setIndex] = React.useState(() => navigationState.index)

  const ref = React.useRef<?Animated.ScrollView>(null)

  const onScroll = Animated.event([
    { nativeEvent: { contentOffset: { x: position } } },
  ])

  function onMomentumScrollEnd(event) {
    const index = event.nativeEvent.contentOffset.x / dimensions.width
    setIndex(index)
    onIndexChange(index)
  }

  React.useEffect(() => {
    if (navigationState.index !== index && ref.current) {
      const scrollView = ref.current.getNode()
      const x = navigationState.index * dimensions.width
      scrollView.scrollTo({ x, animated: true })
    }
    return () => void 0
  }, [navigationState.index])

  return React.useMemo(
    () => (
      <>
        <TabBar
          position={position}
          navigationState={navigationState}
          onIndexChange={onIndexChange}
        />
        <Animated.ScrollView
          ref={ref}
          style={styles.scrollView}
          horizontal={true}
          decelerationRate={0}
          snapToInterval={dimensions.width}
          snapToAlignment={'center'}
          onScroll={onScroll}
          onMomentumScrollEnd={onMomentumScrollEnd}
        >
          {navigationState.routes.map(route => (
            <View key={route.key} style={styles.page}>
              {renderPage(route)}
            </View>
          ))}
        </Animated.ScrollView>
      </>
    ),
    [],
  )
}

export default React.memo<Props>(
  Carrousel,
  (oldProps, newProps) =>
    oldProps.navigationState.index === newProps.navigationState.index,
)
