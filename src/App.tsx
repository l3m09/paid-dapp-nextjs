// import Menu from './components/Menu';
import Page from './pages/Page';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import Landing from './pages/Landing';
import React from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import { Route } from 'react-router-dom';
/* Core CSS required for Ionic components to work properly */

import '@ionic/react/css/core.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';

import '@ionic/react/css/typography.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';

import '@ionic/react/css/display.css';
/* Theme variables */
import './theme/variables.css';
import './theme/main.scss';
/* Pages */
import LoginGmail from "./pages/auth/LoginGmail";
import Menu from "./components/Menu";
import Instructions from "./pages/seed/Instructions";
import SeedPhrase from "./pages/seed/SeedPhrase";
import ConfirmPhrase from "./pages/seed/ConfirmPhrase";
import Completed from "./pages/seed/Completed";
import Wallets from "./pages/wallet/Wallets";
import Import from "./pages/wallet/Import";
import Export from "./pages/wallet/Export";

const App: React.FC = () => {

    return (
        <IonApp>
            <IonReactRouter>
                <IonSplitPane contentId="main">
                    <Menu/>
                    <IonRouterOutlet id="main">
                        <Route path="/" component={Landing} exact />
                        <Route path="/login" component={Login} exact />
                        <Route path="/login-gmail" component={LoginGmail} exact />
                        <Route path="/signup" component={SignUp} exact />
                        <Route path="/page/:name" component={Page} exact />
                        <Route path="/phrase/instructions" component={Instructions} exact />
                        <Route path="/phrase/seed" component={SeedPhrase} exact />
                        <Route path="/phrase/confirm" component={ConfirmPhrase} exact />
                        <Route path="/phrase/completed" component={Completed} exact />
                        <Route path="/wallets" component={Wallets} exact />
                        <Route path="/wallet/import" component={Import} exact />
                        <Route path="/wallet/create" component={Instructions} exact />
                        <Route path="/wallet/export" component={Export} exact />
                        {/*<Redirect from="/" to="/" exact />*/}
                    </IonRouterOutlet>
                </IonSplitPane>
            </IonReactRouter>
        </IonApp>
    );
};

export default App;
