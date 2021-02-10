import React, {FC} from 'react';
import { isPlatform } from '@ionic/react';

interface BannerMessageProps {
    message: any;
    isOnlyMobile?: boolean;
    isOnlyDesktop?: boolean;
};

const BannerMessage: FC<BannerMessageProps> = ({message, isOnlyMobile, isOnlyDesktop}) => {
    if (isOnlyMobile) {
        return(
            <>
             {         
                (!isPlatform('desktop') && !isPlatform('electron')) &&
                <div className="banner-container">
                    <p>
                        {message}
                    </p>
                </div>
             }
            </>
        );
    }

    if (isOnlyDesktop) {
        return(
            <>
             {         
                (isPlatform('desktop') || isPlatform('electron')) &&
                <div className="banner-container">
                    <p>
                        {message}
                    </p>
                </div>
             }
            </>
        );
    }

    return(
        <>
            <div className="banner-container">
                <p>
                    {message}
                </p>
            </div>
        </>
    );
}

export default BannerMessage;