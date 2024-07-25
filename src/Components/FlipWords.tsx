import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, View, ViewStyle, TextStyle } from "react-native";

const REVEAL_INTERVAL = 100;
const REVEAL_DURATION = 250;

interface LetterProps {
  index: number;
  letter: string;
  style?: TextStyle;
  delay: number;
  interval: number;
  onFinish?: () => void;
}

const Letter: React.FC<LetterProps> = ({
  index,
  letter,
  style,
  delay,
  interval,
  onFinish,
}) => {
  const animation = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    animation.setValue(0);
    Animated.timing(animation, {
      toValue: 1,
      delay,
      duration: REVEAL_DURATION,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(animation, {
        toValue: 2,
        delay: interval,
        duration: REVEAL_DURATION,
        useNativeDriver: true,
      }).start(onFinish);
    });
  }, [index]);

  const scale = animation.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 3],
  });
  const opacity = animation.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  });

  return (
    <Animated.Text
      style={[styles.text, style, { opacity, transform: [{ scale }] }]}
    >
      {letter}
    </Animated.Text>
  );
};

interface Props {
  words?: string[];
  style?: TextStyle;
  containerStyle?: ViewStyle;
  interval?: number;
}

const FlipWords: React.FC<Props> = memo(
  ({
    words = ["Better", "Animated", "Beautiful", "Modern"],
    style,
    containerStyle,
    interval = 3000,
  }) => {
    const [index, setIndex] = useState(0);
    const word = words[index > words.length - 1 ? words.length - 1 : index];

    const updateIndex = useCallback(() => {
      setIndex((prev) => (prev >= words.length - 1 ? 0 : prev + 1));
    }, [words.length]);

    if (words.length > 0) {
      return (
        <View style={[styles.container, containerStyle]}>
          {word.split("").map((letter, i) => (
            <Letter
              index={index}
              key={`${letter}-${i}`}
              delay={i * REVEAL_INTERVAL}
              interval={interval}
              style={style}
              letter={letter}
              onFinish={i === word.length - 1 ? updateIndex : undefined}
            />
          ))}
        </View>
      );
    } else {
      return null;
    }
  }
);

export default FlipWords;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#000",
  },
});
