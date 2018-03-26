import React, { Component } from 'react'
import { ScrollView, PermissionsAndroid, Text, View, AsyncStorage, TouchableOpacity, ToastAndroid, Image } from 'react-native'
import { connect } from 'react-redux'
import styles from '../../Styles/FormPulsaStyle'
import {Images, Fonts} from '../../../Themes/'
import {moderateScale} from '../../../Transforms/Scaling'
import PhoneIdentifier from '../../../Services/PhoneIdentifier'
import RechargeMobileDataRedux from '../../../Redux/RechargeMobileDataRedux'
import LoadingModal from '../../../Components/Loading'
import ThousandFormat from '../../../Services/ThousandFormat'
import FooterFrom from '../../../Components/FooterFrom'
import FormInput from '../../../Components/FormInput'
import ButtonForm from '../../../Components/ButtonForm'
import PlaceholderModalDropdown from '../../../Components/PlaceholderModalDropdown'
import I18n from '../../../I18n'
import Validator from '../../../Services/Validate'
import { ratioWidth, ratioHeight } from '../../../Transforms/Resize'
import ModalListContact from '../../../Components/ModalListContact'
import Colors from '../../../Themes/Colors'
var SelectContacts = require('react-native-select-contact-android')

class FormPaketData extends Component {
  constructor (props) {
    super(props)
    this.layout = {
      WidthAmount: 0,
      yPosition: 0,
      height: 0
    }
    this.submitting = {
      confirmation: false
    }
    this.state = {
      oken: '',
      serviceProductChoose: I18n.t('p_serviceData'),
      serviceProductId: '',
      serviceProduct: '',
      amount: '',
      operator: '',
      phoneNumber: '',
      errorMessage: '',
      phoneNumberEditable: false,
      modalLodaing: true,
      serviceProductList: [],
      providerCustomer: '',
      modalListContact: false,
      listContact: []
    }
  }

  componentWillMount () {
    AsyncStorage.getItem('token').then((value) => {
      if (value === null || value === undefined || value === '') {
      } else {
        this.props.getPreset(value)
        this.props.navigation.setParams({
          tabsActieve: 'data'
        })
        this.setState({ token: value })
      }
    })
  }

  componentWillReceiveProps (nextProps) {
    const { confirmation } = nextProps
    const { navigate } = this.props.navigation
    const { serviceProduct, phoneNumber, serviceProductId } = this.state

    if (confirmation !== null) {
      if (this.props.confirmation.fetching && !confirmation.fetching) {
        if (confirmation.payload && !confirmation.error) {
          this.submitting = { ...this.submitting, confirmation: false }
          const dataDetail = [
            { label: I18n.t('l_product'), detail: serviceProduct },
            { label: I18n.t('l_phonenumber'), detail: phoneNumber }
          ]
          navigate('PaymentConfirmation',
            {
              dataDetail: dataDetail,
              serviceType: 'mobileDataCharge',
              titleForm: 'Paket Data',
              dataConfirmation: confirmation.payload.data,
              serviceProductId: serviceProductId,
              phoneNumber: phoneNumber
            })
        }
      }
    }
  }

  resetErrorForm () {
    this.setState({ errorMessage: '' })
  }

  onChangeText = (text) => {
    var providerCustomer = PhoneIdentifier(text, 'data')
    this.setState({ phoneNumber: text, providerCustomer: providerCustomer, serviceProductChoose: I18n.t('p_AmountValueMobileDataRecharge'), serviceProductId: '' })
    this.resetErrorForm()
  }

