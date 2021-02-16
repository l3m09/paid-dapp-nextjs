import React, {FC} from 'react';
import { isPlatform } from '@ionic/react';

interface BannerMessageProps {
    message: any;
    isOnlyMobile?: boolean;
    isOnlyDesktop?: boolean;
};

const BannerMessage: FC<BannerMessageProps> = ({message, isOnlyMobile, isOnlyDesktop}) => {
    const messageElement = () => {
        if (typeof message === 'string') {
            return (
                <p>
                    {message}
                </p>
            );
        }

        return (
            <>
                {
                    message
                }
            </>
        );
    }
    if (isOnlyMobile) {
        return(
            <>
             {         
                (!isPlatform('desktop') && !isPlatform('electron')) &&
                <div className="banner-container">
                    {
                        messageElement()
                    }
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
                    {
                        messageElement()
                    }
                </div>
             }
            </>
        );
    }

    return(
        <>
            <div className="banner-container">
                {
                    messageElement()
                }
            </div>
        </>
    );
}

export default BannerMessage;