import PushNotification from "react-native-push-notification";

export const pushNotification = (title: string, message: string) => {
  PushNotification.localNotification({
    channelId: "test-channel",
    title,
    message
  })
}