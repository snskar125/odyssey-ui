import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  TouchableHighlight,
  View,
  GestureResponderEvent,
  Text,
  ViewStyle,
} from "react-native";

const ANIMATION_DURATION = 250;
const ANIMATION_BOUNCINESS = 10;
const BUTTON_SPACING = 15;

interface ChildButtonProps {
  TouchableComponent: React.ComponentType<any>;
  TouchableComponentProps: object;
  color: string;
  borderColor: string;
  borderWidth: number;
  borderRadius: number;
  icon: React.ReactNode;
  onPress: (e: GestureResponderEvent) => void;
  size: number;
  onClose: () => void;
}

const ChildButton: React.FC<ChildButtonProps> = memo(
  ({
    TouchableComponent = TouchableHighlight,
    TouchableComponentProps = { underlayColor: "#316BCC" },
    color = "#3B81F6",
    borderColor = "#3B81F6",
    borderWidth = 0,
    borderRadius = 10,
    icon = (
      <Text style={{ color: "#FFF", fontSize: 12, fontWeight: "500" }}>
        Icon
      </Text>
    ),
    onPress = () => {},
    size,
    onClose,
  }) => {
    const handlePress = useCallback((e) => {
      onClose();
      onPress(e);
    }, []);

    return (
      <TouchableComponent
        {...TouchableComponentProps}
        onPress={handlePress}
        style={[
          styles.childButton,
          {
            width: size,
            height: size,
            backgroundColor: color,
            borderColor,
            borderWidth,
            borderRadius,
          },
        ]}
      >
        {icon}
      </TouchableComponent>
    );
  }
);

interface Props {
  TouchableComponent?: React.ComponentType<any>;
  TouchableComponentProps?: object;
  color?: string;
  size?: number;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  icon?: React.ReactNode;
  rotateIcon?: boolean;
  bounce?: boolean;
  onPress?: (e: GestureResponderEvent) => void;
  buttons?: {
    TouchableComponent: React.ComponentType<any>;
    TouchableComponentProps: object;
    color: string;
    borderColor: string;
    borderWidth: number;
    borderRadius: number;
    icon: React.ReactNode;
    onPress: (e: GestureResponderEvent) => void;
  }[];
  containerStyle?: ViewStyle;
}

const ActionButton: React.FC<Props> = ({
  TouchableComponent = TouchableHighlight,
  TouchableComponentProps = { underlayColor: "#202020" },
  color = "#252525",
  size = 60,
  borderColor = "#252525",
  borderWidth = 0,
  borderRadius = 10,
  icon = (
    <Image
      style={{ width: 15, height: 15, tintColor: "#FFF" }}
      source={{ uri: PlusIcon }}
    />
  ),
  rotateIcon = true,
  bounce = true,
  onPress = () => {},
  buttons = [{}, {}],
  containerStyle,
}) => {
  const [extended, setExtended] = useState<boolean>(false);
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (bounce) {
      Animated.spring(animation, {
        toValue: extended ? 1 : 0,
        bounciness: ANIMATION_BOUNCINESS,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: extended ? 1 : 0,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }).start();
    }
  }, [extended]);

  const rotate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"],
  });

  const handlePress = useCallback((e) => {
    setExtended((prev) => !prev);
    onPress(e);
  }, []);

  const onClose = useCallback(() => {
    setExtended(false);
  }, []);

  return (
    <View style={containerStyle}>
      <View>
        {buttons.map((button, index) => (
          <Animated.View
            key={index}
            style={[
              styles.childButtonWrapper,
              {
                transform: [
                  { scale: animation },
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -(size + BUTTON_SPACING) * (index + 1)],
                    }),
                  },
                ],
              },
            ]}
          >
            <ChildButton {...button} size={size} onClose={onClose} />
          </Animated.View>
        ))}
        <TouchableComponent
          {...TouchableComponentProps}
          style={[
            styles.button,
            {
              width: size,
              height: size,
              backgroundColor: color,
              borderColor,
              borderWidth,
              borderRadius,
            },
          ]}
          onPress={handlePress}
        >
          <Animated.View
            style={{ transform: [{ rotate: rotateIcon ? rotate : "0deg" }] }}
          >
            {icon}
          </Animated.View>
        </TouchableComponent>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
  childButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  childButtonWrapper: {
    position: "absolute",
  },
});

export default ActionButton;

const PlusIcon =
  "data:image/png;base64,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";
