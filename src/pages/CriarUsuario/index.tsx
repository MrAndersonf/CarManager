import React, { useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import type { NextPage } from 'next';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import { Lock } from '@material-ui/icons';
import { InputAdornment } from '@mui/material';
import { useCustomContext } from '../../Context';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material';

const CriarUsuario: NextPage = () => {
  const { createUser } = useCustomContext();
  const router = useRouter();
  const [visible, setVisible] = React.useState<boolean>(false);
  const [visibleConfirm, setVisibleConfirm] = React.useState<boolean>(false);
  const [load, setLoad] = React.useState<boolean>(false);
  const [focused, setFocused] = useState<
    'email' | 'password' | 'confirm' | ''
  >();
  const [keepConnected, setkeepConnected] = React.useState<boolean>(false);

  const schema = yup.object().shape({
    email: yup.string().required('Campo obrigatório'),
    password: yup.string().required('Campo obrigatório'),
    confirm: yup
      .string()
      .required('Campo obrigatório')
      .oneOf([yup.ref('password'), null], 'Senhas não coincidem'),
  });

  const formik = useFormik({
    validationSchema: schema,
    validateOnBlur: false,
    validateOnChange: false,
    initialValues: {
      email: '',
      password: '',
      confirm: '',
    },

    onSubmit: async (values, { resetForm }) => {
      setLoad(true);
      await createUser(values.email, values.password);
      resetForm();
      setLoad(false);
      router.push('Login');
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
      case 'confirm':
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
    setVisibleConfirm(!visibleConfirm);
  };

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

          <TextField
            onBlur={() => handleFocus('')}
            onFocus={() => handleFocus('confirm')}
            name="confirm"
            type={visible ? 'text' : 'confirm'}
            sx={{ minWidth: 350, width: 400 }}
            helperText={formik.errors.confirm}
            onChange={formik.handleChange}
            error={formik.errors.confirm !== undefined}
            label="Confirmar"
            value={formik.values.confirm}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color={focused === 'confirm' ? 'primary' : 'inherit'} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment
                  position="start"
                  onClick={handleView}
                  style={{ cursor: 'pointer' }}
                >
                  {!visibleConfirm ? (
                    <VisibilityOff color="error" />
                  ) : (
                    <Visibility color="error" />
                  )}
                </InputAdornment>
              ),
            }}
            variant="standard"
          />

          <LoadingButton
            loading={load}
            variant="contained"
            onClick={() => {
              formik.handleSubmit();
            }}
          >
            Criar
          </LoadingButton>
        </form>
      </div>
    </Box>
  );
};

export default CriarUsuario;
