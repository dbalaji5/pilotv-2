import React,{useCallback, useState}from 'react';
import {Stack,RadioButton} from '@shopify/polaris';
export default function MethodSetting(props) {
  const [value, setValue] = useState('generate');

  const handleChange = useCallback(
    (_checked, newValue) => 
    {
      setValue(newValue)
      props.onClick(newValue);
    },
    [],
  );

  return (
    <Stack>
      <RadioButton
        label="PCA"
        checked={value === 'PCA'}
        id="PCA"
        name="acc"
        onChange={handleChange}
      />
      <RadioButton
        label="linear combination"
        id="lc"
        name="lc"
        checked={value === 'lc'}
        onChange={handleChange}
      />
    </Stack>
  );
}