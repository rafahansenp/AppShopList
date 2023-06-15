import React, { useState, useEffect } from "react";
import { ToastAndroid, Platform, Alert, BackHandler } from "react-native";

import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ItemShop from "../components/ItemShop";
import IconM from "@expo/vector-icons/MaterialIcons";

import * as S from "./styles";

export default function Main() {
  const [item, setItem] = useState("");
  const [dataList, setDataList] = useState([]);
  const [itemUpdate, setItemUpdate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [itemCounterTotal, setItemCounterTotal] = useState(0);
  const [itemCounterMarked, setItemCounterMarked] = useState(0);

  useEffect(() => {
    async function importData() {
      try {
        const response = await AsyncStorage.getItem("itemShopStorage");
        const responseJ: [] = response ? JSON.parse(response) : [];

        const itemListMarked = responseJ.filter(
          (itemProps: any) => itemProps.marked === "SIM"
        ).length;

        const itemListTotal = responseJ.length;

        setItemCounterMarked(itemListMarked);
        setItemCounterTotal(itemListTotal);
        setDataList(responseJ);
      } catch (error) {
        console.log(error);
        if (Platform.OS === "android") {
          ToastAndroid.showWithGravity(
            "Error: Algo deu errado",
            ToastAndroid.SHORT,
            ToastAndroid.TOP
          );
        } else {
          Alert.alert("Erro", "Erro ao inserir o item");
        }
      }
    }
    importData();
  }, []);

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Confirme", "Deseja realmente sair do aplicativo?", [
        { text: "SIM", onPress: () => BackHandler.exitApp() },
        {
          text: "NÃO",
          onPress: () => null,
          style: "cancel",
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  async function addItem(props: string) {
    try {
      if (props.trim() === "") {
        Alert.alert("Aviso!", "Por favor informe o nome do item");
        return;
      }

      const id = uuid.v1();

      const response = await AsyncStorage.getItem("itemShopStorage");
      const responseJ: [] = response ? JSON.parse(response) : [];

      const newDataList = {
        id,
        productName: props,
        marked: "NAO",
      };
      const newData = [...responseJ, newDataList];
      await AsyncStorage.setItem("itemShopStorage", JSON.stringify(newData));
      const itemListTotal = newData.length;

      setDataList(newData);
      setItemCounterTotal(itemListTotal);
      setItem("");
    } catch (error) {
      console.log(error);
      if (Platform.OS === "android") {
        ToastAndroid.showWithGravity(
          "Error: Algo deu errado",
          ToastAndroid.SHORT,
          ToastAndroid.TOP
        );
      } else {
        Alert.alert("Erro", "Erro ao inserir o item");
      }
    }
  }

  async function markItem(props: string) {
    try {
      const response = await AsyncStorage.getItem("itemShopStorage");
      const responseJ: [] = response ? JSON.parse(response) : [];

      const newData = responseJ.map((itemProps: any) => {
        if (itemProps.productName === props) {
          return {
            ...itemProps,
            marked: itemProps.marked === "SIM" ? "NAO" : "SIM",
          };
        }
        return itemProps;
      });

      await AsyncStorage.setItem("itemShopStorage", JSON.stringify(newData));
      const itemListMarked = newData.filter(
        (itemProps) => itemProps.marked === "SIM"
      ).length;

      setItemCounterMarked(itemListMarked);
      setDataList(newData);
    } catch (error) {
      console.log(error);

      if (Platform.OS === "android") {
        ToastAndroid.showWithGravity(
          "Error: Algo deu errado",
          ToastAndroid.SHORT,
          ToastAndroid.TOP
        );
      } else {
        Alert.alert("Erro", "Erro ao inserir o item");
      }
    }
  }

  async function deleteItem(props: string) {
    try {
      Alert.alert("Confirme", "Deseja excluir o item?", [
        {
          text: "Sim",
          onPress: async () => {
            const response = await AsyncStorage.getItem("itemShopStorage");
            const responseJ: [] = response ? JSON.parse(response) : [];
            const newData = responseJ.filter(
              (itemProps: any) => itemProps.productName !== props
            );
            await AsyncStorage.setItem(
              "itemShopStorage",
              JSON.stringify(newData)
            );

            const itemListMarked = newData.filter(
              (itemProps: any) => itemProps.marked === "SIM"
            ).length;

            const itemListTotal = newData.length;

            setItemCounterMarked(itemListMarked);
            setItemCounterTotal(itemListTotal);
            setDataList(newData);
          },
          style: "default",
        },
        {
          text: "Não",
          onPress: () => null,
          style: "cancel",
        },
      ]);
    } catch (error) {
      console.log(error);

      if (Platform.OS === "android") {
        ToastAndroid.showWithGravity(
          "Error: Algo deu errado",
          ToastAndroid.SHORT,
          ToastAndroid.TOP
        );
      } else {
        Alert.alert("Erro", "Erro ao inserir o item");
      }
    }
  }

  async function editItem(prosp: string) {
    try {
      const response = await AsyncStorage.getItem("itemShopStorage");
      const responseJ: [] = response ? JSON.parse(response) : [];

      const newData = responseJ.map((itemProps: any) => {
        if (itemProps.productName === itemUpdate) {
          return {
            ...itemProps,
            productName: prosp,
          };
        }
        return itemProps;
      });

      await AsyncStorage.setItem("itemShopStorage", JSON.stringify(newData));
      setShowModal(false);
      setDataList(newData);
    } catch (error) {
      console.log(error);

      if (Platform.OS === "android") {
        ToastAndroid.showWithGravity(
          "Error: Algo deu errado",
          ToastAndroid.SHORT,
          ToastAndroid.TOP
        );
      } else {
        Alert.alert("Erro", "Erro ao inserir o item");
      }
    }
  }

  function prepareEdit(props: string) {
    setItemUpdate(props);
    setShowModal(true);
  }

  function ModalEdit() {
    let newProductName: string = "";
    return (
      <S.ModalWrapper>
        <S.Modal visible={showModal} animationType="slide" transparent>
          <S.ModalContent>
            <S.ModalText>Alterar descrição</S.ModalText>
            <S.ModalInput
              placeholder="Editar item da lista"
              onChangeText={(text) => (newProductName = text)}
            />
            <S.ModalButtonWrapper>
              <S.ModalButton onPress={() => editItem(newProductName)}>
                <IconM name="check" size={30} color={"black"} />
              </S.ModalButton>

              <S.ModalButton onPress={() => setShowModal(false)}>
                <IconM name="close" size={30} color={"black"} />
              </S.ModalButton>
            </S.ModalButtonWrapper>
          </S.ModalContent>
        </S.Modal>
      </S.ModalWrapper>
    );
  }

  return (
    <S.ViewWrapper>
      <S.ViewHeader>
        <S.Title>Lista de Compras</S.Title>
        <S.ItensCounter>
          {itemCounterMarked}/{itemCounterTotal}
        </S.ItensCounter>
      </S.ViewHeader>
      <S.ItensList
        data={dataList}
        ListEmptyComponent={
          <S.ClearedListWrapper>
            <S.ClearedListText>Nenhum item na lista</S.ClearedListText>
          </S.ClearedListWrapper>
        }
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }: any) => (
          <ItemShop
            id={item.id}
            productName={item.productName}
            marked={item.marked}
            onPressMarked={() => markItem(item.productName)}
            onPressDelete={() => deleteItem(item.productName)}
            onPressEdit={() => prepareEdit(item.productName)}
          />
        )}
      />
      <S.ViewInputArea>
        <S.Input
          placeholder="Novo item da lista"
          value={item}
          onChangeText={(text) => setItem(text)}
        />
        <S.AddButton onPress={() => addItem(item)}>
          <S.AddButtonText>+</S.AddButtonText>
        </S.AddButton>
      </S.ViewInputArea>
      {showModal && <ModalEdit />}
    </S.ViewWrapper>
  );
}
