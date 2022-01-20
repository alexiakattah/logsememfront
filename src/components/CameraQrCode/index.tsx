import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Button, Alert } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { useNavigation } from '@react-navigation/native'
import { useReserve } from '../../hooks/useReserve'

export function CameraQrCode({ route }: any) {
  const navigation = useNavigation()
  const { reserveDetails } = route.params
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)
  const { confirmColeta } = useReserve()
  useEffect(() => {
    ;(async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true)
    if (reserveDetails === data) {
      await confirmColeta(data)
    } else {
      Alert.alert('A reserva não confere com a que você quer confirmar')
    }
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {
        scanned && navigation.navigate('ReserveDetails')
        // <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
})
