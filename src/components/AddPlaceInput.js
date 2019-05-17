import React from "react";
import ReusableInput from "./UI/ReusableInput";

const AddPlaceInput = props => {
  return (
    <ReusableInput
      placeholder="Location Name"
      value={props.locationName}
      onChangeText={props.changeHandler}
    />
  );
};

export default AddPlaceInput;
