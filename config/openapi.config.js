module.exports = {
	openApi: [
		{
			requestLibPath: "import request from '@/utils/request'", // 想怎么引入封装请求方法
			schemaPath: 'http://localhost:8080/swagger/doc.json', // openAPI规范地址
			projectName: 'luapi', // 生成到哪个目录内
			apiPrefix: '"/"', // 需不需要增加前缀
			serversPath: './src/services' // 生成代码到哪个目录
		}
	]
}
