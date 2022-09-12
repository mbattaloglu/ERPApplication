import { StyleSheet, Image, Text, View, Dimensions, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { Api, Icons, User } from '../components/Constants';

import { VictoryBar, VictoryTheme, VictoryChart, VictoryAxis, VictoryLabel } from 'victory-native';

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

  const veri = [
    {
      type: 'Borç',
      amount: 1291028
    },
    {
      type: 'Alacak',
      amount: -1017028
    },
    {
      type: 'Bakiye',
      amount: 274000

    }
  ]

  function EditAmount(amount) { // TODO: Query Amount. WARNING
    var newAmount = '';
    if (toString(amount).length > 6) {
      newAmount = `$${amount / 1000000}m`
    }
    else if (toString(amount).length > 3) {
      newAmount = `$${amount / 1000}k`
    }
    return newAmount
  }

  return (
    <View >
      {data && img ? (
        <ScrollView style={styles.imageBox} showsVerticalScrollIndicator={false}>
          <Image
            source={{ uri: `data:image/gif;base64,${img}` }}
            style={styles.image}></Image>

          <View style={styles.box}>
            <Image style={styles.icon} source={Icons.user} />
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{data.Code} {data.Name}</Text>
              <Text style={[styles.title, { textAlign: 'right' }]}>{data.Title}</Text>
            </View>
          </View>

          <View style={styles.box}>
            <Image style={styles.icon} source={Icons.phone} />
            <Text style={styles.title}>{data.PhoneNumber}</Text>
          </View>
          <View style={{marginHorizontal: 20, borderWidth: 2, borderRadius: 20, borderColor: 'darkgray'}}>
            <VictoryChart theme={VictoryTheme.material} domainPadding={50}>
              <VictoryAxis tickValues={[1, 2, 3]} tickFormat={['Borç', 'Alacak', 'Bakiye']} />
              <VictoryAxis dependentAxis tickFormat={(x) => (EditAmount(x))} />
              <VictoryBar
                data={veri}
                x='type'
                y='amount'
                style={{
                  data: {
                    fill: ({ index, data }) => index === 0 ? 'red' : index === 1 ? 'green' : Math.abs(data[0].amount) > Math.abs(data[1].amount) ? 'red' : 'green',
                    opacity: .2
                  }
                }}
              />
            </VictoryChart>
          </View>

        </ScrollView>
      ) : (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, }}>
          <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Yükleniyor...</Text>
        </View>
      )}
    </View>
  );
};

export default MainMenu;

const styles = StyleSheet.create({
  imageBox: {
    marginTop: 10,
  },
  image: {
    height: 100,
    width: '100%',
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,

  },
  box: {
    height: 50,
    borderTopWidth: .5,
    borderBottomWidth: .5,
    borderColor: 'darkgray',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  icon: {
    width: 25,
    height: 25,
    marginHorizontal: 10,
  },
  title: {
    flex: 1,
    fontSize: 17,
    color: '#343a40',
    paddingHorizontal: 15,
  },
  extraBox: {
    width: '50%',
    alignSelf: 'flex-end',
    borderTopWidth: .5,
    borderLeftWidth: .5,
    borderColor: 'darkgray',
    height: 25,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  extraTitle: {
    fontSize: 14,
    color: 'black',
    flex: 1,
    textAlignVertical: 'center'
  }
});