import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default function SkeletonRow({
  width = 50,
  height = 13,
  marginTop = 0,
  borderRadius = 6,
  backgroundColor = 'rgba(237, 237, 237,0.7)',
}) {
  return (
    <SkeletonPlaceholder.Item
      marginTop={marginTop}
      width={width}
      height={height}
      borderRadius={borderRadius}
      backgroundColor={backgroundColor}
    />
  );
}
