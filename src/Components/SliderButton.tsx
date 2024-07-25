import React, { memo, useRef } from "react";
import {
  Animated,
  Image,
  PanResponder,
  StyleSheet,
  View,
  TextStyle,
  GestureResponderEvent,
  PanResponderGestureState,
} from "react-native";

const ANIMATION_DURATION = 250;

interface SliderButtonProps {
  width?: number;
  padding?: number;
  backgroundColor?: string;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  buttonSize?: number;
  buttonColor?: string;
  buttonBorderRadius?: number;
  buttonBorderWidth?: number;
  buttonBorderColor?: string;
  icon?: React.ReactNode;
  title?: string;
  titleStyle?: TextStyle;
  lockOnSuccess?: boolean;
  onSuccess?: (
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ) => void;
  onFail?: (
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ) => void;
}

const SliderButton: React.FC<SliderButtonProps> = memo(
  ({
    width = 300,
    padding = 5,
    backgroundColor = "#3B81F6",
    borderRadius = 10,
    borderWidth = 0,
    borderColor = "#FFF",
    buttonSize = 50,
    buttonColor = "#252525",
    buttonBorderRadius = 5,
    buttonBorderWidth = 0,
    buttonBorderColor = "#252525",
    lockOnSuccess = true,
    icon = (
      <Image
        style={{ marginLeft: 2, width: 20, height: 20, tintColor: "#FFF" }}
        source={{ uri: ChevronIcon }}
      />
    ),
    title = "Slider Button",
    titleStyle = {},
    onSuccess = () => {},
    onFail = () => {},
  }) => {
    const translate = useRef(new Animated.Value(0)).current;

    const successOffset =
      width -
      borderWidth * 2 -
      buttonSize -
      buttonBorderWidth * 2 -
      padding * 2;

    const reset = Animated.timing(translate, {
      toValue: 0,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start;

    const pan = PanResponder.create({
      onStartShouldSetPanResponder: () =>
        !(lockOnSuccess && translate.__getValue() >= successOffset),
      onPanResponderTerminationRequest: () => false,
      onPanResponderStart: (_, __) => {
        reset();
      },
      onPanResponderMove: (_, gestureState) => {
        const { dx } = gestureState;
        translate.setValue(dx);
      },
      onPanResponderRelease: (e, gestureState) => {
        const { dx } = gestureState;
        if (dx >= successOffset) {
          onSuccess(e, gestureState);
        } else {
          onFail(e, gestureState);
          reset();
        }
      },
    });

    const translateX = translate.interpolate({
      inputRange: [0, successOffset],
      outputRange: [0, successOffset],
      extrapolate: "clamp",
    });

    const animation = translate.interpolate({
      inputRange: [0, successOffset],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    return (
      <View
        style={[
          styles.container,
          {
            width,
            padding,
            backgroundColor,
            borderRadius,
            borderWidth,
            borderColor,
          },
        ]}
      >
        <Animated.Text
          style={[
            styles.title,
            titleStyle,
            { opacity: animation, transform: [{ scale: animation }] },
          ]}
        >
          {title}
        </Animated.Text>
        <Animated.View
          {...pan.panHandlers}
          style={[
            styles.button,
            {
              width: buttonSize,
              height: buttonSize,
              backgroundColor: buttonColor,
              borderRadius: buttonBorderRadius,
              borderWidth: buttonBorderWidth,
              borderColor: buttonBorderColor,
              transform: [{ translateX }],
            },
          ]}
        >
          {icon}
        </Animated.View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    width: "100%",
    textAlign: "center",
    color: "#FFF",
    position: "absolute",
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "500",
  },
});

export default SliderButton;

const ChevronIcon =
  "data:image/png;base64,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";
