import styled from "styled-components/native";
import globalStyles from "../styles/globalStyles";

export const ViewWrapper = styled.SafeAreaView`
  flex: 1;
`;
export const ViewHeader = styled.View`
  background-color: ${globalStyles.Colors.background};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 14%;
  padding: 23px 20px 0px 20px;
`;

export const Title = styled.Text`
  color: ${globalStyles.Colors.defaultText};
  font-size: ${globalStyles.FontSize.title};
  font-family: Roboto-Regular;
`;

export const ItensCounter = styled.Text`
  color: ${globalStyles.Colors.defaultText};
  font-size: ${globalStyles.FontSize.title};
  font-family: Roboto-Regular;
`;

export const ItensList = styled.FlatList``;

export const ViewInputArea = styled.View`
  background-color: ${globalStyles.Colors.background};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 55px;
  padding: 0px 7px 0px 7px;
`;

export const Input = styled.TextInput`
  color: ${globalStyles.Colors.description};
  background-color: ${globalStyles.Colors.defaultText};
  font-size: ${globalStyles.FontSize.general};
  font-family: Roboto-Regular;
  border: 1px solid ${globalStyles.Colors.itemBorderUnmarked};
  border-radius: 4px;
  width: 88%;
  height: 60%;
  padding-left: 5px;
`;

export const AddButton = styled.TouchableOpacity`
  background-color: ${globalStyles.Colors.defaultText};
  border: 1px solid ${globalStyles.Colors.itemBorderUnmarked};
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  height: 60%;
  width: 11%;
`;

export const AddButtonText = styled.Text`
  color: ${globalStyles.Colors.description};
  font-size: ${globalStyles.FontSize.general};
  font-family: Roboto-Regular;
`;

export const ClearedListWrapper = styled.View`
  align-items: center;
`;

export const ClearedListText = styled.Text`
  color: ${globalStyles.Colors.description};
  font-size: ${globalStyles.FontSize.list};
  font-family: Roboto-Regular;
  margin-top: 25px;
`;

export const ModalWrapper = styled.View``;

export const ModalContent = styled.View`
  background-color: ${globalStyles.Colors.defaultText};
  border: 1px solid ${globalStyles.Colors.itemBorderUnmarked};
  border-radius: 15px;
  justify-content: center;
  justify-content: space-evenly;
  align-items: center;
  height: 170px;
  margin: 150px 40px 200px 40px;
`;

export const Modal = styled.Modal``;

export const ModalText = styled.Text`
  color: ${globalStyles.Colors.description};
  font-size: ${globalStyles.FontSize.list};
  font-family: Roboto-Regular;
`;

export const ModalButtonWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 70%;
`;

export const ModalInput = styled.TextInput`
  color: ${globalStyles.Colors.description};
  border: 1px solid ${globalStyles.Colors.itemBorderUnmarked};
  border-radius: 4px;
  width: 70%;
  padding-left: 5px;
`;

export const ModalButton = styled.Pressable`
  background-color: ${globalStyles.Colors.background};
  border: 1px solid;
  border-radius: 4px;
`;
