import artworksAPI from "../../../api/artworksAPI"

const getPosts = async () => {
  try {
    const rawPosts = await artworksAPI.get("/")
    const rawData = rawPosts.data
    const { data } = rawData

    return data
  } catch (error) {
    console.log("Error on getPosts: ", error)
  }
}

export const postsModel = {
  getPosts: () => getPosts(),
}