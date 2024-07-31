import { memo, useEffect, useRef } from "react";
import { Animated, StyleSheet, ViewProps } from "react-native";

const ANIMATION_DURATION = 750;

interface Props extends ViewProps {
  minOpacity?: number;
  maxOpacity?: number;
}

const Skeleton: React.FC<Props> = memo(
  ({ minOpacity = 0.25, maxOpacity = 1, style, children, ...rest }) => {
    const opacityValue = useRef(new Animated.Value(maxOpacity)).current;

    useEffect(() => {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(opacityValue, {
            toValue: minOpacity,
            duration: ANIMATION_DURATION,
            useNativeDriver: true,
          }),
          Animated.timing(opacityValue, {
            toValue: maxOpacity,
            duration: ANIMATION_DURATION,
            useNativeDriver: true,
          }),
        ])
      );
      animation.start();
      return animation.stop;
    }, [minOpacity, maxOpacity]);

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
