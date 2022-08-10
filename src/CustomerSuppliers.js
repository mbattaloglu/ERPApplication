import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {User} from './constants/Constants';
import CustomerSuppliersInfoBox from './components/CustomerSuppliersInfoBox';

const CustomerSuppliers = ({navigation}) => {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        User.API + '/api/odata/customerSuppliers/97209?&$expand=FinancialTrxs',
        {
          headers: {
            Authorization: 'Bearer ' + User.token,
            'Content-Type': 'application/json',
          },
        },
      );
      const json = await data.json();
      setData(json.FinancialTrxs);
    };
    fetchData().catch(err => console.log(err));
  }, []);

  return (
    <FlatList
      data={data}
      renderItem={({item, index}) => (
        <CustomerSuppliersInfoBox
          date={item.TrxDate.slice(0, 10)}
          description={item.LineDescription}
          type={item.SubType}
          oid={item.oid}
          currency={'-PLACEHOLDER-'}
          money={item.Debit}
          isDebt={item.SubType === "Receipt" ? false : true}
          boxStyle={index % 2 == 0 ? styles.boxEven : styles.boxOdd}
        />
      )}
    />
  );
};

export default CustomerSuppliers;

const styles = StyleSheet.create({
  boxOdd: {
    backgroundColor: 'lightgray',
  },
  boxEven: {
    backgroundColor: 'white',
  },
});
