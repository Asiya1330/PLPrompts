import '@/styles/globals.scss';
import Layout from '@/components/Layout';
import Auth from '@/components/Auth';
import { ExtendedAppProps } from '@/helpers/interface';
import UserProvider from '@/contexts/UserContext';
import PromptsProvider from '@/contexts/PromptsContext';
import { SessionProvider } from 'next-auth/react'
import ChatContactsProvider from '@/contexts/chatContactsContext';

export default function App({ Component, pageProps }: ExtendedAppProps) {
  return (
    <SessionProvider>
      <UserProvider>
        <ChatContactsProvider >
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
        </ChatContactsProvider>
      </UserProvider>
    </SessionProvider>
  );
}
