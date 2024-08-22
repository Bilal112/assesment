import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, Pressable, Alert} from 'react-native';
import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {View as AnimateView} from 'react-native-animatable';
import {yupResolver} from '@hookform/resolvers/yup';
import {useTranslation} from 'react-i18next';

// Components
import Layout from '../../../container/Layout';
import Title from '@components/Title';
import Button from '@components/Button';
import Input from '@components/InputControl';
import {Eye, EyeOff} from '@assets/svgIcons';
import ModalContainer from 'src/container/ModalContainer';
import ForgetPassword from '../ForgetPassword';

// Assets
import Colors from '@utils/theme';
import DefaultStyle from '@constants/style';
import {loginSchema} from '@utils/schema';
import axios from 'axios';
import {useMutation} from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {addUser} from '@actions/loginSlice';

const Login = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const colors = Colors();
  const styles = Styles(colors);
  const ds = DefaultStyle(colors);

  const [showForgetModal, setShowForgetModal] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: 'demo@harvestapp.com',
      password: 'HarvestTest#456',
    },
  });
  console.log(errors);
  interface LoginResponse {
    token: string;
  }
  const loginUser = async (sendData: {
    email: string;
    password: string;
  }): Promise<LoginResponse> => {
    const response = await axios.post<LoginResponse>(
      'https://api.getharvest.app/auth/login',
      sendData,
    );
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: (newTodo: any) => {
      return loginUser(newTodo);
    },
  });

  const {isPending} = mutation;

  const onSuccess = data => {
    AsyncStorage.setItem('@accessToken', data?.access_token);
    dispatch(addUser(data));
  };
  const onError = error => {
    Alert.alert('Login Failed');
  };
  // OnSubmit handler
  const onSubmit = (data: {email: string; password: string}) => {
    mutation.mutate(data, {onSuccess, onError});
  };

  return (
    <Layout>
      <AnimateView animation="fadeInRight" delay={100}>
        <Title title={t('Login')} color={colors.black} size={30} />
      </AnimateView>

      <Input
        name="email"
        placeholder={t('Email Address or Username')}
        control={control}
        validation={errors.email}
        animation="fadeInRight"
        delay={200}
      />

      <Input
        secureTextEntry={showPassword}
        name="password"
        placeholder={t('Password')}
        control={control}
        validation={errors.password}
        delay={300}
        Icon={showPassword ? Eye : EyeOff}
        onPress={() => setShowPassword(!showPassword)}
        animation="fadeInRight"
      />

      <AnimateView
        animation="fadeInRight"
        delay={400}
        style={[ds.mt_16, ds.row, ds.ai_center]}>
        <Text style={[styles.forgetPassword, {color: colors.lightBlack}]}>
          Forgot pin?
        </Text>
        <Pressable onPress={() => setShowForgetModal(!showForgetModal)}>
          <Text style={styles.forgetPassword}>{t(' Reset')}</Text>
        </Pressable>
      </AnimateView>

      <AnimateView animation="fadeInRight" delay={500} style={ds.mt_16}>
        <Button
          loading={isPending} // Show loading based on mutation state
          name={t('Login')}
          onPress={handleSubmit(onSubmit)} // Submit the form
        />
      </AnimateView>

      <AnimateView
        animation="fadeIn"
        delay={700}
        style={[
          ds.mt_16,
          ds.row,
          ds.jc_space_between,
          ds.ai_center,
          {alignSelf: 'center'},
        ]}>
        <Text style={styles.endText}>
          {t("Don't have an account? ")}
          <Text onPress={() => {}} style={styles.forgetPassword}>
            {' '}
            {t('Sign up')}
          </Text>
        </Text>
      </AnimateView>

      {showForgetModal && (
        <ModalContainer
          status={showForgetModal}
          onClose={() => setShowForgetModal(!showForgetModal)}>
          <ForgetPassword
            dispatch={dispatch}
            onClose={() => setShowForgetModal(!showForgetModal)}
          />
        </ModalContainer>
      )}
    </Layout>
  );
};

export default Login;

const Styles = (colors: any) =>
  StyleSheet.create({
    endText: {
      fontSize: 12,
      color: colors.gray,
      fontFamily: colors.font,
      flexDirection: 'row',
    },
    forgetPassword: {
      fontSize: 12,
      color: colors.primary,
      fontFamily: colors.fontMedium,
    },
  });
