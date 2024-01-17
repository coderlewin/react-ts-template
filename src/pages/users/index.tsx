import { useThemeToken } from '@/hooks'
import {
	ActionType,
	PageContainer,
	ProColumns,
	ProTable,
	TableDropdown
} from '@ant-design/pro-components'
import { Image, Typography } from 'antd'
import { useRef } from 'react'
import luapi from '@/services/luapi'

const columns: ProColumns<API.UserVO>[] = [
	{
		dataIndex: 'id',
		valueType: 'indexBorder',
		width: 48,
		hideInSearch: true
	},
	{
		title: '用户名',
		dataIndex: 'user_name'
	},
	{
		title: '账号',
		dataIndex: 'account',
		hideInSearch: true
	},
	{
		title: 'AK',
		dataIndex: 'access_key',
		copyable: true
	},
	{
		title: 'SK',
		dataIndex: 'secret_key',
		copyable: true
	},
	{
		title: '微信OpenId',
		dataIndex: 'wechat_open_id',
		copyable: true,
		hideInSearch: true
	},
	{
		title: '微信UnionId',
		dataIndex: 'wechat_union_id',
		copyable: true,
		hideInSearch: true
	},
	{
		title: '头像',
		dataIndex: 'avatar_url',
		render: (_, record) => (
			<div>
				<Image src={record.avatar_url} width={100} />
			</div>
		),
		hideInSearch: true
	},
	{
		title: '性别',
		dataIndex: 'gender',
		hideInSearch: true
	},
	{
		title: '角色',
		dataIndex: 'user_role',
		valueType: 'select',
		valueEnum: {
			user: { text: '普通用户', status: 'Default' },
			admin: {
				text: '管理员',
				status: 'Success'
			}
		}
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

const UsersPage = () => {
	const token = useThemeToken()
	const actionRef = useRef<ActionType>()

	return (
		<PageContainer title="用户管理" style={{ backgroundColor: token.colorBgBase }}>
			<ProTable<API.UserVO>
				cardBordered
				columns={columns}
				actionRef={actionRef}
				dateFormatter={'string'}
				rowKey={'id'}
				headerTitle={'用户列表'}
				columnsState={{
					persistenceKey: 'pro-table-user-list',
					persistenceType: 'localStorage'
				}}
				pagination={{
					pageSize: 10
				}}
				request={async (params) => {
					const { pageSize: size, ...restParams } = params
					const result = await luapi.yonghumokuai.getUserList({ ...restParams, size })
					const { records = [], total = 0 } = result.data.data
					return {
						data: records,
						total: total
					}
				}}
			/>
		</PageContainer>
	)
}

export default UsersPage
