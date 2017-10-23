// 打包优化，详见 https://github.com/sorrycc/roadhog/issues/405
import 'react';
import 'react-dom';
import 'react-router-dom';

import 'dva';

//  抽取antd组件及样式
import 'antd/lib/table'
import 'antd/lib/table/style'

import 'antd/lib/form'
import 'antd/lib/form/style'

import 'antd/lib/modal'
import 'antd/lib/modal/style'

import 'antd/lib/input'
import 'antd/lib/input/style'

import 'antd/lib/popconfirm'
import 'antd/lib/popconfirm/style'


// 下面这种方式居然不行。。。应该是这个js没被依赖，无法走babel-plugin-import解析
// import {
//   message,
//   Menu, Icon,
//   Modal, Form, Input,
//   Table, Pagination, Popconfirm, Button,
// } from 'antd'
