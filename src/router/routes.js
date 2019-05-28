import ArticleList from '../views/articleList';

export default [
  { name: 'articlelist', path: '/', alias: '个人日志', component: ArticleList },
  {
    name: 'center',
    path: '/ctrlcenter',
    alias: '管理中心',
    component: () => import('../views/control-center')
  },
  {
    name: 'article',
    path: '/article',
    component: () => import('../views/article')
  },
  {
    name: '404',
    path: '/404',
    component: () => import('../views/404')
  }
];
