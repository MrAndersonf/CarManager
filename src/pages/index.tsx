import React, { useState } from 'react';
import { Button } from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import type { NextPage } from 'next';
import Box from '@mui/material/Box';
import { ptBR } from 'date-fns/locale';
import { ICar } from '../Interface';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { formatter, monetaryValue } from '../Utils';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Car } from 'Model/Car';
import { TableCars } from 'Components/Tables/TableCars';
import { DatePicker } from '@mui/x-date-pickers';
import { Tag } from 'Components/Tag';
import { useCustomContext } from 'Context';
import { useRouter } from 'next/router';
import { SideMenu } from 'Components/SideMenu';

const Veiculos: NextPage = () => {
  const { isSigned } = useCustomContext();
  const router = useRouter();
  const [id, setId] = useState<string>('');
  const [list, setList] = useState<ICar[]>([]);
  const [render, setRender] = useState<ICar[]>([]);

  const schema = yup.object().shape({
    title: yup
      .string()
      .required('Campo obrigatório')
      .min(1, 'O modelo deve conter ao menos uma letra'),
    brand: yup
      .string()
      .required('Campo obrigatório')
      .min(3, 'A Marca deve conter ao menos uma letra'),
    price: yup.number().required('Campo obrigatório'),
    age: yup
      .number()
      .required('Campo obrigatório')
      .min(1920, 'O Ano informado é inválido.'),
  });

  const formik = useFormik({
    validationSchema: schema,
    validateOnBlur: false,
    validateOnChange: false,
    initialValues: {
      title: '',
      brand: '',
      price: 0,
      age: new Date().getTime(),
    },
    onSubmit: async (values, { resetForm }) => {
      if (id !== '') {
        const car = editItem();
        await Car.update(id, car);
        setList(
          list.map(e => {
            if (e._id !== id) {
              return e;
            }
            return car;
          }),
        );
        setId('');
        resetForm();
        return;
      }
      const created = await Car.create(createItem());
      setList([...list, created]);
      resetForm();
    },
  });

  const edit = (car: ICar) => {
    const { _id, title, brand, price, age } = car;
    formik.setFieldValue('title', title);
    formik.setFieldValue('brand', brand);
    formik.setFieldValue('price', Number(price));
    formik.setFieldValue('age', new Date(age, 0, 2).getTime());
    setId(_id);
  };

  const createItem = () => {
    const item = {
      title: formik.values.title,
      brand: formik.values.brand,
      price: formik.values.price.toString(),
      age: new Date(formik.values.age).getFullYear(),
    } as ICar;
    return item;
  };

  const handleRefresh = async () => {
    const all = await Car.all();
    setList(all);
  };

  const editItem = () => {
    const item = {
      _id: id,
      brand: formik.values.brand,
      price: formik.values.price.toString(),
      age: new Date(formik.values.age).getFullYear(),
      title: formik.values.title,
    } as ICar;
    return item;
  };

  const handleYear = (date: Date | null) => {
    if (date !== null) {
      formik.setFieldValue('age', date.getTime());
    }
  };

  const handleMonetary = (value: number) => {
    formik.setFieldValue('price', value);
  };

  React.useEffect(() => {
    (async () => {
      const signed = await isSigned();
      if (!signed) router.push('Login');
      const all = await Car.all();
      setList(all);
    })();
  }, []);

  return (
    <LocalizationProvider adapterLocale={ptBR} dateAdapter={AdapterDateFns}>
      <SideMenu />
      <Box
        component="div"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
          marginTop: 10,
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Tag title="Minha frota" />
          <form onSubmit={formik.handleSubmit}>
            <TextField
              style={{ width: 350 }}
              name="title"
              value={formik.values.title}
              label="Nome do Veículo"
              variant="outlined"
              onChange={formik.handleChange}
              helperText={formik.errors.title}
              error={formik.errors.title !== undefined}
            />

            <TextField
              name="brand"
              style={{ width: 350 }}
              value={formik.values.brand}
              label="Marca do Veículo"
              variant="outlined"
              onChange={formik.handleChange}
              helperText={formik.errors.brand}
              error={formik.errors.brand !== undefined}
            />

            <DatePicker
              views={['year']}
              label="Ano"
              value={new Date(formik.values.age)}
              disableFuture
              onChange={date => handleYear(date)}
              renderInput={params => (
                <TextField
                  {...params}
                  style={{ width: 350 }}
                  placeholder="Ano"
                  label="Ano"
                  helperText={formik.errors.age}
                  error={formik.errors.age !== undefined}
                />
              )}
            />

            <TextField
              name="price"
              style={{ width: 350 }}
              value={formatter(formik.values.price, 'Real')}
              label="Preço Unitário"
              variant="outlined"
              onKeyDown={event =>
                monetaryValue(event, formik.values.price, handleMonetary)
              }
              helperText={formik.errors.price}
              error={formik.errors.price !== undefined}
            />
            <div style={{ display: 'flex', width: '100%' }}>
              <Button
                variant="contained"
                style={{ margin: 8, alignSelf: 'flex-start' }}
                endIcon={<AddCircleOutlineIcon />}
                type="submit"
                onClick={async () => formik.handleSubmit}
              >
                Adicionar
              </Button>
            </div>
          </form>
        </div>
      </Box>
      <TableCars
        data={list}
        edit={edit}
        label="Veículos"
        listHandle={setList}
        refresh={handleRefresh}
      />
    </LocalizationProvider>
  );
};

export const getServerSideProps = async () => {
  return { props: { someText: 'This is a test' } };
};

export default Veiculos;
