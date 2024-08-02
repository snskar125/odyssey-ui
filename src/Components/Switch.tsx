import React, { useRef, useEffect, memo } from "react";
import {
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  GestureResponderEvent,
} from "react-native";

const ANIMATION_DURATION = 150;
const ANIMATION_BOUNCINESS = 25;
const CONTAINER_PADDING = 2;

interface Props {
  size?: number;
  activeSwitchColor?: string;
  inActiveSwitchColor?: string;
  activeTrackColor?: string;
  inActiveTrackColor?: string;
  value?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  animate?: boolean;
  bounce?: boolean;
}

const Switch: React.FC<Props> = memo((props) => {
  const {
    size = 25,
    activeSwitchColor = "#FFF",
    inActiveSwitchColor = "#FFF",
    activeTrackColor = "#3B81F6",
    inActiveTrackColor = "#B3B3B3",
    value = true,
    onPress = () => {},
    disabled = false,
    animate = true,
    bounce = true,
  } = props;

  const trackWidth = size * 1.6;
  const translation = size * 0.6;
  const translateX = useRef(
    new Animated.Value(value ? translation : 0)
  ).current;

  useEffect(() => {
    if (animate) {
      if (bounce) {
        Animated.spring(translateX, {
          toValue: value ? translation : 0,
          bounciness: ANIMATION_BOUNCINESS,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(translateX, {
          toValue: value ? translation : 0,
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
        }).start();
      }
    } else {
      translateX.setValue(value ? translation : 0);
    }
  }, [value, size]);

  const trackColor = value ? activeTrackColor : inActiveTrackColor;
  const switchColor = value ? activeSwitchColor : inActiveSwitchColor;

  return (
    <TouchableWithoutFeedback disabled={disabled} onPress={onPress}>
      <View
        style={{
          height: size,
          width: trackWidth,
          borderRadius: size / 2,
          backgroundColor: trackColor,
          padding: CONTAINER_PADDING,
        }}
      >
        <Animated.View
          style={[
            styles.shadow,
            {
              height: size - CONTAINER_PADDING * 2,
              width: size - CONTAINER_PADDING * 2,
              borderRadius: size / 2,
              backgroundColor: switchColor,
              transform: [{ translateX }],
            },
          ]}
        />
      </View>
    </TouchableWithoutFeedback>
  );
});

const styles = StyleSheet.create({
  shadow: {
    elevation: 5,
    shadowColor: "#B3B3B3",
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: { width: 2, height: 2 },
  },
});

export default Switch;
