'use client';

import React from 'react';
import { Flex } from '@chakra-ui/react';

interface IconBoxProps {
  icon: React.ReactNode;
  bg?: string;
  w?: string;
  h?: string;
  [x: string]: any;
}

export default function IconBox(props: IconBoxProps) {
  const { icon, bg, ...rest } = props;

  return (
    <Flex
      alignItems={'center'}
      justifyContent={'center'}
      borderRadius={'12px'}
      bg={bg || 'teal.300'}
      {...rest}
    >
      {icon}
    </Flex>
  );
} 