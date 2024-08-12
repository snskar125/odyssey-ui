import React, { PureComponent, ReactNode } from "react";
import {
  Animated,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TextStyle,
} from "react-native";

const ANIMATION_BOUNCINESS = 15;
const ANIMATION_DURATION = 250;
const TOAST_HEIGHT = 45;
const TOAST_GAP = 15;
const TOAST_OFFSET = 50;

interface ToastProps {
  id: string;
  icon?: ReactNode;
  message?: string;
  style?: ViewStyle;
  messageStyle?: TextStyle;
  position?: "top" | "bottom";
  offset?: number;
  duration?: number;
  onRemove?: (id: string) => void;
}

class Toast extends PureComponent<ToastProps> {
  private animation = new Animated.Value(0);
  private translateY = new Animated.Value(this.props.offset);

  componentDidMount() {
    const { id, duration, onRemove } = this.props;
    Animated.spring(this.animation, {
      toValue: 1,
      bounciness: ANIMATION_BOUNCINESS,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(this.animation, {
        toValue: 0,
        duration: ANIMATION_DURATION,
        delay: duration,
        useNativeDriver: true,
      }).start(() => {
        onRemove(id);
      });
    });
  }

  componentDidUpdate(prevProps: ToastProps) {
    const { offset } = this.props;
    if (offset !== prevProps.offset) {
      Animated.timing(this.translateY, {
        toValue: offset,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }).start();
    }
  }

  render() {
    const {
      icon = null,
      message = "Toast",
      style = {},
      messageStyle = {},
      position,
    } = this.props;
    return (
      <Animated.View
        style={[
          styles.toast,
          style,
          styles.mandatoryToast,
          {
            opacity: this.animation,
            transform: [
              { scale: this.animation },
              { translateY: this.translateY },
            ],
          },
          position === "top" ? { top: TOAST_OFFSET } : { bottom: TOAST_OFFSET },
        ]}
      >
        {icon}
        <Text numberOfLines={1} style={[styles.message, messageStyle]}>
          {message}
        </Text>
      </Animated.View>
    );
  }
}

interface State {
  toasts: {
    id?: string;
    icon?: ReactNode;
    message?: string;
    backgroundColor?: string;
    style?: ViewStyle;
    messageStyle?: TextStyle;
  }[];
}

interface Props {
  children?: ReactNode;
  containerStyle?: ViewStyle;
  duration?: number;
  position?: "top" | "bottom";
}

export default class ToastProvider extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      toasts: [],
    };
    this.toast = this.toast.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }

  toast = ({
    icon,
    message,
    style,
    messageStyle,
  }: {
    icon?: ReactNode;
    message?: string;
    style?: ViewStyle;
    messageStyle?: TextStyle;
  }) => {
    this.setState((prev) => ({
      toasts: [
        ...prev.toasts,
        { id: Math.random().toString(), icon, message, style, messageStyle },
      ],
    }));
  };

  private onRemove = (id: string) => {
    this.setState((prev) => ({
      toasts: prev.toasts.filter((t) => t.id !== id),
    }));
  };

  render() {
    const {
      children,
      containerStyle = {},
      duration = 1500,
      position = "top",
    } = this.props;
    return (
      <SafeAreaView style={[styles.container, containerStyle]}>
        {children}
        <View
          style={[
            styles.toastContainer,
            position === "top" ? { top: 0 } : { bottom: 0 },
          ]}
        >
          {this.state.toasts.map((toast, index) => (
            <Toast
              position={position}
              key={toast.id}
              id={toast.id}
              duration={duration}
              icon={toast.icon}
              message={toast.message}
              style={toast.style}
              messageStyle={toast.messageStyle}
              offset={
                position === "top"
                  ? index * (TOAST_HEIGHT + TOAST_GAP)
                  : -(index * (TOAST_HEIGHT + TOAST_GAP))
              }
              onRemove={this.onRemove}
            />
          ))}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  toastContainer: {
    width: "75%",
    position: "absolute",
    alignSelf: "center",
    alignItems: "center",
  },
  toast: {
    paddingHorizontal: 15,
    borderRadius: 5,
    width: "100%",
    backgroundColor: "#3B81F6",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  mandatoryToast: {
    position: "absolute",
    left: 0,
    right: 0,
    height: TOAST_HEIGHT,
  },
  message: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
});
