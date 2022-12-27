import React, { useEffect, useState } from 'react'
import { Button, Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd'
import generateUUID from 'utils/generateUUID'
import { useDispatch } from 'react-redux'
import { setSettings } from 'redux/settings/actions'

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    )
}

const AdsTextForm = ({ settings, dataAds }) => {
    const dispatch = useDispatch()

    const [form] = Form.useForm()

    const [data, setData] = useState([])
    const [editingKey, setEditingKey] = useState('')

    const isEditing = (record) => record.key === editingKey

    const handleEdit = (record) => {
        form.setFieldsValue({
            text: '',
            url: '',
            ...record,
        })
        setEditingKey(record.key)
    }

    const handleCancel = () => {
        setEditingKey('')
    }

    const handleSave = async (key) => {
        try {
            const row = await form.validateFields()
            const newData = [...data]
            const index = newData.findIndex((item) => key === item.key)
            if (index > -1) {
                const item = newData[index]
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                })
                setData(newData)
                setEditingKey('')
            } else {
                newData.push(row)
                setData(newData)
                setEditingKey('')
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo)
        }
    }

    const handleDelete = (key) => {
        const newData = data.filter((item) => item.key !== key)
        setData(newData)
    }

    const handleAdd = () => {
        const newData = {
            key: generateUUID(),
            text: `Ads text ${data?.length + 1}`,
            url: `Ads url ${data?.length + 1}`,
        }
        setData([newData, ...data])
    }

    useEffect(() => {
        const listDataAds = dataAds?.map((item) => ({
            key: item?.key || generateUUID(),
            ...item,
        }))
        setData(listDataAds)
    }, [dataAds])

    const columns = [
        {
            title: 'Text',
            dataIndex: 'text',
            width: '40%',
            editable: true,
        },
        {
            title: 'Url',
            dataIndex: 'url',
            width: '40%',
            editable: true,
        },
        {
            title: 'Action',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record)
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => handleSave(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={handleCancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <>
                        <Typography.Link disabled={editingKey !== ''} onClick={() => handleEdit(record)}>
                            Edit
                        </Typography.Link>
                        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                            <a>Delete</a>
                        </Popconfirm>
                    </>
                )
            },
        },
    ]

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        }
    })

    const handleSaveAdsBanner = () => {
        dispatch(setSettings({
            ...settings,
            ads_text: data,
        }));
    }

    return (
        <div className="setting-form setting-ads-banner">
            <Form form={form} component={false}>
                <div className='button-add-wrapper'>
                    <Button
                        onClick={handleAdd}
                        type="primary"
                        style={{
                            marginBottom: 16,
                        }}
                        className="button-add"
                    >
                        Add Ads Text
                    </Button>
                </div>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: handleCancel,
                    }}
                />
                <div className='form-actions'>
                    <Button type="primary" onClick={handleSaveAdsBanner} className='button-save-list'>
                        Save List Ads Text
                    </Button>
                </div>
            </Form>
        </div>
    )
}
export default AdsTextForm