import { useThemeToken } from '@/hooks'
import {
	ActionType,
	DrawerForm,
	PageContainer,
	ProColumns,
	ProForm,
	ProFormDependency,
	ProFormDigit,
	ProFormGroup,
	ProFormList,
	ProFormSelect,
	ProFormText,
	ProFormTextArea,
	ProTable,
	TableDropdown
} from '@ant-design/pro-components'
import { Button, message, Modal, Typography } from 'antd'
import { useCallback, useMemo, useRef } from 'react'
import luapi from '@/services/luapi'
import { useBoolean } from 'ahooks'

const getColumns = (fn: (key: string, record: API.InterfaceInfoVO) => void) => {
	const columns: ProColumns<API.InterfaceInfoVO>[] = [
		{
			dataIndex: 'id',
			valueType: 'indexBorder',
			width: 48,
			hideInSearch: true
		},
		{
			title: '接口名称',
			dataIndex: 'name'
		},
		{
			title: '描述',
			dataIndex: 'description',
			hideInSearch: true
		},
		{
			title: '请求方法',
			dataIndex: 'method',
			valueType: 'select',
			valueEnum: {
				POST: {
					text: 'POST'
				},
				GET: {
					text: 'GET'
				}
			}
		},
		{
			title: '请求地址',
			dataIndex: 'url',
			copyable: true,
			hideInSearch: true
		},
		{
			title: '调用方法',
			dataIndex: 'call_name',
			copyable: true
		},
		{
			title: '创建时间',
			dataIndex: 'create_time',
			hideInForm: true,
			hideInSearch: true,
			render: (_, record) => {
				return (
					<Typography.Text>{new Date(record.create_time! * 1000).toLocaleString()}</Typography.Text>
				)
			}
		},
		{
			title: '更新时间',
			dataIndex: 'update_time',
			hideInForm: true,
			hideInSearch: true,
			render: (_, record) => {
				return (
					<Typography.Text>{new Date(record.update_time! * 1000).toLocaleString()}</Typography.Text>
				)
			}
		},
		{
			title: '操作',
			valueType: 'option',
			render: (text, record) => [
				<TableDropdown
					key="actionGroup"
					onSelect={(key) => fn(key, record)}
					menus={[
						{ key: 'editable', name: '编辑' },
						{ key: 'delete', name: '删除', danger: true }
					]}
				/>
			]
		}
	]
	return columns
}

