import { useState } from "react"
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useIsFocused } from "@react-navigation/native"
import Icon from "react-native-vector-icons/MaterialIcons";

import { Post } from "src/interfaces/interfaces";
import { getData, setData } from "src/lib/helpers";
import { LazyLoadImage } from "src/lib/components"

import { COLORS } from "src/theme/colors";

export const FavoritesScreen = () => {
  const [favoritesList, setFavoritesList] = useState<Post[]>([])
  const isFocused = useIsFocused()

  const loadFavorites = async () => {
    const dataLoaded = await getData("favoriteList") || favoritesList
    setFavoritesList(dataLoaded)
  }

  if (isFocused) {
    loadFavorites()
  }

  const RenderPost = ({ item }: { item: Post }) => {
    const { title, image_id } = item
    const uri = `https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg`

    const removeFromFavorites = async () => {
      try {
        const list = await getData("favoriteList") || favoritesList
        const newList = list.filter((item: Post) => item.image_id !== image_id)
        await setData("favoriteList", newList)
      } catch (error) {
        console.log("Error on removeFromFavorites :", error)
      }
    }

    return (
      <View style={styles.thumbnail}>
        <TouchableOpacity style={styles.icon} activeOpacity={.7} onPress={removeFromFavorites}>
          <Icon name="favorite" color={COLORS.secondary} size={40} />
        </TouchableOpacity>
          <LazyLoadImage
            uri={uri}
            style={styles.image}
          />
        <Text numberOfLines={3} style={styles.title}>{title}</Text>
      </View>
    )
  }

  if (!favoritesList.length) return <Text style={styles.title}>You have no favorites yet</Text>

  return (
    <View style={styles.container}>
      <FlatList
        data={favoritesList}
        renderItem={RenderPost}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        ItemSeparatorComponent={() => <View style={{ margin: 10 }} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  },
  thumbnail: {
    width: "100%",
    maxWidth: 175,
    height: 185,
    backgroundColor: COLORS.light,
    elevation: 9,
    alignItems: "center",
    marginHorizontal: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  icon: {
    position: "absolute",
    zIndex: 100,
    right: 3,
  },
  image: {
    width: "100%",
    height: 100,
    marginBottom: 10,
    borderRadius: 10
  },
  title: {
    fontSize: 16,
    color: COLORS.dark,
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 5
  }
})