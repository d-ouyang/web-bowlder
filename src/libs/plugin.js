function returnBaseUrl() {
  return 'http://47.52.105.7:8080/'
}

function getParamValue (name) {
  var search = window.location.search; // 写入数据字典
  var splitBit = (search.indexOf("&") != -1) ? '&' : '_';
  var tmparray = search.substr(1, search.length).split(splitBit);
  var paramsArray = new Array;
  if(tmparray != null) {
    for(var i = 0; i < tmparray.length; i++) {
      var reg = /[=|^==]/; // 用=进行拆分，但不包括==
      var set1 = tmparray[i].replace(reg, '&');
      var tmpStr2 = set1.split('&');
      var array = new Array;
      array[tmpStr2[0]] = tmpStr2[1];
      paramsArray.push(array);
    }
  }
  if(paramsArray != null) {
    for(var i = 0; i < paramsArray.length; i++) {
      for(var j in paramsArray[i]) {
        if(j == name) {
          return paramsArray[i][j];
        }
      }
    }
  }
  return null;
}

function returnType (typeId) {
  if (typeId == 1) {
    return '原石'
  } else if (typeId == 2) {
    return '切料'
  } else if (typeId == 3) {
    return  '成品'
  }
}

function returnPage (str) {
  if (str == 'index') {
    return '首页'
  } else if (str == 'list') {
    return '玉石列表'
  } else if (str == 'add') {
    return '添加玉石'
  }
}

function returnLoginState (token) {
  var isLogin = token ? true : false;

  return isLogin;
}

function tips(el){
  layer.tips('您还未登录您的账号，请先登录', el, {
    tips: [1, '#000000'],
    time: 4000
  });
}

function goSearch(el, val, callback) {
  el.on('focus',function() {
    $(this).attr('placeholder', '');
  }).on('keyup', function(e) {
    var e = e || window.event;
    if (e.keyCode === 13) {
      $(this).blur();
      if($(this).val() != ''){
        console.log($(this).val());
        callback($(this).val());
        $(this).val('');
      } else {
        return;
      }
    }
  }).on('blur', function() {
    $(this).attr('placeholder', val);
  })
}

function requestPut(url, token, data, cb){
  $.ajax({
    type:'put',
    url: url,
    cache: false,
    xhrFields: {
      "widthCredentials": true
    },
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "access_token": token
    },
    data: data,
    success: function (res) {
      typeof cb && cb(res);
    }
  })
}

function requestPost(url, token, data, cb) {
  $.ajax({
    type:'post',
    url: url,
    cache: false,
    xhrFields: {
      "widthCredentials": true
    },
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "access_token": token
    },
    data: data,
    success: function (res) {
      typeof cb && cb(res);
    }
  })
}

function requestGet(url, token, cb) {
  $.ajax({
    type: 'get',
    url: url,
    cache: false,
    xhrFields: {
      "widthCredentials": true
    },
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "access_token": token
    },
    success: function (res) {
      typeof cb && cb(res);
    }
  })
}

function resetHistoryData(data, text, index){
  var _list = data.list;
  if (index === undefined) {
    for (var i in _list) {
      if (_list[i] === text) {
        _list.splice(i, 1);
        break;
      } else {
        continue;
      }
    }
  } else {
    _list.splice(index, 1);
  }
  _list.unshift(text);
  _list = _list.slice(0,10);
  console.log(_list);
  data.list = _list;
  layui.data('history', {
    key: 'history_data',
    value: data
  })
}