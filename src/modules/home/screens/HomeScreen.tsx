import { useEffect, useState } from "react"
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from "@react-navigation/native"
import PushNotification from "react-native-push-notification"

import { Post } from "src/interfaces/interfaces"

import { CustomActivityIndicator } from "src/lib/components"
import { postsModel } from "../resources/post"
import { LazyLoadImage } from "src/lib/components"
import { COLORS } from "src/theme/colors"

export const HomeScreen = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const navigation = useNavigation() as any
  const { getPosts } = postsModel

  //Needed for push notifications to work
  const createNotificationChannel = () => {
    PushNotification.createChannel({
      channelId: "test-channel",
      channelName: "Test channel"
    },
    (created: any) => console.log(`createChannel returned '${created}'`)
    )
  }

  const showPosts = async () => {
    const posts = await getPosts()
    setPosts(posts)
  }

  useEffect(() => {
    showPosts()
    createNotificationChannel()
  }, [])

  const RenderPost = ({ item }: { item: Post }) => {
    const { title, image_id } = item
    const uri = `https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg`

    return (
      <TouchableOpacity style={styles.thumbnail} onPress={() => navigation.navigate("posterDetails", item)}>
        <LazyLoadImage
          uri={uri}
          style={styles.image}
        />
        <Text numberOfLines={3} style={styles.title}>{title}</Text>
      </TouchableOpacity>
    )
  }

  if (!posts.length) return <CustomActivityIndicator />

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
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
    padding: 10,
    paddingBottom: 0
  },
  thumbnail: {
    width: "100%",
    maxWidth: 165,
    height: 185,
    backgroundColor: COLORS.light,
    elevation: 9,
    alignItems: "center",
    marginHorizontal: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 100,
    marginBottom: 10
  },
  title: {
    fontSize: 16,
    color: COLORS.dark,
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 5
  }
})