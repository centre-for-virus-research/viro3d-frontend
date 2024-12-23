import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="mt-24">
        <div className="results-container flex flex-col items-center h-screen justify-center">
          <h2 className="mb-12 xs:text-4xl sm:text-5xl text-slate-500">Page not found</h2>
          <Link to={"/"} className="xs:text-4xl sm:text-5xl text-slate-500 underline">Return Home</Link>
        </div>
    </div>
  );
};

export default NotFound;
