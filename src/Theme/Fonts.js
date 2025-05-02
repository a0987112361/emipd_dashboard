// import { Screen } from 'App/Helpers';
import Colors from './Colors';

const fontFamily = {
  default: 'Roboto',
};

const size = {
  h1: '38px',
  h2: '34px',
  h3: '30px',
  h4: '26px',
  input: '18px',
  regular: '16px',
  medium: '14px',
  small: '12px',
};

const style = {
  h1: {
    fontSize: size.h1,
  },
  h2: {
    fontSize: size.h2,
  },
  h3: {
    fontSize: size.h3,
  },
  h4: {
    fontSize: size.h4,
  },
  regular: {
    fontSize: size.regular,
    fontWeight: '500',
  },
  medium: {
    fontSize: size.medium,
  },
  small: {
    fontSize: size.small,
  },
  bold: { fontWeight: 'bold' },
  italic: { fontStyle: 'italic' },
  underline: { textDecorationLine: 'underline' },

  // ------------------------------------
  //          Oakary definitions
  // ------------------------------------
  smallText: {
    fontSize: '0.8em',
    fontWeight: 100,
    verticalAlign: 'middle',
  },

  mostBoldText: {
    fontFamily: 'Roboto-Bold',
    weight: 900,
  },

  middleText: {
    fontSize: '14px',
  },
  bigText: {
    fontSize: '16px',
  },
  largeText: {
    fontFamily: 'Roboto-Bold',
    fontSize: '18px',
  },

  largestText: {
    fontFamily: 'Roboto-Bold',
    fontSize: '22px',
  },

  smallRedText: {
    ...this.smallText,
    color: Colors.red,
  },

  smallGreenText: {
    ...this.smallText,
    color: Colors.baseGreen,
  },

  smallOrangeText: {
    ...this.smallText,
    color: Colors.orange,
  },

  smallYellowText: {
    ...this.smallText,
    color: Colors.warnning,
  },

  smallBlueText: {
    ...this.smallText,
    color: Colors.mainBlue,
  },

  smallWhiteText: {
    ...this.smallText,
    color: Colors.white,
  },

  smallGaryText: {
    ...this.smallText,
    color: Colors.textGary,
  },

  middleBlackText: {
    ...this.middleText,
    color: Colors.black,
  },

  middleGreenText: {
    ...this.middleText,
    color: Colors.calendarGreen,
  },

  middleGrayText: {
    ...this.middleText,
    color: Colors.textGary,
  },

  bMiddleGrayText: {
    ...this.middleText,
    fontWeight: '500',
    color: Colors.textGary,
  },

  bMiddleGreenText: {
    ...this.middleText,
    color: Colors.calendarGreen,
    fontWeight: '500',
  },

  bMiddleBlackText: {
    ...this.middleBlackText,
    fontSize: '500',
  },

  bMiddleBlueText: {
    ...this.middleText,
    color: Colors.mainBlue,
    fontSize: '500',
  },

  middleBlueText: {
    ...this.middleText,
    color: Colors.mainBlue,
  },

  middleWhiteText: {
    ...this.middleText,
    color: Colors.white,
  },

  middleRedText: {
    ...this.middleText,
    color: Colors.red,
    fontWeight: '500',
  },

  bigWhiteText: {
    ...this.bigText,
    color: Colors.white,
  },

  bigBlueText: {
    ...this.bigText,
    color: Colors.mainBlue,
  },

  bigGrayText: {
    ...this.bigText,
    color: Colors.textGary,
  },

  bigBlackText: {
    ...this.bigText,
    color: Colors.black,
  },

  bBigBlueText: {
    ...this.middleText,
    color: Colors.textBlue,
    fontWeight: '500',
  },

  bBigBlackText: {
    ...this.bigBlackText,
    fontWeight: '500',
  },

  bBigWhiteText: {
    ...this.bigWhiteText,
    fontWeight: '500',
  },

  largeBlueText: {
    ...this.largeText,
    fontWeight: '500',
    color: Colors.mainBlue,
  },

  largeGrayText: {
    ...this.largeText,
    fontWeight: '500',
    color: Colors.textGary,
  },

  largestBlueText: {
    ...this.largestText,
    fontWeight: '500',
    color: Colors.mainBlue,
  },
};

export default {
  size,
  style,
  fontFamily,
};
