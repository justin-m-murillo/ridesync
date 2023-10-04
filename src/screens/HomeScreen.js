import { View, Text, useWindowDimensions } from 'react-native'
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'
import React, { useRef } from 'react';
import tw from 'twrnc';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../../slices/navSlice';
import NavFavorites from '../components/NavFavorites';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = () => {
  //const { width, height } = useWindowDimensions();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const handleFavoritesSubmit = (input) => {
    inputRef.current?.setAddressText(input);
    inputRef.current?.focus();
  }
//#F5F5ED
  return (
    <View style={[tw`flex w-full h-full`, { backgroundColor: '#f5f5ed'}]}>
        <View style={[tw`flex-col w-full h-auto`, {paddingTop: insets.top, paddingBottom: insets.bottom }]}>
          <View style={tw`mt-[10%] flex items-center`}>
            <Text style={{ fontFamily: 'Mont', fontSize: 30 }}>
              RideSync
            </Text>
            <LottieView 
              source={require('../../assets/landing.json')}
              autoPlay
              loop={false}
              style={{
                width: 250,
                height: 250,
              }}
            />
          </View>
          <View style={tw`flex flex-row h-14 m-1 p-2`}>
            <View style={tw`flex-1 h-auto`}>
              <GooglePlacesAutocomplete
                ref={inputRef}
                styles={{
                  container: {
                    flex: 0,
                  },
                  textInput: {
                    fontSize: 18,
                    backgroundColor: '#F0f0ed',
                  }
                }}
                onPress={(data, details = null) => {
                  dispatch(setOrigin({
                    location: details.geometry.location,
                    description: data.description,
                  }));
                  dispatch(setDestination(null));
                  navigation.navigate('MapScreen');
                }}
                fetchDetails={true}
                returnKeyType={'search'}
                enablePoweredByContainer={false}
                minLength={2}
                query={{
                  key: GOOGLE_MAPS_APIKEY,
                  language: 'en',
                }}
                placeholder='Where from?' 
                nearbyPlacesAPI='GooglePlacesSearch'
                debounce={400}
              />
            </View>
          </View>

          {/* <NavOptions /> */}
          {/* <NavFavorites handleFavoritesSubmit={handleFavoritesSubmit} /> */}
        </View>
      </View>
  )
}

export default HomeScreen