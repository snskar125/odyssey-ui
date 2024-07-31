import React, { PureComponent, ReactNode } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const ANIMATION_SCALE = 0.75;
const ANIMATION_BORDER_RADIUS = 15;
const TRANSLATEX = screenWidth / 1.2;

interface Props {
  drawerContent?: ReactNode;
  children?: ReactNode;
  containerStyle?: ViewStyle;
  screenContainerStyle?: ViewStyle;
  openDuration?: number;
  closeDuration?: number;
}

export default class Drawer extends PureComponent<Props> {
  private animation = new Animated.Value(0);
  private opening = false;
  private closing = false;

  open = () => {
    const { openDuration = 500 } = this.props;
    if (!this.opening) {
      this.opening = true;
      Animated.timing(this.animation, {
        toValue: 1,
        duration: openDuration,
        useNativeDriver: true,
      }).start(() => {
        this.opening = false;
      });
    }
  };

  close = () => {
    const { closeDuration = 500 } = this.props;
    if (!this.closing) {
      this.closing = true;
      Animated.timing(this.animation, {
        toValue: 0,
        duration: closeDuration,
        useNativeDriver: true,
      }).start(() => {
        this.closing = false;
      });
    }
  };

  render() {
    const { drawerContent, children, containerStyle, screenContainerStyle } =
      this.props;

    const borderRadius = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, ANIMATION_BORDER_RADIUS],
    });
    const scale = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, ANIMATION_SCALE],
    });
    const translateX = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, TRANSLATEX],
    });

    return (
      <View
        style={[styles.container, containerStyle, styles.mandatoryContainer]}
      >
        {drawerContent}
        <TouchableWithoutFeedback
          onPress={() => {
            this.close();
          }}
        >
          <Animated.View
            style={[
              styles.screen,
              screenContainerStyle,
              styles.mandatoryScreen,
              { borderRadius, transform: [{ scale }, { translateX }] },
            ]}
          >
            {children}
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3B81F6",
  },
  screen: {
    backgroundColor: "#101010",
  },
  mandatoryContainer: {
    width: screenWidth,
    height: screenHeight,
  },
  mandatoryScreen: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});
