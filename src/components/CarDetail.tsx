import { Form, Input, Typography, Row, Col, Card, ConfigProvider,Modal } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
const { Meta } = Card;
interface CardCarProps {
    id: string
    // imaages: string;
    brand: string;
    car_models: string;
    car_registration: string;
    description: string;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}
const color = (brand: string): string => {
    switch (brand.toLowerCase()) {
        case 'honda':
            return '#96c6f1';
        case 'toyota':
            return '#f4b3ef';
        case 'gwm':
            return '#ffd966';
        default:
            return '#ffffff';
    }
}
const CardCar: React.FC<CardCarProps> = ({ brand, car_models, car_registration, description, id, onEdit, onDelete }) => {
    const [deleteModal, setDeleteModal] = useState(false);
    const cardCss = {
        with: 300,
        backgroundColor: color(brand)
    }

   const handleDelete=()=>{
    onDelete(id);
    setDeleteModal(false);
   }
    return (
        <ConfigProvider theme={{
            components: {
              Card: {
                actionsBg:color(brand)

              },
            },
          }}>
            <Card
                hoverable
                style={cardCss}
                // cover={<img alt="example" src={imaages} />} 
                actions={[<EditOutlined key="edit" onClick={() => onEdit(id)} />, <DeleteOutlined key="delete" onClick={() => setDeleteModal(true)} />]}

            >
                <Meta description={
                    <div>
                        <h1 className="text-[2rem] text-black">{car_registration}</h1>
                        <p className="text-[1.5rem]">{car_models}</p>
                        <p className="text-[1.5rem]">{brand}</p>
                        <p className="text-[1.5rem]">{description}</p>
                    </div>} />
            </Card>
            <Modal
                title="กรุณายืนยัน"
                visible={deleteModal}
                onOk={handleDelete}
                onCancel={() => setDeleteModal(false)}
            >
                <p>คุณต้องการจะลบข้อมูลของรถหมายเลขทะเบียน "{car_registration}" ใช่หรือไม่ </p>
            </Modal>
        </ConfigProvider>
    );
};
export default CardCar;
