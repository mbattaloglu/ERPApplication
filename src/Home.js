import {StyleSheet, Image, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {User} from './constants/Constants';
import ShadowButton from './components/ShadowButton';

const MainMenu = ({navigation}) => {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [img, setImg] = React.useState();

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(User.API + '/api/odata/CustomerSuppliers', {
        headers: {
          Authorization: 'Bearer ' + User.token,
          'Content-Type': 'application/json',
        },
      });
      const json = await data.json();
      setData(...json.value);
    };

    const fetchImage = async () => {
      const data = await fetch(
        User.API + '/api/odata/Companies/GetCompanyImage()',
        {
          headers: {
            Authorization: 'Bearer ' + User.token,
            'Content-Type': 'application/json',
          },
        },
      );
      const json = await data.json();
      const image = json.value;
      setImg(image);
    };

    fetchData().catch(err => console.log(err));
    fetchImage().catch(err => console.log(err));
    setLoading(false);
  }, []);

  return (
    <View>
      {data ? (
        <>
          <View style={styles.imageBox}>
            <Image
              source={{uri: `data:image/gif;base64,${img}`}}
              style={styles.image}></Image>
            <Text
              style={[
                styles.text,
                {
                  textTransform: 'capitalize',
                  textAlign: 'center',
                  marginTop: 20,
                },
              ]}>
              Hoşgeldiniz, {data.Name}
            </Text>
          </View>
          <Text
            style={{
              marginTop: 30,
              marginBottom: 10,
              textAlign: 'center',
              color: 'black',
            }}>
            HIZLI İŞLEMLER
          </Text>
          <View style={styles.buttonGroup}>
            <ShadowButton title={'TALİMAT EKLE'} />
          </View>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default MainMenu;

const styles = StyleSheet.create({
  imageBox: {
    justifyContent: 'center',
    marginTop: 10,
  },
  image: {
    width: '75%',
    height: 155,
    alignSelf: 'center',
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
  buttonGroup: {
    alignItems: 'center',
  },
});

/*
<Text style={[styles.text, {textAlign:'right'}]}>{data.Oid}</Text>
            <Text style={[styles.text, {textAlign:'right'}]}>{data.PhoneNumber}</Text>
            <Text style={styles.text}>{data.Code}</Text>
            <Text style={styles.text}>{data.CustomerSupplierType}</Text>
             */
