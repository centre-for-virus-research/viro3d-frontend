import { api_url } from "../utils/api";

const API = () => {
  return (
    <div className="mt-24">
      <iframe className='min-h-screen w-[100vw]'
        src={`${api_url}/api/docs`}
        title="API Documentation"
      ></iframe>
    </div>
  );
};

export default API;
