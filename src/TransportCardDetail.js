import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {ThemeColors, User} from './constants/Constants';
import CustomButton from './components/CustomButton';

const TransportCardDetail = ({navigation, route}) => {
  const oid = route.params.oid;
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [transport, setTransport] = React.useState(true);
  useEffect(() => {
    async function getData() {
      const response = await fetch(
        User.API +
          `/api/odata/TransportCards/${oid}?$select=DocumentDate,ShipmentDate,SenderName,TotalPackingQuantity,TotalWeight&$expand=SenderBranch($select=BranchName),ReceiverBranch($select=BranchName),TransportWaybill($select=declarationNumber),TransportCardDetails($expand=TransportProduct($select=Name),TransportUnitMultiplier($select=Name);$select=PackingQuantity,Quantity,Weight,Volume),TransportCardIncomes($expand=CurrencyType($select=Name);$select=IncomePaymentType,Amount),TransportShipperPlate($select=Plate)`,
        {
          headers: {
            Authorization: 'Bearer ' + User.token,
            'Content-Type': 'application/json',
          },
        },
      )
        .then(response => response.json())
        .then(response => setData(response))
        .then(() => setLoading(false));
    }
    getData();
  }, []);

  const setShownData = () => {
    setTransport(!transport);
  };

  return (
    <View>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <ScrollView>
          <View style={styles.line}>
            <Text style={styles.titleText}>Kabul Tarihi</Text>
            <Text style={styles.text}>
              {data.DocumentDate.slice(8, 10) +
                '.' +
                data.DocumentDate.slice(5, 7) +
                '.' +
                data.DocumentDate.slice(0, 4)}
            </Text>
          </View>
          <View style={styles.line}>
            <Text style={styles.titleText}>Sevk Tarihi</Text>
            <Text style={styles.text}>
              {data.ShipmentDate.slice(8, 10) +
                '.' +
                data.ShipmentDate.slice(5, 7) +
                '.' +
                data.ShipmentDate.slice(0, 4)}
            </Text>
          </View>
          <View style={styles.line}>
            <Text style={styles.titleText}>Gönderen Şube</Text>
            <Text style={styles.text}>{data.ReceiverBranch.BranchName}</Text>
          </View>
          <View style={styles.line}>
            <Text style={styles.titleText}>Araç No</Text>
            <Text style={styles.text}>
              {data.TransportWaybill.declarationNumber}
            </Text>
          </View>
          <View style={styles.line}>
            <Text style={styles.titleText}>Firma Bilgisi</Text>
            <Text style={styles.text}>{data.SenderName}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <CustomButton
              title={'Hizmetler'}
              boxStyle={!transport ? styles.active : styles.deactive}
              onClickHandler={transport ? setShownData : () => {}}
            />
            <CustomButton
              title={'Sevk Kalemleri'}
              boxStyle={transport ? styles.active : styles.deactive}
              onClickHandler={!transport ? setShownData : () => {}}
            />
          </View>
          {!transport ? (
            <View>
              <FlatList
                data={data.TransportCardIncomes}
                renderItem={({item}) => (
                  <View style={styles.box}>
                  <View style={styles.line}>
                    <Text style={styles.titleText}>Tahsilat Tipi</Text>
                    <Text style={styles.text}>{item.IncomePaymentType === "counterpayment" ? "Karşı Ödeme" : item.IncomePaymentType === "Sender" ? "Firmadan Tahsil Edildi" : "Peşin Alındı"}</Text>
                  </View>
                  <View style={styles.line}>
                    <Text style={styles.titleText}>Hizmet Kalemi</Text>
                    <Text style={styles.text}>-</Text>
                  </View>
                  <View style={styles.line}>
                    <Text style={styles.titleText}>Döviz Tipi</Text>
                    <Text style={styles.text}>{item.CurrencyType.Name}</Text>
                  </View>
                  <View style={styles.line}>
                    <Text style={styles.titleText}>Hizmet Tutarı</Text>
                    <Text style={styles.text}>{item.Amount}</Text>
                  </View>
                  </View>
                )}
  
              />
              
            </View>
          ) : (
            <View>
              <View style={styles.line}>
                <Text style={styles.titleText}>Ürün Cinsi</Text>
                <Text style={styles.text}>
                  {data.TransportCardDetails[0].TransportProduct.Name}
                </Text>
              </View>
              <View style={styles.line}>
                <Text style={styles.titleText}>Ambalaj</Text>
                <Text style={styles.text}>
                  {data.TransportCardDetails[0].PackingQuantity}
                </Text>
              </View>
              <View style={styles.line}>
                <Text style={styles.titleText}>Birimi</Text>
                <Text style={styles.text}>
                  {data.TransportCardDetails[0].TransportUnitMultiplier.Name}
                </Text>
              </View>
              <View style={styles.line}>
                <Text style={styles.titleText}>Adet</Text>
                <Text style={styles.text}>
                  {data.TransportCardDetails[0].Quantity}
                </Text>
              </View>
              <View style={styles.line}>
                <Text style={styles.titleText}>Kütle</Text>
                <Text style={styles.text}>
                  {data.TransportCardDetails[0].Weight}
                </Text>
              </View>
              <View style={styles.line}>
                <Text style={styles.titleText}>Hacim</Text>
                <Text style={styles.text}>
                  {data.TransportCardDetails[0].Volume}
                </Text>
              </View>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default TransportCardDetail;

const styles = StyleSheet.create({
  box: {
    borderWidth: 2.5,
    borderRadius: 8,
    marginVertical: 10,
    marginHorizontal: 10,
    minHeight: 265,
  },

  active: {
    backgroundColor: '#b6dcfb',
  },

  deactive: {
    backgroundColor: '#ff748c',
  },

  line: {
    paddingLeft: 10,
    minHeight: 40,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  text: {
    color: 'black',
    paddingLeft: 10,
  },
  titleText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