const InterfacePage = () => {
	const token = useThemeToken()
	const actionRef = useRef<ActionType>()
	const [open, { setTrue: show, setFalse: close }] = useBoolean(false)
	const [form] = ProForm.useForm()
	const currentInterfaceInfo = useRef<API.InterfaceInfoVO | null>(null)
	const [modal, contextHolder] = Modal.useModal()

	const tableCallback = useCallback(
		async (type: string, record: API.InterfaceInfoVO) => {
			switch (type) {
				case 'editable': {
					currentInterfaceInfo.current = record
					// eslint-disable-next-line prefer-const
					let { request_header, request_params, request_params_example, ...rest } = record
					request_header = JSON.parse(request_header ?? '[]')
					request_params = JSON.parse(request_params ?? '[]')
					request_params_example = JSON.parse(request_params_example ?? '[]')
					form.setFieldsValue({ request_header, request_params, request_params_example, ...rest })
					show()
					break
				}
				case 'delete': {
					modal.confirm({
						title: '温馨提示',
						content: '是否删除该接口？',
						onOk() {
							luapi.jiekoumokuai.deleteInterfaceInfoId({ id: record.id! })
							actionRef.current?.reloadAndRest?.()
						}
					})
					break
				}
			}
		},
		[form, show, modal]
	)

	const columns = useMemo(() => {
		return getColumns(tableCallback)
	}, [tableCallback])

	return (
		<PageContainer
			title="接口管理"
			style={{ backgroundColor: token.colorBgBase }}
			extra={[
				<Button key={'add'} type={'primary'} onClick={show}>
					新增
				</Button>
			]}>
			{contextHolder}
			<ProTable<API.UserVO>
				cardBordered
				columns={columns}
				actionRef={actionRef}
				dateFormatter={'string'}
				rowKey={'id'}
				headerTitle={'接口列表'}
				columnsState={{
					persistenceKey: 'pro-table-interface-list',
					persistenceType: 'localStorage'
				}}
				pagination={{
					pageSize: 10
				}}
				request={async (params) => {
					const { pageSize: size, ...restParams } = params
					const result = await luapi.jiekoumokuai.getInterfaceInfoList({ ...restParams, size })
					const { records = [], total = 0 } = result.data.data
					return {
						data: records,
						total: total
					}
				}}
			/>
			<DrawerForm
				title={currentInterfaceInfo.current ? '修改接口' : '新增接口'}
				open={open}
				drawerProps={{
					onClose: () => {
						currentInterfaceInfo.current = null
						close()
					},
					maskClosable: false,
					destroyOnClose: true,
					forceRender: true
				}}
				form={form}
				autoFocusFirstInput
				onFinish={async (params) => {
					let {
						request_header = [],
						request_params = [],
						request_params_example = [],
						// eslint-disable-next-line prefer-const
						...restParams
					} = params
					request_header = JSON.stringify(request_header)
					request_params = JSON.stringify(request_params)
					request_params_example = JSON.stringify(request_params_example)
					// 修改接口
					if (currentInterfaceInfo.current) {
						const res = await luapi.jiekoumokuai.putInterfaceInfo({
							id: currentInterfaceInfo.current.id,
							request_params,
							request_header,
							request_params_example,
							...restParams
						})
						if (res.data.code === 0) {
							message.success('修改接口成功')
							currentInterfaceInfo.current = null
							close()
							actionRef.current?.reloadAndRest?.()
							return true
						}
						return false
					}

					// 新增接口
					const res = await luapi.jiekoumokuai.postInterfaceInfo({
						request_params,
						request_header,
						request_params_example,
						...restParams
					})
					if (res.data.code === 0) {
						message.success('新增接口成功')
						close()
						actionRef.current?.reloadAndRest?.()
						return true
					}
					return false
				}}>
				<ProFormText name={'name'} label={'接口名称'} rules={[{ required: true }]} />
				<ProFormTextArea name={'description'} label={'描述'} rules={[{ required: true }]} />
				<ProFormText name={'call_name'} label={'SDK方法名称'} rules={[{ required: true }]} />
				<ProFormSelect
					name={'method'}
					label={'请求方法'}
					options={['GET', 'POST']}
					initialValue={'POST'}
					rules={[{ required: true }]}
				/>
				<ProFormText name={'url'} label={'请求地址'} rules={[{ required: true }]} />
				<ProFormList
					name={'request_header'}
					label={'请求头'}
					initialValue={[{ field: 'Content-Type', value: 'application/json' }]}>
					<ProFormGroup key={'header-item'}>
						<ProFormText name="field" label="字段" rules={[{ required: true }]} />
						<ProFormText name="value" label="值" rules={[{ required: true }]} />
					</ProFormGroup>
				</ProFormList>
				<ProFormList name={'request_params'} label={'请求参数'}>
					<ProFormGroup key={'params-item'}>
						<ProFormText name="field" label="字段" rules={[{ required: true }]} />
						<ProFormSelect
							name="type"
							label="类型"
							options={['string', 'number']}
							rules={[{ required: true }]}
						/>
					</ProFormGroup>
				</ProFormList>
				<ProFormDependency name={['request_params', 'request_params_example']}>
					{(params, form) => {
						const { request_params, request_params_example } = params
						const val = request_params?.map?.((item: any, index: number) => ({
							field: item.field,
							value: request_params_example?.[index]?.value ?? undefined
						}))
						form.setFieldValue('request_params_example', val)
						return (
							<ProFormList
								name={'request_params_example'}
								label={'请求参数示例'}
								creatorButtonProps={false}
								copyIconProps={false}
								deleteIconProps={false}
								itemRender={(_, record) => {
									const param = request_params?.[record.index]
									if (!param.type || !param.field) return null
									return (
										<ProFormGroup key={'example-item'}>
											<ProFormText name={'field'} label={'字段'} readonly />
											{param?.type === 'string' ? (
												<ProFormText name={'value'} label={'值'} rules={[{ required: true }]} />
											) : null}
											{param?.type === 'number' ? (
												<ProFormDigit name={'value'} label={'值'} rules={[{ required: true }]} />
											) : null}
										</ProFormGroup>
									)
								}}
							/>
						)
					}}
				</ProFormDependency>
			</DrawerForm>
		</PageContainer>
	)
}

export default InterfacePage
