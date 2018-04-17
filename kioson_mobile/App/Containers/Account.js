import React, { Component } from 'react'
import {
  Text,
  Image,
  TouchableOpacity,
  View,
  ScrollView,
  ToastAndroid,
  AsyncStorage
} from 'react-native'
import { connect } from 'react-redux'
import { Images, Fonts, Colors } from '../Themes'
import { NavigationActions } from 'react-navigation'
import ModalTwoButton from '../Components/ModalTwoButton'
import Switch from '../Components/Switch'
import LoadingModal from '../Components/Loading'
import NoLoginTab from '../Components/NoLoginTab'
import HeaderNavBar from '../Components/HeaderNavBar'

// Actions
import AccountType from '../Redux/AccountRedux'
import ProfileTypes from '../Redux/ProfileRedux'
import loginAction from '../Redux/UserLoginRedux'

// Styles
import styles from './Styles/AccountStyle'
import { ratioHeight, ratioWidth } from '../Transforms/Resize'
import { moderateScale } from '../Transforms/Scaling'

const accounting = require('accounting')

class Account extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      id: '',
      phone: '',
      balance: 0,
      statusKios: true,
      userVerify: true,
      textStatus: 'BUKA',
      modalCloseKios: false,
      modalLogout: false,
      modalLodaing: false,
      typeRequest: '',
      userLogin: this.props.dataLogin.login
    }
  }

  static navigationOptions = {
    tabBarLabel: ({ focused, tintColor }) => (
      <View style={styles.tabLabel}>
        <Text style={{ fontFamily: focused ? Fonts.type.productSansBold : Fonts.type.productSansRegular, color: tintColor, fontSize: moderateScale(12) }}>
          Akun
        </Text>
      </View>
    ),
    tabBarIcon: ({ tintColor }) => (
      <View style={styles.tabIcon}>
        <Image source={Images.ic_akun} style={{ width: ratioWidth(24), height: ratioWidth(24), tintColor: tintColor }} resizeMode={'contain'} />
      </View>
    )
  }

  profileNavigate () {
    this.props.navigation.navigate('Profile',
      {
        name: this.state.name,
        id: this.state.id,
        phone: this.state.phone
      })
  }

  navigate (route) {
    const navigate = NavigationActions.navigate({
      routeName: route,
      params: {},
      action: NavigationActions.navigate({ routeName: route })
    })
    this.props.navigation.dispatch(navigate)
  }

  componentDidMount () {
    this.setState({ typeRequest: 'getProfile' })
    AsyncStorage.getItem('token').then((value) => {
      if (value === null || value === undefined || value === '') {
      } else {
        this.props.getProfile(value)
      }
    })
    // this.props.getProfile('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaW4iOiJlMmQzMDljY2RkODE3ZTY5Y2RiZjA2MGQzNGQzNTUzMCIsInNlc3Npb25faWQiOiI3YjFjN2Q2ZS1lNmZjLTExZTctYSIsInJldGFpbGVyX2lkIjoiUkhZWiIsImlhdCI6MTUxMzkzNTc3MywiZXhwIjoxNTE0NTQwNTczfQ.EvcJz_usaew_BNjdyGPoKSyXh2m-7GBhAI3RpJQcpv4')
  }

  componentWillReceiveProps (nextProps) {
    const { typeRequest } = this.state
    const { profile, balance, dataLogin } = nextProps
    // if (typeRequest === 'logout') {
    //   if (logoutProps !== null) {
    //     if (logoutProps.code === 200 && logoutProps.status) {
    //       this.setState({
    //         modalLodaing: false
    //       })
    //       const resetAction = NavigationActions.reset({
    //         index: 0,
    //         actions: [
    //           NavigationActions.navigate({ routeName: 'GateScreen' })
    //         ]
    //       })
    //       this.props.navigation.dispatch(resetAction)
    //     } else if (!logoutProps.status && logoutProps.code !== 0) {
    //       ToastAndroid.show(logoutProps.message, ToastAndroid.SHORT)
    //       logoutProps.code = 0
    //     }
    //   }
    // }
    if (typeRequest === 'getProfile') {
      if (profile && balance) {
        if (profile.status && balance.status) {
          this.setState({
            name: profile.data.name,
            id: profile.data.retailer_id,
            phone: profile.data.phone_number,
            balance: balance.data.total_sales
          })
        } else ToastAndroid.show(profile.message, ToastAndroid.SHORT)
      }
    }
    if (dataLogin.login) {
      this.setState({
        userLogin: true
      })
    } else {
      this.setState({
        userLogin: false
      })
    }
  }

  renderFooter () {
    return (
      <View style={styles.footer}>
        <Image
          style={styles.logo}
          source={Images.ic_logo_kioson}
          resizeMode={'contain'} />
        <Text style={styles.textFooter}>Versi 7.0</Text>
      </View>
    )
  }

  modalCloseKios () {
    return (
      <ModalTwoButton
        isOpen={this.state.modalCloseKios}
        onClosed={() => this.setState({ modalCloseKios: false })}
        onPressFalse={() => this.onPressYes()}
        onPressTrue={() => this.onPressTidak()}
        title={'TUTUP'}
        desc={'Apakah Anda yakin ingin menutup\nkios Anda ?'}
        buttonFalse={'Ya'}
        buttonTrue={'Tidak'} />
    )
  }

  renderInVerify () {
    return (
      <View style={styles.containerBlueCol}>
        <Image resizeMode={'contain'} source={Images.ic_exclamation_mark} style={{height: ratioHeight(14), width: ratioWidth(14)}} />
        <Text style={[styles.productSansRegular, {paddingLeft: ratioWidth(10)}]}>Akun Anda sedang dalam proses verifikasi.</Text>
      </View>
    )
  }

  renderButtonVerify () {
    return (
      <TouchableOpacity activeOpacity={0.8} style={styles.containerBlueCol}>
        <Image resizeMode={'contain'} source={Images.ic_exclamation_mark} style={{height: ratioHeight(14), width: ratioWidth(14)}} />
        <Text style={[styles.productSansRegular, {paddingLeft: ratioWidth(10)}]}>Tekan di sini untuk verifikasi data Anda.</Text>
      </TouchableOpacity>
    )
  }

  renderButtonVerifyfail () {
    return (
      <TouchableOpacity activeOpacity={0.8} style={styles.containerBlueCol}>
        <Image resizeMode={'contain'} source={Images.ic_exclamation_mark} style={{height: ratioHeight(14), width: ratioWidth(14)}} />
        <Text style={[styles.productSansRegular, {paddingLeft: ratioWidth(10)}]}>Verifikasi GAGAL. Tekan di sini untuk perbaiki data.</Text>
      </TouchableOpacity>
    )
  }

  actionLogout () {
    this.setState({ modalLogout: false, modalLodaing: true, typeRequest: 'logout' })
    // this.props.logout()
  }

  logout () {
    this.setState({ modalLogout: false })
    this.props.setLogin(false)
    AsyncStorage.removeItem('token')
    AsyncStorage.removeItem('pinStatus')
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: 'GateScreen'})
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }

  modalLogout () {
    return (
      <ModalTwoButton
        isOpen={this.state.modalLogout}
        onClosed={() => this.setState({ modalLogout: false })}
        onPressFalse={() => this.logout()}
        onPressTrue={() => this.actionLogout()}
        title={'KELUAR'}
        desc={'Apakah Anda yakin ingin keluar dari\nakun Anda ?'}
        buttonFalse={'Ya'}
        buttonTrue={'Tidak'} />
    )
  }

  onValueChange (value) {
    if (!value) {
      this.setState({ modalCloseKios: true })
    } else {
      this.setState({ statusKios: true, textStatus: 'BUKA' })
    }
  }

  handleChange (statusKios) {
    this.setState({ statusKios })
  }

  onPressYes (value) {
    this.setState({modalCloseKios: false, statusKios: false, textStatus: 'TUTUP'})
  }

  onPressTidak (value) {
    this.setState({ modalCloseKios: false, statusKios: true, textStatus: 'BUKA' })
  }

  renderMenu (icon, title, borderBottom = 1, status = true, activeOpacity = 0.8, action) {
    let flex = 1
    let colorText = Colors.nice_blue
    if (!status) {
      flex = 0
    }
    if (this.state.textStatus === 'TUTUP') {
      colorText = Colors.greyish
    }
    return (
      <TouchableOpacity activeOpacity={activeOpacity} style={styles.flexOneRow} onPress={action}>
        <Image
          style={[styles.imgTanya, {marginLeft: ratioWidth(18)}]}
          source={icon}
          resizeMode={'contain'} />
        <View style={[styles.flexColMenu, {borderBottomWidth: borderBottom}]}>
          <View style={styles.flexRowMenu}>
            <Text allowFontScaling style={[styles.robotoRegBigSlate, {flex: flex}]}>{title}</Text>
            {status === false && <Text allowFontScaling style={[styles.robotoMedGrey, { color: colorText, flex: 1, marginLeft: ratioWidth(10) }]}>{this.state.textStatus}</Text>}
            {status === false &&
            <View style={{marginRight: ratioWidth(10)}}>
              <Switch
                height={ratioHeight(25)}
                width={ratioWidth(55)}
                value={this.state.statusKios}
                circleColorActive={Colors.nice_blue}
                circleColorInactive={Colors.greyish}
                backgroundInactive={Colors.white_two}
                backgroundActive={Colors.white_two}
                onSyncPress={(value) => this.onValueChange(value)} />
            </View>}
            {status === true && <Image
              style={styles.imageArrow}
              source={Images.ic_next_calendar}
              resizeMode={'contain'} />}
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  renderView () {
    const { name, id, phone, balance, userLogin } = this.state
    const saldo = accounting.formatMoney(balance, 'Rp', '0', '.', '0', '%s %v')
    if (userLogin) {
      return (
        <View style={{ flex: 1 }}>
          <Image source={Images.profileBg} style={styles.banner}>
            <View style={styles.flexColumn}>
              <View style={styles.maskedVerify}>
                <Text allowFontScaling style={[styles.robotoBoldFF, {flex: 1}]}>{name}</Text>
                {this.state.userVerify === true && <Image
                  style={styles.imageVerify}
                  source={Images.ic_verify}
                  resizeMode={'contain'} />}
              </View>
              <View style={styles.separator} />
              <Text allowFontScaling style={styles.robotoRegFF}>ID Anda : {id}</Text>
              <Text allowFontScaling style={styles.robotoRegFF}>{phone}</Text>
            </View>
          </Image>
          {this.renderInVerify()}
          {/* {this.renderButtonVerify()}
          {this.renderButtonVerifyfail()} */}
          <View style={styles.viewElvation}>
            <View style={styles.flexRowBorderBotttom}>
              <View style={styles.flexOneCol}>
                <Text allowFontScaling style={styles.robotoBoldSquas}>SALDO</Text>
                <Text allowFontScaling style={styles.robotoRegSlate}>{saldo}</Text>
              </View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('BalanceTopUp')}
                style={styles.buttonSquas}>
                <Text numberOfLines={1} allowFontScaling style={styles.ProductSansBold}>ISI SALDO</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.flexRowBorderBotttom, {borderBottomWidth: 0}]}>
              <View style={styles.flexOneCol}>
                <Text allowFontScaling style={styles.robotoBoldSquas}>INFO</Text>
                <Text allowFontScaling style={styles.robotoRegSlate}>PINJAMAN</Text>
              </View>
              <TouchableOpacity style={styles.buttonSquas}>
                <Text numberOfLines={1} allowFontScaling style={styles.ProductSansBold}>CEK DISINI</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[{backgroundColor: Colors.white_two}]}>
            {this.renderMenu(Images.ic_status_kios, 'Status Kios', 1, false, 10)}
            {this.renderMenu(Images.ic_profile, 'Profil Anda', 1, true, 0.8, () => this.profileNavigate())}
            {/* {this.renderMenu(Images.ic_agent, 'Agen Referal', 1, true, 0.5, () => this.navigate('ReferralAgencies'))} */}
            {this.renderMenu(Images.ic_pin, 'Pengaturan PIN', 1, true, 0.8, () => this.navigate('PinAccount'))}
            {this.renderMenu(Images.ic_printer_Active, 'Pengaturan Printer', 0, true, 0.8, () => this.navigate('ListPrinter'))}
          </View>
          <View style={[{ backgroundColor: Colors.white_two, marginTop: ratioHeight(10) }]}>
            {this.renderMenu(Images.ic_logout, 'Keluar', 0, true, 0.5, () => this.setState({modalLogout: true}))}
          </View>
          {this.renderFooter()}
        </View>
      )
    } else {
      return <NoLoginTab type='profile' onPress={() => this.login()} />
    }
  }

  login () {
    this.props.navigation.navigate('SignIn')
  }

  render () {
    const { userLogin } = this.state
    const { navigation } = this.props
    let scroll
    if (userLogin) {
      scroll = (
        <ScrollView>
          {this.renderView()}
        </ScrollView>
      )
    } else {
      scroll = (
        <View style={{ flex: 1 }}>
          {this.renderView()}
        </View>
      )
    }
    return (
      <View style={{ flex: 1 }}>
        {scroll}
        <LoadingModal size={10} color={Colors.squash} visible={this.state.modalLodaing} />
        {this.modalCloseKios()}
        {this.modalLogout()}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    logoutProps: state.account.logout.payload,
    profile: state.profile.getProfile.payload,
    balance: state.profile.getBalance.payload,
    dataLogin: state.login
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(AccountType.logoutRequest()),
    getProfile: (token) => dispatch(ProfileTypes.getProfileRequest(token)),
    setLogin: (param) => dispatch(loginAction.isLogin(param))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account)
