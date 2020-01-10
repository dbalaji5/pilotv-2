import React,{useCallback, useState}from 'react';
import {Stack,RadioButton} from '@shopify/polaris';
export default function Setting(props) {
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
        label="Generate"
        checked={value === 'generate'}
        id="generate"
        name="accounts"
        onChange={handleChange}
      />
      <RadioButton
        label="Interpret"
        id="interpret"
        name="accounts"
        checked={value === 'interpret'}
        onChange={handleChange}
      />
    </Stack>
  );
}