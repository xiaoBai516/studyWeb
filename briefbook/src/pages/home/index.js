import React, { Component } from 'react'
import { Carousel } from 'antd';
import 'antd/dist/antd.css';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import Header from '../../common/header'
import { getHomeData, getArticleList, toggleTopShow } from '../../store/actionCreators'
import {
     HomeWrapper,
     HomeLeft,
     ListItem, ListInfo, LoadMore,
     HomeRight,
     RecommendWrapper, RecommendItem,
     WriterWrapper,
     BackTop
} from './style';
class Home extends Component {
     componentDidMount() {
          //请求接口 首页
          this.props.setHomeData();
          this.props.getMoreList(1)
          this.bindEvents();
     }
     handleScrollTop() {
          // window.scrollTo(0, 0);这是没有动画效果的
          let scrollToTop = window.setInterval(function () {
               let pos = window.pageYOffset;
               if (pos > 0) {
                    window.scrollTo(0, pos - 20); // how far to scroll on each step
               } else {
                    window.clearInterval(scrollToTop);
               }
          }, 2);
     }
     componentWillUnmount() {
          //组件  离开此页面的时候 要解除绑定事件
          window.removeEventListener('scroll', this.props.changeScrollTopShow);
     }

     bindEvents() {
          window.addEventListener('scroll', this.props.changeScrollTopShow);
     }
     render() {
          const { list, articleList, getMoreList, page, showScroll } = this.props;
          const bannerList = list.bannerList === undefined ? [] : list.bannerList;
          const recommendList = list.recommendList === undefined ? [] : list.recommendList;
          return (
               <div>
                    <Header />
                    <HomeWrapper>
                         <HomeLeft>
                              <Carousel autoplay>
                                   {
                                        bannerList.length === 0 ? '' : bannerList.map((item, index) => {
                                             return (
                                                  <div key={item.id} >
                                                       <img alt='首页轮播图' src={item.imgUrl} />
                                                  </div>
                                             )
                                        })
                                   }
                              </Carousel>
                              {
                                   articleList.length === 0 ? '' : articleList.map((item, index) => {
                                        return (
                                             <Link key={index} to={'/detail/' + item.id}>
                                                  <ListItem >
                                                       {
                                                            item.imgUrl !== '' ? <img alt='' className='pic' src={item.imgUrl} /> : ''
                                                       }
                                                       <ListInfo className={item.imgUrl !== '' ? '' : 'widthAuto'}>
                                                            <h3 className='title'>{index + 1}.{item.title}</h3>
                                                            <p className='desc'>{item.desc}</p>
                                                       </ListInfo>
                                                  </ListItem>
                                             </Link>
                                        )
                                   })
                              }
                              <LoadMore onClick={() => getMoreList(page)}>阅读更多</LoadMore>
                         </HomeLeft>
                         <HomeRight>
                              <RecommendWrapper>
                                   {
                                        recommendList.map((item) => {
                                             return <RecommendItem key={item.id} imgUrl={item.imgUrl} />
                                        })
                                   }
                              </RecommendWrapper>
                         </HomeRight>
                         {showScroll ? <BackTop onClick={this.handleScrollTop}>顶部</BackTop> : null}
                    </HomeWrapper>
               </div>
          )
     }
}
const mapStateToPrps = (state) => {
     return {
          list: state.get('homeData'),
          articleList: state.get('articleList'),
          page: state.get('articlePageIndex'),
          showScroll: state.get('showScroll')
     }
}
//store.dispatch 
const mapDispatchToPrps = (dispatch) => {
     return {
          setHomeData() {
               dispatch(getHomeData());
          },
          getMoreList(page) {
               dispatch(getArticleList(page));
          },
          changeScrollTopShow() {
               if (document.documentElement.scrollTop > 100) {
                    dispatch(toggleTopShow(true))
               } else {
                    dispatch(toggleTopShow(false))
               }
          }
     }
}
export default connect(mapStateToPrps, mapDispatchToPrps)(Home)