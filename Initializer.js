var $tilerButton = $('<button>').text('このページの画像一覧表示');
var $openerButton = $('<button>').text('さっき開いたまとめリンク開く');
new ImageTiler($tilerButton);
new TargetOpener($openerButton);
var $div = $('<div id="mens-joy-button">').append($tilerButton, $openerButton).css({
	position			: 'fixed',
	top 				: '0px',
	'z-index'			: 1000000000
})
$('body').append($div);
