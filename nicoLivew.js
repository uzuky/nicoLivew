javascript:!function() {
  var loc = document.location.href,
  div = document.createElement('div'),
  day = 'v20180219',
  ver = '<small><a href="http://nico.ms/ar303976" target="_blank" title="support" style="position:relative; top:5px; background-color:rgba(255,255,255,0.4);">' + day + '</a></small>';
  switch (true) {
//いつもの放送ページの処理
  case /live\.nicovideo\.jp\/watch/.test(loc): {
  //ここ仕様変更に弱そう
    var url = document.querySelector('meta[property="al:web:url"]');
  //放送IDを取得
    liveId = url.outerHTML.replace(/.+?watch\/(lv\d+).*/, '$1');
    delButton = 'var f = &quot;flvplayer_container&quot;,flv = document.getElementById(f);flv.parentNode.removeChild(flv);';
//放送主かどうか
  //ログインしてるユーザーIDを取得
    var myUserIdSource = document.getElementById('siteHeaderNotification');
    if (!myUserIdSource) {
      var myUserId = '0';
    } else {
      var myUserId = myUserIdSource.outerHTML.replace(/[\s\S]+data\-nico\-userid="(\d+)"[\s\S]*/, '$1');
    }
  //放送主のユーザーIDを取得(表示がない放送は0)
    var liveUserIdSource = document.querySelector('.nicopedia_nushi');
      if (!liveUserIdSource) {
        var liveUserId = 0;
      } else {
        var liveUserId = liveUserIdSource.outerHTML.replace(/[\s\S]+nicovideo.jp\/user\/(\d+)[\s\S]+/, '$1');
      }
  //ログインしてるユーザーIDと放送主のユーザーIDを比較
console.log(myUserIdSource.outerHTML);
      if (myUserId != liveUserId) {
        var nushi = 'N';
      } else {
        var nushi = 'Y';
      }
  break;


//新しい放送ページ(？)の処理
// こんなものはない
//   } case /live2\.nicovideo\.jp\/watch/.test(loc): {
//     var liveId = loc.replace(/.+?watch\/(lv\d+).*/, '$1'),
//     scripts = document.getElementsByTagName('script');
//     //ソースから flash に渡すパラメータの部分を取得
//     var i = 0;
//     while (scripts[i] != null) {
//       if (/.+flashVars.+/.test(scripts[i].outerHTML)) {
//         var flashParam = scripts[i].outerHTML;
//         break;
//       }
//       //console.log(scripts[i]);
//       ++i;
//     }
//     if (flashParam == null) {
//       alert('flashParam が取得できませんでした（◞‸◟）\nこのページのURL「' + loc + '」\n連絡先とか　http://nico.ms/ar303976\nfriends.nico＠uzuky');
//     }
//     var p = flashParam.replace(/[\s\u2028\u2029]/g,''),
//     //URL のパラメータ
//     swf = p.replace(/.*?swf:"(http:.+?AriesPlayer\.swf)".*/,'$1?'),
//     ws0 = p.replace(/.*?"(webSocketUrl)".+?"([\w\W]+?)".*/,'&$1=$2'),
//     ws = ws0.replace(/\\\//g,'/'),
//     ot = p.replace(/.*?"(openTime)".+?"(\w+)".*/,'&$1=$2'),
//     at = p.replace(/.*?"(audienceToken)".+?"(\w+)".*/,'&$1=$2'),
//     ec = "&enableClientLog=1",
//     bt = p.replace(/.*?"(beginTime)".+?"(\d+)".*/,'&$1=$2'),
//     rn = p.replace(/.*?"(relatedNicoliveProgramId)".+?"(\w+)".*/,'&$1=$2'),
//     bi = p.replace(/.*?"(broadcastId)".+?"(\d+)".*/,'&$1=$2'),
//     pi = p.replace(/.*?"(programId)".+?"(\d+)".*/,'&$1=$2');

//       var Aries = '<input type="button" value="Aries" onClick="window.open(\'' + swf + ws + ot + at + ec + bt + rn + bi + pi + '\',\'_blank\',\'width=960,height=512\');var f = &quot;playerswf&quot;,flv = document.getElementById(f);flv.parentNode.removeChild(flv);"><br>',
//       delButton = 'var f = &quot;playerswf&quot;,flv = document.getElementById(f);flv.parentNode.removeChild(flv);',
//       nushi = 'N',
//     break;

  } case /live2\.nicovideo\.jp\/watch/.test(loc): {
    var liveId = loc.replace(/.+?watch\/(lv\d+).*/, '$1');
    delButton = '';
    nushi = 'Y';
  break;

//それ以外のページの処理
  } default: {
    var liveId = prompt('放送IDかURL', '');
    if (liveId.match(/lv[0-9]+/)) {
      var liveId = liveId.replace(/.+?(lv\d+).*/, '$1');
      delButton = '';
      nushi = 'Y';
    } else {
      alert('lvで始まる放送IDが入ってないよ！\n「' + liveId + '」\n連絡先とか　http://nico.ms/ar303976\nfriends.nico＠uzuky');
      return false;
    }
  break;
  }}
//放送主だったら追加
  if (nushi == 'Y') {
    var nama1 = '<div style="background: rgba(0, 0, 0, 0.3);"><b>放送主用</b><br><input type="button" value="放送情報変更" onClick="window.open(\'http://live.nicovideo.jp/editstream/' + liveId + '\',\'_blank\',\'width=960,height=600,scrollbars=1\')"><input type="button" value="配信ツール" onClick="window.open(\'http://live.nicovideo.jp/nicolivebroadcaster.swf?dicfilename=NicoliveBroadcasterDictionaryJAJP.swf&v=' + liveId + '\',\'_blank\',\'width=900,height=250\')"><br><input type="button" value="配信ツール(原宿)" onClick="window.open(\'http://live.nicovideo.jp/utility_v1.swf?v=' + liveId + '\',\'_blank\',\'width=950,height=200\')"> </div>',
    nama2 = '<small><b>※"配信ツール"は正常に動作するか現在不明です。<br>※放送情報変更の反映は少し時間がかかります。<br>※放送主用は放送主のみ使えます。<br>※HTML5版の対応予定はないです。</b></small><br>';
  } else {
    var nama1 = '',
    nama2 = '';
  }
//ページに追加
    div.innerHTML = '<div><b><span title="閉じる" onClick="var c = &quot;nicoLivew&quot;,close = document.getElementById(c);close.parentNode.removeChild(close);" style="float:right; cursor:pointer; font-size:large; position:relative; bottom:10px; left:5px;">×</span><span title="！？" onClick="' + delButton + '" style="cursor:default;">プレイヤー抜き出し</span></b></div><span style="white-space:nowrap;"><input type="button" value="GINZA" onClick="window.open(\'http://live.nicovideo.jp/nicoliveplayer.swf?v=' + liveId + '&languagecode=ja-jp\',\'_blank\',\'width=960,height=490\');' + delButton + '"><input type="button" value="原宿" onClick="window.open(\'http://live.nicovideo.jp/liveplayer.swf?v=' + liveId + '\',\'_blank\',\'width=950,height=520\');' + delButton + '"></span><br><input type="button" value="ニコファーレ" onClick="window.open(\'http://live.nicovideo.jp/liveplayer_farre.swf?v=' + liveId + '\',\'_blank\',\'width=960,height=520\');' + delButton + '"><br><input type="button" value="ページ更新してリセット" onClick="window.location.reload(true)"><br>' + nama1 + nama2 + ver;
    div.style.color = 'rgb(250,250,250)';
    div.style.textAlign = 'center';
    div.style.padding = '10px';
    div.style.position = 'fixed';
    div.style.zIndex = '9999';
    div.style.fontSize = '12px';
    div.style.border = '2px solid black';
    div.style.right = '20px';
    div.style.bottom = '20px';
    div.style.background = 'rgba(0,120,240,0.5)';
    div.setAttribute("id", "nicoLivew");
    document.body.appendChild(div);
}();
