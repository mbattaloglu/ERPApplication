import {StyleSheet, Image, Text, View} from 'react-native';
import React from 'react';
import {User} from './constants/Constants';

const MainMenu = ({navigation}) => {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [img, setImg] = React.useState();

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        'http://193.53.103.178:5312/api/odata/CustomerSuppliers',
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
        'http://193.53.103.178:5312/api/odata/Companies/GetCompanyImage()',
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
        <View style={styles.imageBox}>
          <Image
            source={{uri: `data:image/gif;base64,${img}`}}
            style={styles.image}></Image>
          <Text style={styles.text}>{data.Oid}</Text>
          <Text style={styles.text}>{data.Code}</Text>
          <Text style={styles.text}>{data.Name}</Text>
          <Text style={styles.text}>{data.PhoneNumber}</Text>
          <Text style={[{textAlign: 'left'}, styles.text]}>{data.Title}</Text>
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
    width: '75%',
    height: 155,
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
});
