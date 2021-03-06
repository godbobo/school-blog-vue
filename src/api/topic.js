import request from '@/utils/request'

function add(name, tags, summary) {
  return request({
    url: '/topic/add',
    method: 'post',
    data: {
      'topic.name': name,
      'topic.summary': summary,
      'jsonRest': JSON.stringify(tags)
    }
  })
}

function find(id) {
  return request({
    url: '/topic/find',
    method: 'post',
    data: {
      'topic.id': id
    }
  })
}

// 根据用户id获取创建的话题列表
function lstByCreator(id, page, rows) {
  return request({
    url: '/topic/lstByCreator',
    method: 'post',
    data: {
      'page': page,
      'row': rows,
      'user.id': id
    }
  })
}

// 获取某个用户加入的话题列表
function lstByFollower(id, page, rows) {
  return request({
    url: '/topic/lstByFollower',
    method: 'post',
    data: {
      'page': page,
      'row': rows,
      'user.id': id
    }
  })
}

// 获取与用户相关的话题
function lstAbout() {
  return request({
    url: '/topic/lstAboutId',
    method: 'get'
  })
}

// 获取话题列表
function lst(page, rows, type, arg) {
  const p = {
    page: page,
    row: rows,
    queryType: type
  }
  let params = {}
  if (type === 1) {
    params = Object.assign(p, { 'user.loginname': arg })
  } else if (type === 2) {
    params = Object.assign(p, { 'topic.name': arg })
  } else if (type === 3) {
    params = Object.assign(p, { 'topic.summary': arg })
  } else {
    params = p
  }
  return request({
    url: 'topic/lst',
    method: 'post',
    data: params
  })
}

// 加入话题
function follow(id) {
  return request({
    url: '/topic/follow',
    method: 'post',
    data: {
      'topic.id': id
    }
  })
}

export { add, lstAbout, lstByFollower, lstByCreator, lst, find, follow }
