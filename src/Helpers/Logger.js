import { Alert } from 'react-native';

export function error(tag, errorObject) {
  // print error message
  console.log(`@ERROR - ${tag}`, errorObject);

  return false;
}

export default {
  error,
};
