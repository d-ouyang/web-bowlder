//demo 函数
// photosId             : 相册ID
// id                   : 绑定元素ID
// imgBasePath          : 图片基础路径
// imgStrPam            : 图片相对路径
// callBack             : 删除或者新增回调函数
function ouyangDemo(photosId, id, imgBasePath, imgStrPam, callBack) {
  $('body').append($(
    '<input type="hidden" name="' + id + '-btn' + '" id="' + id + '-btn' + '" value="" />'
  ))
  var $ouYangDemo = $('#' + id); //缩略图父级
  $ouYangDemo.css({'margin': '10px'})
  var imgBasePath = imgBasePath;
  var imgStrPam = imgStrPam;
  var imgArr = doImagesArr(imgBasePath, imgStrPam);
  preLoad($ouYangDemo.find('button').parent(), imgArr); //执行预加载函数
  $('#' + id + '-btn').val(imgArr); // 存储imgArr 存储结果为字符串
  console.log($('#' + id + '-btn').val());
  var imgJson = new Object();
  imgJson.title = '预览图片';
  imgJson.id = photosId;
  var start = 0; // 查看图片 默认第一张

  //动态加载用事件委托保证事件有效绑定
  $ouYangDemo.on('click', function (e) {
    var imgArr = $('#' + id + '-btn').val().split(',');
    if (imgArr.length == 1 && imgArr[0] == '') {
      imgArr = [];
    }
    console.log(imgArr);
    var e = e || window.event;
    var target = e.target || e.srcElement;
    var targetNode = target.nodeName.toLowerCase();
    if (targetNode == 'span') { //如果点击对象是X号 则删除此项以及对应的json数据
      var index = $ouYangDemo.find('.delete').index(target);
      $(target).parent().remove();
      imgArr.splice(index, 1);
      data = handleImgArr(imgArr); //处理layer.photos.data
      imgJson = handleImgJson(imgJson, index, data); //处理layer.photos.data
      $('#' + id + '-btn').val(imgArr);//暂存
      callBack(ouyangHandleArr(imgBasePath, imgArr));
    } else if (targetNode == 'img') { //点击对象为图片 则查看对应图片
      console.log(targetNode);
      var index = $ouYangDemo.find('.item-img').index(target);
      data = handleImgArr(imgArr);
      imgJson = handleImgJson(imgJson, index, data);
      render(imgJson);
      $('#' + id + '-btn').val(imgArr);//暂存
    }
  })
}


function ouyangDemoAdd(photosId, id, imgBasePath, newImgStrPam, callBack) {
  var oldImgArr = $('#' + id + '-btn').val().split(',');//读取数据
  if (oldImgArr.length == 1 && oldImgArr[0] == '') {
    oldImgArr = [];
  }
  var imgJson = new Object();
  imgJson.title = '预览图片';
  imgJson.id = photosId;
  var start = 0; // 查看图片 默认第一张
  var newImgArr = doImagesArr(imgBasePath, newImgStrPam);
  appendImg($('#' + id).find('button').parent(), newImgArr);//渲染新增图片
  for (var i = 0; i < newImgArr.length; i++) {
    oldImgArr.push(newImgArr[i]);
  }
  var data = handleImgArr(oldImgArr);
  imgJson = handleImgJson(imgJson, start, data);
  $('#' + id + '-btn').val(oldImgArr);
  callBack(ouyangHandleArr(imgBasePath, oldImgArr));
}

function ouyangHandleArr(imgBasePath, arr) {
  var imgStrPam = '';
  if (arr.length) {
    for (var i in arr) {
      imgStrPam += arr[i].replace(new RegExp(imgBasePath, "gm"), '') + ',';

    }
    imgStrPam = imgStrPam.substring(0, imgStrPam.length - 1);
  }
  return imgStrPam;
}

//图片预加载
function preLoad(el, imgArr) {
  var index = 0;

  function loadingImg() {
    for (var i = 0; i < imgArr.length; i++) {
      var imgObj = new Image();
      imgObj.src = imgArr[i];
      imgObj.onload = function () {
        index++;
        if (index >= imgArr.length) { //预加载完成
          appendImg(el, imgArr); //添加图片
        }
      }
    }
  }

  loadingImg(imgArr);
}

function doImagesArr(basePathPram, imagesPram) {
  // 车位图片
  var imgArr = [];
  if(imagesPram != '' && imagesPram != null){
    var images = imagesPram + '';
    var basePath = basePathPram + '';
    var imgPramArr = images.split(",");
    for (var i = 0; i < imgPramArr.length; i++) {
      imgArr.push(basePath + imgPramArr[i]);
    }
  }
  return imgArr;
}

//传入imgArr数组 返回imgJson data
function handleImgArr(arr) {
  var data = [];
  if(arr.length){
    for (var i in arr) {
      var item = {};
      item.alt = '图片' + (1 + parseInt(i));
      item.pid = i;
      item.src = arr[i];
      item.thumb = arr[i];
      data.push(item);
    }
  }
  return data;
}

//传入imgJson的所有数据 返回处理后的imgJson
function handleImgJson(obj, start, data) {
  obj.start = start;
  obj.data = data;
  return obj;
}

//添加图片函数  el为图片父级 arr为图片数组
function appendImg(el, arr) {
  for (var i in arr) {
    var newImg = $(
      '<div class="item-container">' +
      '<img class="item-img" src="' + arr[i] + '" alt="删除">' +
      '<span class="layui-icon delete">&#x1007;</span> ' +
      '</div>'
    );
    newImg.insertBefore(el)
  }
}

function render(imgJson) {
  layui.use('layer', function () {
    var layer = layui.layer;
    layer.photos({
      photos: imgJson,
      anim: 0,
      closeBtn: 1
    })
  });
}

////启动demo
//ouyangDemo(1, 'ouyang-demo', 'http://www.mapleparking.com', imgStrPam, "abc");
//$('#add').on('click', function () {
//    ouyangDemoAdd(1, 'ouyang-demo', 'http://www.mapleparking.com', '/images/banner-1.png,/images/banner-2.png,/images/banner-3.png')
//})
//
//ouyangDemo(2, 'ouyang-demo-2', 'http://www.mapleparking.com', '/images/banner-1.png,/images/banner-2.png');
//$('#add2').on('click', function () {
//    ouyangDemoAdd(2, 'ouyang-demo-2', 'http://www.mapleparking.com', '/images/banner-1.png,/images/banner-2.png,/images/banner-3.png')
//})
