import { Button, Checkbox, Form, Input } from 'antd';
import type { FormProps } from 'antd';
import { useState } from 'react';
import './register.scss'
import { loginApi } from '@/services/api';
type FieldType = {
  fullname: string;
  email: string;
  password: string;
  phone: string;
};

const RegisterPage = () => {

  const [isSubmit, setIsSubmit] = useState(false);
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log('✅ Success:', values);
    const res = await loginApi("user@gmail.com", "123456")

    console.log(">>>> check res :", res);
    // setIsSubmit(true);
  };


  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('❌ Failed:', errorInfo);
    setIsSubmit(false);
  };
  return (
    <div className="register-container">
      <h2>Đăng ký tài khoản</h2>
      <Form
        name="register"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="register-form"
      >
        <Form.Item
          label="Họ và tên"
          name="fullname"
          rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Vui lòng nhập email' },
            { type: 'email', message: 'Email không hợp lệ' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            { required: true, message: 'Vui lòng nhập mật khẩu' },
            { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[
            { required: true, message: 'Vui lòng nhập số điện thoại' },
            {
              pattern: /^[0-9]{9,11}$/,
              message: 'Số điện thoại không hợp lệ',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isSubmit}>
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
export default RegisterPage