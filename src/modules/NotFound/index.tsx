import { FrownOutlined } from '@ant-design/icons';
import { MdError, MdNotificationsPaused } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  const contact = () => {
    navigate('/contact');
  };

  return (
    <main className="h-screen grid place-items-center bg-white">
      <div className="text-center">
        <MdError style={{ fontSize: '48px', color: 'black' }} />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold rounded-md bg-primary-100 text-black hover:bg-black hover:text-primary-100 px-3.5 py-2.5 shadow-sm outline-none border-none"
            onClick={handleGoBack}
          >
            Go back
          </button>

          <button
            onClick={contact}
            type="button"
            className="text-sm font-semibold text-gray-900 bg-white outline-none border-none hover:text-primary-100 px-3.5 py-2.5 shadow-sm rounded-md"
          >
            Contact support <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
