import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Text, View, StyleSheet, Button, Modal, TouchableHighlight, Image, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { WebView } from 'react-native-webview';


const QRScanner = ({navigation}) => {

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [uri, setUri] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
         })();
        }, []);

        useLayoutEffect(() => {
          navigation.setOptions({
              title: "Scanner",
              headerTintColor: "white",
              headerLeft: () => (<View style={{ marginLeft: 20, flexDirection: "row", alignItems: 'center' }}> 
                  <TouchableOpacity activeOpacity = {0.5} onPress = {() => navigation.goBack()}>
                      <Text style = {{color: "white", fontWeight: "800"}}>  Back </Text>
                  </TouchableOpacity>
                  </View>)
          })
      }, [navigation]);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        //lert(`Bar code with type ${type} and data ${data} has been scanned!`);
        console.log(type, data);
        setUri({ uri: data });
        setModalVisible(true);

    }
        
    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    
    return (
        <View
        style={{
          flex: 1,
          flexDirection: 'column'
        }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            setScanned(false);
          }}>
          <View style={{ flex: 1 }}>
            <WebView
              style={{ flex: 1 }}
              source={{uri: uri['uri']}}
            />
    
            <TouchableHighlight
              style={{
                backgroundColor:'black',
                padding: 15,
                alignItems: 'center'
              }}
              onPress={() => {
                setModalVisible(!modalVisible);
                setScanned(false);
              }}
              underlayColor='slategray'
            >
              <Text style={{ color:'white', fontSize: 15 }}>Re Scan</Text>
            </TouchableHighlight>
          </View>
        </Modal>
    
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{ marginBottom: 100 }}>
            <View style={{ alignItems: 'center', marginBottom: 5 }}>
              <Image
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: 'contain',
                  marginBottom: 20,
                }}
                source={{ uri: 'http://domain.biz/img/logo_dark.png' }}
              />
              <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', paddingBottom: 10}}>
                QR Code Reader v0.5
              </Text>
            </View>
            <View
              style={{
                borderColor: 'white',
                borderTopWidth: 5,
                borderBottomWidth: 5,
                borderLeftWidth: 1,
                borderRightWidth: 1,
                paddingVertical: 80,
                paddingHorizontal: 100,
              }}
            />
    
            <View style={{ alignItems: 'center', marginTop: 5 }}>
              <Text style={{ color: 'white', fontSize: 15}}>
                QR Scan...
              </Text>
            </View>
          </View>
        </BarCodeScanner>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
  });
export default QRScanner
