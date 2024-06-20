import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Col, Row, Card, Flex, Modal, Button, Space } from 'antd';
import InputFrom from '../components/AddNewCar'

import {
  CarOutlined
} from '@ant-design/icons';
import CardCar from '../components/CarDetail'

const HomePage: React.FC = () => {
  const [addDataToDBModal, setAddDataToDBModal] = useState(false)
  const [showData, setShowData] = useState<any[]>([])
  const [editDataToDBModal, setEditDataToDBModal] = useState(false);
  const [Car, setCar] = useState<any>(null);
  const [brandButton, setBrandButton] = useState<string>('')
  const openModalAddData = () => {
    setAddDataToDBModal(true)
  }
  const insertData = async (value: any) => {
    try {
      const data = await axios.post(`${import.meta.env.VITE_API_URL}/car/add`, value)
      console.log(data);
      console.log(`บันทึกข้อมูลสำเร็จ${data}`);
    } catch (error) {
      console.error(error)
    }
    setAddDataToDBModal(false)

  }
  const editData = async (value: any) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/car/${Car.id}`, value);
      console.log('แก้ไขข้อมูลเสร็จแล้ว');
    } catch (error) {
      console.error(error);
    }
    setEditDataToDBModal(false);
  };

  const deleteData = async (id: string) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/car/${id}`);
      console.log('ลบข้อมูลเสร็จแล้ว');
      setShowData(showData.filter(car => car.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const showDataFromDB = async () => {
      try {
        const data = await axios.get(`${import.meta.env.VITE_API_URL}/car`)
        console.log(data);

        setShowData(data.data)
      } catch (error) {
        console.log(error);

      }
    }
    showDataFromDB()
  }, [addDataToDBModal, editDataToDBModal])

  const openEditModal = (id: string) => {
    const EditCar = showData.find(item => item.id === id);
    setCar(EditCar);
    setEditDataToDBModal(true);
  };
  const countCar = (brand: string) => {
    const car = showData.filter(car => car.brand === brand)
    return car.length
  }
  const CarInBrand = (brand: string) => {
    if (brand == '') {
      return showData
    } else {
      const cars = showData.filter(car => car.brand === brand)
      return cars
    }
  }

  const CilkInBrand = (brand: string) => {
    setBrandButton(brand || "")
  }
  return (
    <Flex justify='center' align='center' vertical>
      <Row gutter={30} align="middle" justify="center" style={{ height: 300 }}>
        <Col>
          <Card hoverable style={{ width: 300, background: 'linear-gradient(332deg, rgba(248,212,66,1) 0%, rgba(254,175,1,1) 100%)' }} onClick={() => CilkInBrand('')}>
            <p className='text-[2rem]'><CarOutlined />  All CAR</p>
            <p>{showData.length}</p>
          </Card>
        </Col>
        <Col>
          <Card hoverable style={{ width: 300, background: "#96c6f1" }} onClick={() => CilkInBrand('honda')} >
            <p className='text-[2rem]'>Honda</p>
            <p>{countCar("honda")}</p>
          </Card>
        </Col>
        <Col>
          <Card hoverable style={{ width: 300, background: "#f4b3ef" }} onClick={() => CilkInBrand('toyota')}>
            <p className='text-[2rem]'>Toyota</p>
            <p>{countCar("toyota")}</p>
          </Card>
        </Col>
        <Col>
          <Card hoverable style={{ width: 300, background: "#ffd966" }} onClick={() => CilkInBrand('GWM')}>
            <p className='text-[2rem]'>GWM</p>
            <p>{countCar("GWM")}</p>
          </Card>
        </Col>
      </Row>

      <Row className='my-5'>
        <Modal title="เพิ่มรถยนต์" onOk={insertData} open={addDataToDBModal} onCancel={() => setAddDataToDBModal(false)} footer={null}>
          <InputFrom methods="post" activity={insertData} />
        </Modal>
        <Button type="primary" onClick={openModalAddData}>เพิ่มรถยนต์คันใหม่</Button>

      </Row>
      <Row gutter={30} align="middle" justify="center" style={{ height: 300 }}>
        {CarInBrand(brandButton).map(car => (
          <Col key={car.id}>
            <CardCar              
              brand={car.brand}
              car_models={car.car_models}
              car_registration={car.car_registration}
              description={car.description}
              id={car.id}
              onEdit={openEditModal}
              onDelete={deleteData}
            />
          </Col>
        ))}
        <Modal title="แก้ไขข้อมูลรถยนต์" open={editDataToDBModal} onCancel={() => setEditDataToDBModal(false)} footer={null}>
          {Car && <InputFrom methods="put" activity={editData} dataFromDb={Car} />}
        </Modal>
      </Row>
    </Flex>
  )
}

export default HomePage