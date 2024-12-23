let _api_url: string | undefined = "";

if (import.meta.env.MODE === "production") {
  _api_url = import.meta.env.VITE_API_PROD_URL;
} else {
  _api_url = import.meta.env.VITE_API_DEV_URL;
}

export const api_url = _api_url;
