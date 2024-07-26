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
  PanResponder,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

const BACKGROUND_COLOR = "#252525";
const ACTIVE_BACKGROUND_COLOR = "#353535";
const HOVERED_CHARACTER_CONTAINER_SIZE = 50;

interface Props {
  characters?: string[];
  containerStyle?: ViewStyle;
  onChangeCharacter?: (character: string) => void;
  onReleaseCharacter?: (character: string) => void;
  showHoveredCharacter?: boolean;
  hoveredCharacterPosition?: "left" | "right";
}

const Character = memo(({ character }: { character: string }) => (
  <Text numberOfLines={1} style={styles.text}>
    {character}
  </Text>
));

const HoveredCharacter = memo(({ character }: { character: string }) => (
  <Text numberOfLines={1} style={styles.hoveredCharacter}>
    {character}
  </Text>
));

const CharacterBar: React.FC<Props> = ({
  characters = DefaultCharacters,
  containerStyle,
  onChangeCharacter = () => {},
  onReleaseCharacter = () => {},
  showHoveredCharacter = true,
  hoveredCharacterPosition = "left",
}) => {
  const [char, setChar] = useState<string | null>(null);
  const barHeight = useRef<number>(0);
  const startPosition = useRef<number>(0);
  const translateY = useRef(new Animated.Value(0)).current;

  const handleLayout = useCallback((e: any) => {
    barHeight.current = e.nativeEvent.layout.height;
  }, []);

  const offsetToCharacter = (offset: number): string => {
    translateY.setValue(
      offset < 0
        ? -HOVERED_CHARACTER_CONTAINER_SIZE / 2
        : offset > barHeight.current
        ? barHeight.current - HOVERED_CHARACTER_CONTAINER_SIZE / 2
        : offset - HOVERED_CHARACTER_CONTAINER_SIZE / 2
    );
    const characterIndex = Math.floor(
      (offset / barHeight.current) * characters.length
    );
    return characters[
      characterIndex < 0
        ? 0
        : characterIndex > characters.length - 1
        ? characters.length - 1
        : characterIndex
    ];
  };

  const pan = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderTerminationRequest: () => false,
        onPanResponderStart: (e) => {
          const { locationY } = e.nativeEvent;
          startPosition.current = locationY;
          setChar(offsetToCharacter(locationY));
        },
        onPanResponderMove: (_, gestureState) => {
          const { dy } = gestureState;
          setChar(offsetToCharacter(startPosition.current + dy));
        },
        onPanResponderRelease: (_, gestureState) => {
          const { dy } = gestureState;
          onReleaseCharacter(offsetToCharacter(startPosition.current + dy));
          setChar(null);
          startPosition.current = 0;
        },
      }),
    []
  );

  useEffect(() => {
    if (char !== null) onChangeCharacter(char);
  }, [char]);

  return (
    <View
      style={[
        styles.container,
        containerStyle,
        {
          backgroundColor: char ? ACTIVE_BACKGROUND_COLOR : BACKGROUND_COLOR,
        },
      ]}
    >
      <View
        {...pan.panHandlers}
        pointerEvents="box-only"
        onLayout={handleLayout}
        style={styles.charactersContainer}
      >
        {characters.map((character, index) => (
          <Character key={`${character}-${index}`} character={character} />
        ))}
        {char !== null && showHoveredCharacter ? (
          <Animated.View
            style={[
              styles.hoveredCharacterContainer,
              {
                transform: [
                  { translateY },
                  {
                    translateX:
                      hoveredCharacterPosition === "right"
                        ? HOVERED_CHARACTER_CONTAINER_SIZE
                        : -HOVERED_CHARACTER_CONTAINER_SIZE,
                  },
                ],
              },
            ]}
          >
            <HoveredCharacter character={char} />
          </Animated.View>
        ) : null}
      </View>
    </View>
  );
};

export default CharacterBar;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    borderRadius: 5,
  },
  charactersContainer: {
    alignItems: "center",
    paddingHorizontal: 5,
  },
  text: {
    color: "#FFF",
    fontSize: 13,
  },
  hoveredCharacterContainer: {
    position: "absolute",
    top: 0,
    width: HOVERED_CHARACTER_CONTAINER_SIZE,
    height: HOVERED_CHARACTER_CONTAINER_SIZE,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3B81F6",
  },
  hoveredCharacter: {
    color: "#FFF",
    fontSize: 25,
  },
});

const DefaultCharacters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
