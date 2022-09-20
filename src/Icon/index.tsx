import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import Edit from '@mui/icons-material/Edit';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import CachedIcon from '@mui/icons-material/Cached';
import Delivery from '@mui/icons-material/LocalShipping';
import Warehouse from '@mui/icons-material/Warehouse';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import LogoutIcon from '@mui/icons-material/Logout';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import styled from 'styled-components';

interface ICustomIcon {
  hex?: string;
  size?: string;
}

export const Delete_Icon = styled(DeleteIcon).attrs(Props => ({
  color: 'inherit',
}))<ICustomIcon>`
  svg {
    width: ${Props => (Props.size ? Props.size : 24)}px;
    height: ${Props => (Props.size ? Props.size : 24)}px;
  }

  path {
    fill: ${Props => (Props.hex ? Props.hex : 'white')};
  }
`;
export const Search_Icon = styled(SearchIcon)<ICustomIcon>`
  svg {
    width: ${Props => (Props.size ? Props.size : 24)}px;
    height: ${Props => (Props.size ? Props.size : 24)}px;
  }

  path {
    fill: ${Props => (Props.hex ? Props.hex : 'white')};
  }
`;
export const Edit_Icon = styled(Edit)<ICustomIcon>`
  svg {
    width: ${Props => (Props.size ? Props.size : 24)}px;
    height: ${Props => (Props.size ? Props.size : 24)}px;
  }

  path {
    fill: ${Props => (Props.hex ? Props.hex : 'white')};
  }
`;
export const Filter_Icon = styled(FilterAltIcon)<ICustomIcon>`
  svg {
    width: ${Props => (Props.size ? Props.size : 24)}px;
    height: ${Props => (Props.size ? Props.size : 24)}px;
  }

  path {
    fill: ${Props => (Props.hex ? Props.hex : 'white')};
  }
`;
export const Clean_Icon = styled(CleaningServicesIcon)<ICustomIcon>`
  svg {
    width: ${Props => (Props.size ? Props.size : 24)}px;
    height: ${Props => (Props.size ? Props.size : 24)}px;
  }

  path {
    fill: ${Props => (Props.hex ? Props.hex : 'white')};
  }
`;
export const Cached_Icon = styled(CachedIcon)<ICustomIcon>`
  svg {
    width: ${Props => (Props.size ? Props.size : 24)}px;
    height: ${Props => (Props.size ? Props.size : 24)}px;
  }

  path {
    fill: ${Props => (Props.hex ? Props.hex : 'white')};
  }
`;
export const Delivery_Icon = styled(Delivery)<ICustomIcon>`
  svg {
    width: ${Props => (Props.size ? Props.size : 24)}px;
    height: ${Props => (Props.size ? Props.size : 24)}px;
  }

  path {
    fill: ${Props => (Props.hex ? Props.hex : 'white')};
  }
`;
export const Warehouse_Icon = styled(Warehouse)<ICustomIcon>`
  svg {
    width: ${Props => (Props.size ? Props.size : 24)}px;
    height: ${Props => (Props.size ? Props.size : 24)}px;
  }

  path {
    fill: ${Props => (Props.hex ? Props.hex : 'white')};
  }
`;
export const Menu_Icon = styled(MenuIcon)<ICustomIcon>`
  svg {
    width: ${Props => (Props.size ? Props.size : 24)}px;
    height: ${Props => (Props.size ? Props.size : 24)}px;
  }

  path {
    fill: ${Props => (Props.hex ? Props.hex : 'white')};
  }
`;
export const ChevroLeft_Icon = styled(ChevronLeftIcon)<ICustomIcon>`
  svg {
    width: ${Props => (Props.size ? Props.size : 24)}px;
    height: ${Props => (Props.size ? Props.size : 24)}px;
  }

  path {
    fill: ${Props => (Props.hex ? Props.hex : 'white')};
  }
`;
export const ChevroRight_Icon = styled(ChevronRightIcon)<ICustomIcon>`
  svg {
    width: ${Props => (Props.size ? Props.size : 24)}px;
    height: ${Props => (Props.size ? Props.size : 24)}px;
  }

  path {
    fill: ${Props => (Props.hex ? Props.hex : 'white')};
  }
`;
export const Currency_Icon = styled(CurrencyExchangeIcon)<ICustomIcon>`
  svg {
    width: ${Props => (Props.size ? Props.size : 24)}px;
    height: ${Props => (Props.size ? Props.size : 24)}px;
  }

  path {
    fill: ${Props => (Props.hex ? Props.hex : 'white')};
  }
`;
export const Logout_Icon = styled(LogoutIcon)<ICustomIcon>`
  svg {
    width: ${Props => (Props.size ? Props.size : 24)}px;
    height: ${Props => (Props.size ? Props.size : 24)}px;
  }

  path {
    fill: ${Props => (Props.hex ? Props.hex : 'white')};
  }
`;
export const Car_Icon = styled(DirectionsCarIcon)<ICustomIcon>`
  svg {
    width: ${Props => (Props.size ? Props.size : 24)}px;
    height: ${Props => (Props.size ? Props.size : 24)}px;
  }

  path {
    fill: ${Props => (Props.hex ? Props.hex : 'white')};
  }
`;
export const PersonPlus_Icon = styled(GroupAddIcon)<ICustomIcon>`
  svg {
    width: ${Props => (Props.size ? Props.size : 24)}px;
    height: ${Props => (Props.size ? Props.size : 24)}px;
  }

  path {
    fill: ${Props => (Props.hex ? Props.hex : 'white')};
  }
`;
