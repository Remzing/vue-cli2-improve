/**
 * Created for comon
 */

export function setLocal (key, value) {
  window.localStorage[key] = JSON.stringify(value)
}

export function getLocal (key) {
  return JSON.parse(window.localStorage[key] || '{}')
}

export function removeLocal (key) {
  window.localStorage.removeItem(key)
}
export function getCurrMenu (url) {
  var parentMenu = getLocal('parentMenu')
  console.log('getCurrMenu', url, parentMenu)
  // return parentMenu.children.find(li => li.path === url)
  return parentMenu.children.find(li => url.indexOf(li.path) >= 0)
}
/**
 * 時間切割
 *
 */
export function splitTimeStr (time) {
  if (time) {
    var timeArr = (time).split(' ')
    console.log('splitMoneyStr', timeArr)
    var tempYear = timeArr[0]
    return tempYear
  }
  return ''
}
/**
 * 图片地址拼接
 *
 */
export function photoUrlMeger (photo) {
  console.log('photoUrlMeger', getLocal('photoUrl'),photo)
  console.log('photoUrlMeger--getLocal(photoUrl)',getLocal('photoUrl'))
  console.log('photoUrlMeger--photo', getLocal('photoUrl')+photo)
  if (photo) {
    let photoTemp = getLocal('photoUrl') + photo
    return photoTemp
  }
  return photo || ''
}
/**
 * 手机号验证
 */
export function checkPhoneOK (phone) {
  let myreg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/
  if (phone && myreg.test(phone)) {
    return true
  }
  return false
}
