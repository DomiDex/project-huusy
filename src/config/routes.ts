export const routes = {
  static: [
    '/',
    '/properties',
    '/properties/cities',
    '/properties/sale',
    '/properties/rent',
    '/agents',
    '/about',
    '/contact',
  ],
  dynamic: [
    '/properties/[path]',
    '/properties/cities/[path]',
    '/agents/[id]',
    '/pro/[id]',
    '/customer/[id]',
  ],
};
