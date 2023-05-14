import React, { useState, useEffect, useRef } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import css from './App.module.css';
import { fetchPhoto } from '../../api/fetch-photo';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';

const App = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const isFirstRender = useRef(true);

  const onSubmit = newQuery => {
    if (query !== newQuery) {
      setQuery(newQuery);
      setPhotos([]);
      setPage(1);
    }
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!query) {
      return;
    }
    setLoading(true);
    fetchPhoto(query, page)
      .then(res => {
        if (res.hits.length === 0) {
          Notify.failure('No images were found for your request');
          return;
        }
        setTotalItems(res.total);

        const response = res.hits.map(
          ({ webformatURL, tags, largeImageURL }) => {
            return {
              webformatURL,
              tags,
              largeImageURL,
            };
          }
        );

        setPhotos(prevPhotos => [...prevPhotos, ...response]);
        setTotalItems(res.total);
      })
      .catch(error => Notify.failure(error.message))
      .finally(() => setLoading(false));
  }, [page, query]);

  useEffect(() => {
    if (!totalItems) {
      return;
    }
    Notify.success(`We found ${totalItems} images`);
  }, [totalItems]);

  return (
    <div className={css.App}>
      {/* ---------Searchbar------------- */}

      <Searchbar onSubmit={onSubmit} />

      {/* ---------Gallery------------- */}

      <ImageGallery photos={photos} />
      {loading && <Loader />}
      {photos.length > 0 && totalItems > page * 12 && !loading && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button handleClick={loadMore} />
        </div>
      )}
    </div>
  );
};

export default App;

// class oldApp extends Component {
//   state = {
//     page: 1,
//     query: '',
//     photos: [],
//     totalItems: 0,
//     loading: false,
//     isModalShow: false,
//     modalData: {
//       largeImageUrl: '',
//       altName: '',
//     },
//   };

//   async componentDidUpdate(_, prevState) {
//     const { query, page, photos } = this.state;

//     if (prevState.query !== query || prevState.page !== page) {
//       this.setState({ loading: true });

//       await fetchPhoto(query, page)
//         .then(res => {
//           if (res.hits.length === 0) {
//             Notify.failure('No images were found for your request');
//             return;
//           }

//           if (prevState.totalItems !== res.total) {
//             Notify.success(`We found ${res.total} images`);
//           }
//           const response = res.hits.map(
//             ({ webformatURL, tags, largeImageURL, id }) => {
//               return {
//                 id,
//                 webformatURL,
//                 tags,
//                 largeImageURL,
//               };
//             }
//           );

//           this.setState(() => {
//             return {
//               photos: [...photos, ...response],
//               totalItems: res.total,
//             };
//           });
//         })
//         .catch(error => Notify.failure(error.message))
//         .finally(() => this.setState({ loading: false }));
//     }
//   }

//   onSubmit = query => {
//     if (this.state.query !== query) {
//       this.setState({ query, photos: [], page: 1 });
//     }
//   };

//   loadMore = () => {
//     this.setState(prevState => {
//       return { page: prevState.page + 1 };
//     });
//   };

//   toggleModalIsSow = () => {
//     this.setState(({ isModalShow }) => ({
//       isModalShow: !isModalShow,
//     }));
//   };

//   openModalWindow = newModalData => {
//     if (newModalData.largeImageUrl !== this.state.modalData.largeImageUrl) {
//       this.setState(() => {
//         return {
//           modalData: { ...newModalData },
//         };
//       });
//     }
//     this.toggleModalIsSow();
//   };

//   render() {
//     const { photos, loading, totalItems, page, isModalShow, modalData } =
//       this.state;

//     const { onSubmit, openModalWindow, loadMore, toggleModalIsSow } = this;

//     return (
//       <div className={css.App}>
//         {/* ---------Searchbar------------- */}

//         <Searchbar onSubmit={onSubmit} />

//         {/* ---------Gallery------------- */}

//         <ImageGallery photos={photos} openModalWindow={openModalWindow} />
//         {loading && <Loader />}
//         {photos.length > 0 && totalItems > page * 12 && !loading && (
//           <div style={{ display: 'flex', justifyContent: 'center' }}>
//             <Button handleClick={loadMore} />
//           </div>
//         )}
//         <>
//           {/* ---------Modal window------------- */}

