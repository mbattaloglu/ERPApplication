import { StyleSheet, Image, Text, View, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import { Api, Icons, User, StylesAll, ThemeColors } from '../components/Constants';

import { VictoryBar, VictoryTheme, VictoryChart, VictoryAxis } from 'victory-native';

const WIDTH = Dimensions.get('window').width

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
        Api.link + '/odata/Companies/1/GetImage()',
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
      console.log("Bitti");
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
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      {data && img ? (
        <ScrollView style={styles.imageBox} showsVerticalScrollIndicator={false}>
          <View style={[StylesAll.profileCard, { height: 160 }]}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={styles.title}>{data.Code}</Text>
              <Text style={styles.title}>{data.Name}</Text>
              <Text style={[styles.title, { textAlign: 'right' }]}>{data.Title}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Image
                source={{ uri: `data:image/gif;base64,${img}` }}
                style={styles.image}></Image>
              <View style={{ flex: 1.5, alignItems: 'center', justifyContent: 'flex-end' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image style={styles.icon} source={Icons.phone} />
                  <Text style={[styles.title, { color: '#38A4C6', fontWeight: 'normal' }]}>{data.PhoneNumber}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={[StylesAll.profileCard, { overflow: 'hidden', alignItems: 'center', justifyContent: 'center' }]}>
            <VictoryChart theme={VictoryTheme.material} domainPadding={50} width={WIDTH / 1.2} height={300}>
              <VictoryAxis tickValues={[1, 2, 3]} tickFormat={['Borç', 'Alacak', 'Bakiye']} />
              <VictoryAxis dependentAxis tickFormat={(x) => (EditAmount(x))} />
              <VictoryBar
                data={veri}
                barWidth={40}
                x='type'
                y='amount'
                style={{
                  data: {
                    fill: ({ index, data }) => index === 0 ? 'red' : index === 1 ? 'green' : Math.abs(data[0].amount) > Math.abs(data[1].amount) ? 'red' : 'green',
                    opacity: .3,
                  }
                }}
              />
            </VictoryChart>
          </View>

        </ScrollView>
      ) : (
        <ActivityIndicator
          style={{ flex: 1 }}
          color={ThemeColors.Home.HeaderBar}
          size={'large'}
        />
      )}
    </View>
  );
};

export default MainMenu;

const styles = StyleSheet.create({
  chartCard: {
    marginVertical: '2%',
    marginHorizontal: '5%',
    alignSelf: 'center',
    borderRadius: 15,
    elevation: 10,
    backgroundColor: 'white'
  },
  imageBox: {
    paddingVertical: 20,
  },
  image: {
    height: '100%',
    flex: 1,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
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
    width: 17,
    height: 17,
    marginRight: 10,
    tintColor: '#38A4C6'
  },
  title: {
    fontSize: 17,
    color: '#303030',
    fontWeight: '500'
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