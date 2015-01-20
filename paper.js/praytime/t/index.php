<html>
<head>
	<meta charset="utf-8">
	<title>نماز تسبيحاتى</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1">
	<meta name="apple-mobile-web-app-capable" content="yes">
<!--	<script type="text/javascript" src="//code.jquery.com/jquery-git.js"></script>-->
	<script type="text/javascript" src="//zeptojs.com/zepto.min.js"></script>
	<script type="text/javascript" src="https://github.com/madrobby/zepto/raw/master/src/detect.js"></script>
	<script type="text/javascript" src=""></script>
	<script type="text/javascript" src="https://github.com/madrobby/zepto/raw/master/src/gesture.js"></script>
	
	<style>
		@import url(font/Scheherazade.css);
		@import url(font/amiri.css);
		html { font-size: 14pt; }
		body { font-size: 14pt; margin:0; padding:1rem; }
		div { padding: 0; }
		p { margin: 1rem 0; }
		#nav1 { }
		nav { 
			position: fixed;
			top: 0;
			left: 0; 
			right: 0;
			background-color: #eee; 
			border-bottom: 1px solid #ccc; 
			text-align: center; 
		}
		nav > a { 
			display: inline-block; 
			font-size: 1.4rem; 
			padding: 0; 
			margin: .2rem; 
			text-decoration: none; 
			text-transform: uppercase; 
			color: #333;  
			font-family: Scheherazade, 'Amiri QuranWeb', serif; 
		}
		a.sel { color: #900; }
		#art1 { font-family: Scheherazade, 'Amiri QuranWeb', serif; font-size: 2rem; padding-top: 1rem;}
		h1 {
			color: #900;
			font-size: 2.4rem; 
			margin: 1.5rem 0;
		}
		.besmele, 
		span.cc {
			color: #900;
		}
		.info {
			color: #900;
			text-align: left;
			font-size: 1rem;
		}
		[lang="tr"] {
			display: none;
		}
		[lang="os"] {
			text-align: right;
			font-size: 1.5rem;
		}
		[count]:before {
			content: "[";
			margin: inherit 1rem;
		}
		[count]:after {
			content: "]";
			margin: inherit 1rem;
		}
		.blk {
			display: inline-block;
		}
	</style>
</head>
<body>
	<nav>
		<a href="#yatsi">ياتسي</a>
		<a href="#aksam">أقشام</a>
		<a href="#ikindi">إيكندي</a>
		<a href="#ogle">أوكله</a>
		<a href="#sabah">صباح</a>
	</nav>
	
	<div id="art1" dir="rtl">
<?php
	function cc ($matches){ $r = '<span class="cc">'.$matches[1].'</span>'; echo $r; return $r;}
	function render()
	{
		$label = '';
		$tag = 'p';
		$tagauto = 'p';
		$ismiazam = array();
		$lines = @file('raw.txt');
		$content = '';
		$line = current($lines);
		while( $line )
		{
			if(strpos($line, ':') !== false)
			{
				list($key, $value) = explode(':', trim($line));
				echo "<!-- $key : $value -->\n";
				switch(trim($key)){
					case 'tag': 
						$tag = trim($value); 
						break;
					case 'label':
						$label = trim($value);
						break;
					case 'ismiazam':
						$ismiazam = (trim($value) == '-') ? array() : explode(' ', next($lines));
						echo '<!-- '.join(' ', $ismiazam).' -->';
						break;
				}
			}
			else 
			{

				foreach($ismiazam as $key) { $line = str_replace($key, '<span class="cc">'.$key.'</span>', $line); };
				if(trim($line)){
					switch($tag){
						case 'auto':
							if($tagauto == 'br')
								$content.= sprintf('<%s label="%s">%s</%s><br>', 'span', $label, trim($line), 'span') . "\n";
							else 
								$content.= sprintf('<%s label="%s">%s</%s>', 'p', $label, trim($line), 'p') . "\n";
							break;
						default: 
							$content.= sprintf('<%s label="%s">%s</%s>', $tag, $label, trim($line), $tag) . "\n";	
					}
				} 
				$tagauto = trim($line) ? 'br' : 'p';
			}


			$line = next($lines);
		}
		file_put_contents('raw.html', $content);
		return $content;
	}
	//echo render();
	include('tesbihat.html');
?>
		
	</div>
	<script>
		var setFS;
		$(function(){
			$('a').click(function(){
				var which = $(this).attr('href');
				$('#art1>[label]').hide();
				$('#art1>[label*="'+which.substr(1)+'"]').show();
				$('a').removeClass('sel');
				$(this).addClass('sel');
				return false;
			})
			
			
			setFS = function (d){
				var i = parseInt($('html').css('font-size')) + d; 
				$('html').css('font-size', i+'pt');
				console.log([i, $('html').css('font-size')]);
			};
			
//			$('p').pinchIn(function(){ 
//				setFS(-1);
//			});
//			
//			$('p').pinchOut(function(){ 
//				setFS(1);
//			});
			
			$('a[href="#sabah"]').trigger('click');
		})
	</script>
</body>
</html>