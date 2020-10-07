import {
  IonContent,
  IonIcon, IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonTitle,
} from '@ionic/react';

import React from 'react';
import { useLocation } from 'react-router-dom';
import { archiveOutline, archiveSharp, heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, personAddSharp, personAddOutline, bookSharp, bookOutline,  giftSharp, giftOutline } from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Wallet',
    url: '/page/wallet',
    iosIcon: mailOutline,
    mdIcon: mailSharp
  },
  {
    title: 'Documents',
    url: '/page/documents',
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneSharp
  },
  {
    title: 'Settings',
    url: '/page/settings',
    iosIcon: heartOutline,
    mdIcon: heartSharp
  },
  {
    title: 'Help',
    url: '/page/help',
    iosIcon: archiveOutline,
    mdIcon: archiveSharp
  },
];
const labels: AppPage[] = [
  {
    title: 'Contacts',
    url: '/page/contacts',
    iosIcon: personAddSharp,
    mdIcon: personAddOutline
  },
  {
    title: 'View signing phrase',
    url: '/page/phrase',
    iosIcon: bookOutline,
    mdIcon: bookSharp
  },
  {
    title: 'Account',
    url: '/page/account',
    iosIcon: giftOutline,
    mdIcon: giftSharp
  }
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="push">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Menu</IonListHeader>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        <IonList id="labels-list">
          {labels.map((appPage, index) => {
            return (
                <IonMenuToggle key={index} autoHide={false}>
                  <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                    <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                    <IonLabel>{appPage.title}</IonLabel>
                  </IonItem>
                </IonMenuToggle>
            );
          })}
        </IonList>
        <IonItem>
          <IonImg class="avatar" src="/assets/images/avatar-placeholder.png"/>
          <IonItem>
            <IonTitle>
              <span>John Doe</span>
              {/*<small>XYC Community</small>*/}
            </IonTitle>
          </IonItem>
        </IonItem>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
