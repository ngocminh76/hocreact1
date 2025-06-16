import { App, Button, Checkbox, Divider, Form, Input } from 'antd';
import type { FormProps } from 'antd';
import { useState } from 'react';
import './register.scss'
import { registerAPI } from '@/services/api';
import { Link, useNavigate } from 'react-router-dom';
type FieldType = {
  fullName: string;
  email: string;
  password: string;
  phone: string;
};

const RegisterPage = () => {

  const [isSubmit, setIsSubmit] = useState(false);
  const { message } = App.useApp(); // dùng message từ Ant Design
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {

    setIsSubmit(true);

    const { email, fullName, password, phone } = values;

    const res = await registerAPI(fullName, email, password, phone);

    if (res.data) {
      message.success('Đăng ký user thành công.');
      navigate('/login');
    } else {
      message.error(res.message);
    }

    setIsSubmit(false);
  };

  return (
    <div className="register-container">
      <h2>Đăng ký tài khoản</h2>
      <Form
        name="register"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        className="register-form"
      >
        <Form.Item
          label="Họ và tên"
          name="fullName"
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

      <Divider>Or</Divider>
      <div>Đã có tài khoản ? <Link to="/login">Đăng Nhập</Link></div>
    </div>
  );
}
export default RegisterPage