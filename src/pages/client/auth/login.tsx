import { App, Button, Form, Input, Divider } from 'antd';
import type { FormProps } from 'antd';
import { useState } from 'react';
import { loginApi } from '@/services/api';
import { useNavigate, Link } from 'react-router-dom';
import './login.scss';

type LoginFieldType = {
    username: string;
    password: string;
};

const LoginPage = () => {
    const [isSubmit, setIsSubmit] = useState(false);
    const { message } = App.useApp();
    const navigate = useNavigate();

    const onFinish: FormProps<LoginFieldType>['onFinish'] = async (values) => {
        setIsSubmit(true);
        try {
            const res = await loginApi(values.username, values.password);
            if (res?.data) {
                message.success('Đăng nhập thành công!');
                // TODO: Lưu token và user info nếu cần
                navigate('/');
            } else {
                message.error(res.message || 'Đăng nhập thất bại!');
            }
        } catch (error: any) {
            message.error(error?.response?.data?.message || 'Đã có lỗi xảy ra');
        } finally {
            setIsSubmit(false);
        }
    };

    return (
        <div className="login-container">
            <h2>Đăng nhập</h2>
            <Form
                name="login"
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
                className="login-form"
            >
                <Form.Item
                    label="Tên đăng nhập (Email hoặc Username)"
                    name="username"
                    rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={isSubmit}>
                        Đăng nhập
                    </Button>
                </Form.Item>
            </Form>

            <Divider>Hoặc</Divider>
            <div>Chưa có tài khoản? <Link to="/register">Đăng ký</Link></div>
        </div>
    );
};

export default LoginPage;
