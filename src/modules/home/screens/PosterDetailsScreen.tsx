import { useEffect, useState } from "react"
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { StackScreenProps } from "@react-navigation/stack"
import Icon from "react-native-vector-icons/MaterialIcons"

import { Post } from "src/interfaces/interfaces"
import { LazyLoadImage } from "src/lib/components"
import { getData, pushNotification, setData, textWithoutHTML } from "src/lib/helpers"
import { RootStackParams } from "src/nagivators"

import { COLORS } from "src/theme/colors"


interface Props extends StackScreenProps<RootStackParams, "posterDetails">{}

const screenHeight = Dimensions.get('screen').height

export const PosterDetailsScreen = ({ route, navigation }: Props) => {
  const [isFavorite, setIsFavorite] = useState(false)

  const post = route.params
  const { image_id, title, description, alt_titles, short_description,
    credit_line, date_display, date_end, place_of_origin
  } = post

  const uri = `https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg`

  const handleFavorites = async () => {
    try {
      const list = await getData("favoriteList") || []
      const isFavorite = list.some((item: Post) => item.image_id === image_id)
      setIsFavorite(isFavorite)
    } catch (error) {
      console.log("Error on handleFavorites: ")
    }
  }

  useEffect(() => {
    handleFavorites()
  }, [])

  const addToFavorites = async () => {
    try {
      setIsFavorite(!isFavorite)
      const list = await getData("favoriteList") || []
      await setData("favoriteList",[{ ...post, is_favorite: true }, ...list])
      pushNotification("New post added!", `You added ${title} to your favorite list`)
    } catch (error) {
      console.log("Error on addToFavorites :", error)
    }
  }

  const removeFromFavorites = async () => {
    try {
      const list = await getData("favoriteList") || []
      const newList = list.filter((item: Post) => item.image_id !== post.image_id)
      await setData("favoriteList", newList)
      setIsFavorite(!isFavorite)
    } catch (error) {
      console.log("Error on removeFromFavorites :", error)
    }
  }

  const handleFavoriteBtnAction = () => isFavorite ? removeFromFavorites() : addToFavorites()

  const postInfo = [
    {
      label: "Title",
      value: title || alt_titles || "This picture has no title at all"
    },
    {
      label: "Art credits",
      value: credit_line || "Unknown"
    },
    {
      label: "Description",
      value: description || short_description || "This picture has no description at all"
    },
    {
      label: "Publish date",
      value: date_display || date_end || "Unknown"
    },
    {
      label: "Place of origin",
      value: place_of_origin || "Unknown"
    }
  ]

  const isFavoriteIcon = isFavorite ? COLORS.secondary : COLORS.primary

  return (
    <ScrollView style={styles.container}>
      <View style={ styles.imageContainer }>
        <View style={ styles.imageBorder }>
          <LazyLoadImage
            uri={uri}
            style={styles.posterImage}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.favoriteBtn} onPress={handleFavoriteBtnAction}>
        <Icon name={"favorite"} color={isFavoriteIcon} size={40} />
      </TouchableOpacity>

      {postInfo.map(({ label, value}, index) => (
        <View style={styles.infoContainer} key={label + index}>
          <Text style={ styles.label }>{label}</Text>
          <Text style={ styles.value }>{textWithoutHTML(value.toString())}</Text>
        </View>
      ))}

      <View style={ styles.backButton }>
        <TouchableOpacity onPress={() => navigation.pop() }>
          <Icon color={COLORS.secondary} name="chevron-left" size={ 60 } />
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.light
  },
  imageContainer: {
    width: '100%',
    height: screenHeight * 0.6,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 10,
    },
    shadowOpacity: 0.24,
    shadowRadius: 7,
    elevation: 9,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
    marginBottom: 10,
  },
  imageBorder: {
    flex: 1,
    overflow: 'hidden',
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25
  },
  posterImage: {
    flex: 1,
    width: "100%",
  },
  favoriteBtn: {
    position: "absolute",
    right: 10,
    top: 15

  },
  infoContainer: {
    marginHorizontal: 20,
    marginVertical: 5,
  },
  value: {
    fontSize: 16,
    // opacity: 0.8,
    fontWeight: "bold",
    color: COLORS.dark

  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.tertiary,
  },
  backButton: {
    position: 'absolute',
    zIndex: 999,
    elevation: 9,
    top: 10,
    left: 5
  }
})