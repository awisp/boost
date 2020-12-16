import React, { FunctionComponent } from "react"
import {
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native"
import { useTranslation } from "react-i18next"
import { useNavigation } from "@react-navigation/native"
import {
  createStackNavigator,
  HeaderStyleInterpolators,
} from "@react-navigation/stack"

import {
  HowItWorksStackScreen,
  HowItWorksStackScreens,
  Stacks,
} from "../navigation/index"
import HowItWorksScreen from "../HowItWorks/HowItWorksScreen"
import { applyHeaderLeftBackButton } from "./HeaderLeftBackButton"
import { useConfigurationContext } from "../ConfigurationContext"

import { Images } from "../assets"
import { Colors, Spacing, Typography } from "../styles"

const Stack = createStackNavigator()

interface HowItWorksStackProps {
  mountLocation: "Onboarding" | "Settings"
}

type HowItWorksScreenDatum = {
  name: HowItWorksStackScreen
  image: ImageSourcePropType
  imageLabel: string
  header: string
  primaryButtonLabel: string
  primaryButtonOnPress: () => void
}

const HowItWorksStack: FunctionComponent<HowItWorksStackProps> = ({
  mountLocation,
}) => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const {
    enableExposureNotification
  } = useConfigurationContext()

  const handleOnNavigateOutOfStack = () => {
    switch (mountLocation) {
      case "Onboarding": {
        navigation.navigate(Stacks.Activation)
        break
      }
      case "Settings": {
        navigation.goBack()
        break
      }
    }
  }
  const handleOnPressSkip = handleOnNavigateOutOfStack
  const handleOnPressNextOnGetNotified = handleOnNavigateOutOfStack

  const introduction: HowItWorksScreenDatum = {
    name: HowItWorksStackScreens.Introduction,
    image: Images.HowItWorksIntroduction,
    imageLabel: t("onboarding.screen1_image_label"),
    header: t("onboarding.screen1_header"),
    primaryButtonLabel: t("onboarding.screen1_button"),
    primaryButtonOnPress: () =>
      navigation.navigate(HowItWorksStackScreens.PhoneRemembersDevices),
  }
  const phoneRemembersDevices: HowItWorksScreenDatum = {
    name: HowItWorksStackScreens.PhoneRemembersDevices,
    image: Images.HowItWorksPhoneRemembersDevice,
    imageLabel: t("onboarding.screen2_image_label"),
    header: t("onboarding.screen2_header"),
    primaryButtonLabel: t("onboarding.screen2_button"),
    primaryButtonOnPress: () =>
      navigation.navigate(HowItWorksStackScreens.PersonalPrivacy),
  }
  const personalPrivacy: HowItWorksScreenDatum = {
    name: HowItWorksStackScreens.PersonalPrivacy,
    image: Images.HowItWorksPersonalPrivacy,
    imageLabel: t("onboarding.screen3_image_label"),
    header: t("onboarding.screen3_header"),
    primaryButtonLabel: t("onboarding.screen3_button"),
    primaryButtonOnPress: () =>
      navigation.navigate(HowItWorksStackScreens.GetNotified),
  }
  const getNotified: HowItWorksScreenDatum = {
    name: HowItWorksStackScreens.GetNotified,
    image: Images.HowItWorksGetNotified,
    imageLabel: t("onboarding.screen4_image_label"),
    header: t("onboarding.screen4_header"),
    primaryButtonLabel: t("onboarding.screen4_button"),
    primaryButtonOnPress: handleOnPressNextOnGetNotified,
  }

  const introductionVaccineApp: HowItWorksScreenDatum = {
    name: HowItWorksStackScreens.Introduction,
    image: Images.HowItWorksIntroduction,
    imageLabel: t("vaccine_onboarding.screen1_image_label"),
    header: t("vaccine_onboarding.screen1_header"),
    primaryButtonLabel: t("vaccine_onboarding.screen1_button"),
    primaryButtonOnPress: () =>
      navigation.navigate(HowItWorksStackScreens.PhoneRemembersDevices),
  }
  const phoneRemembersDevicesVaccineApp: HowItWorksScreenDatum = {
    name: HowItWorksStackScreens.PhoneRemembersDevices,
    image: Images.HowItWorksPhoneRemembersDevice,
    imageLabel: t("vaccine_onboarding.screen2_image_label"),
    header: t("vaccine_onboarding.screen2_header"),
    primaryButtonLabel: t("vaccine_onboarding.screen2_button"),
    primaryButtonOnPress: () =>
      navigation.navigate(HowItWorksStackScreens.PersonalPrivacy),
  }
  const personalPrivacyVaccineApp: HowItWorksScreenDatum = {
    name: HowItWorksStackScreens.PersonalPrivacy,
    image: Images.HowItWorksPersonalPrivacy,
    imageLabel: t("vaccine_onboarding.screen3_image_label"),
    header: t("vaccine_onboarding.screen3_header"),
    primaryButtonLabel: t("vaccine_onboarding.screen3_button"),
    primaryButtonOnPress: () =>
      navigation.navigate(HowItWorksStackScreens.GetNotified),
  }
  const getNotifiedVaccineApp: HowItWorksScreenDatum = {
    name: HowItWorksStackScreens.GetNotified,
    image: Images.HowItWorksGetNotified,
    imageLabel: t("vaccine_onboarding.screen4_image_label"),
    header: t("vaccine_onboarding.screen4_header"),
    primaryButtonLabel: t("vaccine_onboarding.screen4_button"),
    primaryButtonOnPress: handleOnPressNextOnGetNotified,
  }

  const howItWorksScreenData: HowItWorksScreenDatum[] = [
    introduction,
    phoneRemembersDevices,
    personalPrivacy,
    getNotified,
  ]

  const howItWorksScreenDataVaccineFocus: HowItWorksScreenDatum[] = [
    introductionVaccineApp,
    phoneRemembersDevicesVaccineApp,
    personalPrivacyVaccineApp,
    getNotifiedVaccineApp,
  ]

  const toStackScreen = (datum: HowItWorksScreenDatum) => {
    return (
      <Stack.Screen key={datum.header} name={datum.name}>
        {(props) => (
          <HowItWorksScreen {...props} howItWorksScreenContent={datum} />
        )}
      </Stack.Screen>
    )
  }

  const headerRight = () => <HeaderRight />
  const HeaderRight = () => {
    return (
      <TouchableOpacity
        onPress={handleOnPressSkip}
        style={style.skipButtonContainer}
      >
        <Text style={style.skipButtonText}>{t("common.skip")}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <Stack.Navigator
      screenOptions={{
        title: "",
        headerLeft: applyHeaderLeftBackButton(),
        headerRight: headerRight,
        headerStyleInterpolator: HeaderStyleInterpolators.forNoAnimation,
      }}
    >
      {enableExposureNotification ? 
        howItWorksScreenData.map(toStackScreen) : 
        howItWorksScreenDataVaccineFocus.map(toStackScreen) 
      }
    </Stack.Navigator>
  )
}

const style = StyleSheet.create({
  skipButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.small,
    padding: Spacing.xSmall,
  },
  skipButtonText: {
    ...Typography.body.x20,
    color: Colors.neutral.shade100,
  },
})

const MemoizedHowItWorksStack = React.memo(HowItWorksStack)

export default MemoizedHowItWorksStack
