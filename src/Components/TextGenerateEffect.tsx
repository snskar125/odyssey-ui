import { memo, useEffect, useRef } from "react";
import { Animated, StyleSheet, View, TextStyle, ViewStyle } from "react-native";

const REVEAL_DURATION = 750;

interface WordProps {
  word: string;
  delay: number;
  style?: TextStyle;
  opacity: number;
  isLast: boolean;
}

const Word = memo(({ word, delay, style, opacity: o, isLast }: WordProps) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.timing(opacity, {
      toValue: o,
      delay,
      duration: REVEAL_DURATION,
      useNativeDriver: true,
    });
    animation.start();
    return animation.stop;
  }, []);

  return (
    <Animated.Text style={[styles.text, style, { opacity }]}>
      {`${word}${isLast ? "" : " "}`}
    </Animated.Text>
  );
});

interface Props {
  children?: string;
  interval?: number;
  opacity?: number;
  containerStyle?: ViewStyle;
  style?: TextStyle;
}

const TextGenerateEffect = memo(
  ({
    children = "",
    interval = 150,
    opacity = 1,
    style,
    containerStyle,
  }: Props) => {
    const words = children.split(" ");

    return (
      <View style={[styles.container, containerStyle]}>
        {words.map((word, index) => (
          <Word
            key={`${word}-${index}`}
            style={style}
            opacity={opacity}
            delay={index * interval}
            word={word}
            isLast={index === words.length - 1}
          />
        ))}
      </View>
    );
  }
);

export default TextGenerateEffect;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#252525",
  },
});
