// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';

// icons
const icons = {
  ChromeOutlined,
  QuestionOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const support = {
  id: 'support',
  title: 'Support',
  type: 'group',
  children: [
    {
      id: 'sample-page',
      title: 'Sample Page',
      type: 'item',
      url: '/sample-page',
      icon: icons.ChromeOutlined
    },
    {
      id: 'documentation',
      title: 'Documentation',
      type: 'item',
      url: 'https://codedthemes.gitbook.io/mantis/',
      icon: icons.QuestionOutlined,
      external: true,
      target: true
    },
    {
      id: 'users',
      title: 'Users',
      type: 'collapse',
      url: '/dashboard/default',
      icon: icons.DashboardOutlined,
      breadcrumbs: true,
      children: [
        {
          id: 'adduser',
          title: 'Add Users',
          type: 'item',
          url: '/dashboard/test',
          icon: icons.DashboardOutlined,
          breadcrumbs: true,
        }
      ]
    },
  ]
};

export default support;
