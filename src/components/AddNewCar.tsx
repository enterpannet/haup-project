import React from 'react';
import {
    Button,
    Form,
    Input,
    Select,
} from 'antd';
const { TextArea } = Input;
interface InputFromProps {
    dataFromDb?: any;
    methods: 'post' | 'put'
    activity: (value: any) => void

}
const InputFrom: React.FC<InputFromProps> = ({ dataFromDb, methods, activity }) => {
    const handleSumit = (value: any) => {
        activity(value)
    }
    return (<Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} variant="filled" style={{ maxWidth: 600 }} onFinish={handleSumit} initialValues={dataFromDb}>
        <Form.Item label="ทะเบียน" name="car_registration" rules={[{ required: true, message: 'กรุณาใส่ทะเบียนรถ' }]}>
            <Input />
        </Form.Item>

        <Form.Item label="ยี่ห้อ" name="brand" rules={[{ required: true, message: 'กรุณาเลือกยี่ห้อรถ' }]}>
            <Select>
                <Select.Option value="honda">Honda</Select.Option>
                <Select.Option value="toyota">Toyota</Select.Option>
                <Select.Option value="GWM">GWM</Select.Option>
            </Select>
        </Form.Item>
        <Form.Item label="รุ่น" name="car_models" rules={[{ required: true, message: 'กรุณาใส่รุ่น' }]}>
            <Input />
        </Form.Item>
        <Form.Item label="รายละเอียด" name="description">
            <TextArea rows={4} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" htmlType="submit">
                บันทึก
            </Button>
        </Form.Item>
    </Form>)

}

export default InputFrom;