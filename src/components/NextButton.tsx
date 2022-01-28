import { useEffect, useRef } from 'react'
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import Svg, { G, Circle } from 'react-native-svg'
import { AntDesign } from '@expo/vector-icons'

type Props = {
  percentage: number
  scrollTo: () => void
}

export const NextButton = ({ percentage, scrollTo }: Props) => {
  const size = 128
  const strokeWidth = 2
  const center = size / 2
  const radius = size / 2 - strokeWidth / 2
  const circumference = 2 * Math.PI * radius

  const progressAnimation = useRef(new Animated.Value(0)).current
  const progressRef = useRef(null)

  const animation = (toValue: any) => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: true
    }).start()
  }

  useEffect(() => {
    animation(percentage)
  }, [percentage])

  useEffect(() => {
    progressAnimation.addListener((value) => {
      const strokeDashoffset = circumference - (circumference * value.value) / 100
      if (progressRef?.current) {
        // @ts-ignore
        progressRef.current.setNativeProps({
          strokeDashoffset
        })
      }
    })
    return () => {
      progressAnimation.removeAllListeners()
    }
  }, [])

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <G rotation="-90" origin={center}>
          <Circle
            stroke='#E6E7E8'
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <Circle
            ref={progressRef}
            stroke='#F4338F'
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
          />
        </G>
      </Svg>
      <TouchableOpacity style={styles.button} activeOpacity={0.6} onPress={scrollTo}>
        <AntDesign name="arrowright" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    backgroundColor: '#f4338f',
    borderRadius: 100,
    padding: 20
  }
})
