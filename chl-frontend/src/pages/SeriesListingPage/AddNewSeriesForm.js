import React from 'react';
import { Form, Input, Button, Select, DatePicker } from 'antd';

const { Option } = Select;

const SeriesForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Form values: ', values);
    // You can handle form submission here
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <Form
        form={form}
        name="series_form"
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          seriesType: '',
          seriesName: '',
          startDate: null,
          endDate: null,
          seriesHeaderText: ''
        }}
      >
        {/* Select Series Type */}
        <Form.Item
          name="seriesType"
          label="Select Series Type"
          rules={[{ required: true, message: 'Please select the series type!' }]}
        >
          <Select placeholder="Select series type">
            <Option value="international">International</Option>
            <Option value="league">League</Option>
            <Option value="domestic">Domestic</Option>
            <Option value="women">Women</Option>
          </Select>
        </Form.Item>

        {/* Series Name */}
        <Form.Item
          name="seriesName"
          label="Series Name"
          rules={[{ required: true, message: 'Please input the series name!' }]}
        >
          <Input placeholder="Enter series name" />
        </Form.Item>

        {/* Start Date */}
        <Form.Item
          name="startDate"
          label="Start Date"
          rules={[{ required: true, message: 'Please select the start date!' }]}
        >
          <DatePicker style={{ width: '100%' }} placeholder="Select start date" />
        </Form.Item>

        {/* End Date */}
        <Form.Item
          name="endDate"
          label="End Date"
          rules={[{ required: true, message: 'Please select the end date!' }]}
        >
          <DatePicker style={{ width: '100%' }} placeholder="Select end date" />
        </Form.Item>

        {/* Series Header Text */}
        <Form.Item
          name="seriesHeaderText"
          label="Series Header Text"
          rules={[{ required: true, message: 'Please input the series header text!' }]}
        >
          <Input placeholder="Enter series header text" />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SeriesForm;
