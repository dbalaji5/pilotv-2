import React, {useCallback, useState} from 'react';
import {RangeSlider} from '@shopify/polaris';

export default function Ranger(props) {
  const [rangeValue, setRangeValue] = useState(props.min);

  const handleRangeSliderChange = useCallback(
    (value) => {
      setRangeValue(value);
      props.onChange(value);
    },
    [],
  );
  const suffixStyles = {
    minWidth: '24px',
    textAlign: 'right',
  };

  return (

      <RangeSlider
        min={props.min}
        max={props.max}
        value={rangeValue}
        onChange={handleRangeSliderChange}
        output
        suffix={<p style={suffixStyles}>{rangeValue}</p>}
      />
    
  );
}
