import { useThemeToken } from '@/hooks'
import luapi from '@/services/luapi'
import { WechatOutlined, LockOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons'
import {
	LoginFormPage,
	ProConfigProvider,
	ProFormCaptcha,
	ProFormText
} from '@ant-design/pro-components'
import { Divider, Space, Tabs, message } from 'antd'
import type { CSSProperties, FC } from 'react'
import { memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type LoginType = 'phone' | 'account'

const iconStyles: CSSProperties = {
	color: 'rgba(0, 0, 0, 0.2)',
	fontSize: '18px',
	verticalAlign: 'middle',
	cursor: 'pointer'
}

const Page: FC = memo(() => {
	const [loginType, setLoginType] = useState<LoginType>('account')
	const token = useThemeToken()
	const navigate = useNavigate()

	const handleFinish = async (formData: any) => {
		try {
			await luapi.postLogin({
				account: formData.username,
				password: formData.password
			})
			message.success('登录成功')
			navigate('/', { replace: true })
		} catch (e) {
			console.log('err', e)
		}
	}

	return (
		<div
			style={{
				backgroundColor: 'white',
				height: '100vh'
			}}>
			<LoginFormPage
				onFinish={handleFinish}
				backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
				// logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
				backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
				title="API开放平台"
				containerStyle={{
					backgroundColor: 'rgba(0, 0, 0,0.65)',
					backdropFilter: 'blur(4px)'
				}}
				subTitle="LuApi 接口服务平台"
				actions={
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							flexDirection: 'column'
						}}>
						<Divider plain>
							<span
								style={{
									color: token.colorTextPlaceholder,
									fontWeight: 'normal',
									fontSize: 14
								}}>
								其他登录方式
							</span>
						</Divider>
						<Space align="center" size={24}>
							<div
								style={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									flexDirection: 'column',
									height: 40,
									width: 40,
									border: '1px solid ' + token.colorPrimaryBorder,
									borderRadius: '50%'
								}}>
								<WechatOutlined style={{ ...iconStyles, color: '#30f821' }} />
							</div>
						</Space>
					</div>
				}>
				<Tabs
					centered
					activeKey={loginType}
					onChange={(activeKey) => setLoginType(activeKey as LoginType)}>
					<Tabs.TabPane key={'account'} tab={'账号密码登录'} />
					<Tabs.TabPane key={'phone'} tab={'手机号登录'} />
				</Tabs>
				{loginType === 'account' && (
					<>
						<ProFormText
							name="username"
							fieldProps={{
								size: 'large',
								prefix: (
									<UserOutlined
										style={{
											color: token.colorText
										}}
										className={'prefixIcon'}
									/>
								)
							}}
							placeholder={'用户名: admin or user'}
							rules={[
								{
									required: true,
									message: '请输入用户名!'
								}
							]}
						/>
						<ProFormText.Password
							name="password"
							fieldProps={{
								size: 'large',
								prefix: (
									<LockOutlined
										style={{
											color: token.colorText
										}}
										className={'prefixIcon'}
									/>
								)
							}}
							placeholder={'密码: ant.design'}
							rules={[
								{
									required: true,
									message: '请输入密码！'
								}
							]}
						/>
					</>
				)}
				{loginType === 'phone' && (
					<>
						<ProFormText
							fieldProps={{
								size: 'large',
								prefix: (
									<MobileOutlined
										style={{
											color: token.colorText
										}}
										className={'prefixIcon'}
									/>
								)
							}}
							name="mobile"
							placeholder={'手机号'}
							rules={[
								{
									required: true,
									message: '请输入手机号！'
								},
								{
									pattern: /^1\d{10}$/,
									message: '手机号格式错误！'
								}
							]}
						/>
						<ProFormCaptcha
							fieldProps={{
								size: 'large',
								prefix: (
									<LockOutlined
										style={{
											color: token.colorText
										}}
										className={'prefixIcon'}
									/>
								)
							}}
							captchaProps={{
								size: 'large'
							}}
							placeholder={'请输入验证码'}
							captchaTextRender={(timing, count) => {
								if (timing) {
									return `${count} ${'获取验证码'}`
								}
								return '获取验证码'
							}}
							name="captcha"
							rules={[
								{
									required: true,
									message: '请输入验证码！'
								}
							]}
							onGetCaptcha={async () => {
								message.success('获取验证码成功！验证码为：1234')
							}}
						/>
					</>
				)}
			</LoginFormPage>
		</div>
	)
})

const LoginPage = () => {
	return (
		<ProConfigProvider dark>
			<Page />
		</ProConfigProvider>
	)
}

export default LoginPage
