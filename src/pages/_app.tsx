import '@/styles/globals.scss';
import Layout from '@/components/Layout';
import Auth from '@/components/Auth';
import { ExtendedAppProps } from '@/helpers/interface';
import UserProvider from '@/contexts/UserContext';
import PromptsProvider from '@/contexts/PromptsContext';

export default function App({ Component, pageProps }: ExtendedAppProps) {
  return (
    <UserProvider>
      <PromptsProvider>
        <Layout>
          {Component.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </Layout>
      </PromptsProvider>
    </UserProvider>
  );
}
