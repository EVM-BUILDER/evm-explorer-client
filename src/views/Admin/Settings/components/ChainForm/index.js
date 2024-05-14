import React, { useEffect } from 'react'
import { Button, Form, Input, InputNumber, Select } from 'antd'
import { useDispatch } from 'react-redux'
import { setSettings } from 'redux/settings/actions'

const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 20,
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

const ChainForm = ({ settings, data }) => {
    const dispatch = useDispatch()

    const [form] = Form.useForm()

    const onFinish = (values) => {
        const dataChain = {
            explorer: values?.explorer || '',
            id: values?.id || '',
            name: values?.name || '',
            rpc: values?.rpc || '',
            erc20: values?.erc20 || '',
            erc721: values?.erc721 || '',
            erc1155: values?.erc1155 || '',
            native: {
                name: values?.native_name || '',
                symbol: values?.native_symbol || '',
                decimals: values?.native_decimals || 18,
                logo: values?.native_logo || '',
            },
            number_block_to_finalized: values?.number_block_to_finalized || 3,
            consensus: 'POA',
        }

        dispatch(
            setSettings({
                ...settings,
                chain: dataChain,
            }),
        )
    }

    useEffect(() => {
        form.setFieldsValue({
            explorer: data?.explorer || '',
            id: data?.id || '',
            name: data?.name || '',
            rpc: data?.rpc || '',
            native_name: data?.native?.name || '',
            native_symbol: data?.native?.symbol || '',
            native_decimals: data?.native?.decimals || '',
            native_logo: data?.native?.logo || '',
            erc20: data?.erc20 || '',
            erc721: data?.erc721 || '',
            erc1155: data?.erc1155 || '',
            number_block_to_finalized: data?.number_block_to_finalized || '',
            consensus: data?.consensus || 'POA',
        })
    }, [data])

    return (
        <Form
            {...layout}
            form={form}
            name="setting-chain-form"
            onFinish={onFinish}
            validateMessages={validateMessages}
            className="setting-form setting-chain"
        >
            <h3 className="block-title">Global</h3>
            <Form.Item name="explorer" label="Explorer">
                <Input />
            </Form.Item>
            <Form.Item name="id" label="ID">
                <Input />
            </Form.Item>
            <Form.Item name="name" label="Name">
                <Input />
            </Form.Item>
            <Form.Item name="rpc" label="Rpc">
                <Input />
            </Form.Item>
            <Form.Item name="erc20" label="ERC20">
                <Input />
            </Form.Item>
            <Form.Item name="erc721" label="ERC721">
                <Input />
            </Form.Item>
            <Form.Item name="erc1155" label="ERC1155">
                <Input />
            </Form.Item>
            <h3 className="block-title">Native</h3>
            <Form.Item
                name="native_decimals"
                label="Decimals"
                rules={[
                    {
                        type: 'number',
                        min: 0,
                        max: 99,
                    },
                ]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item name="native_logo" label="Logo">
                <Input />
            </Form.Item>
            <Form.Item name="native_name" label="Name">
                <Input />
            </Form.Item>
            <Form.Item name="native_symbol" label="Symbol">
                <Input />
            </Form.Item>
            <Form.Item name="number_block_to_finalized" label="Number block to finalized">
                <Input />
            </Form.Item>
            <Form.Item name="consensus" label="Consensus">
                <Select>
                    <Select.Option value="poa">POA</Select.Option>
                    <Select.Option value="pow">POW</Select.Option>
                    <Select.Option value="pos">POS</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item className="form-actions" {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
            </Form.Item>
        </Form>
    )
}

export default ChainForm
