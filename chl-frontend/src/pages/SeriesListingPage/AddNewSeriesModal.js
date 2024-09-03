import React, { useState } from 'react';
import { Button, Modal, Select, Form, Spin} from 'antd';
import { SERIES_TYPE_STR } from '../../constants/generalApp';
import { addSeriesListApi, getExternalSeriesListApi } from '../../services/seriesApis';
import "./NewSeriesModal.scss"
import SpinnerOverlay from '../components/SpinnerOverlay/SpinnerOverlay';
const { Option } = Select;

const AddNewSeriesModal = ({onNewSeriesAdded}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [spinLoading, setLoading] = useState(false);
  const [form] = Form.useForm();
  
const getNewSeriesList = async (seriesType) => {
    try {
    const response = await getExternalSeriesListApi({ series_type: seriesType});
    if (response && response.data) {
        console.log("Get Cricbuzz Series List Response=",response.data);
        addNewSeriesList(response.data.seriesMapProto, seriesType);
    }
    } catch (e) {
        console.log("error=",e)
    }
};

const addNewSeriesList = async (data, seriesType) => {
    let paramRequest = [];

    for(let item in data) {
        const dateHeaderText = data[item].date;
        for(let i in data[item].series) {
            const sd = data[item].series[i];
            paramRequest.push({
                seriesId: sd.id,
                series_name:sd.name,
                startDt:sd.startDt,
                endDt: sd.endDt,
                seriesType: seriesType,
                dateHeaderText:dateHeaderText
            });
        }
    }

    try {
        const response = await addSeriesListApi(paramRequest);
        if (response && response.data) {
        console.log("Success Add series Response=",response.data);
        setLoading(false); // Stop the spinner after a delay (simulate API call)
        onNewSeriesAdded(seriesType)
        setIsModalVisible(false); // Close the modal
        }
    } catch (e) {
        console.log("error=",e)
    }
};


  // Function to show the modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Function to handle modal submission
  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        console.log('Selected series type:', values.seriesType);
        setLoading(false);
        getNewSeriesList(values.seriesType)
      })
      .catch((info) => {
        console.log('Validation failed:', info);
      });
  };

  // Function to handle modal cancellation
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      {/* Button to open the modal */}
      <Button type="primary" className='add-series-btn' onClick={showModal}>
        Add New Series
      </Button>
      
      {/* Modal Component */}
      <Modal
        title="Add New Series"
        visible={isModalVisible}
        onOk={handleSubmit}
        onCancel={handleCancel}
        okText="Submit"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical" name="series_type_form">
          <Form.Item
            name="seriesType"
            label="Series Type"
            rules={[{ required: true, message: 'Please select a series type!' }]}
          >
            <Select placeholder="Select series type">
                {Object.keys(SERIES_TYPE_STR).map((item) => (
                    <Option key={item} value={item}>{SERIES_TYPE_STR[item]}</Option>
                ))}
            </Select>
          </Form.Item>
        </Form>

        <SpinnerOverlay spinning={spinLoading}></SpinnerOverlay>
      </Modal>
    </div>
  );
};

export default AddNewSeriesModal;
