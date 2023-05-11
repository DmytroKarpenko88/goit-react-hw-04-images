import PropTypes from 'prop-types';
import { FcSearch } from 'react-icons/fc';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import css from './Searchbar.module.css';
import { useState } from 'react';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    if (!query) {
      Notify.failure('Enter the request');
      return;
    }

    onSubmit(query);
  };

  const handleChange = e => {
    setQuery(e.currentTarget.value.trim());
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <FcSearch size={32} />
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          name="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

// class oldSearchbar extends Component {
//   state = {
//     query: '',
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     const { query } = this.state;
//     if (!query) {
//       Notify.failure('Enter the request');
//       return;
//     }

//     this.props.onSubmit(query);
//   };

//   handleChange = e => {
//     this.setState({ query: e.currentTarget.value.trim() });
//   };

//   render() {
//     const { query } = this.state;
//     const { handleChange, handleSubmit } = this;
//     return (
//       <header className={css.Searchbar}>
//         <form className={css.SearchForm} onSubmit={handleSubmit}>
//           <button type="submit" className={css.SearchFormButton}>
//             <FcSearch size={32} />
//           </button>

//           <input
//             className={css.SearchFormInput}
//             type="text"
//             name="search"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             value={query}
//             onChange={handleChange}
//           />
//         </form>
//       </header>
//     );
//   }
// }

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
