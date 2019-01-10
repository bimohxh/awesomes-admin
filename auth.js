// 认证服务

let AppRes = {}
let App = {}

// 游客资源
let getVisitorRes = async (appID) => {
  let res = await AppRes.where({
    type: 'visitor',
    app_poi_apps: appID
  }).fetchAll()
  return res
}

// APP 登录用户资源
let getLoginUserRes = async (appID) => {
  let res = await AppRes.where({
    type: 'user',
    app_poi_apps: appID
  }).fetchAll()
  return res
}

// 获取公司所拥有的所有模块的资源
let getComModuleRes = async () => {}

// 获取用户角色的资源
let getUserRoleRes = async () => {}

// 获取当前访问所拥有的所有资源
let getRes = async (isLogin, appID, comID) => {
  if (isLogin) {
    return await getVisitorRes(appID)
  }

  let app = await App.where({
    id: appID
  }).fetch()

  // 没有角色系统
  if (app.has_role === 'n') {
    if (app.has_module === 'n') {
      return await getLoginUserRes(appID)
    }
    return await getComModuleRes()
  }

  // 有角色系统
  let user = {}
  if (user.is_super === 'n') {
    return await getUserRoleRes()
  }

  if (app.has_module === 'n') {
    return await getLoginUserRes(appID)
  }

  return await getComModuleRes()
}

