import { Affix, Input, Modal, Tag } from 'antd';
import React, { useContext, useState } from 'react';
import InView from 'react-intersection-observer';
import { AppContext } from '../contexts/AppContext';
import ImageLoadingSkeleton from '../skeletons/ImageLoadingSkeleton';

function Home() {
  const { photos, page, pages, getImages, onSearch, isFetching } =
    useContext(AppContext);

  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [visible, setVisible] = useState(false);

  const callNextPage = (inView) => {
    if (page >= pages) return;
    if (inView) {
      getImages(page + 1);
    }
  };

  return (
    <div className="app">
      <div className="jumbotron">
        <p className="text-5xl text-white font-light">
          Dive into the ocean of images
        </p>
        <div className="search-bar_container">
          <Affix offsetTop={5}>
            <Input
              className="mb-10"
              size="large"
              placeholder="Search images..."
              onChange={(e) => onSearch(e.target.value)}
              width="100"
            />
          </Affix>
        </div>
      </div>

      <div className="content">
        {localStorage.getItem('flickr-images-suggestions') && (
          <div className="flex mb-10">
            <p>Suggessions: </p>
            {localStorage
              .getItem('flickr-images-suggestions')
              ?.split('.')
              ?.map((s) => (
                <Tag onClick={() => onSearch(s)} color="magenta">
                  {s}
                </Tag>
              ))}
          </div>
        )}

        {isFetching && page < 1 ? (
          <ImageLoadingSkeleton items={8} />
        ) : (
          <div className="photos">
            {photos
              .filter((p) => true)
              .map((p) => {
                const url = `https://farm${p.farm}.staticflickr.com/${p.server}/${p.id}_${p.secret}.jpg`;
                return (
                  <img
                    onClick={() => {
                      setCurrentImageUrl(url);
                      setVisible(true);
                    }}
                    src={url}
                    alt={p.title}
                  />
                );
              })}
          </div>
        )}
        {/* for pagination, block starts */}
        <InView onChange={(inView) => callNextPage(inView)}>
          <div style={{ height: '10px' }} />
          {+page < +pages && <ImageLoadingSkeleton items={8} />}
        </InView>
        {/* for pagination, block ends */}
      </div>

      <Modal visible={visible} onCancel={() => setVisible(false)} footer={null}>
        <img className="mt-10" src={currentImageUrl} alt="img" />
      </Modal>
    </div>
  );
}

export default Home;
