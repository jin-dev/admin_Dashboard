import routes from './routes';

const nav = routes?.filter(function (person) {
  return person.flag
}).map(el => (


  {
    _tag: 'CSidebarNavDropdown',
    name: el.title,
    // route: '/base',
    icon: 'cil-puzzle',
    _children:
      el.depth.length > 0
        ? el.depth.map(row => ({
          _tag: 'CSidebarNavItem',
          name: row.subtitle,
          to: row.path,
          badge: {
            color: 'success',
            text: '',
          },
        }))
        : el?.flag ? [
          {
            _tag: 'CSidebarNavItem',
            name: el.title,
            to: el.path,
            badge: {
              color: 'success',
              text: '',
            },
          },
        ] : null,
  }));

export default nav;
