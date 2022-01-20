import React, { useState, useEffect } from 'react'
import { Platform, Image } from 'react-native'
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

interface FormData {
  name: string
  register: string
}
interface ImageData {
  canceled: boolean
  height: number
  type: string
  uri: string
  width: number
  prevState: null
}
const schema = Yup.object().shape({
  name: Yup.string().required('O Nome do animal é obrigatório'),

  register: Yup.string().required('O register do responsável é obrigatório'),
})
export function CreateAnimal() {
  const [image, setImage] = useState<ImageData | null>(null)
  const [urlImage, setUrlImage] = useState('')

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const { registerAnimals, statusRegister } = useRegister()

  const { user } = useAuth()

  async function handleFormRegister(form: FormData) {
    const data = {
      name: form.name,
      register: form.register,
      urlImage,
    }
    const result = await registerAnimals(form.name, form.register, urlImage)
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

  const uploadImage = async (uri: any, imageName: any) => {
    const response = await fetch(uri)
    const blob = await response.blob()

    var ref = await firebase
      .storage()
      .ref(`Animals/${user!.uid}`)
      .child(imageName)
      .put(blob)
      .then(async () => {
        const image = await firebase
          .storage()
          .ref(`Animals/${user!.uid}`)
          .child(imageName)
          .getDownloadURL()
          .then((url) => url)
        return image
      })

    //   const image = await firebase
    //   .storage()
    //   .ref(`Animals/${user!.uid}`)
    //   .child(imageName)
    //   .getDownloadURL()
    //   .then((url) => url)
    // console.log('image', image)
    // return image

    // var ref = firebase
    // .storage()
    // .ref(`Animals/${user.uid}`)
    // .child("images"+imageName)
    // .getDownloadURL()
    // .then((url: any) => setImage(url));
    // return ref.put(blob)
    return ref
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
