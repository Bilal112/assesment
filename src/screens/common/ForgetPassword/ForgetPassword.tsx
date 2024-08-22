import React, {useState, useRef} from 'react';
import {useForm} from 'react-hook-form';
import {View as AnimateView} from 'react-native-animatable';
import {yupResolver} from '@hookform/resolvers/yup';
import {View} from 'react-native';

//Components
import Title from '@components/Title';
import Button from '@components/Button';
import Input from '@components/InputControl';
import {Email} from '@assets/svgIcons';

///Assets
import Colors from '@utils/theme';
import DefaultStyle from '@constants/style';
import {IColors, IStyles} from '@constants/Interfaces';

//Action
import {forgetSchema} from '@utils/schema';
import {useTranslation} from 'react-i18next';
import Toast from 'react-native-toast-message';
import {showDefaultLoading} from '@actions/utilSlice';

const ForgetPassword = ({onClose, dispatch}) => {
  const {t} = useTranslation();
  const colors: IColors = Colors();
  const ds: IStyles = DefaultStyle(colors);

  const TitleRef: any = useRef();
  const InputRef: any = useRef();
  const ButtonRef: any = useRef();

  const {
    control,
    handleSubmit,
    formState: {errors},
    setError,
  } = useForm({
    resolver: yupResolver(forgetSchema),
    defaultValues: {
      emailAddress: '',
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async values => {};

  const _renderInputContent = () => (
    <View style={{paddingTop: 20, paddingHorizontal: 18}}>
      <AnimateView ref={TitleRef} animation="fadeInUp" delay={100}>
        <Title
          title={t('Having Trouble Logging In?')}
          subHeading={t(
            'Please insert your email address and click the Reset password button to start the process.',
          )}
        />
      </AnimateView>

      <Input
        name="emailAddress"
        placeholder={t('Email Address')}
        control={control}
        validation={errors.emailAddress}
        Icon={Email}
        animation="fadeInUp"
        delay={200}
        animationRef={InputRef}
      />

      <AnimateView
        ref={ButtonRef}
        animation="fadeInUp"
        delay={300}
        style={ds.mt_16}>
        <Button
          loading={loading}
          name={t('Reset Password')}
          onPress={handleSubmit(onSubmit)}
        />
      </AnimateView>
    </View>
  );

  return <View>{_renderInputContent()}</View>;
};

export default ForgetPassword;
