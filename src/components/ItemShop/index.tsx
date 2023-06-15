import React from "react";
import * as S from "./styles";
import IconE from "@expo/vector-icons/MaterialIcons";
import IconF from "@expo/vector-icons/Foundation";
import IconM from "@expo/vector-icons/MaterialCommunityIcons";
import globalStyles from "../../styles/globalStyles";

interface ItemParams {
  id: string;
  productName: string;
  marked: "SIM" | "NAO";
  onPressMarked: () => void;
  onPressDelete: () => void;
  onPressEdit: () => void;
}

export default function ItemShop(props: ItemParams) {
  return (
    <S.ItemWrapper marked={props.marked}>
      <S.ItemShop onPress={props.onPressMarked}>
        {props.marked === "SIM" ? (
          <IconM
            name="checkbox-outline"
            size={22}
            color={globalStyles.Colors.check}
          />
        ) : (
          <IconM
            name="checkbox-blank-outline"
            size={22}
            color={globalStyles.Colors.description}
          />
        )}
        <S.ItemText marked={props.marked} numberOfLines={1}>
          {props.productName}
        </S.ItemText>
      </S.ItemShop>
      <S.ItemEdit onPress={props.onPressEdit}>
        <IconE name="edit" size={22} color={globalStyles.Colors.editButton} />
      </S.ItemEdit>
      <S.ItemDelete onPress={props.onPressDelete}>
        <IconF
          name="x-circle"
          size={20}
          color={globalStyles.Colors.deleteButton}
        />
      </S.ItemDelete>
    </S.ItemWrapper>
  );
}
