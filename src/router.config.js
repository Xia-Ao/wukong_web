import { getUserType } from "./common/auth";
import Home from './view/home';
import publishPlan from './view/publishPlan';
import publishQueen from './view/publishQueen';
import program from './view/program';



export const router = [
  {
    key: 'home',
    icon: 'icon-shujuzhongxin',
    name: '悟空',
    path: '/index/home',
    slideLeft: true,
    component: Home
  },
  // {
  //   key: 'device',
  //   icon: 'icon-shebei2',
  //   name: '设备管理',
  //   path: '/index/device',
  //   defaultPath: '/index/device/list',
  //   slideLeft: true,
  //   children: [
  //     {
  //       key: '1',
  //       name: '设备列表',
  //       icon: 'icon-icon',
  //       path: '/index/device/list',
  //       slideLeft: true,
  //       component: DeviceList
  //     },
  //     {
  //       key: '2',
  //       name: '学校管理',
  //       icon: 'icon-xuexiao',
  //       path: '/index/device/school',
  //       slideLeft: true,
  //       component: SchoolList
  //     },
  //     {
  //       key: '3',
  //       name: '班级管理',
  //       icon: 'icon-banji',
  //       path: '/index/device/schoolClass',
  //       slideLeft: true,
  //       component: SchoolClassList
  //     },
  //   ]
  // },
  {
    key: 'publishPlan',
    icon: 'icon-beizi',
    name: '发布计划',
    path: '/index/publish',
    defaultPath: '/index/publish/plan',
    slideLeft: true,
    component: publishPlan,
    children: [
      {
        key: '1',
        name: '所有发布计划',
        icon: 'icon-icon',
        path: '/index/publish/plan',
        slideLeft: true,
        component: publishPlan
      },
      {
        key: '2',
        name: '发布队列',
        icon: 'icon-xuexiao',
        path: '/index/publish/queen',
        slideLeft: true,
        component: publishQueen
      },
      // {
      //   key: '3',
      //   name: '班级管理',
      //   icon: 'icon-banji',
      //   path: '/index/device/schoolClass',
      //   slideLeft: true,
      //   component: SchoolClassList
      // },
    ]
  },
  {
    key: 'program',
    icon: 'icon-beizi',
    name: '应用',
    path: '/index/program',
    defaultPath: '/index/program/list',
    slideLeft: true,
    component: program
  },
];

