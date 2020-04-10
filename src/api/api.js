import request from './base'

// 获取用户列表
export function getUserList() {
    return request({
        url: '/users/page',
        method: 'get'
    })
}

// 获取组织架构树状列表
export function getGrouptreeList() {
    return request({
        url: '/organ-units/tree',
        method: 'get'
    })
}

// 获取组列表
export function getGroupList(){
    return request({
        url:'/app/rest/admin/groups',
        method:'get'
    })
}

// 获取组织架构下的用户
export function getGroupuserList(param) {
    return request({
        url: `/users/by-organ-unit?organUnitId=${param}`,
        method: 'get'
    })
}

// 新增组
export function addGroup(params){
    return request({
        url:'/app/rest/admin/groups',
        method:'post',
        data:params
    })
}

// 编辑组
export function editGroup(groupId,param){
    return request({
        url:`/app/rest/admin/groups/${groupId}`,
        method:'put',
        data:param
    })
}

// 删除组
export function deleteGroup(groupId){
    return request({
        url:`/app/rest/admin/groups/${groupId}`,
        method:'delete'
    })
}

// 获取组中用户
// .get(`http://localhost:9090/modeler/groups/${data.id}/users`)
export function getGroupUser(groupId){
    return request({
        url:`/groups/${groupId}/users`,
        method:'get'
    })
}

// 增加组中用户
export function addGroupUser(groupId,userId){
    return request({
        url:`/app/rest/admin/groups/${groupId}/members/${userId}`,
        method:'post'
    })
}

// 删除组中用户
export function deleteGroupuser(groupId,userId){
    return request({
        url:`/app/rest/admin/groups/${groupId}/members/${userId}`,
        method:'delete'
    })
}