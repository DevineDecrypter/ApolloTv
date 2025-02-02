import React from 'react';
import {Wrapper} from './ForwardGesture.styles';
import TapGesture from '../TapGesture';

type Props = {
  handleInactive: () => void;
  currentTime: number;
  isBuffering: boolean;
  videoRef: any;

  shouldShow: boolean;
  time: number;
};

const ForwardGesture: React.FC<Props> = ({
  handleInactive,
  currentTime,
  isBuffering,
  videoRef,
  shouldShow,
  time,
}) => {
  const onGesture = () => {
    if (isBuffering) return;
    videoRef.current.seek(currentTime + time);
  };

  if (!shouldShow) return null;
  return (
    <TapGesture
      numberOfTaps={2}
      tapFunction={onGesture}
      singleTapFunction={handleInactive}>
      <Wrapper />
    </TapGesture>
  );
};

export default ForwardGesture;
