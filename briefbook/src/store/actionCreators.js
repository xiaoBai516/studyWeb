import axios from 'axios';
import * as actionTypes from './actionTypes'
import _Qs from 'underscore'

//搜索框 修改
export const setHeaderFocused = (payload) => ({
     type: actionTypes.EDIT_FOCUSED,
     payload: payload
})
//热搜内容控制
export const setHeaderMouseIn = (payload) => ({
     type: actionTypes.SET_MOUSEIN,
     payload: payload
})
//热搜的数据
export const searchList = (payload) => ({
     type: actionTypes.SREARCH_LIST,
     data: payload,
     totalPage: Math.ceil(payload.length / 10)
})
//改变 热搜的分页
export const changePage = (payload) => ({
     type: actionTypes.CHANGE_PAGE,
     payload
});
//请求接口 热搜数据
export const getSearchList = () => {
     return (dispatch) => {
          axios.get('./api/headerList.json').then((res) => {
               const data = res.data;
               if (data.success === true) {
                    dispatch(searchList(data.data));
               }
          })
     }

}
// 首页的数据
export const homeData = (payload) => ({
     type: actionTypes.HOME_DATA,
     payload
})
//请求接口 首页的数据
export const getHomeData = () => {
     return (dispatch) => {
          axios.get('./api/home.json').then((res) => {
               const data = res.data;
               if (data.success === true) {
                    dispatch(homeData(data.data));
               }
          })
     }

}
// 首页 左侧的数据
export const articleList = (list, nextPage) => ({
     type: actionTypes.ARTICLE_LIST,
     data: list,
     pageIndex: nextPage
})
//请求接口 首页左侧的数据
export const getArticleList = (pageIndex) => {
     return (dispatch) => {
          axios.get('./api/articleList.json', {
               params: {
                    pageSize: 10,
                    pageIndex: pageIndex
               }
          }).then((res) => {
               const data = res.data;
               if (data.success === true) {
                    let pages = pageIndex + 1;
                    dispatch(articleList(data.data, pages));
               }
          })
     }

}
// 返回顶部 显示状态
export const toggleTopShow = (payload) => ({
     type: actionTypes.SHOW_SCROLL,
     payload
})

// 文章详情页的数据
export const detailData = (payload) => ({
     type: actionTypes.DETAIL_DATA,
     payload
})
//请求接口 文章详情页的数据
export const getDetailData = (id) => {
     return (dispatch) => {
          axios.get('/api/detail.json?id=' + id).then((res) => {
               const data = res.data;
               if (data.success === true) {
                    var result = _Qs.findWhere(data.data, {
                         "id": id
                    });
                    dispatch(detailData(result));
               }
          }).catch(() => {

          })
     }

}

//登录状态 登录 退出
export const changLogin = (payload) => ({
     type: actionTypes.IS_LOGIN,
     payload
})
//登录接口
export const getChangLogin = (obj, types) => {
     return (dispatch) => {
          if (types === "登录") {
               axios.get('/api/login.json', {
                    params: obj
               }).then((res) => {
                    const data = res.data;
                    if (data.success === true && obj.username === "admin" && obj.password === "123456") {
                         dispatch(changLogin(true));
                    } else {
                         alert('账号或是密码错误')
                    }
               })
          } else {
               dispatch(changLogin(false));
          }
     }

}