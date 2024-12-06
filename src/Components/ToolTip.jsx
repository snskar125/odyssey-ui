import { Fragment, memo, useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const ANIMATION_DURATION = 250;
const ANIMATION_BOUNCINESS = 15;
const SPACING = 15;

const { width: screenWidth } = Dimensions.get('screen')

const ToolTip = memo(({ children, content }) => {
  const [visible, setVisible] = useState(null);
  const [containerLayout, setContainerLayout] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });
  const [tipPosition, setTipPosition] = useState({
    x: 0,
    y: 0,
  });
  const container = useRef();
  const animation = useRef(new Animated.Value(0)).current;

  const open = () => {
    container.current?.measure((_, __, width, height, x, y) => {
      setContainerLayout({ width, height, x, y });
      setVisible(true);
    });
  };

  const close = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
    });
  };

  const handleLayout = (e) => {
    const { width, height } = e.nativeEvent.layout;
    const cx = containerLayout.x + (containerLayout.width - width) / 2;
    const x = cx < SPACING ? SPACING : cx > screenWidth - width - SPACING ? screenWidth - width - SPACING : cx
    const y =
      containerLayout.y >= height + SPACING
        ? containerLayout.y - height - SPACING
        : containerLayout.y + containerLayout.height + SPACING;
    setTipPosition({ x, y });
    Animated.spring(animation, {
      toValue: 1,
      bounciness: ANIMATION_BOUNCINESS,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Fragment>
      <TouchableWithoutFeedback onPress={open}>
        <View ref={container}>{children}</View>
      </TouchableWithoutFeedback>
      <Modal visible={visible} transparent>
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={close}>
            <View style={StyleSheet.absoluteFillObject} />
          </TouchableWithoutFeedback>
          <Animated.View
            onLayout={handleLayout}
            style={[
              styles.tipContainer,
              {
                opacity: animation,
                transform: [{ scale: animation }],
                left: tipPosition.x,
                top: tipPosition.y,
              },
            ]}
          >
            {content}
          </Animated.View>
        </View>
      </Modal>
    </Fragment>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tipContainer: {
    position: "absolute",
  },
});

export default ToolTip;
