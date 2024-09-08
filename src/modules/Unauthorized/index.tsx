import { useNavigate } from 'react-router-dom';
import { MdWavingHand } from 'react-icons/md';

const Unauthorized = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  const contact = () => {
    navigate('/contact');
  };

  return (
    <>
      <main className="h-screen grid place-items-center bg-white">
        <div className="text-center">
          <MdWavingHand style={{ fontSize: '48px', color: 'black' }} />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Not authorized
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Sorry, you are not authorized to view this page.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold rounded-md bg-primary-100 text-black hover:bg-black hover:text-primary-100 px-3.5 py-2.5 shadow-sm outline-none border-none"
              onClick={handleGoBack}
            >
              Go back
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Unauthorized;
