import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import { getChangLogin } from '../../store/actionCreators'
import {
     LoginCnt
} from './style';
class Login extends Component {

     handleSubmit = e => {
          e.preventDefault();
          this.props.form.validateFields((err, values) => {
               if (!err) {
                    this.props.changeLogin(values);
               }
          });
     };
     render() {
          const { getFieldDecorator } = this.props.form;
          if (!this.props.isLogin) {
               return (
                    <LoginCnt>
                         <Form onSubmit={this.handleSubmit} className="login-form">
                              <Form.Item>
                                   {getFieldDecorator('username', {
                                        rules: [{ required: true, message: '请输入用户名' }],
                                   })(
                                        <Input
                                             prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                             placeholder="请输入用户名"
                                             max="15"
                                             min="2"
                                        />,
                                   )}
                              </Form.Item>
                              <Form.Item>
                                   {getFieldDecorator('password', {
                                        rules: [{ required: true, message: '请输入密码' }],
                                   })(
                                        <Input
                                             prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                             type="password"
                                             max="12"
                                             min="6"
                                             placeholder="请输入密码"
                                        />,
                                   )}
                              </Form.Item>
                              <Form.Item>
                                   {getFieldDecorator('remember', {
                                        valuePropName: 'checked',
                                        initialValue: true,
                                   })(<Checkbox>记住账号和密码</Checkbox>)}
                                   <a className="login-form-forgot" href="">
                                        忘记密码
                                   </a>
                              </Form.Item>
                              <Form.Item>
                                   <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
                                   <a href="">注册</a>
                              </Form.Item>
                         </Form>
                    </LoginCnt>
               )
          } else {
               return <Redirect to='/' />
          }
     }
}

const mapStateToPrps = (state) => {
     return {
          isLogin: state.get('isLogin')
     }
}
//store.dispatch 
const mapDispatchToPrps = (dispatch) => {
     return {
          changeLogin(param) {
               dispatch(getChangLogin(param, '登录'));
          }
     }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);
export default connect(mapStateToPrps, mapDispatchToPrps)(WrappedNormalLoginForm)