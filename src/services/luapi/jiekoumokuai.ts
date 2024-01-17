// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 更新接口 更新API接口 PUT /admin/v1/interface_info */
export async function putInterfaceInfo(
  body: API.UpdateInterfaceInfoRequest,
  options?: { [key: string]: any },
) {
  return request<API.Result & { data?: boolean }>(`/admin/v1/interface_info`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建接口 创建API接口 POST /admin/v1/interface_info */
export async function postInterfaceInfo(
  body: API.CreateInterfaceInfoRequest,
  options?: { [key: string]: any },
) {
  return request<API.Result & { data?: number }>(`/admin/v1/interface_info`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取接口详情 获取接口详情 GET /admin/v1/interface_info/${param0} */
export async function getInterfaceInfoId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInterfaceInfoIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Result & { data?: API.InterfaceInfoVO }>(
    `/admin/v1/interface_info/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 删除接口 删除API接口 DELETE /admin/v1/interface_info/${param0} */
export async function deleteInterfaceInfoId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteInterfaceInfoIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Result & { data?: boolean }>(`/admin/v1/interface_info/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 分页查询接口列表 分页查询接口列表 GET /admin/v1/interface_info/list */
export async function getInterfaceInfoList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInterfaceInfoListParams,
  options?: { [key: string]: any },
) {
  return request<API.Result & { data?: API.InterfaceInfoPageVO }>(`/admin/v1/interface_info/list`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
