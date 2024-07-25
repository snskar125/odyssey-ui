import { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  GestureResponderEvent,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
  View,
  ViewStyle,
} from "react-native";

const { height, width } = Dimensions.get("window");
const INITIAL_RIPPLE_SIZE = 30;
const ANIMATION_DURATION = 750;
const MAX_SCALE = Math.max(height, width) / (INITIAL_RIPPLE_SIZE / 2);

interface RippleProps {
  onRemove: (id) => void;
  id: string;
  color: string;
  opacity: number;
  x: number;
  y: number;
  canRemove: boolean;
}

const Ripple: React.FC<RippleProps> = ({
  onRemove,
  id,
  color,
  opacity,
  x,
  y,
  canRemove,
}) => {
  const scale = useRef(new Animated.Value(1)).current;
  const opacityValue = useRef(new Animated.Value(opacity)).current;

  useEffect(() => {
    Animated.timing(scale, {
      toValue: MAX_SCALE,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (canRemove) {
      Animated.timing(opacityValue, {
        toValue: 0,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }).start(() => {
        onRemove(id);
      });
    }
  }, [canRemove]);

  return (
    <Animated.View
      style={[
        styles.ripple,
        {
          backgroundColor: color,
          left: x - INITIAL_RIPPLE_SIZE / 2,
          top: y - INITIAL_RIPPLE_SIZE / 2,
          transform: [{ scale }],
          opacity: opacityValue,
        },
      ]}
    />
  );
};

interface Props extends TouchableWithoutFeedbackProps {
  style?: ViewStyle;
  rippleColor?: string;
  rippleOpacity?: number;
  ripplePosition?: "foreground" | "background";
}

const TouchableRipple: React.FC<Props> = memo(
  ({
    style,
    children,
    rippleColor = "#000",
    rippleOpacity = 0.1,
    ripplePosition = "foreground",
    onPressIn = () => {},
    onPressOut = () => {},
    ...rest
  }) => {
    const [ripples, setRipples] = useState<
      { id: string; x: number; y: number }[]
    >([]);
    const [pressedOut, setPressedOut] = useState(true);

    const handlePressIn = (e: GestureResponderEvent) => {
      const { locationX, locationY } = e.nativeEvent;
      setRipples((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          x: locationX,
          y: locationY,
        },
      ]);
      setPressedOut(false);
      onPressIn(e);
    };

    const handlePressOut = (e: GestureResponderEvent) => {
      setPressedOut(true);
      onPressOut(e);
    };

    const handleRemove = useCallback((id) => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
    }, []);

    return (
      <TouchableWithoutFeedback
        {...rest}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <View pointerEvents="box-only" style={[style, styles.container]}>
          {ripplePosition === "foreground" ? children : null}
          {ripples.map((r, i) => (
            <Ripple
              key={r.id}
              id={r.id}
              x={r.x}
              y={r.y}
              color={rippleColor}
              opacity={rippleOpacity}
              canRemove={!(!pressedOut && i === ripples.length - 1)}
              onRemove={handleRemove}
            />
          ))}
          {ripplePosition === "background" ? children : null}
        </View>
      </TouchableWithoutFeedback>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  ripple: {
    height: INITIAL_RIPPLE_SIZE,
    width: INITIAL_RIPPLE_SIZE,
    borderRadius: INITIAL_RIPPLE_SIZE / 2,
    position: "absolute",
  },
});

export default TouchableRipple;
