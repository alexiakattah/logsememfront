import React, { useState, useEffect } from 'react'
import { Platform, Image } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import {
  HStack,
  VStack,
  IconButton,
  Icon,
  Select,
  Box,
  Center,
} from 'native-base'

import {
  Container,
  Text,
  Header,
  DivMenu,
  Title,
  Form,
  Label,
  ButtonRegister,
  Div,
  DivImage,
} from './styles'
import { useForm } from 'react-hook-form'
import * as ImagePicker from 'expo-image-picker'
import * as Yup from 'yup'
import * as firebase from 'firebase'
import { InputForm } from '../../../components/Forms/InputForm'
import { Button } from '../../../components/Forms/Button'
import { ButtonUpload } from '../../../components/ButtonUpload'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from '../../../hooks/useAuth'
import { useRegister } from '../../../hooks/useRegister'
import moment from 'moment'
import { Picker } from '@react-native-picker/picker'
import _ from 'underscore'
import { Input } from '../../../components/Forms/Input'

// interface FormData {
//   name: string
//   register: string
// }
// interface ImageData {
//   canceled: boolean
//   height: number
//   type: string
//   uri: string
//   width: number
//   prevState: null
// }
const schema = Yup.object().shape({
  name: Yup.string().required('O Nome do animal é obrigatório'),

  register: Yup.string().required('O register do responsável é obrigatório'),
})
export function CreateAnimal() {
  const [image, setImage] = useState()
  const [urlImage, setUrlImage] = useState('')
  const [coberturas, setCoberturas] = useState('')
  const [questions, setQuestions] = useState([])
  const [formData, setFormData] = useState({
    amountOfQuestions: 1,
    questions: [],
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const { registerAnimals, statusRegister } = useRegister()
  const auxArray = {}

  for (let i = 0; i < formData.amountOfQuestions; i++) {
    auxArray[i] = i
  }

  const { user } = useAuth()

  async function handleFormRegister(form) {
    formData.questions = questions
    const data = {
      name: form.name,
      register: form.register,
      urlImage,
      formData,
    }
    console.log('formmm', formData)

    const result = await registerAnimals(
      form.name,
      form.register,
      urlImage,
      formData,
    ).then((res) => {
      Alert.alert(`Sucesso`, `${res.message}`, [
        { text: 'OK', onPress: () => navigation.goBack() },
      ])
    })
    console.log('data-->', data, result)
  }

  useEffect(() => {
    ;(async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!')
        }
      }
    })()
  }, [])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.cancelled) {
      await uploadImage(result.uri, `picture-${moment()}`)
        .then((success) => {
          console.log('succsss', success)
          setImage(result.uri)
          setUrlImage(success)
        })
        .catch((e) => {
          alert('erro ao fazer upload')
          console.log(e)
        })
    }
  }

  const uploadImage = async (uri, imageName) => {
    const response = await fetch(uri)
    const blob = await response.blob()

    var ref = await firebase
      .storage()
      .ref(`Animals/${user.uid}`)
      .child(imageName)
      .put(blob)
      .then(async () => {
        const image = await firebase
          .storage()
          .ref(`Animals/${user.uid}`)
          .child(imageName)
          .getDownloadURL()
          .then((url) => url)
        return image
      })

    return ref
  }

  formData.amountOfQuestions = formData.amountOfQuestions
    ? Number(formData.amountOfQuestions)
    : 1

  function renderQuestion(item, index, validationCode) {
    questions[index] = questions[index] ? questions[index] : {}
    console.log('questions', validationCode)

    return (
      <Container>
        <Title>Cobertura {parseInt(index) + parseInt(1)}</Title>
        <Input
          value={questions[index].cpf}
          placeholder='CPF do tutor'
          onChangeText={(e) =>
            setQuestions((prevState) => ({
              ...prevState,
              [index]: {
                ...prevState[index],
                cpf: e,
              },
            }))
          }
        />
        <Input
          value={questions[index].name}
          placeholder='Nome do tutor'
          onChangeText={(e) =>
            setQuestions((prevState) => ({
              ...prevState,
              [index]: {
                ...prevState[index],
                name: e,
              },
            }))
          }
        />
        <Input
          value={questions[index].fazenda}
          placeholder='Fazenda'
          onChangeText={(e) =>
            setQuestions((prevState) => ({
              ...prevState,
              [index]: {
                ...prevState[index],
                fazenda: e,
                // validationCode
              },
            }))
          }
        />
        {/* <Input
          placeholder='Código de validação'
          value={validationCode}
          editable={false}
        /> */}

        <Input
          value={validationCode}
          placeholder='Código de validação'
          editable={false}
          // onChangeText={(e) =>
          //   setQuestions((prevState) => ({
          //       ...prevState,
          //       [index]: {
          //         ...prevState[index],
          //         validationCode: e,
          //       },

          //   }))
          // }
        />
      </Container>
    )
  }

  return (
    <Container>
      {/* <Header>
        <Text>Veterinários</Text>
      </Header> */}
      <Title>Cadastro Animal</Title>

      <DivMenu horizontal={false}>
        <Div>
          <DivImage>
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 100, height: 100 }}
              />
            )}
          </DivImage>
          <ButtonUpload title='Foto' onPress={pickImage} />
        </Div>
        <InputForm
          placeholder='Nome'
          control={control}
          name='name'
          error={errors.name && errors.name.message}
        />

        <InputForm
          placeholder='Registro'
          control={control}
          name='register'
          error={errors.register && errors.register.message}
        />
        {console.log(formData)}
        <Center>
          <Box w='full' maxW='500' px={8}>
            <Select
              selectedValue={formData.amountOfQuestions}
              onValueChange={(itemValue) =>
                setFormData({ amountOfQuestions: itemValue })
              }
              accessibilityLabel='Choose Service'
              placeholder='Choose Service'
              mt={1}
            >
              <Select.Item label={`1`} value={1} />
              <Select.Item label={`2`} value={2} />
              <Select.Item label={`3`} value={3} />
              <Select.Item label={`4`} value={4} />
              <Select.Item label={`5`} value={5} />
              <Select.Item label={`6`} value={6} />
              <Select.Item label={`7`} value={7} />
              <Select.Item label={`8`} value={8} />
              <Select.Item label={`9`} value={9} />
              <Select.Item label={`10`} value={10} />
            </Select>
          </Box>
        </Center>
        <Container>
          {_.map(auxArray, (item, index) => {
            let validationCode = Math.random()
              .toString(16)
              .slice(2, 12)
              .toUpperCase()
            return renderQuestion(item, index, validationCode)
          })}
        </Container>
        <Form>
          <Button
            title={statusRegister}
            onPress={handleSubmit(handleFormRegister)}
          />
        </Form>
      </DivMenu>
    </Container>
  )
}
