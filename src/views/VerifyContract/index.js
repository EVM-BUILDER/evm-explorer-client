import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { Row, Col, Button, Form, Upload } from 'antd'
import PublicLayoutBlock from 'layouts/PublicLayoutBlock'
import Checkbox from 'components/AntCheckbox'
import AntInput from 'components/AntInput'
import AntSelect from 'components/AntSelect'
import { TextArea } from 'components/Input'
import { verifyContract } from 'redux/verifyContract/actions'
import { useSelector } from 'react-redux'

const VerifyPage = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const { a: address } = router.query
    const [form] = Form.useForm()
    const [fileCode, setFileCode] = useState('')
    const [verifyErrorMess, setVerifyErrorMess] = useState('')
    const { settings } = useSelector((state) => state.Settings)

    const onFinish = (values) => {
        setVerifyErrorMess('')
        const params = {
            ...values,
        }
        console.log(params)
        dispatch(
            verifyContract(
                params,
                () => {
                    router.push(`/address/${params.address}`)
                },
                (error) => {
                    setVerifyErrorMess(error?.message || 'Submit error.')
                },
            ),
        )
    }

    const handleUploadFile = (info) => {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList)
        }
        if (info.file.status === 'done') {
            console.log(info.file)
            setFileCode(info.file)
        } else if (info.file.status === 'error') {
            console.error(`${info.file.name} file upload failed.`)
        }
    }

    useEffect(() => {
        if (address) {
            form.setFieldsValue({ address })
        }
    }, [form, address])

    console.log('settings', settings)

    return (
        <div className="verify container">
            <div className="verify_top">
                <h1>Verify & Publish Contract Source Code</h1>
                <p>COMPILER TYPE AND VERSION SELECTION</p>
            </div>
            <div className="verify_bot">
                <div className="left">
                    <img src="/images/verify/verify.png" alt="" />
                </div>
                <div className="right">
                    <div className="text-verify">
                        <p>
                            Source code verification provides <span className="bold">transparency</span> for users interacting
                            with smart contracts. By uploading the source code, {settings?.chain?.name} will match the compiled
                            code with that on the blockchain. Just like contracts, a "smart contract" should provide end users
                            with more information on what they are "digitally signing" for and give users an opportunity to audit
                            the code to independently verify that it actually does what it is supposed to do.
                        </p>
                        <p>
                            Please be informed that advanced settings (e.g. bytecodeHash: "none" or viaIR: "true") can be accessed
                            via Solidity (Standard-Json-Input) verification method. More information can be found under Solidity's
                            "Compiler Input and Output JSON Description" documentation section.
                        </p>
                    </div>
                    <div className="input-verify">
                        <Form form={form} layout="vertical" name="control-hooks" onFinish={onFinish}>
                            <Form.Item
                                name="address"
                                label="Please enter the Contract Address you would like to verify"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Required',
                                    },
                                ]}
                            >
                                <AntInput />
                            </Form.Item>

                            <Form.Item
                                name="type"
                                label="Please select Compiler Type"
                                rules={[
                                    {
                                        required: true,
                                        message: 'This field is required.',
                                    },
                                ]}
                            >
                                <AntSelect
                                    placeholder="[please Select]"
                                    options={[
                                        { label: '[Please Select]', value: '' },
                                        { label: 'Solidity (Single file)', value: 1 },
                                        // { label: 'Solidity (Multi-Part file)', value: 2 },
                                    ]}
                                />
                            </Form.Item>

                            <Form.Item
                                name="solc_version"
                                label="Please select Compiler Version"
                                rules={[
                                    {
                                        required: true,
                                        message: 'This field is required.',
                                    },
                                ]}
                            >
                                <AntSelect
                                    placeholder="[please Select]"
                                    options={[
                                        { label: '[Please Select]', value: '' },
                                        { label: '0.8.19+commit.7dd6d404', value: '0.8.19' },
                                        { label: 'v0.8.18+commit.87f61d96', value: '0.8.18' },
                                        { label: 'v0.8.17+commit.8df45f5f', value: '0.8.17' },
                                        { label: 'v0.8.16+commit.07a7930e', value: '0.8.16' },
                                        { label: 'v0.8.15+commit.e14f2714', value: '0.8.15' },
                                        { label: 'v0.8.14+commit.80d49f37', value: '0.8.14' },
                                        { label: 'v0.8.13+commit.abaa5c0e', value: '0.8.13' },
                                        { label: 'v0.8.12+commit.f00d7308', value: '0.8.12' },
                                        { label: 'v0.8.11+commit.d7f03943', value: '0.8.11' },
                                        { label: 'v0.8.10+commit.fc410830', value: '0.8.10' },
                                        { label: 'v0.8.9+commit.e5eed63a', value: '0.8.9' },
                                        { label: 'v0.8.8+commit.dddeac2f', value: '0.8.8' },
                                        { label: 'v0.8.7+commit.e28d00a7', value: '0.8.7' },
                                        { label: 'v0.8.6+commit.11564f7e', value: '0.8.6' },
                                        { label: 'v0.8.5+commit.a4f2e591', value: '0.8.5' },
                                        { label: 'v0.8.4+commit.c7e474f2', value: '0.8.4' },
                                        { label: 'v0.8.3+commit.8d00100c', value: '0.8.3' },
                                        { label: 'v0.8.2+commit.661d1103', value: '0.8.2' },
                                        { label: 'v0.8.1+commit.df193b15', value: '0.8.1' },
                                        { label: 'v0.8.0+commit.c7dfd78e', value: '0.8.0' },
                                        { label: 'v0.7.6+commit.7338295f', value: '0.7.6' },
                                        { label: 'v0.7.5+commit.eb77ed08', value: '0.7.5' },
                                        { label: 'v0.7.4+commit.3f05b770', value: '0.7.4' },
                                        { label: 'v0.7.3+commit.9bfce1f6', value: '0.7.3' },
                                        { label: 'v0.7.2+commit.51b20bc0', value: '0.7.2' },
                                        { label: 'v0.7.1+commit.f4a555be', value: '0.7.1' },
                                        { label: 'v0.7.0+commit.9e61f92b', value: '0.7.0' },
                                        { label: 'v0.6.12+commit.27d51765', value: '0.6.12' },
                                        { label: 'v0.6.11+commit.5ef660b1', value: '0.6.11' },
                                        { label: 'v0.6.10+commit.00c0fcaf', value: '0.6.10' },
                                        { label: 'v0.6.9+commit.3e3065ac', value: '0.6.9' },
                                        { label: 'v0.6.8+commit.0bbfe453', value: '0.6.8' },
                                        { label: 'v0.6.7+commit.b8d736ae', value: '0.6.7' },
                                        { label: 'v0.6.6+commit.6c089d02', value: '0.6.6' },
                                        { label: 'v0.6.5+commit.f956cc89', value: '0.6.5' },
                                        { label: 'v0.6.4+commit.1dca32f3', value: '0.6.4' },
                                        { label: 'v0.6.3+commit.8dda9521', value: '0.6.3' },
                                        { label: 'v0.6.2+commit.bacdbe57', value: '0.6.2' },
                                        { label: 'v0.6.1+commit.e6f7d5a4', value: '0.6.1' },
                                        { label: 'v0.6.0+commit.26b70077', value: '0.6.0' },
                                        { label: 'v0.5.17+commit.d19bba13', value: '0.5.17' },
                                        { label: 'v0.5.16+commit.9c3226ce', value: '0.5.16' },
                                        { label: 'v0.5.15+commit.6a57276f', value: '0.5.15' },
                                        { label: 'v0.5.14+commit.01f1aaa4', value: '0.5.14' },
                                        { label: 'v0.5.13+commit.5b0b510c', value: '0.5.13' },
                                        { label: 'v0.5.12+commit.7709ece9', value: '0.5.12' },
                                        { label: 'v0.5.11+commit.22be8592', value: '0.5.11' },
                                        { label: 'v0.5.11+commit.c082d0b4', value: '0.5.11' },
                                        { label: 'v0.5.10+commit.5a6ea5b1', value: '0.5.10' },
                                        { label: 'v0.5.9+commit.c68bc34e', value: '0.5.9' },
                                        { label: 'v0.5.9+commit.e560f70d', value: '0.5.9' },
                                        { label: 'v0.5.8+commit.23d335f2', value: '0.5.8' },
                                        { label: 'v0.5.7+commit.6da8b019', value: '0.5.7' },
                                        { label: 'v0.5.6+commit.b259423e', value: '0.5.6' },
                                        { label: 'v0.5.5+commit.47a71e8f', value: '0.5.5' },
                                        { label: 'v0.5.4+commit.9549d8ff', value: '0.5.4' },
                                        { label: 'v0.5.3+commit.10d17f24', value: '0.5.3' },
                                        { label: 'v0.5.2+commit.1df8f40c', value: '0.5.2' },
                                        { label: 'v0.5.1+commit.c8a2cb62', value: '0.5.1' },
                                        { label: 'v0.5.0+commit.1d4f565a', value: '0.5.0' },
                                        { label: 'v0.4.26+commit.4563c3fc', value: '0.4.26' },
                                        { label: 'v0.4.25+commit.59dbf8f1', value: '0.4.25' },
                                        { label: 'v0.4.24+commit.e67f0147', value: '0.4.24' },
                                        { label: 'v0.4.23+commit.124ca40d', value: '0.4.23' },
                                        { label: 'v0.4.22+commit.4cb486ee', value: '0.4.22' },
                                        { label: 'v0.4.21+commit.dfe3193c', value: '0.4.21' },
                                        { label: 'v0.4.20+commit.3155dd80', value: '0.4.20' },
                                        { label: 'v0.4.19+commit.c4cbbb05', value: '0.4.19' },
                                        { label: 'v0.4.18+commit.9cf6e910', value: '0.4.18' },
                                        { label: 'v0.4.17+commit.bdeb9e52', value: '0.4.17' },
                                        { label: 'v0.4.16+commit.d7661dd9', value: '0.4.16' },
                                        { label: 'v0.4.15+commit.8b45bddb', value: '0.4.15' },
                                        { label: 'v0.4.15+commit.bbb8e64f', value: '0.4.15' },
                                        { label: 'v0.4.14+commit.c2215d46', value: '0.4.14' },
                                        { label: 'v0.4.13+commit.0fb4cb1a', value: '0.4.13' },
                                        { label: 'v0.4.12+commit.194ff033', value: '0.4.12' },
                                        { label: 'v0.4.11+commit.68ef5810', value: '0.4.11' },
                                    ]}
                                />
                            </Form.Item>

                            <Form.Item
                                name="license"
                                label="Please select Open Source License Type"
                                rules={[
                                    {
                                        required: true,
                                        message: 'This field is required.',
                                    },
                                ]}
                            >
                                <AntSelect
                                    placeholder="[please Select]"
                                    options={[
                                        { label: '[Please Select]', value: '' },
                                        { label: '1) No License (None)', value: 1 },
                                        { label: '2) The Unlicense (Unlicense)', value: 2 },
                                        { label: '3) MIT License (MIT)', value: 3 },
                                        { label: '4) GNU General Public License v2.0 (GNU GPLv2)', value: 4 },
                                        { label: '5) GNU General Public License v3.0 (GNU GPLv3)', value: 5 },
                                        { label: '6) GNU Lesser General Public License v2.1 (GNU LGPLv2.1)', value: 6 },
                                        { label: '7) GNU Lesser General Public License v3.0 (GNU LGPLv3)', value: 7 },
                                        { label: '8) BSD 2-clause "Simplified" license (BSD-2-Clause)', value: 8 },
                                        { label: '9) BSD 3-clause "New" Or "Revised" license (BSD-3-Clause)', value: 9 },
                                        { label: '10) Mozilla Public License 2.0 (MPL-2.0)', value: 10 },
                                        { label: '11) Open Software License 3.0 (OSL-3.0)', value: 11 },
                                        { label: '12) Apache 2.0 (Apache-2.0)', value: 12 },
                                        { label: '13) GNU Affero General Public License (GNU AGPLv3)', value: 13 },
                                        { label: '14) Business Source License (BSL 1.1)', value: 14 },
                                    ]}
                                />
                            </Form.Item>
                            <Form.Item
                                name="sources"
                                label="Please enter the code contract to verify"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Required',
                                    },
                                ]}
                            >
                                <TextArea placeholder="your contract code" rows="20" onTouched={() => {}} />
                            </Form.Item>
                            <Form.Item name="optimize" valuePropName="checked" style={{ marginBottom: '24px' }}>
                                <Checkbox>Optimize</Checkbox>
                            </Form.Item>
                            <Form.Item
                                name="agreement"
                                valuePropName="checked"
                                rules={[
                                    {
                                        validator: (_, value) =>
                                            value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                                        message: 'Required',
                                    },
                                ]}
                                style={{ marginBottom: '24px' }}
                            >
                                <Checkbox>
                                    I agree to the <span className="text-green">terms of service</span>
                                </Checkbox>
                            </Form.Item>

                            {verifyErrorMess && <div className="box-error text-error">{verifyErrorMess}</div>}

                            <div className="button-container">
                                <Button className="green" type="primary" htmlType="submit">
                                    Submit
                                </Button>
                                <Button className="white" htmlType="button">
                                    Reset
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}
VerifyPage.Layout = PublicLayoutBlock
export default VerifyPage
