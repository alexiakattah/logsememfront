import React, { useState, Dispatch, useEffect, useRef } from 'react'

import { useTheme } from 'styled-components/native'
import { Platform, Image, TouchableHighlight, TextInput } from 'react-native'
import { Picker } from '@react-native-picker/picker'
// import {
//   // Dropdowns
//   DropdownList,

//   // TypeScript Types
//   PickerItem,
// } from 'react-native-ultimate-modal-picker'
import { FontAwesome5 } from '@expo/vector-icons'
import { RadioButton } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import upload from '../../../assets/images/upload.png'
import moment from 'moment'
import selectfoto from '../../../assets/images/selectfoto.png'
import endereco from '../../../assets/images/endereco.png'
import card from '../../../assets/images/card.png'
import * as ImagePicker from 'expo-image-picker'
import {
  Container,
  ImageUpload,
  Text,
  TextSmall,
  Margin,
  ViewSelect,
  ImageSelect,
  ViewContainer,
  Column,
  TextLeft,
  ViewContainerAddress,
  ContainerAddress,
  ImageEndereco,
  TextSmallAddress,
  TextTotal,
  Div,
} from './styles'
import { Button } from '../../../components/Forms/Button'
import _ from 'underscore'
import * as firebase from 'firebase'
import { useAuth } from '../../../hooks/useAuth'
import { useRegister } from '../../../hooks/useRegister'
import { usePayment } from '../../../hooks/usePayment'
import { Input } from '../../../components/Forms/Input'

