import { memo, useRef } from "react";
import {
  Animated,
  GestureResponderEvent,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
  ViewStyle,
} from "react-native";

const ANIMATION_BOUNCINESS = 25;

interface Props extends TouchableWithoutFeedbackProps {
  minScale?: number;
  bounce?: boolean;
  style?: ViewStyle;
}

const TouchableScale: React.FC<Props> = memo(
  ({
    minScale = 0.9,
    bounce = true,
    style,
    children,
    onPressIn = () => {},
    onPressOut = () => {},
    ...rest
  }) => {
    const scale = useRef(new Animated.Value(1)).current;

    const handlePressIn = (e: GestureResponderEvent) => {
      Animated.timing(scale, {
        toValue: minScale,
        duration: 100,
        useNativeDriver: true,
      }).start();
      onPressIn(e);
    };

    const handlePressOut = (e: GestureResponderEvent) => {
      if (bounce) {
        Animated.spring(scale, {
          toValue: 1,
          bounciness: ANIMATION_BOUNCINESS,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(scale, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }).start();
      }
      onPressOut(e);
    };

    return (
      <TouchableWithoutFeedback
        {...rest}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View
          style={[
            style,
            {
              transform: [{ scale }],
            },
          ]}
        >
          {children}
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
);

export default TouchableScale;
