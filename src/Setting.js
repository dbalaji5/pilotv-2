import React,{useCallback, useState}from 'react';
import {SettingToggle,TextStyle} from '@shopify/polaris';
export default function Setting(props) {
    const [active, setActive] = useState(false);
  
    const handleToggle = useCallback(() => {
        setActive((active) => !active)
        
    }, []);
  
    const contentStatus = active ? 'Generate' : 'Interpret';

    const textStatus = active ? 'Interpret' : 'Generate';
  
    return (
      <React.Fragment>
      <SettingToggle
        action={{
          content: contentStatus,
          onAction: handleToggle,
          
        }}
        enabled={active}
      >
           The Option Selected is <TextStyle variation="strong" onChange={()=> props.onChange({textStatus})}>{textStatus}</TextStyle>
      </SettingToggle>

     
      </React.Fragment>
    );
  }