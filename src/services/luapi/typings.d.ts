declare namespace API {
  type CreateInterfaceInfoRequest = {
    call_name?: string;
    description?: string;
    method?: string;
    name?: string;
    request_header?: string;
    request_params?: string;
    request_params_example?: string;
    url?: string;
  };

  type deleteInterfaceInfoIdParams = {
    /** 接口ID */
    id: number;
  };

  type getInterfaceInfoIdParams = {
    /** 接口ID */
    id: number;
  };

  type getInterfaceInfoListParams = {
    /** 当前页码 */
    current?: number;
    /** 分页大小 */
    size?: number;
    /** 接口名称 */
    name?: string;
    /** 接口请求方法：POST、GET */
    method?: string;
    /** SDK 调用方法名称 */
    call_name?: string;
  };

  type getUserIdParams = {
    /** 用户ID */
    id: number;
  };

  type getUserListParams = {
    /** 当前页码 */
    current?: number;
    /** 分页大小 */
    size?: number;
    /** 用户昵称 */
    user_name?: string;
    /** 用户角色 */
    user_role?: string;
    /** access_key */
    access_key?: string;
    /** secret_key */
    secret_key?: string;
  };

  type InterfaceInfoPageVO = {
    records?: InterfaceInfoVO[];
    total?: number;
  };

  type InterfaceInfoVO = {
    call_name?: string;
    create_time?: number;
    description?: string;
    id?: number;
    method?: string;
    name?: string;
    request_header?: string;
    request_params?: string;
    request_params_example?: string;
    status?: number;
    update_time?: number;
    url?: string;
    user_id?: number;
  };

  type LoginRequest = {
    account?: string;
    password?: string;
  };

  type RegisterRequest = {
    account?: string;
    check_password?: string;
    password?: string;
  };

  type Result = {
    code?: number;
    data?: any;
    description?: string;
    message?: string;
  };

  type UpdateInterfaceInfoRequest = {
    call_name?: string;
    description?: string;
    id?: number;
    method?: string;
    name?: string;
    request_header?: string;
    request_params?: string;
    request_params_example?: string;
    url?: string;
  };

  type UserPageVO = {
    records?: UserVO[];
    total?: number;
  };

  type UserVO = {
    access_key?: string;
    account?: string;
    avatar_url?: string;
    create_time?: number;
    gender?: number;
    id?: number;
    secret_key?: string;
    update_time?: number;
    user_name?: string;
    user_role?: string;
    wechat_open_id?: string;
    wechat_union_id?: string;
  };
}
