import React, { MutableRefObject } from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import { visuallyHidden } from '@mui/utils';
import IconButton from '@mui/material/IconButton';

import { showAlertConfirmarion } from 'mui-react-alert';
import { ICar } from 'Interface';

import { deleteOne, formatter, getComparator } from '../../../Utils';
import { EOrder } from 'Enums';
import Filter, { IFilterProps } from 'Components/Filter';
import {
  Cached_Icon,
  Clean_Icon,
  Delete_Icon,
  Edit_Icon,
  Filter_Icon,
} from 'Icon';

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number,
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof ICar;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: '_id',
    numeric: false,
    disablePadding: false,
    label: 'Código',
  },
  {
    id: 'title',
    numeric: false,
    disablePadding: false,
    label: 'Modelo',
  },
  {
    id: 'brand',
    numeric: false,
    disablePadding: false,
    label: 'Marca',
  },
  {
    id: 'age',
    numeric: false,
    disablePadding: false,
    label: 'Ano',
  },
  {
    id: 'price',
    numeric: false,
    disablePadding: false,
    label: 'Preço',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof ICar,
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: EOrder;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof ICar) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface ITableCustom<T> {
  edit: (farmer: ICar) => void;
  label: string;
  data: ICar[];
  listHandle: (orderItems: ICar[]) => void;
  refresh: () => Promise<void>;
}

export const TableCars = <T,>({
  data,
  edit,
  label,
  listHandle,
  refresh,
}: ITableCustom<T>) => {
  const [aux, setAux] = React.useState<ICar[]>([]);
  const [renderer, setRenderer] = React.useState<ICar[]>([]);
  const [order, setOrder] = React.useState<EOrder>(EOrder.asc);
  const [orderBy, setOrderBy] = React.useState<keyof ICar>('_id');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isFiltered, setIsFiltered] = React.useState<boolean>(false);
  const refFilter =
    React.createRef<IFilterProps>() as MutableRefObject<IFilterProps>;

  interface EnhancedTableToolbarProps {
    numSelected: number;
    label: string;
  }

  const handleSearcher = (list: ICar[]) => {
    setIsFiltered(true);
    listHandle(list);
  };

  const handleEdition = () => {
    const farmer = data.filter(el => selected.includes(el._id));
    edit(farmer[0]);
  };

  const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
    const { numSelected, label } = props;

    const deleteRegisters = async () => {
      selected.forEach(async id => {
        await deleteOne(id);
      });
      const orderFiltered = data.filter(
        order => !selected.includes(order._id.toString()),
      );
      listHandle(orderFiltered);
      setSelected([]);
    };

    const handleCleanSearch = async () => {
      refFilter?.current?.clean();
      setIsFiltered(false);
      await refresh();
    };

    const handleDelete = () => {
      showAlertConfirmarion({
        title: `Apagar ${selected.length > 1 ? 'registros.' : 'registro.'} `,
        cancelLabel: 'Cancelar',
        confirmLabel: 'Confirmar',
        subtitle: `Confirma a exclusão de ${selected.length} ${
          selected.length > 1 ? 'registros.' : 'registro.'
        } `,
        onConfirmation: function (): void {
          deleteRegisters();
        },
      });
    };

    React.useEffect(() => {
      setRenderer(data);
    }, [data]);

    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: theme =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity,
              ),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} {numSelected === 1 ? 'Selecionado' : 'Selecionados'}
          </Typography>
        ) : (
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            {label}
          </Typography>
        )}
        {numSelected > 0 ? (
          <>
            <>
              <Tooltip title="Delete" onClick={handleDelete}>
                <IconButton>
                  <Delete_Icon hex="#6C6C6C" />
                </IconButton>
              </Tooltip>
            </>
            {numSelected === 1 && (
              <>
                <Tooltip title="Editar" onClick={handleEdition}>
                  <IconButton>
                    <Edit_Icon hex="#6C6C6C" />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </>
        ) : (
          <>
            <>
              <Tooltip
                title="Limpar Filtro"
                onClick={() => refFilter.current.open()}
              >
                <IconButton>
                  <Filter_Icon hex="#6C6C6C" />
                </IconButton>
              </Tooltip>
            </>
            {isFiltered && (
              <>
                <Tooltip title="Limpar Pesquisa" onClick={handleCleanSearch}>
                  <IconButton>
                    <Clean_Icon hex="#6C6C6C" />
                  </IconButton>
                </Tooltip>
              </>
            )}
            {renderer.length === 0 && (
              <>
                <Tooltip title="Filtrar Lista" onClick={refresh}>
                  <IconButton>
                    <Cached_Icon />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </>
        )}
      </Toolbar>
    );
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof ICar,
  ) => {
    const isAsc = orderBy === property && order === EOrder.asc;
    setOrder(isAsc ? EOrder.desc : EOrder.asc);
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = data.map(n => n._id.toString());
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  function defaultLabelDisplayedRows({ from, to, count }: any) {
    return `${from}–${to} de ${count !== -1 ? count : `more than ${to}`}`;
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => {
    return selected.indexOf(name) !== -1;
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  return (
    <Box
      sx={{ width: '100%', backgroundColor: '#e4e2e2' }}
      style={{ backgroundColor: '#f3f3f3' }}
    >
      <Paper
        sx={{ width: '100%', mb: 2 }}
        style={{ backgroundColor: '#f3f3f3' }}
      >
        <EnhancedTableToolbar numSelected={selected.length} label={label} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="small"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />
            <TableBody sx={{ maxHeight: 300 }}>
              {stableSort<ICar>(
                renderer.map((product, i) => product as ICar),
                getComparator(order, orderBy),
              )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(({ age, brand, price, title, _id }, index) => {
                  const isItemSelected = isSelected(_id.toString());
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, _id.toString())}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={_id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        align="left"
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {index + 1}
                      </TableCell>

                      <TableCell align="left">{title}</TableCell>
                      <TableCell align="left">{brand}</TableCell>
                      <TableCell align="left">{age}</TableCell>
                      <TableCell align="left">
                        {formatter(Number(price), 'Real')}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 33 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          align="right"
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Linhas por Pagina"
          labelDisplayedRows={defaultLabelDisplayedRows}
        />
        <Filter
          data={renderer}
          isOpen={false}
          ref={refFilter}
          searcher={handleSearcher}
          reset={async () => {
            setIsFiltered(false);
            await refresh();
          }}
        />
      </Paper>
    </Box>
  );
};