export function ConfirmReserv({ route }: any) {
  const { date, animal, itemId } = route.params
  const referencia = useRef<ModalSelector>()
  const [image, setImage] = useState<ImageData | null>(null)
  const [urlImage, setUrlImage] = useState('')
  const [validationCode, setValidationCode] = useState('')
  const [value, setValue] = useState('')
  const [listValue, setListValue] = useState<string>('')
  const [checked, setChecked] = useState('')
  const { user }: any = useAuth()
  const [selectedLanguage, setSelectedLanguage] = useState({})

  const {
    dataResponseCreditCards,
    getCreditCards,
    getVeterinarian,
    getAnimals,
    dataResponseVeterinarian,
    dataResponseAnimals,
  } = useRegister()
  const { confirmReserv, confirmedReserve, statusRegister } = usePayment()

  useEffect(() => {
    async function loadPermission() {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!')
        }
      }
    }
    async function loadAnimals() {
      getAnimals()
      getCreditCards()
      getVeterinarian(animal.userId)
    }

    loadAnimals()
    loadPermission()
    console.log('selectedLanguage', selectedLanguage)
  }, [])

  async function handleConfirmReserv() {
    await confirmReserv(
      checked,
      moment(date).format('DD/MM/YYYY HH:mm:ss'),
      animal,
      dataResponseCreditCards![0],
      value,
      urlImage,
      selectedLanguage,
      validationCode
    )
    // if (confirmedReserve) {
    //   navigation.navigate('ReserveConfirmed')
    // }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.cancelled) {
      uploadImage(result.uri, 'test-image')
        .then((success) => {
          setImage(result.uri)
          setUrlImage(success)
        })
        .catch((e) => {
          alert('erro ao fazer upload')
          console.log(e)
        })
    }
  }

  const uploadImage = async (uri: any, imageName: any) => {
    const response = await fetch(uri)
    const blob = await response.blob()

    var ref = await firebase
      .storage()
      .ref(`Documents/${user!.uid}`)
      .child(imageName)
      .put(blob)
      .then(async () => {
        const image = await firebase
          .storage()
          .ref(`Documents/${user!.uid}`)
          .child(imageName)
          .getDownloadURL()
          .then((url) => url)
        return image
      })

    // var ref = firebase
    //   .storage()
    //   .ref(`Documents/${user.uid}`)
    //   .child(imageName)
    //   .getDownloadURL()
    //   .then((url: any) => url)

    // var ref = firebase
    // .storage()
    // .ref(`Animals/${user.uid}`)
    // .child("images"+imageName)
    // .getDownloadURL()
    // .then((url: any) => setImage(url));
    // return ref.put(blob)
    return ref
  }

  const theme = useTheme()
  const navigation = useNavigation()

  return (
    <Container>
      <Margin></Margin>
      <TextSmall>
        Antes de realizar a reserva, precisamos de algumas informações...
      </TextSmall>
      <Margin></Margin>
      {/* <ImageUpload source={upload} />
      <TextSmall>
        Você precisa anexar o documento da venda da cobertura.
      </TextSmall>
      <Button
        title='Usar Câmera'
        onPress={() => navigation.navigate('CameraOpen')}
      />
      <TextSmall>ou</TextSmall>
      <Margin></Margin>
      <ViewSelect onPress={pickImage}>
        <ImageSelect source={selectfoto} />
        <TextSmall>Selecionar documento da Galeria</TextSmall>
      </ViewSelect>
      <Margin></Margin> */}

      <TextLeft>Em qual dia e horário?</TextLeft>
      <Column>
        <ViewContainer>
          <FontAwesome5 name='calendar-alt' size={24} color='black' />
          <TextSmall>{moment(date).format('DD/MM/YYYY HH:mm:ss')} </TextSmall>
        </ViewContainer>
        <ViewContainer>
          <TextSmall>Pela manhã</TextSmall>
        </ViewContainer>
      </Column>
      <Margin></Margin>

      <TextLeft>Coleta</TextLeft>
      <Column>
        <RadioButton
          value='botuflex'
          status={checked === 'botuflex' ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked('botuflex')
            setValue(
              dataResponseVeterinarian &&
                dataResponseVeterinarian.valueBotuflex,
            )
          }}
        />
        <TextSmall>Com botuflex</TextSmall>

        <RadioButton
          value='nobotuflex'
          status={checked === 'nobotuflex' ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked('nobotuflex')
            setValue(
              dataResponseVeterinarian &&
                dataResponseVeterinarian.valueNoBotuflex,
            )
          }}
        />
        <TextSmall>Sem botuflex</TextSmall>
      </Column>
      <Margin></Margin>
      <TextLeft>Agendar reserva para qual Animal?</TextLeft>

      <Picker
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
        
      >
        <Picker.Item label='Selecione...' value='' />
        {_.map(dataResponseAnimals, (animal, index) => {
          return <Picker.Item key={index} label={animal.name} value={animal} />
        })}
      </Picker>
      <Margin></Margin>
      <TextLeft>Código de Validação</TextLeft>
      <Input onChangeText={(e)=>setValidationCode(e)}/>
      <Margin></Margin>
      <TextLeft>Entregar em</TextLeft>
      <ViewContainerAddress>
        <ImageEndereco source={endereco} />
        <ContainerAddress>
          <TextLeft>{user.nameEstabelecimento}</TextLeft>
          {/* <TextSmallAddress>
            {user.street} {user.number}, {user.neighborhood} - {user.city}/
            {user.state}
          </TextSmallAddress> */}
        </ContainerAddress>
      </ViewContainerAddress>
      <Margin></Margin>
      <TextLeft>Meio de Pagamento</TextLeft>
      <ViewContainerAddress>
        <ImageEndereco source={card} />
        {/* <FontAwesome5 name='calendar-alt' size={24} color='black' /> */}
        <ContainerAddress>
          <TextLeft>
            {dataResponseCreditCards &&
            dataResponseCreditCards[0].typeCart === 'credit'
              ? 'Crédito'
              : dataResponseCreditCards &&
                dataResponseCreditCards[0].typeCart === 'debit'
              ? 'Débito'
              : ''}{' '}
            {dataResponseCreditCards && dataResponseCreditCards[0].apelido
              ? `- ${dataResponseCreditCards[0].apelido}`
              : ''}
          </TextLeft>
          <TextSmallAddress>
            {dataResponseCreditCards && dataResponseCreditCards[0].number}
          </TextSmallAddress>
        </ContainerAddress>
      </ViewContainerAddress>

      <Margin></Margin>
      <Div>
        <TextTotal>Total</TextTotal>
        <TextTotal>
          {checked === 'botuflex'
            ? dataResponseVeterinarian &&
              `R$ ${dataResponseVeterinarian.valueBotuflex},00`
            : dataResponseVeterinarian &&
              `R$ ${dataResponseVeterinarian.valueNoBotuflex},00`}
        </TextTotal>
      </Div>
      <Button onPress={() => handleConfirmReserv()} title={statusRegister} />
      <Margin></Margin>
    </Container>
  )
}
