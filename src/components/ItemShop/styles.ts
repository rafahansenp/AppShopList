import styled from "styled-components/native";
import globalStyles from "../../styles/globalStyles";

interface ViewParams {
  marked: "SIM" | "NAO";
}

export const ItemWrapper = styled.View<ViewParams>`
  background-color: ${(props) =>
    props.marked === "SIM" ? globalStyles.Colors.itemListMarked : "#FFF"};
  border-color: ${(props) =>
    props.marked === "SIM"
    ? globalStyles.Colors.itemBorderMarked
    : globalStyles.Colors.itemBorderUnmarked};
  border: 1.2px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 3px;
  padding: 15px 15px 15px 10px;
`;

export const ItemShop = styled.TouchableOpacity`
  flex-direction: row;
  width: 80%;
`;

export const ItemDelete = styled.Pressable``;

export const ItemEdit = styled.Pressable``;

export const ItemText = styled.Text<ViewParams>`
  color: ${(props) =>
    props.marked === "SIM"
    ? globalStyles.Colors.check
    : globalStyles.Colors.description};
  font-family: Roboto-Regular;
  font-size: ${globalStyles.FontSize.list};
  text-decoration: ${(props) => (props.marked === "SIM" ? "line-through" : "")};
  margin-left: 10px;
`;
