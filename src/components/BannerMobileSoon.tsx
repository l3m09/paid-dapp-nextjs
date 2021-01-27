import React, {FC} from 'react';
import { isPlatform } from '@ionic/react';

const BannerMobileSoon: FC = () => {
    return(
        <>
         {
            (!isPlatform('desktop') && !isPlatform('electron')) &&
            <div className="banner-mobile-soon-container">
                <p>
                    Only Desktop experience is currently available. Mobile app will be coming soon.
                </p>
            </div>
         }
        </>
    );
}

export default BannerMobileSoon;