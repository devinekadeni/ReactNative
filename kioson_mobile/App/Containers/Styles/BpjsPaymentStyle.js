import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics } from '../../Themes/'
import { moderateScale } from '../../Transforms/Scaling'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  form: {
    backgroundColor: Colors.white_two,
    paddingBottom: ratioHeight(10)
  },
  fotter: {
    backgroundColor: Colors.white_two,
    marginTop: ratioHeight(10),
    marginLeft: ratioWidth(10),
    marginRight: ratioWidth(10),
    paddingVertical: ratioHeight(10),
    paddingHorizontal: ratioWidth(15),
    borderRadius: moderateScale(3)
  },
  textfotter: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(Fonts.size.small),
    color: Colors.greyish
  },

  textFieldDropDown: {
    flex: 1,
    fontFamily: Fonts.type.robotoLight,
    fontSize: moderateScale(Fonts.size.medium),
    color: Colors.slate_grey,
    paddingTop: ratioHeight(7),
    paddingBottom: ratioHeight(7),
    marginHorizontal: ratioWidth(10)
  },
  textFieldPriceDropDown: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    color: Colors.greyish,
    paddingTop: ratioHeight(7),
    paddingBottom: ratioHeight(7)
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.black_15
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  dropDown: {
    position: 'absolute',
    maxHeight: ratioHeight(200),
    width: ratioWidth(Metrics.screenWidth),
    right: ratioWidth(10),
    borderRadius: 3,
    paddingLeft: ratioWidth(10),
    paddingRight: ratioWidth(10),
    backgroundColor: Colors.white_two,
    elevation: 5
  },
  dropDownComp: {
    flex: 1,
    position: 'absolute',
    width: Metrics.screenWidth
  }
})
