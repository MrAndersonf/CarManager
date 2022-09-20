import React, { useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import type { NextPage } from 'next';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import { Lock } from '@material-ui/icons';
import {
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
} from '@mui/material';
import { useCustomContext } from '../../Context';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material';

const Login: NextPage = () => {
  const { signIn, resetPass, isSigned } = useCustomContext();
  const router = useRouter();
  const [visible, setVisible] = React.useState<boolean>(false);
  const [load, setLoad] = React.useState<boolean>(false);
  const [focused, setFocused] = useState<'email' | 'password' | ''>();
  const [keepConnected, setkeepConnected] = React.useState<boolean>(false);

  const schema = yup.object().shape({
    email: yup.string().required('Campo obrigatório'),
    password: yup.string().required('Campo obrigatório'),
  });

  const formik = useFormik({
    validationSchema: schema,
    validateOnBlur: false,
    validateOnChange: false,
    initialValues: {
      email: '',
      password: '',
    },

    onSubmit: async (values, { resetForm }) => {
      signIn(values.email, values.password, keepConnected);
    },
  });

  const handleFocus = (field: string) => {
    switch (field) {
      case 'email':
        setFocused(field);
        break;
      case 'password':
        setFocused(field);
        break;
      case '':
        setFocused('');
        break;
      default:
        break;
    }
  };

  const handleView = () => {
    setVisible(!visible);
  };

  React.useEffect(() => {
    (async () => {
      const signed = await isSigned();
      if (signed) {
        router.push('/');
      }
    })();
  }, []);

  return (
    <Box
      component="div"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        marginTop: 10,
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '85vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <form
          onSubmit={formik.handleSubmit}
          style={{
            display: 'flex',
            width: 350,
            height: '60%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              width: 350,
              height: 30,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: 20,
            }}
          >
            <p style={{ fontSize: 38, color: 'black' }}>Car</p>
            <p style={{ fontSize: 38, color: 'gold' }}>Manager</p>
          </div>

          <TextField
            onBlur={() => handleFocus('')}
            onFocus={() => handleFocus('email')}
            name="email"
            sx={{ minWidth: 350, width: 400 }}
            label="Usuário"
            value={formik.values.email}
            onChange={formik.handleChange}
            helperText={formik.errors.email}
            error={formik.errors.email !== undefined}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle
                    color={focused === 'email' ? 'primary' : 'inherit'}
                  />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
          <TextField
            onBlur={() => handleFocus('')}
            onFocus={() => handleFocus('password')}
            name="password"
            type={visible ? 'text' : 'password'}
            sx={{ minWidth: 350, width: 400 }}
            helperText={formik.errors.password}
            onChange={formik.handleChange}
            error={formik.errors.password !== undefined}
            label="Senha"
            value={formik.values.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock
                    color={focused === 'password' ? 'primary' : 'inherit'}
                  />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment
                  position="start"
                  onClick={handleView}
                  style={{ cursor: 'pointer' }}
                >
                  {!visible ? (
                    <VisibilityOff color="error" />
                  ) : (
                    <Visibility color="error" />
                  )}
                </InputAdornment>
              ),
            }}
            variant="standard"
          />

          <div
            style={{
              display: 'flex',
              width: 350,
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingRight: 2,
              marginTop: 5,
              color: '#0273E5',
              cursor: 'pointer',
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={keepConnected}
                  onClick={() => setkeepConnected(!keepConnected)}
                />
              }
              label="Mater conectado"
            />

            <button
              onClick={event => {
                event.preventDefault();
                resetPass(formik.values.email);
              }}
              style={{
                border: 'none',
                backgroundColor: 'transparent',
                alignSelf: 'flex-end',
                paddingRight: 2,
                marginTop: 12,
                marginBottom: 15,
                color: '#0273E5',
                cursor: 'pointer',
              }}
            >
              Esqueci minha senha
            </button>
          </div>
          <Button onClick={() => router.push('CriarUsuario')}>
            Criar usuário
          </Button>
          <LoadingButton
            loading={load}
            variant="contained"
            onClick={() => {
              formik.handleSubmit();
            }}
          >
            Acessar sistema
          </LoadingButton>
        </form>
      </div>
    </Box>
  );
};

export default Login;
