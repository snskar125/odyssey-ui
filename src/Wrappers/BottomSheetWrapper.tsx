import { Fragment, useRef } from "react";
import BottomSheet from "../Components/BottomSheet";
import { Button } from "react-native";

export default function BottomSheetWrapper() {
  const sheet: { current: BottomSheet } = useRef();
  return (
    <Fragment>
      <BottomSheet ref={sheet}></BottomSheet>
      <Button
        onPress={() => {
          sheet.current?.open();
        }}
        title="BOTTOMSHEET"
      />
    </Fragment>
  );
}