  renderLogoProvider (value) {
    var providerCustomer = PhoneIdentifier(value)
    if (providerCustomer !== 'Unknown' && value.length > 3) {
      if (providerCustomer === 'Telkom') this.source = Images.ic_telkomsel
      else if (providerCustomer === 'TELKOMSEL') this.source = Images.ic_telkomsel
      else if (providerCustomer === 'INDOSAT') this.source = Images.ic_indosat
      else if (providerCustomer === 'XL') this.source = Images.ic_xl
      else if (providerCustomer === 'THREE') this.source = Images.ic_three
      else if (providerCustomer === 'Axis') this.source = Images.ic_xl
      else if (providerCustomer === 'Esia') this.source = Images.ic_xl
      else if (providerCustomer === 'Flexi') this.source = Images.ic_telkomsel
      else if (providerCustomer === 'SMARTFREN') this.source = Images.ic_smartfren
      else if (providerCustomer === 'StarOne') this.source = Images.ic_indosat
      else if (providerCustomer === 'Ceria') this.source = Images.ic_xl
      else if (providerCustomer === 'Byru') this.source = Images.ic_xl
      else if (providerCustomer === 'INDOSAT_DATA') this.source = Images.ic_indosat
      else if (providerCustomer === 'THREE_DATA') this.source = Images.ic_three
      else if (providerCustomer === 'XL_PAKET_DATA') this.source = Images.ic_xl
      return (
        <Image source={this.source} style={styles.iconRectangle} resizeMode='contain' />
      )
    } else {
      return null
    }
  }

  renderRow (rowData, rowID, highlighted) {
    var maskedPrice = ThousandFormat(+rowData.amount)
    return (
      <TouchableOpacity style={styles.list} underlayColor='cornflowerblue'>
        <Text style={[styles.textList]}>
          {rowData.description}
        </Text>
        <Text style={styles.textFieldPriceDropDown}>
          Rp {maskedPrice}
        </Text>
      </TouchableOpacity>
    )
  }

  renderButtonText (rowData) {
    const { operator, id, amount, description } = rowData
    this.setState({
      serviceProduct: description,
      serviceProductId: id,
      amount: amount,
      operator: operator
    })
    return `${description}`
  }

  confirmOrder (phoneNumber) {
    this.props.getConfirmationMobileData({
      serviceProductId: this.state.serviceProductId,
      phoneNumber: phoneNumber,
      token: this.state.token
    })
    this.submitting.confirmation = true
  }

  checkForm (phoneNumber, serviceProductId) {
    const { errorMessage } = this.state
    if ((phoneNumber.length >= 10 && errorMessage === '') && (serviceProductId !== '')) {
      return false
    }
    return true
  }

