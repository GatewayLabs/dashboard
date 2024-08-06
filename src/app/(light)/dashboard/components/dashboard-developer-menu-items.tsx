import CodeBlocksOutlinedIcon from '@/components/icons/code-blocks-outlined';
import { GTWMenuItemSettings } from './menu-item';
import documentationRoutes from '@/constants/documentationRoutes';
import routes from '@/constants/routes';

import {
  CodeOutlined,
  ExploreOutlined,
  MenuBookOutlined,
} from '@mui/icons-material';

export const dashboardDevelopersMenuItems: GTWMenuItemSettings[] = [
  {
    name: 'API',
    href: routes.dashboard.user.developerAccess,
    activeHrefs: [routes.dashboard.user.developerAccess],
    icon: CodeOutlined,
  },
  {
    name: 'Documentation',
    href: documentationRoutes.home,
    activeHrefs: [],
    icon: MenuBookOutlined,
    externalLink: true,
  },
  {
    name: 'Explorer',
    href: routes.explorer.root,
    activeHrefs: [],
    icon: ExploreOutlined,
    externalLink: true,
  },
];
