import React, { Component } from 'react'
import 'antd/dist/antd.css';
import { connect } from 'react-redux'
import Header from '../../common/header'
import { getDetailData } from '../../store/actionCreators'
import { DetailWrapper, Title, Content } from './style';
class Detail extends Component {
    componentDidMount() {
        this.props.getDetails(this.props.match.params.id);
    }
    render() {
        console.log(this.props.detailData)
        const { detailData } = this.props;
        return (
            <div>
                <Header />
                <DetailWrapper>
                    <Title>{detailData.title}</Title>
                    <Content dangerouslySetInnerHTML={{ __html: detailData.content }}></Content>
                </DetailWrapper>
            </div>
        )
    }
}
const mapStateToPrps = (state) => {
    return {
        detailData: state.get('detailData')
    }
}
//store.dispatch 
const mapDispatchToPrps = (dispatch) => {
    return {
        getDetails(id) {
            dispatch(getDetailData(id))
        }
    }
}
export default connect(mapStateToPrps, mapDispatchToPrps)(Detail)