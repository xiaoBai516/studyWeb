import * as actionTypes from './actionTypes';
import {
     fromJS
} from 'immutable';
const defaultStore = fromJS({
     isLogin: false, //登录状态
     headerFocused: false, //搜索框的控制
     headerMouseIn: false, //热搜内容控制
     searchList: [], //热搜内容的数据
     searchCurrentPage: 1, //热搜内容的数据 当前页码
     searchTotalPage: 1, //热搜内容数据 总的页码
     homeData: {}, //首页的数据
     articleList: [], //首页左侧的列表数据
     articlePageIndex: 1, //首页左侧的列表数据  分页
     showScroll: false, // 返回顶部
     detailData: {}, //文章详情的数据
})
export default (state = defaultStore, action) => {
     switch (action.type) {
          case actionTypes.EDIT_FOCUSED:
               return state.set('headerFocused', action.payload);
          case actionTypes.SREARCH_LIST:
               return state.merge({
                    searchList: action.data,
                    searchTotalPage: action.totalPage
               });
          case actionTypes.SET_MOUSEIN:
               return state.set('headerMouseIn', action.payload);
          case actionTypes.CHANGE_PAGE:
               return state.set('searchCurrentPage', action.payload);
          case actionTypes.HOME_DATA:
               return state.set('homeData', action.payload);
          case actionTypes.ARTICLE_LIST:
               return state.merge({
                    articleList: state.get('articleList').concat(action.data),
                    articlePageIndex: action.pageIndex
               });
          case actionTypes.SHOW_SCROLL:
               return state.set('showScroll', action.payload);
          case actionTypes.DETAIL_DATA:
               return state.set('detailData', action.payload);
          case actionTypes.IS_LOGIN:
               return state.set('isLogin', action.payload);
          default:
               return state
     }

}


// import { combineReducers } from 'redux';
// combineReducers:是可以把多份小的reducers整合一份reducer
// 使用：
// import { combineReducers } from 'redux';
// import { reducer as headerReducer } from '../common/header/store';
// import { reducer as loginReducer } from '../pages/login/store';

// const reducer = combineReducers({
// 	header: headerReducer,
// 	login: loginReducer
// });