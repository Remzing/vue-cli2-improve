import request from '@/utils/request'
import qs from 'qs' // 解决axios 数据格式转换的问题

/**
 * 新增管理员初始化
 */
export function toInsertAdmin (formData) {
  return request({
    url: '/manager/toInsertAdmin.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 管理员列表
 */
export function selectPageAdminList (formData) {
  return request({
    url: '/manager/selectPageAdminList.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 编辑管理员初始化
 */
export function editAdmin (formData) {
  return request({
    url: '/manager/editAdmin.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 新增/编辑管理员
 */
export function saveOrUpdateAdmin (formData) {
  return request({
    url: '/manager/saveOrUpdateAdmin.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 重置密码
 */
export function resetAdminPassword (formData) {
  return request({
    url: '/manager/resetAdminPassword.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 登录日志
 */
export function loginLog (formData) {
  return request({
    url: '/manager/loginLog.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 管理组-管理组列表
 */
export function queryRoleList (formData) {
  return request({
    url: '/manager/queryRoleList.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 管理组-编辑管理组初始化
 */
export function toUpdateRole (formData) {
  return request({
    url: '/manager/toUpdateRole.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
export function toInsertRole (formData) {
  return request({
    url: '/manager/toInsertRole.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
export function insertRole (formData) {
  return request({
    url: '/manager/insertRole.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 管理组-保存编辑管理组
 */
export function updateRole (formData) {
  return request({
    url: '/manager/updateRole.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 管理组-删除管理组
 */
export function deleteRole (formData) {
  return request({
    url: '/manager/deleteRole.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 管理组-更改状态
 */
export function updateRoleState (formData) {
  return request({
    url: '/manager/updateRoleState.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 全部管理员-更改离职转正状态
 */
export function updateLocked (formData) {
  return request({
    url: '/manager/updateLocked.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}