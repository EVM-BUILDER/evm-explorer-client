import React, { useEffect } from 'react'
import { Button, Col, Form, Input, InputNumber, Row, Select } from 'antd'
import { Colorpicker, ColorPickerValue } from 'antd-colorpicker'
import { useDispatch } from 'react-redux'
import { setSettings } from 'redux/settings/actions'

const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 18,
    },
}

const tailLayout = {
    wrapperCol: { span: 24 },
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

const AppearanceForm = ({ settings, data, listOptionsFont }) => {
    const dispatch = useDispatch()

    const [form] = Form.useForm()

    const onFinish = (values) => {
        const dataAppearance = {
            text: values?.text || '',
            bordercolor: values?.bordercolor || '',
            header: {
                textcolor: values?.header_textcolor || '',
                subtextcolor: values?.sub_header_textcolor || '',
                fontsize: values?.header_fontsize || 16,
                fontweight: values?.header_fontweight || 400,
                text_active_color: values?.header_text_active_color || '',
                bgcolor: values?.header_bgcolor || '',
                subnav_bg_color: values?.header_subnav_bg_color || '',
                bgimage: values?.header_bgimage || '',
            },
            banner: {
                bgcolor: values?.banner_bgcolor || '',
                bgimage: values?.banner_bgimage || '',
            },
            homesearch: {
                color: values?.home_search_color || '',
                bordercolor: values?.home_search_bordercolor || '',
                bgcolor: values?.home_search_bgcolor || '',
                bgimage: values?.home_search_bgimage || '',
            },
            body: {
                bgcolor: values?.body_bgcolor || '',
            },
            footer: {
                fontsize: values?.footer_fontsize || 16,
                fontweight: values?.footer_fontweight || 700,
                textcolor: values?.footer_textcolor || '',
                text_active_color: values?.footer_text_active_color || '',
                bgcolor: values?.footer_bgcolor || '',
                bgimage: values?.footer_bgimage || '',
                show_addmetamask: values?.footer_show_addmetamask || true,
            },
            card: {
                header_bg_color: values?.card_header_bgcolor || '',
                body_bg_color: values?.card_body_bgcolor || '',
            },
            table: {
                header_bg_color: values?.table_header_bgcolor || '',
                body_bg_color: values?.table_body_bgcolor || '',
            },
            input: {
                color: values?.input_color || '',
                bgcolor: data?.input_bgcolor || '',
            },
            color_scheme: {
                button: values?.button || '',
                primary: values?.primary || '',
                secondary: values?.secondary || '',
                tertiary: values?.tertiary || '',
            },
            typography: {
                fontfamily: values?.fontfamily || '',
                h1: {
                    fontsize: values?.h1_fontsize || 24,
                    color: values?.h1_color || '',
                    fontweight: values?.h1_fontweight || 700,
                },
                h2: {
                    fontsize: values?.h2_fontsize || 24,
                    color: values?.h2_color || '',
                    fontweight: values?.h2_fontweight || 600,
                },
                h3: {
                    fontsize: values?.h3_fontsize || 24,
                    color: values?.h3_color || '',
                    fontweight: values?.h3_fontweight || 400,
                },
                h4: {
                    fontsize: values?.h4_fontsize || 24,
                    color: values?.h4_color || '',
                    fontweight: values?.h4_fontweight || 400,
                },
                h5: {
                    fontsize: values?.h5_fontsize || 24,
                    color: values?.h5_color || '',
                    fontweight: values?.h5_fontweight || 400,
                },
                h6: {
                    fontsize: values?.h6_fontsize || 24,
                    color: values?.h6_color || '',
                    fontweight: values?.h6_fontweight || 400,
                },
                p: {
                    fontsize: values?.p_fontsize || 24,
                    color: values?.p_color || '',
                    fontweight: values?.p_fontweight || 400,
                },
            },
        }

        dispatch(
            setSettings({
                ...settings,
                appearance: dataAppearance,
            }),
        )
    }

    useEffect(() => {
        form.setFieldsValue({
            text: data?.text || '',
            body_bgcolor: data?.body?.bgcolor || '',
            bordercolor: data?.bordercolor || '',

            header_textcolor: data?.header?.textcolor || '',
            sub_header_textcolor: data?.header?.subtextcolor || '',
            header_text_active_color: data?.header?.text_active_color || '',
            header_subnav_bg_color: data?.header?.subnav_bg_color || '',
            header_bgimage: data?.header?.bgimage || '',
            header_bgcolor: data?.header?.bgcolor || '',
            header_fontsize: data?.header?.fontsize || '',
            header_fontweight: data?.header?.fontweight || '',

            banner_bgcolor: data?.banner?.bgcolor || '',
            banner_bgimage: data?.banner?.bgimage || '',

            footer_textcolor: data?.footer?.textcolor || '',
            footer_text_active_color: data?.footer?.text_active_color || '',
            footer_subnav_bg_color: data?.footer?.subnav_bg_color || '',
            footer_bgimage: data?.footer?.bgimage || '',
            footer_bgcolor: data?.footer?.bgcolor || '',
            footer_fontsize: data?.footer?.fontsize || '',
            footer_fontweight: data?.footer?.fontweight || '',
            footer_show_addmetamask: data?.footer?.show_addmetamask || '',

            home_search_color: data?.homesearch?.color || '',
            home_search_bordercolor: data?.homesearch?.bordercolor || '',
            home_search_bgcolor: data?.homesearch?.bgcolor || '',
            home_search_bgimage: data?.homesearch?.bgimage || '',

            card_header_bgcolor: data?.card?.header_bg_color || '',
            card_body_bgcolor: data?.card?.body_bg_color || '',

            table_header_bgcolor: data?.table?.header_bg_color || '',
            table_body_bgcolor: data?.table?.body_bg_color || '',

            // card_bordercolor: data?.card?.bordercolor || '',
            input_color: data?.input?.color || '',
            input_bgcolor: data?.input?.bgcolor || '',

            button: data?.color_scheme?.button || '',
            primary: data?.color_scheme?.primary || '',
            secondary: data?.color_scheme?.secondary || '',
            tertiary: data?.color_scheme?.tertiary || '',

            fontfamily: data?.typography?.fontfamily || '',
            h1_color: data?.typography?.h1?.color || '',
            h1_fontsize: data?.typography?.h1?.fontsize || '',
            h1_fontweight: data?.typography?.h1?.fontweight || '',
            h2_color: data?.typography?.h2?.color || '',
            h2_fontsize: data?.typography?.h2?.fontsize || '',
            h2_fontweight: data?.typography?.h2?.fontweight || '',
            h3_color: data?.typography?.h3?.color || '',
            h3_fontsize: data?.typography?.h3?.fontsize || '',
            h3_fontweight: data?.typography?.h3?.fontweight || '',
            h4_color: data?.typography?.h4?.color || '',
            h4_fontsize: data?.typography?.h4?.fontsize || '',
            h4_fontweight: data?.typography?.h4?.fontweight || '',
            h5_color: data?.typography?.h5?.color || '',
            h5_fontsize: data?.typography?.h5?.fontsize || '',
            h5_fontweight: data?.typography?.h5?.fontweight || '',
            h6_color: data?.typography?.h6?.color || '',
            h6_fontsize: data?.typography?.h6?.fontsize || '',
            h6_fontweight: data?.typography?.h6?.fontweight || '',
            p_color: data?.typography?.p?.color || '',
            p_fontsize: data?.typography?.p?.fontsize || '',
            p_fontweight: data?.typography?.p?.fontweight || '',
        })
    }, [data])

    const optionsFontWeight = [
        {
            value: '100',
            label: '100',
        },
        {
            value: '200',
            label: '200',
        },
        {
            value: '300',
            label: '300',
        },
        {
            value: '400',
            label: 'Regular',
        },
        {
            value: '500',
            label: '500',
        },
        {
            value: '600',
            label: '600',
        },
        {
            value: '700',
            label: '700',
        },
        {
            value: '900',
            label: '900',
        },
    ]

    return (
        <Form
            {...layout}
            form={form}
            name="setting-appearance-form"
            onFinish={onFinish}
            validateMessages={validateMessages}
            className="setting-form setting-appearance"
        >
            <h3 className="block-title">Global</h3>
            <Form.Item name="text" label="Text color">
                <Colorpicker
                    popup
                    onColorResult={(color) =>
                        color.rgb.a === 1 ? color.hex : `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
                    }
                />
            </Form.Item>
            <Form.Item name="bordercolor" label="Border color">
                <Colorpicker
                    popup
                    onColorResult={(color) =>
                        color.rgb.a === 1 ? color.hex : `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
                    }
                />
            </Form.Item>
            <Form.Item name="body_bgcolor" label="Body background color">
                <Colorpicker
                    popup
                    onColorResult={(color) =>
                        color.rgb.a === 1 ? color.hex : `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
                    }
                />
            </Form.Item>
            <h3 className="block-title">Header</h3>
            <Form.Item name="header_textcolor" label="Text color">
                <Colorpicker
                    popup
                    onColorResult={(color) =>
                        color.rgb.a === 1 ? color.hex : `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
                    }
                />
            </Form.Item>
            <Form.Item name="sub_header_textcolor" label="Sub text color">
                <Colorpicker
                    popup
                    onColorResult={(color) =>
                        color.rgb.a === 1 ? color.hex : `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
                    }
                />
            </Form.Item>
            <Form.Item name="header_text_active_color" label="Text active color">
                <Colorpicker
                    popup
                    onColorResult={(color) =>
                        color.rgb.a === 1 ? color.hex : `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
                    }
                />
            </Form.Item>
            <Form.Item name="header_bgcolor" label="Background color">
                <Colorpicker
                    popup
                    onColorResult={(color) =>
                        color.rgb.a === 1 ? color.hex : `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
                    }
                />
            </Form.Item>
            <Form.Item name="header_subnav_bg_color" label="Sub Navigation background color">
                <Colorpicker
                    popup
                    onColorResult={(color) =>
                        color.rgb.a === 1 ? color.hex : `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
                    }
                />
            </Form.Item>
            <Form.Item name="header_bgimage" label="Background image">
                <Input />
            </Form.Item>
            <Form.Item name="header_fontsize" label="Font size">
                <InputNumber />
            </Form.Item>
            <Form.Item name="header_fontweight" label="Font weight">
                <InputNumber />
            </Form.Item>

            <h3 className="block-title">Banner</h3>
            <Form.Item name="banner_bgcolor" label="Background color">
                <Colorpicker
                    popup
                    onColorResult={(color) =>
                        color.rgb.a === 1 ? color.hex : `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
                    }
                />
            </Form.Item>
            <Form.Item name="banner_bgimage" label="Background image">
                <Input />
            </Form.Item>

            <h3 className="block-title">Footer</h3>
            <Form.Item name="footer_textcolor" label="Text color">
                <Colorpicker
                    popup
                    onColorResult={(color) =>
                        color.rgb.a === 1 ? color.hex : `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
                    }
                />
            </Form.Item>
            <Form.Item name="footer_text_active_color" label="Text active color">
                <Colorpicker
                    popup
                    onColorResult={(color) =>
                        color.rgb.a === 1 ? color.hex : `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
                    }
                />
            </Form.Item>
            <Form.Item name="footer_bgcolor" label="Background color">
                <Colorpicker
                    popup
                    onColorResult={(color) =>
                        color.rgb.a === 1 ? color.hex : `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
                    }
                />
            </Form.Item>
            <Form.Item name="footer_subnav_bg_color" label="Sub Navigation background color">
                <Colorpicker
                    popup
                    onColorResult={(color) =>
                        color.rgb.a === 1 ? color.hex : `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
                    }
                />
            </Form.Item>
            <Form.Item name="footer_bgimage" label="Background image">
                <Input />
            </Form.Item>
            <Form.Item name="footer_show_addmetamask" label="Add network to Metamask">
                <Select
                    defaultValue={true}
                    options={[
                        {
                            value: true,
                            label: 'Show',
                        },
                        {
                            value: false,
                            label: 'Hide',
                        },
                    ]}
                />
            </Form.Item>
            <Form.Item name="footer_fontsize" label="Font size">
                <InputNumber />
            </Form.Item>
            <Form.Item name="footer_fontweight" label="Font weight">
                <InputNumber />
            </Form.Item>

            <h3 className="block-title">Home search</h3>
            <Form.Item name="home_search_color" label="Color">
                <Colorpicker
                    popup
                    onColorResult={(color) =>
                        color.rgb.a === 1 ? color.hex : `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
                    }
                />
            </Form.Item>
            <Form.Item name="home_search_bordercolor" label="Border color">
                <Colorpicker
                    popup
                    onColorResult={(color) =>
                        color.rgb.a === 1 ? color.hex : `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
                    }
                />
            </Form.Item>
            <Form.Item name="home_search_bgcolor" label="Background color">
                <Colorpicker
                    popup
                    onColorResult={(color) =>
                        color.rgb.a === 1 ? color.hex : `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
                    }
                />
            </Form.Item>
            <Form.Item name="home_search_bgimage" label="Background image">
                <Input />
            </Form.Item>

            <h3 className="block-title">Card</h3>
            <Form.Item name="card_header_bgcolor" label="Header background color">
                <Colorpicker
                    popup
                    onColorResult={(color) =>
                        color.rgb.a === 1 ? color.hex : `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
                    }
                />
            </Form.Item>
            <Form.Item name="card_body_bgcolor" label="Body background color">
                <Colorpicker
                    popup
                    onColorResult={(color) =>
                        color.rgb.a === 1 ? color.hex : `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
                    }
                />
            </Form.Item>

            <h3 className="block-title">Table</h3>
            <Form.Item name="table_header_bgcolor" label="Header background color">
                <Colorpicker
                    popup
                    onColorResult={(color) =>
                        color.rgb.a === 1 ? color.hex : `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
                    }
                />
            </Form.Item>
            <Form.Item name="table_body_bgcolor" label="Body background color">
                <Colorpicker
                    popup
                    onColorResult={(color) =>
                        color.rgb.a === 1 ? color.hex : `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
                    }
                />
            </Form.Item>

            <h3 className="block-title">Input</h3>
            <Form.Item name="input_color" label="Color">
                <Colorpicker
                    popup
                    onColorResult={(color) =>
                        color.rgb.a === 1 ? color.hex : `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
                    }
                />
            </Form.Item>
            <Form.Item name="input_bgcolor" label="Background color">
                <Colorpicker
                    popup
                    onColorResult={(color) =>
                        color.rgb.a === 1 ? color.hex : `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
                    }
                />
            </Form.Item>
            <Form.Item name="input_bordercolor" label="Border color">
                <Colorpicker
                    popup
                    onColorResult={(color) =>
                        color.rgb.a === 1 ? color.hex : `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
                    }
                />
            </Form.Item>
            <h3 className="block-title">Color Scheme</h3>
            <Form.Item name="button" label="Button">
                <Colorpicker
                    popup
                    onColorResult={(color) =>
                        color.rgb.a === 1 ? color.hex : `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
                    }
                />
            </Form.Item>
            <Form.Item name="primary" label="Primary">
                <Colorpicker
                    popup
                    onColorResult={(color) =>
                        color.rgb.a === 1 ? color.hex : `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
                    }
                />
            </Form.Item>
            <Form.Item name="secondary" label="Secondary">
                <Colorpicker
                    popup
                    onColorResult={(color) =>
                        color.rgb.a === 1 ? color.hex : `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
                    }
                />
            </Form.Item>
            <Form.Item name="tertiary" label="Tertiary">
                <Colorpicker
                    popup
                    onColorResult={(color) =>
                        color.rgb.a === 1 ? color.hex : `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
                    }
                />
            </Form.Item>

            <h3 className="block-title">Typography</h3>
            <Row gutter={24}>
                <Col span={24} md={8} lg={8}>
                    <Form.Item name="fontfamily" label="Font family">
                        <Select showSearch options={listOptionsFont} />
                    </Form.Item>
                </Col>
            </Row>
            <h4>H1</h4>
            <Row gutter={24}>
                <Col span={24} md={8} lg={8}>
                    <Form.Item name="h1_color" label="Color">
                        <Colorpicker
                            popup
                            onColorResult={(color) =>
                                color.rgb.a === 1
                                    ? color.hex
                                    : `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
                            }
                        />
                    </Form.Item>
                </Col>
                <Col span={24} md={8} lg={8}>
                    <Form.Item name="h1_fontsize" label="Font size">
                        <InputNumber />
                    </Form.Item>
                </Col>
                <Col span={24} md={8} lg={8}>
                    <Form.Item name="h1_fontweight" label="Font weight">
                        <Select defaultValue="400" options={optionsFontWeight} />
                    </Form.Item>
                </Col>
            </Row>
            <h4>H2</h4>
            <Row gutter={24}>
                <Col span={24} md={8} lg={8}>
                    <Form.Item name="h2_color" label="Color">
                        <Colorpicker
                            popup
                            onColorResult={(color) =>
                                color.rgb.a === 1
                                    ? color.hex
                                    : `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
                            }
                        />
                    </Form.Item>
                </Col>
                <Col span={24} md={8} lg={8}>
                    <Form.Item name="h2_fontsize" label="Font size">
                        <InputNumber />
                    </Form.Item>
                </Col>
                <Col span={24} md={8} lg={8}>
                    <Form.Item name="h2_fontweight" label="Font weight">
                        <Select defaultValue="400" options={optionsFontWeight} />
                    </Form.Item>
                </Col>
            </Row>
            <h4>H3</h4>
            <Row gutter={24}>
                <Col span={24} md={8} lg={8}>
                    <Form.Item name="h3_color" label="Color">
                        <Colorpicker
                            popup
                            onColorResult={(color) =>
                                color.rgb.a === 1
                                    ? color.hex
                                    : `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
                            }
                        />
                    </Form.Item>
                </Col>
                <Col span={24} md={8} lg={8}>
                    <Form.Item name="h3_fontsize" label="Font size">
                        <InputNumber />
                    </Form.Item>
                </Col>
                <Col span={24} md={8} lg={8}>
                    <Form.Item name="h3_fontweight" label="Font weight">
                        <Select defaultValue="400" options={optionsFontWeight} />
                    </Form.Item>
                </Col>
            </Row>
            <h4>H4</h4>
            <Row gutter={24}>
                <Col span={24} md={8} lg={8}>
                    <Form.Item name="h4_color" label="Color">
                        <Colorpicker
                            popup
                            onColorResult={(color) =>
                                color.rgb.a === 1
                                    ? color.hex
                                    : `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
                            }
                        />
                    </Form.Item>
                </Col>
                <Col span={24} md={8} lg={8}>
                    <Form.Item name="h4_fontsize" label="Font size">
                        <InputNumber />
                    </Form.Item>
                </Col>
                <Col span={24} md={8} lg={8}>
                    <Form.Item name="h4_fontweight" label="Font weight">
                        <Select defaultValue="400" options={optionsFontWeight} />
                    </Form.Item>
                </Col>
            </Row>
            <h4>H5</h4>
            <Row gutter={24}>
                <Col span={24} md={8} lg={8}>
                    <Form.Item name="h5_color" label="Color">
                        <Colorpicker
                            popup
                            onColorResult={(color) =>
                                color.rgb.a === 1
                                    ? color.hex
                                    : `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
                            }
                        />
                    </Form.Item>
                </Col>
                <Col span={24} md={8} lg={8}>
                    <Form.Item name="h5_fontsize" label="Font size">
                        <InputNumber />
                    </Form.Item>
                </Col>
                <Col span={24} md={8} lg={8}>
                    <Form.Item name="h5_fontweight" label="Font weight">
                        <Select defaultValue="400" options={optionsFontWeight} />
                    </Form.Item>
                </Col>
            </Row>
            <h4>H6</h4>
            <Row gutter={24}>
                <Col span={24} md={8} lg={8}>
                    <Form.Item name="h6_color" label="Color">
                        <Colorpicker
                            popup
                            onColorResult={(color) =>
                                color.rgb.a === 1
                                    ? color.hex
                                    : `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
                            }
                        />
                    </Form.Item>
                </Col>
                <Col span={24} md={8} lg={8}>
                    <Form.Item name="h6_fontsize" label="Font size">
                        <InputNumber />
                    </Form.Item>
                </Col>
                <Col span={24} md={8} lg={8}>
                    <Form.Item name="h6_fontweight" label="Font weight">
                        <Select defaultValue="400" options={optionsFontWeight} />
                    </Form.Item>
                </Col>
            </Row>
            <h4>P</h4>
            <Row gutter={24}>
                <Col span={24} md={8} lg={8}>
                    <Form.Item name="p_color" label="Color">
                        <Colorpicker
                            popup
                            onColorResult={(color) =>
                                color.rgb.a === 1
                                    ? color.hex
                                    : `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
                            }
                        />
                    </Form.Item>
                </Col>
                <Col span={24} md={8} lg={8}>
                    <Form.Item name="p_fontsize" label="Font size">
                        <InputNumber />
                    </Form.Item>
                </Col>
                <Col span={24} md={8} lg={8}>
                    <Form.Item name="p_fontweight" label="Font weight">
                        <Select defaultValue="400" options={optionsFontWeight} />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item className="form-actions" {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
            </Form.Item>
        </Form>
    )
}

export default AppearanceForm
