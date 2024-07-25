import React, { PureComponent } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  ViewStyle,
  TextStyle,
} from "react-native";

const ANIMATION_DURATION = 100;

interface CellProps {
  onPress: (index: number) => void;
  index: number;
  isFocused: boolean;
  focusedBoxStyle?: ViewStyle;
  boxStyle?: ViewStyle;
  textStyle?: TextStyle;
  character: string;
  animated: boolean;
}

class Cell extends PureComponent<CellProps> {
  scale = new Animated.Value(1);

  componentDidUpdate() {
    const { animated, character } = this.props;
    if (animated && character) {
      const scales = [0.9, 1];
      Animated.sequence(
        scales.map((s) =>
          Animated.timing(this.scale, {
            toValue: s,
            duration: ANIMATION_DURATION,
            useNativeDriver: true,
          })
        )
      ).start();
    }
  }

  render() {
    const {
      onPress,
      index,
      isFocused,
      focusedBoxStyle,
      boxStyle,
      textStyle,
      character,
    } = this.props;

    return (
      <TouchableWithoutFeedback onPress={() => onPress(index)}>
        <Animated.View
          style={[
            isFocused ? styles.focusedInputBox : styles.inputBox,
            isFocused ? focusedBoxStyle : boxStyle,
            { transform: [{ scale: this.scale }] },
          ]}
        >
          <Text style={[styles.text, textStyle]}>{character}</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

interface Props {
  numberOfDigits?: number;
  value?: string;
  onChangeText?: (text: string) => void;
  onPressInput?: (index: number) => void;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  boxStyle?: ViewStyle;
  focusedBoxStyle?: ViewStyle;
  hidden?: boolean;
  hiddenCharacter?: string;
  animated?: boolean;
}

interface State {
  focused: boolean;
}

export default class PINInput extends PureComponent<Props, State> {
  static defaultProps: Props = {
    numberOfDigits: 4,
    value: "",
    onChangeText: () => {},
    onPressInput: () => {},
    containerStyle: {},
    textStyle: {},
    boxStyle: {},
    focusedBoxStyle: {},
    hidden: false,
    hiddenCharacter: "•",
    animated: true,
  };

  input: TextInput | null = null;
  translateX = new Animated.Value(0);

  constructor(props: Props) {
    super(props);
    this.state = {
      focused: false,
    };
  }

  handleTextChange = (text: string) => {
    const { numberOfDigits, onChangeText } = this.props;
    if (text.length <= numberOfDigits!) onChangeText!(text);
  };

  handleBlur = () => {
    this.setState({ focused: false });
  };

  handleFocus = () => {
    this.setState({ focused: true });
  };

  handlePress = (index: number) => {
    this.props.onPressInput!(index);
    this.input?.focus();
  };

  focus = () => {
    this.input?.focus();
  };

  blur = () => {
    this.input?.blur();
  };

  shake = () => {
    const translates = [-10, 10, -10, 10, 0];
    Animated.sequence(
      translates.map((t) =>
        Animated.timing(this.translateX, {
          toValue: t,
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
        })
      )
    ).start();
  };

  render() {
    const {
      value,
      containerStyle,
      numberOfDigits,
      boxStyle,
      focusedBoxStyle,
      textStyle,
      hidden,
      hiddenCharacter,
      animated,
    } = this.props;

    return (
      <Animated.View
        style={[
          styles.container,
          containerStyle,
          { transform: [{ translateX: this.translateX }] },
        ]}
      >
        <TextInput
          keyboardType="number-pad"
          value={value}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChangeText={this.handleTextChange}
          ref={(r) => {
            this.input = r;
          }}
          style={styles.hidden}
        />
        {[...Array(numberOfDigits!).keys()].map((_, index) => (
          <Cell
            key={index}
            animated={animated}
            onPress={this.handlePress}
            isFocused={
              this.state.focused &&
              (value!.length === index ||
                (value!.length === numberOfDigits! &&
                  index === numberOfDigits! - 1))
            }
            boxStyle={boxStyle}
            focusedBoxStyle={focusedBoxStyle}
            textStyle={textStyle}
            character={
              value!.charAt(index)
                ? hidden!
                  ? hiddenCharacter!
                  : value!.charAt(index)
                : ""
            }
            index={index}
          />
        ))}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  inputBox: {
    width: 50,
    height: 50,
    borderWidth: 3,
    borderRadius: 10,
    borderColor: "#505050",
    alignItems: "center",
    justifyContent: "center",
  },
  focusedInputBox: {
    width: 50,
    height: 50,
    borderWidth: 3,
    borderRadius: 10,
    borderColor: "#3B81F6",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 25,
    textAlign: "center",
    color: "#FFF",
  },
  hidden: {
    opacity: 0,
    position: "absolute",
  },
});
