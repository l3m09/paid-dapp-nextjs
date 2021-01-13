import React from 'react';
const MobileShare = () => {
  const postTitle = 'post title';
  const siteTitle = 'site title';
  const win_nav = window.navigator as any;
  const handleOnClick = () => {
    if (win_nav.share) {
      win_nav
        .share({
          title: "`${postTitle} | ${siteTitle}`",
          text: `Check out ${postTitle} on ${siteTitle}`,
          url: document.location.href,
        })
        .then(() => {
          console.log('Successfully shared');
        })
        .catch((error : any) => {
          console.error('Something went wrong sharing the blog', error);
        });
    }
  };

  return (
    <div className='share-icon' onClick={handleOnClick}>
      Share
    </div>
  );
};

export default MobileShare;