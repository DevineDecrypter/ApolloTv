import React from 'react';
import {ScrollView, SharedContainer, Title} from '../../../styles/sharedStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextContainer} from '../SettingScreens.styles';
import {BackButtonComponent, Settings} from '../../../components';
import {SettingsContext} from '../../../contexts';

const SyncingSettingScreen = () => {
  const {privateMode, changePrivateMode} = React.useContext(SettingsContext);

  return (
    <SafeAreaView>
      <SharedContainer>
        <TextContainer>
          <BackButtonComponent isModal={false} />
          <Title>Syncing Settings</Title>
        </TextContainer>

        <ScrollView style={{paddingTop: 30, marginTop: 15}}>
          <Settings.Setting
            title="Private mode"
            descriptor="Keep your watch history between you and yourself only"
            selectedOption={privateMode === 'on' ? 'On' : 'Off'}
            onPress={() => {
              if (changePrivateMode) changePrivateMode();
            }}
          />
        </ScrollView>
      </SharedContainer>
    </SafeAreaView>
  );
};

export default SyncingSettingScreen;
