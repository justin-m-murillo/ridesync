import { View, Text, Image } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import React, { useState } from 'react'
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/native'
import { ChevronLeftIcon } from 'react-native-heroicons/solid'
import { useSelector } from 'react-redux'
import { selectTravelTimeInformation } from '../../slices/navSlice'

import eco from '../../assets/rides/png/eco.png';
const ECO = Image.resolveAssetSource(eco).uri;
import pls from '../../assets/rides/png/plus.png';
const PLS = Image.resolveAssetSource(pls).uri;
import lux from '../../assets/rides/png/lux.png';
const LUX = Image.resolveAssetSource(lux).uri;

const data = [
  {
    id: 'RIDE-ECO-123',
    title: 'ECO',
    multiplier: 1,
    image: ECO,
  },
  {
    id: 'RIDE-PLUS-456',
    title: 'PLUS',
    multiplier: 1.2,
    image: PLS,
  },
  {
    id: 'RIDE-LUX-789',
    title: 'LUX',
    multiplier: 1.75,
    image: LUX,
  },
];

// if we have SURGE pricing, this goes up
const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [ selected, setSelected ] = useState(null);
  const tti = useSelector(selectTravelTimeInformation);

  return (
    <View style={tw`bg-white flex-1`}>
      <View style={tw`flex-row p-5 justify-center`}>
        <View style={tw`flex-1`}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeftIcon size={24} color={'black'} />
          </TouchableOpacity>
        </View>
        <View style={tw`flex-2`}>
          <Text style={tw`text-center text-base sm:text-xl text-black`}>
            Select a Ride - {tti?.distance?.text}
          </Text>
        </View>
        <View style={tw`flex-1`} />{/* Space filler */}
      </View>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <FlatList 
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item: { id, title, multiplier, image}, item }) => (
            <TouchableOpacity 
              style={tw`flex-row justify-between items-center px-4 sm:px-10 ${id === selected?.id ? 'bg-gray-200' : null}`}
              onPress={() => setSelected(item)}
            >
              <View style={tw`flex-1 mr-1`}>
                <Image 
                  style={{
                    width: 100,
                    height: 100,
                    resizeMode: 'contain',
                  }}
                  source={{ uri: image }}
                />
              </View>
              <View style={tw`flex-2`}>
                <Text style={tw`text-xl text-black font-semibold`}>{title}</Text>
                <Text>{tti?.duration?.text} travel time</Text>
              </View>
              <View style={tw`flex-1 items-end`}>
                <Text style={tw`text-xl text-black`}>
                  {new Intl.NumberFormat('en-us', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(
                    (tti?.duration?.value * SURGE_CHARGE_RATE * multiplier) / 100
                  )}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <View>
        <TouchableOpacity 
          disabled={!selected} 
           style={tw`bg-black py-3 m-3 ${!selected ? 'bg-gray-300' : null}`}
        >
          <Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default RideOptionsCard