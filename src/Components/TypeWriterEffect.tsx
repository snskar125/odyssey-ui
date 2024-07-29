import { memo, useEffect, useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TextStyle,
} from "react-native";

const CURSOR_ANIMATION_DURATION = 500;

const wait = (duration: number): Promise<void> =>
  new Promise((res) => {
    setTimeout(res, duration);
  });

interface WordProps {
  word: string;
  style?: TextStyle;
  isLast: boolean;
}

const Word = memo(({ word, style, isLast }: WordProps) => {
  return (
    <Text style={[styles.text, style]}>{`${word}${isLast ? "" : " "}`}</Text>
  );
});

interface CursorProps {
  cursorStyle?: ViewStyle;
}

const Cursor = memo(({ cursorStyle }: CursorProps) => {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const opacities = [0, 1];
    const animation = Animated.loop(
      Animated.sequence(
        opacities.map((o) =>
          Animated.timing(opacity, {
            toValue: o,
            duration: CURSOR_ANIMATION_DURATION,
            useNativeDriver: true,
          })
        )
      )
    );
    animation.start();
    return () => animation.stop();
  }, []);

  return <Animated.View style={[styles.cursor, cursorStyle, { opacity }]} />;
});

interface Props {
  children?: string;
  interval?: number;
  style?: TextStyle;
  containerStyle?: ViewStyle;
  cursorStyle?: ViewStyle;
}

const TypeWriterEffect = memo(
  ({
    children = "",
    interval = 25,
    style,
    containerStyle,
    cursorStyle,
  }: Props) => {
    const [sentence, setSentence] = useState<string>("");

    useEffect(() => {
      if (sentence === "") {
        const letters = children.split("");
        letters.reduce(async (prevPromise, letter) => {
          await prevPromise;
          setSentence((prev) => prev.concat(letter));
          return wait(interval);
        }, Promise.resolve());
      }
    }, []);

    const words = sentence.split(" ");

    return (
      <View style={[styles.container, containerStyle]}>
        {words.map((word, index) => (
          <Word
            key={index}
            word={word}
            style={style}
            isLast={index === words.length - 1}
          />
        ))}
        <Cursor cursorStyle={cursorStyle} />
      </View>
    );
  }
);

export default TypeWriterEffect;

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
  cursor: {
    width: 3,
    height: 18,
    backgroundColor: "#3B81F6",
    marginLeft: 3,
  },
});
