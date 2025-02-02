import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {useBreakpoints} from '../../../../hooks';
import {Container, TextSkip, Wrapper, SkipIcon} from './Skip85.styles';
import {helpers} from '../../../../utils';
import Video from 'react-native-video';
import {Aniskip} from '../../../../@types';

type Props = {
  videoRef: React.RefObject<Video>;
  currentTime: number;
  duration: number;
  opSkipTimes: Aniskip | undefined;
  edSkipTimes: Aniskip | undefined;
};

const Skip85: React.FC<Props> = ({
  videoRef,
  currentTime,
  duration,
  opSkipTimes,
  edSkipTimes,
}) => {
  const {isMobile} = useBreakpoints();

  const [changeSkip, setChangeSkip] = useState<'op' | 'ed' | false>(false);
  const handleSkip = () => {
    if (changeSkip === 'op') {
      videoRef.current!.seek(opSkipTimes?.interval?.endTime!);
    }

    // if (changeSkip === 'ed') {
    //   videoRef.current!.seek(edSkipTimes?.interval?.endTime!, 0);
    // }

    videoRef.current!.seek(currentTime + 85, 0);
  };

  // useEffect(() => {
  //   const watchPoint = Math.floor((currentTime / duration) * 100);
  //   if (watchPoint >= 90) {
  //     setChangeSkip(true);
  //   }
  // }, [currentTime]);

  // change button to skip intro if currentTime is greater than or equal to opSkipTimes?.startTime and less than or equal to opSkipTimes?.endTime
  useEffect(() => {
    //convert currentTime to seconds
    const currentTimeInSeconds = currentTime;

    if (
      currentTimeInSeconds >= opSkipTimes?.interval.startTime! &&
      currentTimeInSeconds <= opSkipTimes?.interval.endTime!
    ) {
      if (changeSkip !== 'op') setChangeSkip('op');
    } else {
      if (changeSkip === 'op') setChangeSkip(false);
    }
  }, [currentTime]);

  if (changeSkip === 'op')
    return (
      <Container>
        <Wrapper onPress={handleSkip} isMobile={isMobile}>
          <TextSkip>Skip Intro</TextSkip>
        </Wrapper>
      </Container>
    );

  // if (changeSkip === 'ed')
  //   return (
  //     <Container>
  //       <Wrapper onPress={handleSkip} isMobile={isMobile}>
  //         <TextSkip>Next episode</TextSkip>
  //         <SkipIcon name="fast-forward" />
  //       </Wrapper>
  //     </Container>
  //   );

  return (
    <Container>
      <Wrapper onPress={handleSkip} isMobile={isMobile}>
        <TextSkip>85S</TextSkip>
        <SkipIcon name="forward" />
      </Wrapper>
    </Container>
  );
};

export default Skip85;
