import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import * as Yup from 'yup';
import {Formik} from 'formik';

const passwordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Should be a min of 4 characters')
    .max(16, 'Should be a max of 16 characters')
    .required('This is a required field'),
});

const App = () => {
  const [password, setPassword] = useState('');
  const [lowerCase, setLowerCase] = useState(true);
  const [uppercase, setUppercase] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [isPassGenerated, setIsPassGenerated] = useState(false);

  const generatePasswordString = (passwordLength: number) => {
    let characterList = '';
    const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const digNumbers = '0123456789';
    const specialSymbols = '!@#$%^&*()_+[]{}|;:,.<>?/';

    if (uppercase) {
      characterList += upperCaseLetters;
    }
    if (lowerCase) {
      characterList += lowerCaseLetters;
    }
    if (symbols) {
      characterList += specialSymbols;
    }
    if (numbers) {
      characterList += digNumbers;
    }

    const passwordResult = createPassword(characterList, passwordLength);
    setPassword(passwordResult);
    setIsPassGenerated(true);
  };

  const createPassword = (characters: string, passwordLength: number) => {
    let results = '';
    for (let i = 0; i < passwordLength; i++) {
      const charIndex = Math.round(Math.random() * characters.length);
      results += characters.charAt(charIndex);
    }
    return results;
  };

  const resetPassword = () => {
    setIsPassGenerated(false);
    setPassword('');
    setLowerCase(true);
    setUppercase(false);
    setSymbols(false);
    setNumbers(false);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
            initialValues={{passwordLength: ''}}
            validationSchema={passwordSchema}
            onSubmit={values => {
              generatePasswordString(+values.passwordLength);
            }}>
            {({
              values,
              errors,
              touched,
              handleChange,
              isValid,
              handleSubmit,
              handleReset,
            }) => (
              <>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.heading}>Password Length</Text>
                  </View>
                  <View style={styles.inputClass}>
                    <TextInput
                      style={styles.inputStyle}
                      value={values.passwordLength}
                      onChangeText={handleChange('passwordLength')}
                      placeholder="Password Length"
                      keyboardType="numeric"
                    />
                    {errors.passwordLength && touched.passwordLength && (
                      <Text style={styles.errorText}>
                        {errors.passwordLength}
                      </Text>
                    )}
                  </View>
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Lowercase</Text>
                  <BouncyCheckbox
                    isChecked={lowerCase}
                    onPress={() => setLowerCase(!lowerCase)}
                    fillColor="#29ab87"
                    style={styles.inputStyles}
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Uppercase</Text>
                  <BouncyCheckbox
                    isChecked={uppercase}
                    onPress={() => setUppercase(!uppercase)}
                    fillColor="#fed85d"
                    style={styles.inputStyles}
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Special Characters</Text>
                  <BouncyCheckbox
                    isChecked={symbols}
                    onPress={() => setSymbols(!symbols)}
                    fillColor="#c9a0dc"
                    style={styles.inputStyles}
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Number</Text>
                  <BouncyCheckbox
                    isChecked={numbers}
                    onPress={() => setNumbers(!numbers)}
                    fillColor="#fc8085"
                    style={styles.inputStyles}
                  />
                </View>

                <View style={styles.formActions}>
                  <TouchableOpacity
                    disabled={!isValid}
                    onPress={() => handleSubmit()}
                    style={styles.primaryBtn}>
                    <Text style={styles.primaryBtnTxt}>Generate Password</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => {
                      resetPassword();
                      handleReset();
                    }}>
                    <Text style={styles.secondaryBtnTxt}>Reset Password</Text>
                  </TouchableOpacity>
                </View>

                {isPassGenerated && (
                  <View style={[styles.card, styles.cardElevated]}>
                    <Text style={styles.subTitle}>Result:</Text>
                    <Text style={styles.description}>Long Press to copy</Text>
                    <Text selectable style={styles.generatedPassword}>
                      {password}
                    </Text>
                  </View>
                )}
              </>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1,
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '60%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  inputStyles: {
    width: '10%',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color: '#000',
  },
  inputClass: {
    width: '100%',
    marginLeft: 30,
  },
});
