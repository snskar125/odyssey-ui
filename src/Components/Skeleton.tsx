import { memo, useEffect, useRef } from "react";
import { Animated, StyleSheet, ViewProps } from "react-native";

const ANIMATION_DURATION = 750;
const MIN_OPACITY = 0.25;

interface Props extends ViewProps {
  opacity?: number;
}

const Skeleton: React.FC<Props> = memo(
  ({ opacity = 1, style, children, ...rest }) => {
    const opacityValue = useRef(new Animated.Value(opacity)).current;

    useEffect(() => {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(opacityValue, {
            toValue: MIN_OPACITY,
            duration: ANIMATION_DURATION,
            useNativeDriver: true,
          }),
          Animated.timing(opacityValue, {
            toValue: opacity,
            duration: ANIMATION_DURATION,
            useNativeDriver: true,
          }),
        ])
      );
      animation.start();
      return animation.stop;
    }, [opacity]);

    return (
      <Animated.View
        style={[styles.skeleton, style, { opacity: opacityValue }]}
        {...rest}
      >
        {children}
      </Animated.View>
    );
  }
);

const styles = StyleSheet.create({
  skeleton: {
    height: 50,
    width: 250,
    borderRadius: 5,
    backgroundColor: "#505050",
  },
});

export default Skeleton;
