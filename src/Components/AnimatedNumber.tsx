import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Animated,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

const ANIMATION_DURATION = 1000;
const ANIMATION_TENSION = 5;
const ANIMATION_FRICTION = 2;

interface DigitProps {
  digit: string;
  style?: TextStyle;
  height: number | null;
  bounce: boolean;
}

const Digit: React.FC<DigitProps> = memo(({ digit, style, height, bounce }) => {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (digit !== "," && digit !== "." && digit !== "-") {
      const translation = -(parseInt(digit, 10) * (height || 0));
      if (bounce) {
        Animated.spring(translateY, {
          toValue: translation,
          tension: ANIMATION_TENSION,
          friction: ANIMATION_FRICTION,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(translateY, {
          toValue: translation,
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
        }).start();
      }
    }
  }, [height, digit]);

  if (digit === "," || digit === "." || digit === "-") {
    return (
      <Animated.View style={styles.numbersBar}>
        <Text numberOfLines={1} style={[styles.digit, style, { height }]}>
          {digit}
        </Text>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={[styles.numbersBar, { transform: [{ translateY }] }]}>
      {DIGITS.map((d) => (
        <Text
          key={d}
          numberOfLines={1}
          style={[styles.digit, style, { height }]}
        >
          {d}
        </Text>
      ))}
    </Animated.View>
  );
});

interface Props {
  number?: string;
  containerStyle?: ViewStyle;
  style?: TextStyle;
  bounce?: boolean;
  insertCommas?: boolean;
}

const AnimatedNumber: React.FC<Props> = memo(
  ({
    number = "0",
    containerStyle,
    style,
    bounce = true,
    insertCommas = true,
  }) => {
    const [height, setHeight] = useState<number | null>(null);

    const numberString = useMemo(
      () =>
        insertCommas
          ? FormatToCommaString(parseFloat(number))
          : number.toString(),
      [number, insertCommas]
    );

    const digits = numberString.split("");

    const handleLayout = useCallback((e: LayoutChangeEvent) => {
      setHeight(e.nativeEvent.layout.height);
    }, []);

    return (
      <View style={[containerStyle, styles.container, { height }]}>
        {digits.map((digit, index) => (
          <Digit
            key={index}
            digit={digit}
            style={style}
            height={height}
            bounce={bounce}
          />
        ))}
        <Text
          onLayout={height === null ? handleLayout : undefined}
          style={[styles.digit, style, styles.hidden]}
        >
          0
        </Text>
      </View>
    );
  }
);

export default AnimatedNumber;

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    flexDirection: "row",
  },
  numbersBar: {
    alignItems: "center",
  },
  digit: {
    fontSize: 25,
    fontWeight: "bold",
  },
  hidden: {
    position: "absolute",
    opacity: 0,
  },
});

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const FormatToCommaString = (num: number): string =>
  num.toLocaleString("en-IN");
