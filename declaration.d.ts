declare module '*.jpg';
declare module '*.png';
declare module '*.mp3';

declare module '*.svg' {
  import React from 'react';
  import {SvgProps} from 'react-native-svg';

  const content: React.FC<SvgProps>;
  export default content;
}
