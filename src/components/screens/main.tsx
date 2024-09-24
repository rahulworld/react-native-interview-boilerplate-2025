import {useEffect, useReducer, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setRandomUsers, setPage} from '../../core/rootReducer';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const styles = StyleSheet.create({
  addressTextStyle: {
    fontSize: 16,
    color: 'green',
  },
  nameTextStyle: {
    fontSize: 20,
    color: 'black',
  },
});

const MainScreen = ({navigation}: any): React.JSX.Element => {
  const {page, randomUsers} = useSelector((state: any) => state?.users);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`https://randomuser.me/api/?results=10&page=${page}`)
      .then(results => results.data)
      .then(data => {
        dispatch(setRandomUsers(data?.results));
      });
    // fetch(`https://randomuser.me/api/?results=10&page=${page}`)
    //   .then(results => results.json())
    //   .then(data => {
    //     dispatch(setRandomUsers(data?.results));
    //   });
  }, [page]);

  const renderItemsData = ({item}: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('UserDetails');
        }}>
        <View
          style={{
            zIndex: 2,
            shadowRadius: 5,
            shadowColor: 'black',
            shadowOpacity: 0.2,
          }}>
          <View
            key={item?.email}
            style={{
              padding: 16,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'white',
            }}>
            {item?.picture?.thumbnail && (
              <Image
                source={{uri: item?.picture?.thumbnail}}
                width={60}
                height={60}
                style={{borderRadius: 30}}
              />
            )}
            <View style={{paddingHorizontal: 16}}>
              <View style={{flexDirection: 'row', marginBottom: 4}}>
                <Text style={styles.nameTextStyle}>{item?.name?.title} </Text>
                <Text style={styles.nameTextStyle}>{item?.name?.first} </Text>
                <Text style={styles.nameTextStyle}>{item?.name?.last}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.addressTextStyle}>
                  {item?.location?.street?.number}{' '}
                </Text>
                <Text style={styles.addressTextStyle}>
                  {item?.location?.street?.name}{' '}
                </Text>
                <Text style={styles.addressTextStyle}>
                  {item?.location?.city}{' '}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        data={randomUsers}
        renderItem={renderItemsData}
        keyExtractor={(data: any) => data?.email}
        onEndReached={() => {
          dispatch(setPage(page + 1));
        }}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
};

export default MainScreen;
