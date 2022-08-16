import { StyleSheet, Image, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { Api, User } from '../components/Constants';

const MainMenu = ({ navigation }) => {
  const [data, setData] = React.useState([]);
  const [img, setImg] = React.useState();

  useEffect(() => { //Performans: 2 kez çekiyor.
    User.id = data.Oid;
    User.defaultCurrencyType = data?.DefaultCurrencyType?.Name;
  }, [data])

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        Api.link + '/odata/CustomerSuppliers?$expand=DefaultCurrencyType($select=Name)',
        {
          headers: {
            Authorization: 'Bearer ' + User.token,
            'Content-Type': 'application/json',
          },
        },
      );
      const json = await data.json();
      setData(...json.value);
    };

    const fetchImage = async () => {
      const data = await fetch(
        Api.link + '/odata/Companies/GetCompanyImage()',
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
  }, []);

  return (
    <View>
      {data ? (
        <View style={styles.imageBox}>
          <Image
            source={{ uri: `data:image/gif;base64,${img}` }}
            style={styles.image}></Image>
          <Text style={styles.text}>{data.Oid}</Text>
          <Text style={styles.text}>{data.Code}</Text>
          <Text style={styles.text}>{data.Name}</Text>
          <Text style={styles.text}>{data.PhoneNumber}</Text>
          <Text style={[{ textAlign: 'left' }, styles.text]}>{data.Title}</Text>
          <Text style={styles.text}>{data.CustomerSupplierType}</Text>
        </View>
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
    alignItems: 'center',
    marginTop: 10,
  },
  image: {
    height: 200,
    width: 300,
    resizeMode: 'contain'
  },
  text: {
    fontSize: 20,
    color: 'black',
    marginBottom: 5
  },
});