import { TiWeatherDownpour } from 'react-icons/ti';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Header({ title }) {
  return (
    <header class='headermb-12 shadow-lg bg-neutral text-neutral-content'>
      <div className='container mx-auto mb-9'>
        <div className='flex-none absolute my-1 px-2 mx-2 '>
          <Link to={'/'} className='text-lg font-bold align-middle'>
            <TiWeatherDownpour className='inline pr-2 text-3xl' />
            {title}
          </Link>
        </div>
        <div className='flex-1 px-2 mx-2 my-10 top-5'>
          <div className='flex justify-end '>
            <Link to={'/'} className='btn btn-ghost btn-sm rounded-btn'>
              Home
            </Link>
            <Link to={'favorites'} className='btn btn-ghost btn-sm rounded-btn'>
              Favorites
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
Header.defaultProps = {
  title: 'Herolo Weather Task',
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
export default Header;
