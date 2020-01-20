import React, {useCallback, useRef, useState} from 'react';
import {AppProvider,  Frame, Navigation, Toast, TopBar} from '@shopify/polaris';
import {HomeMajorMonotone, DataVisualizationMajorMonotone} from '@shopify/polaris-icons';
import '@shopify/polaris/styles.css';
import Comparator from './Comparator.js'
import DashBoard from './DashBoard.js';

export default function FrameBoard() {
  const defaultState = useRef({
    emailFieldValue: 'balajid@dal.ca',
    nameFieldValue: 'Logged in',
  });
  const skipToContentRef = useRef(null);

  const [toastActive, setToastActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

 
  const [userMenuActive, setUserMenuActive] = useState(false);
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);

 
  const [storeName, setStoreName] = useState(
    defaultState.current.nameFieldValue,
  );



  const toggleToastActive = useCallback(
    () => setToastActive((toastActive) => !toastActive),
    [],
  );
  const toggleUserMenuActive = useCallback(
    () => setUserMenuActive((userMenuActive) => !userMenuActive),
    [],
  );
  const toggleMobileNavigationActive = useCallback(
    () =>
      setMobileNavigationActive(
        (mobileNavigationActive) => !mobileNavigationActive,
      ),
    [],
  );
  const toggleIsLoading = useCallback(
    () => setIsLoading(() => false),
    [],
  );
  const toggleIsLoading2 = useCallback(
    () => setIsLoading(() => true),
    [],
  );


  const toastMarkup = toastActive ? (
    <Toast onDismiss={toggleToastActive} content="Changes saved" />
  ) : null;

  const userMenuActions = [
    {
      items: [{content: 'Account'}],
    },
  ];



  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={userMenuActions}
      name="VVALAB"
      detail={storeName}
      initials="D"
      open={userMenuActive}
      onToggle={toggleUserMenuActive}
    />
  );



  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      onNavigationToggle={toggleMobileNavigationActive}
    />
  );

  const navigationMarkup = (
    <Navigation location="/">
      {/* <Navigation.Section
        items={[
          {
            label: 'Back',
            icon: ArrowLeftMinor,
            onClick: switchContent
          },
        ]}
      /> */}
      <Navigation.Section
        separator
        title="HRM"
        items={[
          {
            label: 'Index',
            icon: HomeMajorMonotone,
            onClick: toggleIsLoading,
          },
          {
            label: 'Index Compare',
            icon: DataVisualizationMajorMonotone,
            onClick: toggleIsLoading2,
          },
        ]}
     
      />
    </Navigation>
  );

  const loadingMarkup = null;



  const actualPageMarkup = (
  
    <DashBoard/>
  );

  const loadingPageMarkup = (
  
    <Comparator/>
  );

  const pageMarkup = isLoading ? loadingPageMarkup : actualPageMarkup;



  const theme = {
    colors: {
      topBar: {
        background: '#357997',
      },
    },
    logo: {
      width: 124,
      topBarSource:
        'https://dalu-my.sharepoint.com/:i:/r/personal/bl977277_dal_ca/Documents/HRM.png?csf=1&e=NVVU6T',
      contextualSaveBarSource:
        'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-gray.svg?6215648040070010999',
      url: 'http://localhost:2000',
      accessibilityLabel: 'VVA LAB',
    },
  };

  return (
    <div style={{height: '500px'}}>
      <AppProvider
        theme={theme}
        i18n={{
          Polaris: {
            Avatar: {
              label: 'Avatar',
              labelWithInitials: 'Avatar with initials {initials}',
            },
            ContextualSaveBar: {
              save: 'Save',
              discard: 'Discard',
            },
            TextField: {
              characterCount: '{count} characters',
            },
            TopBar: {
              toggleMenuLabel: 'Toggle menu',

              SearchField: {
                clearButtonLabel: 'Clear',
                search: 'Search',
              },
            },
            Modal: {
              iFrameTitle: 'body markup',
            },
            Frame: {
              skipToContent: 'Skip to content',
              Navigation: {
                closeMobileNavigationLabel: 'Close navigation',
              },
            },
          },
        }}
      >
        <Frame
          topBar={topBarMarkup}
          navigation={navigationMarkup}
          showMobileNavigation={mobileNavigationActive}
          onNavigationDismiss={toggleMobileNavigationActive}
          skipToContentTarget={skipToContentRef.current}
        >
          
          {loadingMarkup}
          {pageMarkup}
         
          
        </Frame>
      </AppProvider>
    </div>
  );
}
