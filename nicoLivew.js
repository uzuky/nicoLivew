javascript:!function() {
	var L = document.location.href,
		m = document.createElement('div'),
		d = 'v20131231',
		ver = '<small><a href="http://nico.ms/ar303976" target="_blank" title="support" style="position:relative; top:5px; background-color:rgba(255,255,255,0.4);">' + d + '</a></small>';
	switch (true) {
//いつもの放送ページの処理
	case /live\.nicovideo\.jp\/watch/.test(L): {
	//ここ仕様変更に弱そう
		var h0 = document.getElementsByTagName('meta')[14].outerHTML,
	//放送IDを取得
			h = h0.replace(/.+?watch\/(lv\d+).*/, '$1'),
			Aries = '',
			del = 'var f = &quot;flvplayer_container&quot;,flv = document.getElementById(f);flv.parentNode.removeChild(flv);';
//放送主かどうか
		var u0 = document.getElementById('siteHeaderNotification').outerHTML,
	//ログインしてるユーザーIDを取得
			u = u0.replace(/.+?nico-userid="(\d+)"[\s\S]+/, '$1'),
			n0 = document.getElementsByClassName('nicopedia_nushi');
	//放送主のユーザーIDを取得(表示がない放送は0)
			if (n0.length != '0') {
				var n1 = n0[0].innerHTML,
				n = n1.replace(/[\s\S]+nicovideo.jp\/user\/(\d+)"[\s\S]+/, '$1');
			} else {
				n = 0;
			}
	//ログインしてるユーザーIDと放送主のユーザーIDを比較
			if (u != n) {
				nushi = 'N';
			} else {
				nushi = 'Y';
			}
		break;
//新しい放送ページ(？)の処理
	} case /live2\.nicovideo\.jp\/watch/.test(L): {
		var h = L.replace(/.+?watch\/(lv\d+).*/, '$1'),
			s = document.getElementById('player-container').innerHTML,
			p = s.replace(/[\s\u2028\u2029]/g,'')
			a = p.replace(/.*?"(audienceToken)".+?"(\w+)".*/,'$1=$2'),
			b1 = p.replace(/.*?"(beginTime)".+?"(\d+)".*/,'&$1=$2'),
			b2 = p.replace(/.*?"(broadcastId)".+?"(\d+)".*/,'&$1=$2'),
			w = '&webSocketUrl=ws://a.live2.nicovideo.jp/wsapi/v1/watch/';
			Aries = '<input type="button" value="Aries" onClick="window.open(\'http://nl.nimg.jp/public/relive/1.2.10/assets/web/r1/swfs/v1/AriesPlayer.swf?' + a + b1 + b2 + w + '\',\'_blank\',\'width=960,height=512\');var f = &quot;playerswf&quot;,flv = document.getElementById(f);flv.parentNode.removeChild(flv);"><br>',
			del = 'var f = &quot;playerswf&quot;,flv = document.getElementById(f);flv.parentNode.removeChild(flv);',
			nushi = 'N';
		break;
//それ以外のページの処理
	} default: {
		var h = prompt('放送IDかURL', '');
		if (h.match(/lv[0-9]+/)) {
			h = h.replace(/.+?(lv\d+).*/, '$1'),
			Aries = '',
			del = '';
		} else {
			alert('放送IDが入ってないよ！\n「' + h + '」\n連絡先とか　http://nico.ms/ar303976');
			return false;
		}
		break;
	}}
//放送主だったら追加
	if (nushi == 'Y') {
		nama1 = '<b>放送主用</b><br><input type="button" value="配信ツール" onClick="window.open(\'http://live.nicovideo.jp/nicolivebroadcaster.swf?dicfilename=NicoliveBroadcasterDictionaryJAJP.swf&v=' + h + '\',\'_blank\',\'width=900,height=250\')"><input type="button" value="放送情報" onClick="window.open(\'http://live.nicovideo.jp/editstream/' + h + '\',\'_blank\',\'width=960,height=600,scrollbars=1\')"><br><input type="button" value="配信ツール(原宿)" onClick="window.open(\'http://live.nicovideo.jp/utility_v1.swf?v=' + h + '\',\'_blank\',\'width=950,height=200\')"> ',
		nama2 = '<small><b><br>※配信ツールはニコ電とセッションが使えません<br>※配信ツール(原宿)はセッションがないです<br>※かんたん配信タブは1番最初に操作したウィンドウの<br>配信ツールでいじってください<br>※放送情報変更の反映は少し時間がかかります</b></small><br>';
	} else {
		nama1 = '',
		nama2 = '';
	}
//ページに追加
		m.innerHTML = '<div><b><span title="閉じる" onClick="var c = &quot;nicoLivew&quot;,close = document.getElementById(c);close.parentNode.removeChild(close);" style="float:right; cursor:pointer; font-size:large; position:relative; bottom:10px; left:5px;">×</span>プレイヤー変更</b></div>' + Aries + '<span style="white-space:nowrap;"><input type="button" value="GINZA" onClick="window.open(\'http://live.nicovideo.jp/nicoliveplayer.swf?v=' + h + '&languagecode=ja-jp\',\'_blank\',\'width=960,height=490\');' + del + '"><input type="button" value="ニコファーレ" onClick="window.open(\'http://live.nicovideo.jp/liveplayer_farre.swf?v=' + h + '\',\'_blank\',\'width=960,height=520\');' + del + '"></span><br><input type="button" value="原宿" onClick="window.open(\'http://live.nicovideo.jp/liveplayer.swf?v=' + h + '\',\'_blank\',\'width=950,height=520\');' + del + '"><input type="button" value="ページ更新" onClick="window.location.reload(true)"><br>' + nama1 + nama2 + ver;
		m.style.color = 'rgb(250,250,250)';
		m.style.textAlign = 'center';
		m.style.padding = '10px';
		m.style.position = 'fixed';
		m.style.zIndex = '9999';
		m.style.fontSize = '12px';
		m.style.border = '2px solid black';
		m.style.right = '20px';
		m.style.bottom = '20px';
		m.style.background = 'rgba(0,128,255,0.5)';
		m.setAttribute("id", "nicoLivew");
		document.body.appendChild(m);
}();
