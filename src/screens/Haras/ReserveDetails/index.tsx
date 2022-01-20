import React, { useEffect, useState, useCallback } from 'react'
import { useReserve } from '../../../hooks/useReserve'
import { RadioButton } from 'react-native-paper'
import {
  Alert,
  Modal,
  StyleSheet,
  TouchableHighlight,
  View,
  Image,
} from 'react-native'
import {
  Container,
  NameHaras,
  DivHaras,
  PhotoHaras,
  Document,
  Div,
  Title,
  CancelReserv,
  ReserveDate,
  Text,
  TextTotal,
  Coleta,
  Space,
  ContainerApp,
  Colet,
  Flex,
  Linha,
  SchedulesDetails,
} from './styles'
import { RefreshControl } from 'react-native'
import { ButtonQrCode } from '../../../components/ButtonQrCode'
import { ButtonConfirm } from '../../../components/ButtonConfirm'
import { useNavigation } from '@react-navigation/native'
import { CameraQrCode } from '../../../components/CameraQrCode'
import { Button } from '../../../components/Forms/Button'
import moment from 'moment'

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}

export function ReserveDetails({ route }: any) {
  const navigation = useNavigation()
  const { reserveDetails } = route.params
  const [modalVisible, setModalVisible] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const endDate = moment(reserveDetails.dateEpoch).valueOf()
  const now = moment().valueOf()

  const {
    getUserWhoRequestedReserve,
    confirmReserve,
    dataUserRequestReserve,
    cancelReserve,
  } = useReserve()
  useEffect(() => {
    async function loadReserveDetails() {
      await getUserWhoRequestedReserve(reserveDetails)
    }

    loadReserveDetails()
  }, [])
  const onRefresh = useCallback(() => {
    setRefreshing(true)

    async function loadReserveDetails() {
      await getUserWhoRequestedReserve(reserveDetails)
    }
    console.log(endDate, now)
    loadReserveDetails()

    wait(2000).then(() => setRefreshing(false))
  }, [])

  async function canceledReserveConfirm() {
    await cancelReserve(reserveDetails)
  }
  async function confirmReserveConfirm() {
    await confirmReserve(reserveDetails)
  }

  return (
    <Container>
      <SchedulesDetails
        horizontal={false}
        snapToAlignment={'center'}
        // contentInset={{
        //   top: 0,
        //   left: 30,
        //   bottom: 0,
        //   right: 30,
        // }}
        decelerationRate={0}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Title>Detalhes da Reservas</Title>
        <DivHaras>
          <PhotoHaras
            source={{
              uri: reserveDetails.egua.urlImage,
            }}
          ></PhotoHaras>
          <NameHaras>
            {dataUserRequestReserve.nameEstabelecimento} -{' '}
            {reserveDetails.egua.name}
          </NameHaras>
        </DivHaras>
        <ReserveDate>Realizado em {reserveDetails.date} </ReserveDate>
        <DivHaras>
          <Text>Coleta </Text>
          {/* <Coleta /> */}
          <RadioButton status={'checked'} />
          <Text>
            {reserveDetails.botuflex === 'botuflex'
              ? 'Com Botuflex'
              : 'Sem Botuflex'}
          </Text>
          <Space />
        </DivHaras>
        <ContainerApp>
          <Text>Documento da Cobertura</Text>
          <Colet
            onPress={() => {
              setModalVisible(true)
            }}
          >
            Clique para visualizar
          </Colet>

          <Space />

          <Div>
            <Flex>
              <TextTotal>Total</TextTotal>
              <TextTotal>R${reserveDetails.value},00</TextTotal>
            </Flex>
          </Div>

          <Linha />

          <Div>
            <Flex>
              <Text>Pago pelo app</Text>
              <Text>R${reserveDetails.value},00</Text>
            </Flex>
          </Div>

          <Space />
          <TextTotal>Endereço de entrega</TextTotal>
          <Text>
            {dataUserRequestReserve.street} {dataUserRequestReserve.number}
          </Text>
          <Text>
            {dataUserRequestReserve.city}, {dataUserRequestReserve.state}{' '}
          </Text>
          {now >= endDate && (
            <Div>
              <Text>O prazo para responder a reserva já passou.</Text>
            </Div>
          )}
          {reserveDetails.delivered === false && now <= endDate && (
            <>
              <Button
                title='Confirmar Reserva'
                onPress={() => confirmReserveConfirm()}
              />
              <CancelReserv onPress={() => canceledReserveConfirm()}>
                Cancelar Reserva
              </CancelReserv>
            </>
          )}
          {reserveDetails.delivered === 'canceled' && (
            <>
              <Space />
              {/* <Button title='Confirmar Reserva' /> */}
              <CancelReserv>Reserva cancelada</CancelReserv>
            </>
          )}
          {reserveDetails.delivered === true && (
            <ButtonQrCode
              title='Escanear QR Code'
              subTitle='para confirmar a coleta'
              onPress={() =>
                navigation.navigate('CameraQrCode', {
                  reserveDetails: reserveDetails.uid,
                })
              }
            />
          )}
          {reserveDetails.delivered === 'coleted' && (
            <>
              <Space />
              {/* <Button title='Confirmar Reserva' /> */}
              <Text>Coleta realizada com sucesso!</Text>
            </>
          )}

          <Modal
            animationType='fade'
            transparent={true}
            visible={modalVisible}
            // onRequestClose={() => {
            //   Alert.alert('Modal has been closed.')
            // }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Documento de cobertura</Text>
                <Document source={{ uri: reserveDetails.document }}></Document>
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                  onPress={() => {
                    setModalVisible(!modalVisible)
                  }}
                >
                  <Text style={styles.textStyle}>Fechar</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
        </ContainerApp>
      </SchedulesDetails>
    </Container>
  )
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})
