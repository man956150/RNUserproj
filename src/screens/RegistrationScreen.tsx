import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    Keyboard,
    ScrollView,
    Platform,
    Alert,
    Pressable
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

import COLORS from '../context/colors';
import Button from '../components/Button';
import Input from '../components/Input';
import Loader from '../components/Loader';



const RegistrationScreen = ({ navigation }: any) => {
    const [inputs, setInputs] = useState<any>({
        firstname: '',
        lastname: '',
        email: '',
        mobile: '',
        dateOfBirth: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    // const [date, setDate] = useState(new Date())
    // const [showPicker, setShowPicker] = useState(false)

    const validate = () => {
        Keyboard.dismiss();
        let isValid = true;

        if (!inputs.firstname) {
            handleError('Please input firstname', 'firstname');
            isValid = false;
        }
        if (!inputs.lastname) {
            handleError('Please input lastname', 'lastname');
            isValid = false;
        }

        if (!inputs.email) {
            handleError('Please input email', 'email');
            isValid = false;
        } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
            handleError('Please input a valid email', 'email');
            isValid = false;
        }

        if (!inputs.mobile) {
            handleError('Please input mobile number', 'mobile');
            isValid = false;
        }

        if (!inputs.dateOfBirth) {
            handleError('Please input birthdate', 'dateOfBirth');
            isValid = false;
        }

        if (!inputs.password) {
            handleError('Please input password', 'password');
            isValid = false;
        } else if (inputs.password.length < 5) {
            handleError('Min password length of 5', 'password');
            isValid = false;
        }

        if (isValid) {
            register();
        }
    };

    const register = () => {
        setLoading(true);
        setTimeout(() => {
            try {
                setLoading(false);
                AsyncStorage.setItem('userData', JSON.stringify(inputs));
                navigation.navigate('LoginScreen');
            } catch (error) {
                Alert.alert('Error', 'Something went wrong');
            }
        }, 3000);
    };

    // const toggleDatepicker = () => {
    //     setShowPicker(!showPicker)
    // }

    // const onChange = ({ type }: any, selectedDate: any, text: any, input: any) => {

    //     setInputs(prevState => ({ ...prevState, [input]: text }));
    //     if (type == "set") {
    //         const currentDate = selectedDate;
    //         setDate(currentDate);

    //         if (Platform.OS === "android") {
    //             toggleDatepicker();
    //             setInputs(currentDate.toDateSting());
    //         }
    //     } else {
    //         toggleDatepicker();
    //     }

    // };

    const handleOnchange = (text: any, input: any) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };

    const handleError = (error: any, input: any) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    };

    return (
        <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
            <Loader visible={loading} />
            <ScrollView
                contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}>
                <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: 'bold' }}>
                    Register
                </Text>
                <View style={{ marginVertical: 20 }}>

                    <Input
                        onChangeText={text => handleOnchange(text, 'firstname')}
                        onFocus={() => handleError(null, 'firstname')}
                        iconName="account-outline"
                        label="First Name"
                        placeholder="Enter your first name"
                        error={errors.firstname}
                    />

                    <Input
                        onChangeText={text => handleOnchange(text, 'lastname')}
                        onFocus={() => handleError(null, 'lastname')}
                        iconName="account-outline"
                        label="Last Name"
                        placeholder="Enter your last name"
                        error={errors.lastname}
                    />

                    <Input
                        onChangeText={text => handleOnchange(text, 'email')}
                        onFocus={() => handleError(null, 'email')}
                        iconName="email-outline"
                        label="Email"
                        placeholder="Enter your email address"
                        error={errors.email}
                    />

                    <Input
                        keyboardType="numeric"
                        onChangeText={text => handleOnchange(text, 'mobile')}
                        onFocus={() => handleError(null, 'mobile')}
                        iconName="phone-outline"
                        label="Mobile"
                        placeholder="Enter your mobile number"
                        error={errors.mobile}
                    />

                    <Input
                        onChangeText={text => handleOnchange(text, 'dateOfBirth')}
                        onFocus={() => handleError(null, 'dateOfBirth')}
                        iconName="calendar"
                        label="Date of birth"
                        placeholder="Enter your date of birth"
                        error={errors.dateOfBirth}
                    />

                    <Input
                        onChangeText={text => handleOnchange(text, 'password')}
                        onFocus={() => handleError(null, 'password')}
                        iconName="lock-outline"
                        label="Password"
                        placeholder="Enter your password"
                        error={errors.password}
                        password
                    />

                    <Button title="Register" onPress={validate} />

                    <Text
                        onPress={() => navigation.navigate('LoginScreen')}
                        style={{
                            color: COLORS.black,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            fontSize: 16,
                        }}>
                        Already have account ? Login
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default RegistrationScreen;