  requestContact = async (preset) => {
    try {
      const contactGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          'title': 'Kioson App Read Contact Permission',
          'message': 'Kioson App needs access to your contact'
        }
      )
      if (contactGranted === PermissionsAndroid.RESULTS.GRANTED) {
        this.contact(preset)
      } else {
        ToastAndroid.show('Permission Denied', ToastAndroid.SHORT)
      }
    } catch (err) {
      console.tron.log(err)
    }
  }

  contact (preset) {
    var listContact = []
    SelectContacts.pickContact({timeout: 45000}, (err, contact) => {
      if (err) {
        if (typeof err === 'object') {
          if (err.message === 'user canceled') {
            console.tron.log('user hit back button in contact picker')
          } else if (err.message === 'timed out') {
            console.tron.log('timed out')
          } else if (err.message === 'android version not supported') {
            console.tron.log('invalid android version')
          }
        }
        console.tron.log(err)
      } else {
        if (contact.phoneNumbers) {
          listContact = contact.phoneNumbers.map((data, i) => {
            var number = data.number.replace('+62', '0').replace(/\D+/g, '')
            return number
          })
          if (listContact.length > 1) {
            this.setState({ listContact: listContact, modalListContact: true })
          } else {
            var providerCustomer = PhoneIdentifier(String(listContact), 'data')
            var serviceProductList = preset.find((item) => item.operator === providerCustomer)
            this.setState({ modalListContact: false, listContact: [], serviceProductList: serviceProductList, phoneNumber: String(listContact), providerCustomer: providerCustomer, serviceProductChoose: I18n.t('p_AmountValueMobileDataRecharge'), serviceProductId: '' })
            this.resetErrorForm()
          }
        }
      }
    })
  }

  onSelect (number, preset) {
    var providerCustomer = PhoneIdentifier(number)
    var serviceProductList = preset.find((item) => item.operator === providerCustomer)
    this.setState({ modalListContact: false, listContact: [], serviceProductList: serviceProductList, phoneNumber: number, providerCustomer: providerCustomer, serviceProductChoose: I18n.t('p_AmountValueMobileDataRecharge'), serviceProductId: '' })
    this.resetErrorForm()
  }

  render () {
    const {preset, confirmation} = this.props
    const { modalListContact, serviceProductId, errorMessage, phoneNumber, serviceProductChoose, serviceProductList } = this.state
    var tempPreset = preset.payload ? preset.payload.data : []
    var isButtonDisable = this.checkForm(phoneNumber, serviceProductId)
    return (
      <View style={{flex: 1}}>
        <ScrollView keyboardShouldPersistTaps='handle' contentContainerStyle={{flexGrow: 1}}>
          <View style={{flex: 1}}>
            <View style={styles.form}>
              <FormInput
                editable={!preset.fetching}
                value={phoneNumber}
                isLeftVisible
                iconLeft={Images.ic_user}
                keyboardType='numeric'
                title={I18n.t('l_phonenumber')}
                placeholder={I18n.t('p_phoneNumber')}
                iconRight={Images.ic_contact}
                isRightVisible
                onBlur={() => {
                  var isValid = Validator(phoneNumber, 'customerPhoneNumberMobile')
                  if (phoneNumber.length >= 10 && isValid === '') {
                    var serviceProductList = tempPreset.find((item) => item.operator === this.state.providerCustomer)
                    this.setState({ serviceProductList: serviceProductList })
                  }
                  this.setState({ errorMessage: isValid })
                }}
                messageError={errorMessage}
                label={this.renderLogoProvider(phoneNumber)}
                onChangeText={this.onChangeText}
                onPressRight={() => this.requestContact(tempPreset)}
            />
              <PlaceholderModalDropdown
                title={I18n.t('l_mobileDataRecharge')}
                leftIcon={Images.ic_amount}
                isLeftVisible
                marginTop={9}
                disabled={errorMessage !== '' || phoneNumber.length < 10}
                options={serviceProductList.service_products}
                defaultValue={serviceProductChoose}
                renderRow={this.renderRow.bind(this)}
                renderButtonText={(rowData) => this.renderButtonText(rowData)}
            />
            </View>
            <FooterFrom />
            <View>
              <Text style={{
                fontFamily: Fonts.type.robotoRegular,
                textAlign: 'center',
                fontSize: moderateScale(12),
                color: Colors.greyish
              }}>Operator Tersedia</Text>
              <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingHorizontal: ratioWidth(83), paddingTop: ratioHeight(12), paddingBottom: ratioHeight(5)}}>
                {tempPreset.map((data, i) => {
                  return (
                    <Image source={{ uri: data.logo }} style={{height: ratioHeight(20), width: ratioWidth(20)}} resizeMode='contain' />
                  )
                })}
              </View>
            </View>
          </View>
          <View style={{paddingTop: ratioHeight(15), paddingHorizontal: ratioHeight(15)}}>
            <ButtonForm
              onPress={() => this.confirmOrder(phoneNumber)}
              disabled={isButtonDisable}
              type={'tabs'}
            />
          </View>
        </ScrollView>
        <ModalListContact data={this.state.listContact} onSelect={(data) => this.onSelect(data, tempPreset)} isOpen={modalListContact} onClosed={() => this.setState({ modalListContact: false })} />
        <LoadingModal visible={preset.fetching || confirmation.fetching} onRequestClose={() => this.props.navigation.goBack()} />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    preset: state.rechargeMobileData.getRechargeMobileData,
    confirmation: state.rechargeMobileData.getConfirmationRechargeDataMobile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPreset: (params) => dispatch(RechargeMobileDataRedux.rechargeMobileDataRequest(params)),
    getConfirmationMobileData: (params) => dispatch(RechargeMobileDataRedux.confirmationRechargeMobileDataRequest(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormPaketData)
