import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { debounce, get } from '../utils/helpers';

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const FLICKR_KEY = process.env.REACT_APP_FLICKR_KEY;
  const PER_PAGE_COUNT = 10;
  const BASE_URL = 'https://www.flickr.com/services/rest/?method=';

  const [searchKey, setSearchKey] = useState('');
  const [appData, setAppData] = useState({
    isFetching: false,
    hasError: false,
    photos: [],
    page: 0,
    pages: 0,
  });

  useEffect(() => {
    getImages();
  }, []);

  const getImages = (page = 1) => {
    try {
      setAppData((appData) => ({
        ...appData,
        isFetching: true,
      }));
      axios
        .get(
          `${BASE_URL}flickr.photos.getRecent&api_key=${FLICKR_KEY}&format=json&nojsoncallback=1&page=${page}&text=${searchKey}&per_page=${PER_PAGE_COUNT}`
        )
        .then((response) => {
          const data = response.data;
          setAppData((appData) => ({
            hasError: false,
            isFetching: false,
            photos: [...appData.photos, ...get(data, 'photos.photo', [])],
            page: get(data, 'photos.page', 0),
            pages: get(data, 'photos.pages', 0),
          }));
        });
    } catch (error) {
      setAppData((appData) => ({
        ...appData,
        isFetching: false,
        hasError: true,
      }));
    }
  };

  const onSearch = debounce((searchKey) => {
    try {
      setSearchKey(searchKey);
      let suggestions = localStorage.getItem('flickr-images-suggestions')
        ? localStorage.getItem('flickr-images-suggestions')
        : '';
      suggestions = suggestions.split('.');
      suggestions = suggestions.filter((s) => s !== searchKey);
      suggestions.unshift(searchKey);
      suggestions = suggestions.join('.');

      localStorage.setItem('flickr-images-suggestions', suggestions);
      setAppData((appData) => ({
        ...appData,
        isFetching: true,
      }));
      axios
        .get(
          `${BASE_URL}flickr.photos.search&api_key=${FLICKR_KEY}&format=json&nojsoncallback=1&per_page=${PER_PAGE_COUNT}&text=${searchKey}`
        )
        .then((response) => {
          const data = response.data;
          setAppData((appData) => ({
            hasError: false,
            isFetching: false,
            photos: get(data, 'photos.photo', []),
            page: get(data, 'photos.page', 0),
            pages: get(data, 'photos.pages', 0),
          }));
        });
    } catch (error) {
      setAppData((appData) => ({
        ...appData,
        isFetching: false,
        hasError: true,
      }));
    }
  }, 300);

  const value = {
    isFetching: appData.isFetching,
    hasError: appData.hasError,
    photos: appData.photos,
    page: appData.page,
    pages: appData.pages,
    onSearch,
    getImages,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
