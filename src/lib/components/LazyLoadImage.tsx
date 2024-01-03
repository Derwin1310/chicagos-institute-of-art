import React, { useState, useEffect } from 'react'
import { View, Image, ActivityIndicator, StyleProp, ImageStyle } from 'react-native'

import { COLORS } from "src/theme/colors"

import noImageFound from "assets/noImage.png"

interface LazyLoadImageProps {
  uri: string
  style?: StyleProp<ImageStyle>
}

export const LazyLoadImage = ({ uri, style }: LazyLoadImageProps) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
  }, [])

  const handleLoad = () => {
    setLoading(false)
  }

  const isValidSource = uri?.includes("null") || !uri

  return (
    <View style={style}>
      {loading && <ActivityIndicator color={COLORS.secondary} size={25} />}
      <Image
        source={isValidSource ? noImageFound : { uri }}
        style={style}
        onLoad={handleLoad}
        resizeMode="stretch"
      />
    </View>
  )
}