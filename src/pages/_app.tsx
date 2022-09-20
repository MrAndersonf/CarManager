import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ContextProvider } from 'Context';
import { AlertDialog } from 'mui-react-alert';
import { SnackbarProvider } from 'notistack';
import { Collapse } from '@mui/material';
import CloseButton from 'Components/CloseButton';
import { SnackbarUtilsConfigurator } from 'Components/Snack';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        action={key => <CloseButton keySnack={key} />}
        TransitionComponent={Collapse}
        preventDuplicate
      >
        <SnackbarUtilsConfigurator />

        <AlertDialog />
        <Component {...pageProps} />
      </SnackbarProvider>
    </ContextProvider>
  );
}

export default MyApp;
