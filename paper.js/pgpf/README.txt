TimeLine
========

Libraries
---------
Proje jQuery ve PaperJs library'leri ile calisir. PGPF'in web sayfasinda jQuery default yuklu gorunuyor. 
PaperJs  widgetin kullanilacagi yerde yuklenebilir. 

Usage
-----
TimeLine widgetini herhangi bir sayfada kullanmak icin asagidaki kodlarini eklemeniz yeterli.

- 1. ve 2. satirdaki canvas id ile canvas property ayni olmalidir. Burada myCanvas
- 2. ve 3. satirdaki kodlarin src adreslerini duzeltmeyi unutmayin. 

	<canvas id="myCanvas" width=728 height=420 style="background-color: #fff;"></canvas>
    <script canvas="myCanvas" type="text/paperscript" src="/path/to/timeline.js"></script>
	<script type="text/javascript" src="/path/to/paper.js"></script>

Special Font Usage
------------------
Mac ve Win veya diger isletim sistemlerinde ayni fontlar yuklu olmayabilir.
Her yerde ayni gorunumu garanti etmek istediginiz fontu yuklemelisiniz.
Burada "Open Sans Condenced" kullanildi. 

Bu fontu googleFonts'tan yuklemek head tagi icine asagidaki codu kopyalayabilirsiniz. 
Daha fazla bilgiyi https://www.google.com/fonts# adresinde bulabilirsiniz.

    <link href='http://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,700,300italic' rel='stylesheet' type='text/css'>


TimeLine uzerinde degisiklik yapmak
-----------------------------------
timeline.js icinde configuration ve timeline data icin iki bolum bulunmaktadir.

Widget uzerindeki visual degisiklikleri config kisminda, TimeLine Data degisikliklerini de timeline kisminda yazabilirsiniz.
Bunlarin ikisi de JavaScript JSON formatinda yazilmistir.
Timeline Data da Start ve End Dateleri mm/yyyy formatinda yazilmalidir.

Data Hierarcie
--------------
timeline -> periods (array) -> events (array)

Timeline'a istediginiz kadar period, her period'a da istediginiz kadar event ekleyebilirsiniz.

Multiple Widget Usage
---------------------
Eger birden fazla farkli widget kullanmak isterseniz 
1. timeline.js dosyasinin bir kopyasini olusturun 
2. istediginiz configurasyon degisikliklerini yapin.
3. Yukarida verdigimiz 3 satirlik kodu kullanarak ekleyin. canvas id ve script canvas propertylerini degistirin, Ex: myCanvas2

Contact Info
------------
Cavit Keskin
cavitkeskin@gmail.com

