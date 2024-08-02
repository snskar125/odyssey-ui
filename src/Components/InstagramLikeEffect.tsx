import React, {
  ReactNode,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
  GestureResponderEvent,
  TouchableWithoutFeedbackProps,
} from "react-native";

const ICON_SIZE = 100;
const MAX_TAP_INTERVAL = 250;
const MAX_DISPLACEMENT = 50;
const ANIMATION_DURATION = 900;
const { width, height } = Dimensions.get("window");

interface LikeProps {
  id: string;
  x: number;
  y: number;
  px: number;
  onRemove: (id: string) => void;
  icon: ReactNode;
}

const Like: React.FC<LikeProps> = memo(({ id, x, y, px, onRemove, icon }) => {
  const scale = useRef(new Animated.Value(0)).current;
  const translate = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const rotate = scale.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["30deg", "-30deg", "0deg"],
  });

  useEffect(() => {
    const animation = Animated.sequence([
      Animated.timing(scale, {
        toValue: 1,
        duration: ANIMATION_DURATION / 3,
        useNativeDriver: true,
      }),
      Animated.timing(translate, {
        toValue: { x: width / 2 - px, y: -height - ICON_SIZE },
        duration: (ANIMATION_DURATION * 2) / 3,
        useNativeDriver: true,
      }),
    ]);
    animation.start(() => {
      onRemove(id);
    });
    return () => animation.stop();
  }, []);

  return (
    <Animated.View
      style={[
        styles.iconContainer,
        {
          left: x - ICON_SIZE / 2,
          top: y - ICON_SIZE / 2,
          transform: [
            { scale },
            { rotate },
            ...translate.getTranslateTransform(),
          ],
        },
      ]}
    >
      {icon}
    </Animated.View>
  );
});

interface Props extends TouchableWithoutFeedbackProps {
  children?: ReactNode;
  icon?: ReactNode;
  onPressIn?: (event: GestureResponderEvent) => void;
  onDoublePress?: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
}

const InstagramLikeEffect: React.FC<Props> = memo(
  ({
    children,
    icon = DEFAULT_ICON,
    onPressIn = () => {},
    onDoublePress = () => {},
    style,
    ...rest
  }) => {
    const lastTap = useRef<{ time: number; x: number; y: number }>({
      time: 0,
      x: 0,
      y: 0,
    });
    const [likes, setLikes] = useState<
      { id: string; x: number; y: number; px: number }[]
    >([]);

    const handlePress = useCallback((event: GestureResponderEvent) => {
      onPressIn(event);
      const currentTime = Date.now();
      const { pageX, pageY, locationX, locationY } = event.nativeEvent;
      if (currentTime - lastTap.current.time < MAX_TAP_INTERVAL) {
        const distance = Math.sqrt(
          Math.pow(pageX - lastTap.current.x, 2) +
            Math.pow(pageY - lastTap.current.y, 2)
        );
        if (distance < MAX_DISPLACEMENT) {
          onDoublePress(event);
          setLikes((prev) => [
            ...prev,
            {
              id: Math.random().toString(),
              x: locationX,
              y: locationY,
              px: pageX,
            },
          ]);
          return (lastTap.current = { time: 0, x: 0, y: 0 });
        }
      }
      lastTap.current = { time: currentTime, x: pageX, y: pageY };
    }, []);

    const onRemove = useCallback((id: string) => {
      setLikes((prev) => prev.filter((l) => l.id !== id));
    }, []);

    return (
      <TouchableWithoutFeedback {...rest} onPressIn={handlePress}>
        <View style={style} pointerEvents="box-only">
          {children}
          {likes.map((like) => (
            <Like
              key={like.id}
              id={like.id}
              x={like.x}
              y={like.y}
              px={like.px}
              icon={icon}
              onRemove={onRemove}
            />
          ))}
        </View>
      </TouchableWithoutFeedback>
    );
  }
);

export default InstagramLikeEffect;

const styles = StyleSheet.create({
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
  iconContainer: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    position: "absolute",
  },
});

const HEART_ICON =
  "data:image/png;base64,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AQAAAAAMAAAAAGAAAAAAAAMAAAAAGAAAAADAAAAAAAAGAAAAADAAAAAAgAEAAAAADAAAAABgAAAAADAAAAAAgAEAAAAADAAAAABgAAAAAAADAAAAABgAAAAAwAAAAAAABgAAAAAwAAAAAIABAAAAAAwAAAAAYAAAAAAAAwAAAAAYAAAAAMAAAAAAAAYAAAAAMAAAAAAYAAAAAMAAAAAAAAYAAAAAMAAAAACAAQAAAAAMAAAAAGAAAAAAAAMAAAAAGAAAAADAAAAAAAAGAAAAADAAAAAAgAEAAAAADAAAAABgAAAAAAADAAAAABgAAAAADAAAAABgAAAAAAADAAAAABgAAAAAwAAAAAAABgAAAAAwAAAAAIABAAAAAAwAAAAAYAAAAAAAAwAAAAAYAAAAAMAAAAAAAAYAAAAAMAAAAACAAQAAAAAMAAAAAGAAAAAAMAAAAACAAQAAAAAMAAAAAGAAAAAAAAMAAAAAGAAAAADAAAAAAAAGAAAAADAAAAAAgAEAAAAADAAAAABgAAAAAAADAAAAABgAAAAAwAAAAAAABgAAAAAwAAAAAMvJ/y/AAJa6VWdjQtBvAAAAAElFTkSuQmCC";

const DEFAULT_ICON = <Image style={styles.icon} source={{ uri: HEART_ICON }} />;
