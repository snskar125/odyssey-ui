import { Image, StyleSheet, Text, View } from "react-native";
import InstagramLikeEffect from "../Components/InstagramLikeEffect";

export default function IGLikeDemo() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.wrapper}>
          <View style={styles.row}>
            <Image style={styles.logo} source={require("../Images/logo.png")} />
            <Text style={styles.title}>odyssey_ui</Text>
          </View>
          <Image
            style={styles.icon}
            source={{
              uri: "https://icons.veryicon.com/png/o/miscellaneous/24x24-grid-fill-icon-font-set-long-term/24gf-ellipsis.png",
            }}
          />
        </View>
        <InstagramLikeEffect>
          <Image
            style={styles.post}
            source={{
              uri: "https://images.unsplash.com/photo-1722412878204-d13c6210a1b9?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
          />
        </InstagramLikeEffect>
        <View style={styles.wrapper}>
          <View style={styles.row}>
            <Image
              style={styles.icon}
              source={{
                uri: "https://i.pinimg.com/originals/50/9e/af/509eaf4abcbd88d8e1fc4a9734cd9e2e.png",
              }}
            />
            <Text style={styles.count}>1.1K</Text>
            <Image
              style={styles.icon}
              source={{
                uri: "https://cdn0.iconfinder.com/data/icons/social-media-logo-4/32/Social_Media_instagram_comment-512.png",
              }}
            />
            <Text style={styles.count}>200</Text>
            <Image
              style={styles.icon}
              source={{
                uri: "https://cdn3.iconfinder.com/data/icons/instagram-latest/1000/Instagram_send_message-512.png",
              }}
            />
            <Text style={styles.count}>50</Text>
          </View>
          <Image
            style={styles.icon}
            source={{
              uri: "https://icons.veryicon.com/png/o/miscellaneous/a-library-of-monochrome-icons/conclusion-1.png",
            }}
          />
        </View>
      </View>
      <Text style={styles.text}>Double Tap to Like</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050505",
    alignItems: "center",
    justifyContent: "center",
    gap: 25,
  },
  post: {
    width: "100%",
    aspectRatio: 1.5,
    resizeMode: "contain",
  },
  text: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  card: {
    width: "100%",
  },
  wrapper: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  logo: {
    width: 30,
    height: 30,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: "#f52fa9",
  },
  title: {
    fontWeight: "bold",
    color: "#FFF",
    fontSize: 16,
  },
  count: {
    fontWeight: "bold",
    color: "#FFF",
    fontSize: 18,
  },
  icon: {
    width: 25,
    height: 25,
    resizeMode: "contain",
    tintColor: "#FFF",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
