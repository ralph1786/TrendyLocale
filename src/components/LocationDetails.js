import React from "react";
import {
  Modal,
  View,
  Image,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { deselectLocation } from "../../store/actions/actions";
import Icon from "react-native-vector-icons/Ionicons";

const LocationDetails = props => {
  let modalContent = null;

  if (props.selectedLocation) {
    modalContent = (
      <View>
        <Image
          source={props.selectedLocation.image}
          style={styles.modalImageStyling}
        />
        <Text style={styles.modalLocationName}>
          {props.selectedLocation.name}
        </Text>
      </View>
    );
  }
  return (
    <Modal visible={props.selectedLocation !== null} animationType="slide">
      <View style={styles.modalContainerStyling}>
        {modalContent}
        <View>
          <TouchableOpacity onPress={props.deleteLocation}>
            <View style={styles.deleteIcon}>
              <Icon size={25} name="ios-trash" color="red" />
            </View>
          </TouchableOpacity>
          <Button title="Close" onPress={props.deselectLocation} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainerStyling: {
    margin: 30
  },
  modalImageStyling: {
    width: "100%",
    height: 175
  },
  modalLocationName: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 24,
    margin: 10
  },
  deleteIcon: {
    alignItems: "center"
  }
});

const mapStateToProps = state => {
  return {
    selectedLocation: state.locations.selectedLocation
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deselectLocation: () => dispatch(deselectLocation())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationDetails);
