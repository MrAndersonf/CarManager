import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useState,
} from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
} from '@mui/material';
import Box from '@mui/material/Box';
import { ptBR } from 'date-fns/locale';
import { ICar } from '../../Interface';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
  formatter,
  getGreater,
  getLesser,
  getLIstOf,
  monetaryValue,
} from '../../Utils';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Tag } from 'Components/Tag';
import { Delete_Icon, Search_Icon } from 'Icon';

export interface IFilter {
  data: ICar[];
  isOpen: boolean;
  searcher: (list: ICar[]) => void;
  reset: () => Promise<void>;
}

export interface IFilterProps {
  open: () => void;
  close: () => void;
  clean: () => void;
}

const Filter: ForwardRefRenderFunction<IFilterProps, IFilter> = (
  { data, isOpen, searcher, reset }: IFilter,
  ref,
) => {
  const [id, setId] = useState<string>('');
  const [list, setList] = useState<ICar[]>([]);
  const [open, setOpen] = React.useState<boolean>(false);
  const [brandOpts, setbrandOpts] = React.useState<string[]>();
  const [titleOpts, setTitleOpts] = React.useState<string[]>();
  const [top_age, setTop_age] = React.useState<number>(0);
  const [top_price, setTop_price] = React.useState<number>(0);
  const [bottom_age, setBottom_age] = React.useState<number>(0);
  const [bottom_price, setBottom_price] = React.useState<number>(0);
  const [title, setTitle] = React.useState<string>('');
  const [brand, setBrand] = React.useState<string>('');
  const [priceMin, setPriceMin] = React.useState<string>('');
  const [ageMin, setAgeMin] = React.useState<string>('');
  const [priceMax, setPriceMax] = React.useState<string>('');
  const [ageMax, setAgeMax] = React.useState<string>('');

  useImperativeHandle(ref, () => ({
    open: () => {
      setOpen(true);
    },
    close: () => {
      setOpen(false);
    },
    clean: () => {
      setTitle('');
      setBrand('');
      setPriceMin('');
      setPriceMax('');
      setAgeMin('');
      setAgeMax('');
      setList([]);
    },
  }));

  const handleMonetaryTop = (value: number) => {
    setPriceMax(value.toString());
  };
  const handleMonetaryBottom = (value: number) => {
    setPriceMin(value.toString());
  };

  const handleClose = () => {
    setTitle('');
    setBrand('');
    setPriceMin('');
    setPriceMax('');
    setAgeMin('');
    setAgeMax('');
    setList([]);
    setOpen(false);
  };

  const handleFilterSearch = () => {
    let search = list;
    if (title !== '') {
      search = search.filter(e => e.title === title);
    }
    if (brand !== '') {
      search = search.filter(e => e.brand === brand);
    }
    if (ageMin !== '') {
      search = search.filter(e => e.age >= Number(ageMin));
    }
    if (ageMax !== '') {
      search = search.filter(e => e.age <= Number(ageMax));
    }
    if (Number(priceMin) > 0) {
      search = search.filter(e => Number(e.price) >= Number(priceMin));
    }
    if (Number(priceMax) > 0) {
      search = search.filter(e => Number(e.price) <= Number(priceMax));
    }
    searcher(search);
    setOpen(false);
  };

  React.useEffect(() => {
    (async () => {
      const topPrice = getGreater<ICar>(data, 'price');
      setTop_price(topPrice);
      const bottomPrice = getLesser<ICar>(data, 'price');
      setBottom_price(bottomPrice);
      const topAge = getGreater<ICar>(data, 'age');
      setTop_age(topAge);
      const bottomAge = getLesser<ICar>(data, 'age');
      setBottom_age(bottomAge);
      const brandsOpt = getLIstOf<ICar>(data, 'brand');
      setbrandOpts(brandsOpt);
      const titlesOpt = getLIstOf<ICar>(data, 'title');
      setTitleOpts(titlesOpt);
      setList(data);
    })();
  }, [data, isOpen]);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <LocalizationProvider adapterLocale={ptBR} dateAdapter={AdapterDateFns}>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: 360,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
            }}
          >
            <Tag title="Filtro" />

            <FormControl style={{ width: 350 }}>
              <InputLabel id="demo-simple-select-label">Modelo</InputLabel>
              <Select
                name="title"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Grupo"
                value={title}
                onChange={text => setTitle(text.target.value)}
              >
                <MenuItem key={'selecione-title'} value="">
                  Selecione
                </MenuItem>
                {titleOpts?.map(key => {
                  return (
                    <MenuItem key={key} value={key}>
                      {key}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <FormControl style={{ width: 350, marginTop: 20 }}>
              <InputLabel id="demo-simple-select-label">Marca</InputLabel>
              <Select
                name="brand"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Grupo"
                value={brand}
                onChange={text => setBrand(text.target.value)}
              >
                <MenuItem key={'selecione-brand'} value="">
                  Selecione
                </MenuItem>
                {brandOpts?.map(key => {
                  return (
                    <MenuItem key={key} value={key}>
                      {key}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <TextField
              style={{ width: 350, marginTop: 20 }}
              value={ageMin}
              label="Ano - Início"
              variant="outlined"
              onChange={text => setAgeMin(text.target.value)}
              helperText={`Valor mínimo é ${bottom_age}`}
            />

            <TextField
              style={{ width: 350, marginTop: 20 }}
              value={ageMax}
              label="Ano - Fim"
              variant="outlined"
              onChange={text => setAgeMax(text.target.value)}
              helperText={`Valor máximo é ${top_age}`}
            />

            <TextField
              name="priceBottom"
              style={{ width: 350, marginTop: 20 }}
              value={formatter(Number(priceMin), 'Real')}
              label="Preço - Início"
              variant="outlined"
              onKeyDown={event =>
                monetaryValue(event, Number(priceMin), handleMonetaryBottom)
              }
              helperText={`Valor mínimo ${formatter(
                Number(bottom_price),
                'Real',
              )}`}
            />

            <TextField
              name="priceTop"
              style={{ width: 350, marginTop: 20 }}
              value={formatter(Number(priceMax), 'Real')}
              label="Preço - Fim"
              variant="outlined"
              onKeyDown={event =>
                monetaryValue(event, Number(priceMax), handleMonetaryTop)
              }
              helperText={`Valor máximo ${formatter(
                Number(top_price),
                'Real',
              )}`}
            />

            <div
              style={{ display: 'flex', width: '100%', flexDirection: 'row' }}
            >
              <Button
                variant="contained"
                style={{ margin: 6, alignSelf: 'flex-start' }}
                endIcon={<Search_Icon />}
                onClick={handleFilterSearch}
              >
                Filtrar
              </Button>
              <Button
                color="error"
                variant="contained"
                style={{ margin: 6, alignSelf: 'flex-start' }}
                endIcon={<Delete_Icon />}
                onClick={async () => {
                  setTitle('');
                  setBrand('');
                  setPriceMin('');
                  setPriceMax('');
                  setAgeMin('');
                  setAgeMax('');
                  setList([]);
                  await reset();
                }}
              >
                Limpar
              </Button>
            </div>
          </Box>
        </LocalizationProvider>
      </Modal>
    </>
  );
};

export default forwardRef(Filter);
