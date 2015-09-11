javascript:!function() {
  var loc = document.location.href,
  div = document.createElement('div'),
  ua = window.navigator.userAgent.toLowerCase(),
  day = 'v20150912',
  ver = '<small><a href="http://nico.ms/ar303976" target="_blank" title="support" style="position:relative; top:5px; background-color:rgba(255,255,255,0.4);">' + day + '</a></small>';
  switch (true) {
//いつもの放送ページの処理
  case /live\.nicovideo\.jp\/watch/.test(loc): {
  //ここ仕様変更に弱そう
    var url = document.querySelector('meta[property="og:url"]'),
  //放送IDを取得
    liveId = url.replace(/.+?watch\/(lv\d+).*/, '$1'),
    Aries = '',
    delButton = 'var f = &quot;flvplayer_container&quot;,flv = document.getElementById(f);flv.parentNode.removeChild(flv);';
//放送主かどうか
  //ログインしてるユーザーIDを取得
    var myUserIdSource = document.querySelectorAll('div[id="hide_tool_box"] > script'),
    myUserId = myUserIdSource[1].outerHTML.replace(/[\s\S]+id: (\d+),[\s\S]+/, '$1');
  //放送主のユーザーIDを取得(表示がない放送は0)
    var liveUserIdSource = document.querySelector('.nicopedia_nushi');
      if (!liveUserIdSource) {
        liveUserId = 0;
      } else {
        var liveUserId = liveUserIdSource.innerHTML.replace(/[\s\S]+nicovideo.jp\/user\/(\d+)[\s\S]+/, '$1');
      }
  //ログインしてるユーザーIDと放送主のユーザーIDを比較
      if (myUserId != liveUserId) {
        nushi = 'N';
      } else {
        nushi = 'Y';
      }
    break;
//新しい放送ページ(？)の処理
  } case /live2\.nicovideo\.jp\/watch/.test(loc): {
    var liveId = loc.replace(/.+?watch\/(lv\d+).*/, '$1');
    if (ua.indexOf('firefox') != -1) {
      s = document.getElementsByTagName('script')[17].outerHTML;
    } else {
      s = document.getElementsByTagName('script')[16].outerHTML;
    }
    var p = s.replace(/[\s\u2028\u2029]/g,''),
    //URL のパラメータ
      we = 'webSocketUrl=ws://a.live2.nicovideo.jp/wsapi/v1/watch/',
      au = p.replace(/.*?"(audienceToken)".+?"(\w+)".*/,'&$1=$2'),
      re = p.replace(/.*?"(relatedNicoliveProgramId)".+?"(\w+)".*/,'&$1=$2'),
      br = p.replace(/.*?"(broadcastId)".+?"(\d+)".*/,'&$1=$2'),
      be = p.replace(/.*?"(beginTime)".+?"(\d+)".*/,'&$1=$2');
      Aries = '<input type="button" value="Aries" onClick="window.open(\'http://nl.nimg.jp/public/relive/1.4.36/assets/web/r1/swfs/v1/AriesPlayer.swf?' + we + au + re + br + be + '\',\'_blank\',\'width=960,height=512\');var f = &quot;playerswf&quot;,flv = document.getElementById(f);flv.parentNode.removeChild(flv);"><br>',
      delButton = 'var f = &quot;playerswf&quot;,flv = document.getElementById(f);flv.parentNode.removeChild(flv);',
      nushi = 'N';
    break;
//それ以外のページの処理
  } default: {
    var liveId = prompt('放送IDかURL', '');
    if (liveId.match(/lv[0-9]+/)) {
      liveId = liveId.replace(/.+?(lv\d+).*/, '$1'),
      Aries = '',
      delButton = '',
      nushi = 'Y';
    } else {
      alert('放送IDが入ってないよ！\n「' + liveId + '」\n連絡先とか　http://nico.ms/ar303976');
      return false;
    }
    break;
  }}
//放送主だったら追加
  if (nushi == 'Y') {
    nama1 = '<b>放送主用</b><br><input type="button" value="配信ツール" onClick="window.open(\'http://live.nicovideo.jp/nicolivebroadcaster.swf?dicfilename=NicoliveBroadcasterDictionaryJAJP.swf&v=' + liveId + '\',\'_blank\',\'width=900,height=250\')"><input type="button" value="放送情報変更" onClick="window.open(\'http://live.nicovideo.jp/editstream/' + liveId + '\',\'_blank\',\'width=960,height=600,scrollbars=1\')"><br><input type="button" value="配信ツール(原宿)" onClick="window.open(\'http://live.nicovideo.jp/utility_v1.swf?v=' + liveId + '\',\'_blank\',\'width=950,height=200\')"> ',
    nama2 = '<small><b><br>※配信ツールはセッションが使えません<br>※かんたん配信タブは1番最初に操作したウィンドウの<br>配信ツールでなるべくいじってください<br>※放送情報変更の反映は少し時間がかかります</b></small><br>';
  } else {
    nama1 = '',
    nama2 = '';
  }
//ページに追加
    div.innerHTML = '<div><b><span title="閉じる" onClick="var c = &quot;nicoLivew&quot;,close = document.getElementById(c);close.parentNode.removeChild(close);" style="float:right; cursor:pointer; font-size:large; position:relative; bottom:10px; left:5px;">×</span><span title="！？" onClick="' + delButton + '" style="cursor:default;">プレイヤー変更</span></b></div>' + Aries + '<span style="white-space:nowrap;"><input type="button" value="GINZA" onClick="window.open(\'http://live.nicovideo.jp/nicoliveplayer.swf?v=' + liveId + '&languagecode=ja-jp\',\'_blank\',\'width=960,height=490\');' + delButton + '"><input type="button" value="ニコファーレ" onClick="window.open(\'http://live.nicovideo.jp/liveplayer_farre.swf?v=' + liveId + '\',\'_blank\',\'width=960,height=520\');' + delButton + '"></span><br><input type="button" value="原宿" onClick="window.open(\'http://live.nicovideo.jp/liveplayer.swf?v=' + liveId + '\',\'_blank\',\'width=950,height=520\');' + delButton + '"><input type="button" value="ページ更新" onClick="window.location.reload(true)"><br>' + nama1 + nama2 + ver;
    div.style.color = 'rgb(250,250,250)';
    div.style.textAlign = 'center';
    div.style.padding = '10px';
    div.style.position = 'fixed';
    div.style.zIndex = '9999';
    div.style.fontSize = '12px';
    div.style.border = '2px solid black';
    div.style.right = '20px';
    div.style.bottom = '20px';
    div.style.background = 'rgba(0,128,255,0.5)';
    div.setAttribute("id", "nicoLivew");
    document.body.appendChild(m);
}();
