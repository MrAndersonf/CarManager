import React, { createContext } from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { app } from '../Service/Firebase';
import Snack from 'Components/Snack';
import { useRouter } from 'next/router';

export interface IContext {
  email: string;
  signed: boolean;
  isSigned: () => Promise<boolean>;
  resetPass: (email: string) => void;
  signIn: (email: string, password: string, keep: boolean) => void;
  signOut: () => void;
  createUser: (email: string, password: string) => Promise<void>;
}

const Context = createContext<IContext>({} as IContext);

export interface IContextProvider {
  children: React.ReactNode;
}

export const ContextProvider = ({ children }: IContextProvider) => {
  const router = useRouter();
  const [email, setEmail] = React.useState<string>('');
  const [signed, setSigned] = React.useState<boolean>(false);

  const asyncLocalStorage = {
    setItem: async function (key: string, value: string) {
      await Promise.resolve();
      localStorage.setItem(key, value);
    },
    getItem: async function (key: string) {
      await Promise.resolve();
      return localStorage.getItem(key);
    },
  };

  const isSigned = async () => {
    const value = await asyncLocalStorage.getItem('keepConnected');
    if (value === 'keep') {
      return true;
    }
    return false;
  };

  const signIn = (email: string, password: string, keep: boolean) => {
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then(async userCredential => {
        const user = userCredential.user;
        if (user.email) {
          setEmail(user.email);
          router.push('/');
        }
        if (keep) {
          await asyncLocalStorage.setItem('keepConnected', 'keep');
        }
        setSigned(true);
        Snack.success('Usuário autenticado.');
        return true;
      })
      .catch(error => {
        const errorCode = error.code;

        if (
          errorCode === 'auth/wrong-password' ||
          errorCode === 'auth/user-disabled' ||
          errorCode === 'auth/user-not-found'
        ) {
          Snack.error('email/senha inválidos');
        }
        if (errorCode === 'auth/user-disabled') {
          Snack.error('Usuário desativado');
        }
      });
  };

  const resetPass = async (email: string) => {
    const auth = getAuth(app);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Snack.success('E-mail de recuperação enviado.');
      })
      .catch(error => {
        const errorCode = error.code;
        if (errorCode === 'auth/user-not-found') {
          Snack.error('Usuário não encontrado.');
        }
        if (errorCode === 'auth/missing-email') {
          Snack.error('É necessário preencher o e-mail.');
        }

        if (errorCode === 'auth/invalid-email') {
          Snack.error('e-mail inválido.');
        }
      });
  };

  const createUser = async (email: string, password: string) => {
    const auth = getAuth(app);
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log(credential);
      Snack.info('Usuário criado com sucesso.');
    } catch (error) {
      if (error === 'auth/email-already-in-use') {
        Snack.error('Usuário já existe.');
      }
      if (error === 'auth/invalid-email') {
        Snack.error('e-mail inválido.');
      }
    }
  };

  const signOut = () => {
    localStorage.removeItem('keepConnected');
    setSigned(false);
    router.push('Login');
  };

  React.useEffect(() => {
    (async () => {
      const keepConnected = await asyncLocalStorage.getItem('keepConnected');

      if (keepConnected === 'keep') {
        setSigned(true);
      }
    })();
  }, []);

  return (
    <Context.Provider
      value={{
        signed,
        createUser,
        isSigned,
        signOut,
        signIn,
        email,
        resetPass,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useCustomContext = () => {
  const custom = React.useContext(Context);
  return custom;
};
