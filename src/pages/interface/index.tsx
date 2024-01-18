/*
 * @Author: lewinlu@chatlabs.com
 * @Date: 2024-01-13 15:28:54
 * @LastEditors: lewinlu@chatlabs.com
 * @LastEditTime: 2024-01-13 15:38:26
 * @FilePath: /react-rsbuild-tpl/src/pages/interface/index.tsx
 */
import { useThemeToken } from '@/hooks'
import {
	ActionType,
	DrawerForm,
	PageContainer,
	ProColumns,
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
import { Button, Image, Typography } from 'antd'
import { useRef } from 'react'
import luapi from '@/services/luapi'
import { useBoolean } from 'ahooks'

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
		render: (text, record, _, action) => [
			<a key="editable" onClick={() => {}}>
				编辑
			</a>,
			<a target="_blank" rel="noopener noreferrer" key="view">
				查看
			</a>,
			<TableDropdown
				key="actionGroup"
				onSelect={() => action?.reload()}
				menus={[
					{ key: 'copy', name: '复制' },
					{ key: 'delete', name: '删除' }
				]}
			/>
		]
	}
]
const InterfacePage = () => {
	const token = useThemeToken()
	const actionRef = useRef<ActionType>()
	const [open, { setTrue: show, setFalse: close }] = useBoolean(false)

	return (
		<PageContainer
			title="接口管理"
			style={{ backgroundColor: token.colorBgBase }}
			extra={[
				<Button key={'add'} type={'primary'} onClick={show}>
					新增
				</Button>
			]}>
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
				open={open}
				drawerProps={{
					destroyOnClose: true,
					onClose: close,
					maskClosable: false
				}}
				onFinish={async (params) => {
					console.log('finsh', params)
					// eslint-disable-next-line prefer-const
					let { request_header, request_params, request_params_example, ...restParams } = params
					request_header = JSON.stringify(request_header)
					request_params = JSON.stringify(request_params)
					request_params_example = JSON.stringify(request_params_example)

					const res = await luapi.jiekoumokuai.postInterfaceInfo({
						request_params,
						request_header,
						request_params_example,
						...restParams
					})
					return res.data.data > 0
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
				<ProFormDependency name={['request_params']}>
					{({ request_params }, form) => {
						const val = request_params?.map?.((item: any) => ({
							field: item.field,
							value: undefined
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
