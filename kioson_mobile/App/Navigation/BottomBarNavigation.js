import { TabNavigator } from 'react-navigation'
import React from 'react'
import {
  Text,
  View,
  Image
} from 'react-native'
import Account from '../Containers/Account'
import News from '../Containers/News'
import Perform from '../Containers/Perform'
import History from '../Containers/History'
import Home from '../Containers/Home'
import { Images, Colors, Fonts } from '../Themes'
import { ratioHeight, ratioWidth } from '../Transforms/Resize'
import { moderateScale } from '../Transforms/Scaling'

const BottomNav = TabNavigator({
  Home: {
    screen: Home
  },
  History: {
    screen: History
  },
  Perform: {
    screen: Perform
  },
  News: {
    screen: News
    // screen: News,
    // navigationOptions: ({ navigation }) => ({
    //   tabBarLabel: ({ focused, tintColor }) => (
    //     <Text style={{ fontFamily: focused ? Fonts.type.productSansBold : Fonts.type.productSansRegular, color: tintColor, fontSize: moderateScale(12), marginTop: ratioHeight(4) }}>
    //       Berita
    //     </Text>
    //   ),
    //   tabBarIcon: ({ tintColor }) => (
    //     <View>
    //       {navigation.badge === 0
    //       ? <Image source={Images.ic_berita} style={{ width: ratioWidth(24, 0.1), height: ratioHeight(24, 0.1), tintColor: tintColor }} resizeMode={'contain'} />
    //       : <View><Image source={Images.ic_berita} style={{ width: ratioWidth(24, 0.1), height: ratioHeight(24, 0.1), tintColor: tintColor }} resizeMode={'contain'} />
    //         <View style={{ position: 'absolute', right: ratioWidth(0), width: ratioWidth(15), height: ratioWidth(15), borderRadius: moderateScale(15), backgroundColor: Colors.red, justifyContent: 'center', alignItems: 'center' }}>
    //           <Text style={{ color: Colors.white_two, fontFamily: Fonts.productSansBold, fontSize: moderateScale(8) }}>
    //             {navigation.badge}
    //           </Text>
    //         </View>
    //       </View>}
    //     </View>
    //   )
    // })
  },
  Account: {
    screen: Account
  }
}, {
  tabBarPosition: 'bottom',
  animatedEnabled: true,
  swipeEnabled: false,
  tabBarOptions: {
    upperCaseLabel: false,
    activeTintColor: Colors.white_two,
    inactiveTintColor: Colors.white_65,
    showIcon: true,
    indicatorStyle: {
      height: ratioHeight(4),
      backgroundColor: Colors.white_two
    },
    style: {
      height: ratioHeight(57),
      backgroundColor: Colors.squash
    },
    iconStyle: {
      width: '100%',
      height: '100%',
      justifyContent: 'center'
      // backgroundColor: 'blue'
    },
    tabStyle: {
      height: ratioHeight(57),
      opacity: 1
    }
  }
})

export default BottomNav
