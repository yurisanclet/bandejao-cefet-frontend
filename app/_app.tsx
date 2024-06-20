import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;