//           {isModalShow && (
//             <Modal modalData={modalData} onClose={toggleModalIsSow} />
//           )}
//         </>
//       </div>
//     );
//   }
// }

// const AppReduser = () => {
//   const initialState = {
//     page: 1,
//     query: '',
//     photos: [],
//     totalItems: 0,
//     loading: false,
//     isModalShow: false,
//     modalData: {
//       largeImageURL: '',
//       altName: '',
//     },
//   };

//   function reducer(prevState, { type, payload }) {
//     switch (type) {
//       case 'page':
//         return { ...prevState, page: payload };
//       case 'query':
//         return { ...prevState, query: payload };
//       case 'photos':
//         return { ...prevState, photos: payload };
//       case 'totalItems':
//         return { ...prevState, totalItems: payload };
//       case 'isModalShow':
//         return { ...prevState, isModalShow: payload };
//       case 'modalData':
//         return { ...prevState, modalData: payload };

//       default:
//         return prevState;
//     }
//   }

//   const [state, dispatch] = useReducer(reducer, initialState);
//   const { query, photos, totalItems, page, loading, isModalShow, modalData } =
//     state;

//   // const isFirstLoad = useRef(true);

//   useEffect(() => {
//     dispatch({ type: 'loading', payload: true });

//     // if (isFirstLoad.current) {
//     //   isFirstLoad.current = false;
//     //   return;
//     // }

//     if (query === '') {
//       Notify.failure('Request can no be empty string');
//       dispatch({ type: 'loading', payload: false });
//       return;
//     }

//     fetchPhoto(query, page)
//       .then(res => {
//         if (res.hits.length === 0) {
//           Notify.failure('No images were found for your request');
//           return;
//         }

//         if (totalItems !== res.total) {
//           Notify.success(`We found ${res.total} images`);
//         }

//         const response = res.hits.map(
//           ({ webformatURL, tags, largeImageURL, id }) => {
//             return {
//               id,
//               webformatURL,
//               tags,
//               largeImageURL,
//             };
//           }
//         );
//         console.log(res.total);
//         dispatch({ type: 'photos', payload: [...photos, ...response] });
//         dispatch({ type: 'totalItems', payload: res.total });
//       })
//       .catch(error => Notify.failure(error.message))
//       .finally(dispatch({ type: 'loading', payload: false }));
//   }, [page, query]);

//   const onSubmit = nextQuery => {
//     if (query !== nextQuery) {
//       dispatch({ type: 'page', payload: 1 });
//       dispatch({ type: 'query', payload: nextQuery });
//       dispatch({ type: 'photos', payload: [] });
//       dispatch({ type: 'totalItems', payload: 0 });
//       dispatch({ type: 'loading', payload: true });
//     }
//   };

//   const loadMore = () => {
//     dispatch({ type: 'loading', payload: true });
//     dispatch({ type: 'page', payload: page + 1 });
//   };

//   const toggleModalIsSow = () => {
//     dispatch({ type: 'isModalShow', payload: !isModalShow });
//     console.log('isModalShow:', isModalShow);
//   };

//   const openModalWindow = newModalData => {
//     if (newModalData.largeImageURL !== modalData.largeImageURL) {
//       dispatch({ type: 'modalData', payload: { newModalData } });
//     }
//     toggleModalIsSow();
//   };

//   return (
//     <div className={css.App}>
//       {/* ---------Searchbar------------- */}

//       <Searchbar onSubmit={onSubmit} />

//       {/* ---------Gallery------------- */}

//       <ImageGallery photos={photos} openModalWindow={openModalWindow} />
//       {loading && <Loader />}
//       {photos.length > 0 && totalItems > page * 12 && !loading && (
//         <div style={{ display: 'flex', justifyContent: 'center' }}>
//           <Button handleClick={loadMore} />
//         </div>
//       )}
//       <>
//         {/* ---------Modal window------------- */}

//         {isModalShow && (
//           <Modal modalData={modalData} onClose={toggleModalIsSow} />
//         )}
//       </>
//     </div>
//   );
// };
