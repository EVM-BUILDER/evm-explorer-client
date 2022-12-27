import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Input, InputNumber, Row } from 'antd'
import MenuListFooter from '../MenuListFooter'
import { useDispatch } from 'react-redux'
import { setSettings } from 'redux/settings/actions'

const layout = {
    labelCol: {
        span: 24,
    },
    wrapperCol: {
        span: 24,
    },
}

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
}

const FooterForm = ({ settings, data }) => {
    const dispatch = useDispatch()

    const [form] = Form.useForm();

    const [ft01Items, setFt01Items] = useState([]);
    const [ft02Items, setFt02Items] = useState([]);
    const [ft03Items, setFt03Items] = useState([]);
    const [ftSocials, setFtSocials] = useState([]);

    const onFinish = (values) => {
        const dataFooter = {
            fttitle: values?.fttitle || "",
            ftlogo: values?.ftlogo || "",
            ftdesciption: values?.ftdesciption || "",
            ftcopyright: values?.ftcopyright || "",
            ft01: {
                items: ft01Items,
                title: values?.ft01_title || "",
            },
            ft02: {
                items: ft02Items,
                title: values?.ft02_title || "",
            },
            ft03: {
                items: ft03Items,
                title: values?.ft03_title || "",
            },
            ftsocials: ftSocials,
        }

        dispatch(setSettings({
            ...settings,
            menu_footer: dataFooter,
        }));
    }

    useEffect(() => {
        form.setFieldsValue(
            {
                fttitle: data?.fttitle || "",
                ftlogo: data?.ftlogo || "",
                ftdesciption: data?.ftdesciption || "",
                ftcopyright: data?.ftcopyright || "",
                ft01_title: data?.ft01?.title || "",
                ft02_title: data?.ft02?.title || "",
                ft03_title: data?.ft03?.title || "",
            }
        )
        setFt01Items(data?.ft01?.items || []);
        setFt02Items(data?.ft02?.items || []);
        setFt03Items(data?.ft03?.items || []);
        setFtSocials(data?.ftsocials || []);
    }, [data])

    const updateListMenu = (newListMenu, menuName) => {
        console.log(newListMenu, menuName);
        switch (menuName) {
            case 'menu_footer_ft01':
                setFt01Items(newListMenu)
                break;
            case 'menu_footer_ft02':
                setFt02Items(newListMenu)
                break;
            case 'menu_footer_ft03':
                setFt03Items(newListMenu)
                break;
            case 'menu_footer_ftsocials':
                setFtSocials(newListMenu)
                break;
            default:
        }
    }

    return (
        <>
            <Form {...layout}
                form={form}
                name="setting-footer-form"
                onFinish={onFinish}
                validateMessages={validateMessages}
                className="setting-form setting-footer"
            >
                <h3 className='block-title'>Global</h3>
                <Row gutter={24}>
                    <Col span={24} md={12} lg={8}>
                        <Form.Item
                            name='fttitle'
                            label="Title"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24} md={12} lg={8}>
                        <Form.Item
                            name='ftlogo'
                            label="Logo"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24} md={12} lg={8}>
                        <Form.Item
                            name='ftdesciption'
                            label="Desciption"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24} md={12} lg={8}>
                        <Form.Item
                            name='ftcopyright'
                            label="Copyright"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <h3 className='block-title'>Footer 01</h3>
                <Form.Item
                    name='ft01_title'
                    label="Title"
                >
                    <Input />
                </Form.Item>
                <MenuListFooter menuName="menu_footer_ft01" listMenuItems={data?.ft01?.items || []} noSubmenu={true} updateListMenu={updateListMenu} />

                <h3 className='block-title'>Footer 02</h3>
                <Form.Item
                    name='ft02_title'
                    label="Title"
                >
                    <Input />
                </Form.Item>
                <MenuListFooter menuName="menu_footer_ft02" listMenuItems={data?.ft02?.items || []} noSubmenu={true} updateListMenu={updateListMenu} />

                <h3 className='block-title'>Footer 03</h3>
                <Form.Item
                    name='ft03_title'
                    label="Title"
                >
                    <Input />
                </Form.Item>
                <MenuListFooter menuName="menu_footer_ft03" listMenuItems={data?.ft03?.items || []} noSubmenu={true} updateListMenu={updateListMenu} />

                <h3 className='block-title'>Footer Socials</h3>
                <MenuListFooter menuName="menu_footer_ftsocials" listMenuItems={data?.ftsocials || []} noSubmenu={true} updateListMenu={updateListMenu} haveImage={true} />

                <Form.Item
                    className='form-actions'
                >
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default FooterForm