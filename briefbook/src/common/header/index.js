import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group'
import _ from 'underscore'
import { setHeaderFocused, getSearchList, setHeaderMouseIn, changePage, getChangLogin } from '../../store/actionCreators'
import {
     HeaderWrapper,
     WrapperCnt,
     Logo,
     Nav,
     NavItem,
     NavImg,
     SearchWrapper,
     NavInput,
     SearchInfo,
     SearchInfoTitle,
     SearchInfoSwitch,
     SearchInfoList,
     SearchInfoItem,
     Addition,
     Button
} from './style';

class Header extends Component {
     getListArea() {
          const { headerFocused, headerMouseIn, searchList, handleMouseEnter, handleMouseLeave, handleChangePage, searchCurrentPage, searchTotalPage } = this.props;
          const newList = _.isArray(searchList) === true ? searchList : [];
          const pageList = [];
          if (newList.length) {
               let sumPage = (searchCurrentPage * 10) < newList.length ? (searchCurrentPage * 10) : newList.length;
               for (let i = (searchCurrentPage - 1) * 10; i < sumPage; i++) {
                    pageList.push(
                         <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
                    )
               }
          }

          if (headerFocused || headerMouseIn) {
               return (
                    <SearchInfo
                         onMouseEnter={handleMouseEnter}
                         onMouseLeave={handleMouseLeave}
                    >
                         <SearchInfoTitle>
                              热门搜索
     					<SearchInfoSwitch onClick={() => handleChangePage(searchCurrentPage, searchTotalPage, this.spinIcon)}>
                                   <i ref={(icon) => { this.spinIcon = icon }} className="iconfont spin">&#xe851;</i>
                                   换一批
     					</SearchInfoSwitch>
                         </SearchInfoTitle>
                         <SearchInfoList>
                              {pageList}
                         </SearchInfoList>
                    </SearchInfo>
               )
          } else {
               return null;
          }
     }
     render() {
          const { headerFocused, handleInputFocus, handleInputBlur, searchList, isLogin, logout } = this.props;
          return (
               <div>
                    <HeaderWrapper>
                         <WrapperCnt>
                              <Logo />
                              <Nav>
                                   <NavItem className='left active'>首页</NavItem>
                                   <NavItem className='left'><a href="https://www.jianshu.com/apps?utm_medium=desktop&utm_source=navbar-apps">下载App</a></NavItem>
                                   <SearchWrapper>
                                        <CSSTransition in={headerFocused} timeout={200} classNames="slide" >
                                             <NavInput onFocus={() => handleInputFocus(searchList)} onBlur={handleInputBlur} className={headerFocused ? 'focused' : ''} />
                                        </CSSTransition>
                                        <i className={headerFocused ? 'focused iconfont zoom' : 'iconfont zoom'}>
                                             &#xe614;
                                        </i>
                                        {this.getListArea()}
                                   </SearchWrapper>
                                   {
                                        isLogin ?
                                             <NavItem onClick={logout} className='right'>退出</NavItem> :
                                             <Link to='/login'><NavItem className='right'>登陆</NavItem></Link>
                                   }
                                   <NavItem className='right'>
                                        <NavImg></NavImg>
                                   </NavItem>
                                   <NavItem className='right'>
                                        <i className="iconfont">&#xe636;</i>
                                   </NavItem>
                              </Nav>
                              <Addition>
                                   <Button className='writting'>
                                        <i className="iconfont">&#xe615;</i>
                                        写文章
                                   </Button>
                              </Addition>
                         </WrapperCnt>
                    </HeaderWrapper>
               </div>
          )
     }
}
const mapStateToPrps = (state) => {
     return {
          isLogin: state.get('isLogin'),
          headerFocused: state.get('headerFocused'),
          headerMouseIn: state.get('headerMouseIn'),
          searchList: state.get('searchList'),
          searchCurrentPage: state.get('searchCurrentPage'),
          searchTotalPage: state.get('searchTotalPage'),
     }
}
//store.dispatch 
const mapDispatchToPrps = (dispatch) => {
     return {
          //input 触发的时候
          handleInputFocus(searchList) {
               (searchList.size === 0) && dispatch(getSearchList());
               dispatch(changePage(1));
               dispatch(setHeaderFocused(true));
          },
          //input 失去焦点
          handleInputBlur() {
               dispatch(setHeaderFocused(false));
          },
          //鼠标进入
          handleMouseEnter() {
               dispatch(setHeaderMouseIn(true))
          },
          //鼠标离开
          handleMouseLeave() {
               dispatch(setHeaderMouseIn(false))
          },
          //换一换
          handleChangePage(page, totalPage, spin) {
               let originAngle = spin.style.transform.replace(/[^0-9]/ig, '');
               if (originAngle) {
                    originAngle = parseInt(originAngle, 10);
               } else {
                    originAngle = 0;
               }
               spin.style.transform = 'rotate(' + (originAngle + 360) + 'deg)';
               if (page < totalPage) {
                    let pages = parseInt(page) + 1;
                    dispatch(changePage(pages));
               } else {
                    dispatch(changePage(1));
               }
          },
          //退出登录
          logout() {
               dispatch(getChangLogin(null, "退出"));
          }
     }
}
export default connect(mapStateToPrps, mapDispatchToPrps)(Header)
