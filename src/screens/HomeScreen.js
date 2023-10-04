import { View, Text, useWindowDimensions } from 'react-native'
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'
import React, { useRef } from 'react';
import tw from 'twrnc';
import LottieView from 'lottie-react-native';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../../slices/navSlice';
import NavFavorites from '../components/NavFavorites';

const HomeScreen = () => {
  //const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const handleFavoritesSubmit = (input) => {
    inputRef.current?.setAddressText(input);
    inputRef.current?.focus();
  }

  return (
    <View style={tw`flex bg-white w-full h-full`}>
        <View style={[tw`flex-col w-full h-auto`, {paddingTop: insets.top, paddingBottom: insets.bottom }]}>
          <View style={tw`my-[25%] flex items-center`}>
            <Text style={{ fontFamily: 'Mont', fontSize: 30 }}>
              RideSync
            </Text>
            <LottieView 
              source={require('../../assets/landing.json')}
              autoPlay
              loop={false}
              style={{
                width: 200,
                height: 200,
              }}
            />
          </View>
          <View style={tw`flex-col m-1`}>
            <GooglePlacesAutocomplete
              ref={inputRef}
              styles={{
                container: {
                  flex: 0,
                },
                textInput: {
                  fontSize: 18,
                }
              }}
              onPress={(data, details = null) => {
                dispatch(setOrigin({
                  location: details.geometry.location,
                  description: data.description,
                }));

                dispatch(setDestination(null));
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

          {/* <NavOptions /> */}
          {/* <NavFavorites handleFavoritesSubmit={handleFavoritesSubmit} /> */}
        </View>
      </View>
  )
}

export default HomeScreen