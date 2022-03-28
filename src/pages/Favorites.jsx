import ConvertButton from '../components/layout/ConvertButton';
import BackButton from '../components/layout/BackButton';
import FavoritesItem from '../components/FavoritesItem';
import Spinner from '../components/layout/Spinner';
import { useSelector } from 'react-redux';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Favorites() {
  const { favoritesList, isLoading } = useSelector((state) => state.weather);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <div>
        {favoritesList.length !== 0 ? (
          <div>
            <ConvertButton />
            <BackButton url='/' />{' '}
          </div>
        ) : (
          <div className='hero'>
            <div className='text-center hero-content'>
              <div className='max-w-lg'>
                <p className='text-5xl mb-8'>Please Add Favorites!</p>
                <Link to='/' className='btn btn-dark btn-lg'>
                  <FaHome className='mr-2' />
                  Back To Home
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className='grid grid-cols-1 gap-8 xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 pt-28'>
        {favoritesList.map((favorites) => (
          <FavoritesItem key={favorites.Key} favorites={favorites} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
