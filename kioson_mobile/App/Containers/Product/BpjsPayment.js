import React, { Component } from 'react'
import { ScrollView, StatusBar, View, TouchableOpacity, PermissionsAndroid, AsyncStorage, Keyboard, ToastAndroid, Text } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import CashBalance from '../../Components/CashBalance'
import FooterFrom from '../../Components/FooterFrom'
import ButtonForm from '../../Components/ButtonForm'
import LoadingModal from '../../Components/Loading'
import I18n from '../../I18n'
import FormInput from '../../Components/FormInput'
import Validator from '../../Services/Validate'
import PlaceholderModalDropdown from '../../Components/PlaceholderModalDropdown'

// Styles
import styles from '../Styles/BpjsPaymentStyle'
import { Images } from '../../Themes/index'
import ModalListContact from '../../Components/ModalListContact'
import { ratioHeight } from '../../Transforms/Resize'
var SelectContacts = require('react-native-select-contact-android')

class BpjsPayment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      participantsNumber: '',
      monthAmount: I18n.t('p_monthAmount'),
      monthValue: '',
      numberOfMonths: '',
      phoneNumber: '',
      listMonth: [
        {lable: '1 Bulan', value: 1},
        {lable: '2 Bulan', value: 2},
        {lable: '3 Bulan', value: 3},
        {lable: '4 Bulan', value: 4},
        {lable: '5 Bulan', value: 5}
      ],
      editable: {
        month: true,
        phoneNumber: false
      },
      month: '',
      message: {
        numberOfMonths: '',
        participantsNumber: '',
        phoneNumber: ''
      },
      keyboardShow: true,
      modalListContact: false,
      listContact: [],
      token: ''
    }
  }

  componentWillMount () {
    AsyncStorage.getItem('token').then((value) => {
      if (value === null || value === undefined || value === '') {
      } else {
        this.setState({ token: value })
      }
    })
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => this.setState({ keyboardShow: false }))
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => this.setState({ keyboardShow: true }))
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  onChangeTextParticipantsNumber = (text) => {
    const { message } = this.state
    this.setState({
      participantsNumber: text,
      message: { ...message, participantsNumber: '' }
    })
  }

  onChangeTextnumberOfMonths = (text) => {
    const { isError, message } = this.state
    this.setState({ numberOfMonths: text })
    if (text.length < 1) {
      this.setState({ isError: { ...isError, numberOfMonths: true }, message: { ...message, numberOfMonths: I18n.t('e_minumumNumberOfMonths') } })
    } else {
      this.setState({ isError: { ...isError, numberOfMonths: false }, message: { ...message, numberOfMonths: '' } })
    }
  }

  onChangeTextNumberPhone = (text) => {
    const { message } = this.state
    this.setState({ phoneNumber: text, message: { ...message, phoneNumber: '' } })
  }

  onBeliClick () {
    // if (participantsNumber !== '12345678') {
    //   this.setState({ isError: { ...isError, participantsNumber: true }, message: { ...message, participantsNumber: I18n.t('e_participantsNumberNotFound') } })
    // } else {
    this.setState({ modalLodaing: true })
    setTimeout(() => {
      const { phoneNumber } = this.state
      const { navigate } = this.props.navigation
      const dataDetail = [
          { label: I18n.t('l_participantsNumber'), detail: '123333333' },
          { label: I18n.t('l_participantsName'), detail: 'Adele Grande' },
          { label: I18n.t('l_amountMember'), detail: '2 Anggota' },
          { label: I18n.t('l_numberOfMonths'), detail: '2 Bulan' },
          { label: I18n.t('l_branch'), detail: 'Martapura' }
      ]
      const data = {
        charge: 6500,
        actual_amount: 300000,
        total_amount: 365000
      }
      navigate('PaymentConfirmation',
        {
          dataDetail: dataDetail,
          serviceType: 'bpjs',
          titleForm: 'BPJS Kesehatan',
          dataConfirmation: data,
          serviceProductId: 1,
          phoneNumber: phoneNumber
        })
      this.setState({ modalLodaing: false })
    }, 500)
    // }
  }

  renderRow (rowData, rowID, highlighted) {
    return (
      <TouchableOpacity style={styles.list} underlayColor='cornflowerblue'>
        <Text style={[styles.textFieldDropDown]}>
          {rowData.lable}
        </Text>
      </TouchableOpacity>
    )
  }

  renderButtonText (rowData) {
    const { editable } = this.state
    const { lable, value } = rowData
    this.setState({
      monthAmount: lable,
      monthValue: value,
      editable: { ...editable, phoneNumber: true }
    })
    return `${lable}`
  }

  checkFrom (participantsNumber, numberOfMonths, phoneNumber) {
    const { message } = this.state
    if ((phoneNumber.length >= 10 && message.phoneNumber === '') && (numberOfMonths === '') && (participantsNumber.length >= 8 && message.participantsNumber === '')) {
      return false
    } else {
      return true
    }
  }

  requestContact = async () => {
    try {
      const contactGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          'title': 'Kioson App Read Contact Permission',
          'message': 'Kioson App needs access to your contact'
        }
      )
      if (contactGranted === PermissionsAndroid.RESULTS.GRANTED) {
        this.contact()
      } else {
        ToastAndroid.show('Permission Denied', ToastAndroid.SHORT)
      }
    } catch (err) {
      console.tron.log(err)
    }
  }

  contact () {
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
            this.setState({listContact: listContact, modalListContact: true})
          } else {
            this.setState({ modalListContact: false, listContact: [], phoneNumber: String(listContact) })
          }
        }
      }
    })
  }

  onSelect (number) {
    this.setState({ modalListContact: false, listContact: [], phoneNumber: number })
  }

  render () {
    const { navigation } = this.props
    const { keyboardShow, editable, monthAmount, listMonth, modalLodaing, message, participantsNumber, numberOfMonths, phoneNumber } = this.state
    var isButtonDisable = this.checkFrom(participantsNumber, numberOfMonths, phoneNumber)
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor='#f7981d' />
        <ScrollView stickyHeaderIndices={[0]}>
          <CashBalance navigation={navigation} />
          <View style={styles.form}>
            <FormInput
              value={participantsNumber}
              isLeftVisible
              iconLeft={Images.ic_participantsNumber}
              keyboardType='numeric'
              title={I18n.t('l_participantsNumber')}
              placeholder={I18n.t('p_12xxxx')}
              maxLength={20}
              iconRight={Images.ic_contact}
              isRightVisible={false}
              onBlur={() => {
                this.setState({
                  message: {...message, participantsNumber: Validator(participantsNumber, 'participantsNumber')}
                })
                if (message.participantsNumber === '') {
                  this.setState({
                    editable: {...editable, month: false}
                  })
                }
              }}
              messageError={message.participantsNumber}
              onChangeText={this.onChangeTextParticipantsNumber}
            />
            <PlaceholderModalDropdown
              title={I18n.t('l_numberOfMonths')}
              leftIcon={Images.ic_calendarSmall}
              isLeftVisible
              marginTop={9}
              disabled={editable.month}
              options={listMonth}
              defaultValue={monthAmount}
              renderRow={this.renderRow.bind(this)}
              renderButtonText={(rowData) => this.renderButtonText(rowData)}
            />
            <FormInput
              value={phoneNumber}
              editable={editable.phoneNumber}
              isLeftVisible
              iconLeft={Images.ic_user}
              keyboardType='numeric'
              title={I18n.t('l_phoneNumberCustomer')}
              placeholder={I18n.t('p_phoneNumber')}
              maxLength={15}
              iconRight={Images.ic_contact}
              isRightVisible
              onBlur={() => {
                this.setState({
                  message: {...message, phoneNumber: Validator(phoneNumber, 'customerPhoneNumber')}
                })
              }}
              messageError={message.phoneNumber}
              onChangeText={this.onChangeTextNumberPhone}
              onPressRight={() => this.requestContact()}
            />
          </View>
          <FooterFrom />
        </ScrollView>
        <ModalListContact data={this.state.listContact} onSelect={(data) => this.onSelect(data)} isOpen={this.state.modalListContact} onClosed={() => this.setState({modalListContact: false})} />
        <LoadingModal visible={modalLodaing} onRequestClose={() => this.onRequestClose()} />
        {keyboardShow === true
        ? <View style={{paddingTop: ratioHeight(15), paddingHorizontal: ratioHeight(15)}}>
          <ButtonForm
            onPress={() => this.onBeliClick()}
            disabled={isButtonDisable}
          />
        </View> : <View />}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BpjsPayment)
