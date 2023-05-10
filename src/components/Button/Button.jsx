import css from './Button.module.css';

const Button = ({ handleClick }) => {
  return (
    <button className={css.Button} onClick={handleClick}>
      load more
    </button>
  );
};

export default Button;
