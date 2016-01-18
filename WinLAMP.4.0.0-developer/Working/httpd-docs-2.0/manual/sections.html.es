<?xml version="1.0" encoding="ISO-8859-1"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="es" xml:lang="es"><head><!--
        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
              This file is generated from xml source: DO NOT EDIT
        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      -->
<title>Secciones de configuraci�n - Servidor HTTP Apache</title>
<link href="./style/css/manual.css" rel="stylesheet" media="all" type="text/css" title="Main stylesheet" />
<link href="./style/css/manual-loose-100pc.css" rel="alternate stylesheet" media="all" type="text/css" title="No Sidebar - Default font size" />
<link href="./style/css/manual-print.css" rel="stylesheet" media="print" type="text/css" />
<link href="./images/favicon.ico" rel="shortcut icon" /></head>
<body id="manual-page"><div id="page-header">
<p class="menu"><a href="./mod/">M�dulos</a> | <a href="./mod/directives.html">Directivas</a> | <a href="./faq/">Preguntas Frecuentes</a> | <a href="./glossary.html">Glosario</a> | <a href="./sitemap.html">Mapa de este sitio web</a></p>
<p class="apache">Versi�n 2.0 del Servidor HTTP Apache</p>
<img alt="" src="./images/feather.gif" /></div>
<div class="up"><a href="./"><img title="&lt;-" alt="&lt;-" src="./images/left.gif" /></a></div>
<div id="path">
<a href="http://www.apache.org/">Apache</a> &gt; <a href="http://httpd.apache.org/">Servidor HTTP</a> &gt; <a href="http://httpd.apache.org/docs/">Documentaci�n</a> &gt; <a href="./">Versi�n 2.0</a></div><div id="page-content"><div id="preamble"><h1>Secciones de configuraci�n</h1>
<div class="toplang">
<p><span>Idiomas disponibles: </span><a href="./en/sections.html" hreflang="en" rel="alternate" title="English">&nbsp;en&nbsp;</a> |
<a href="./es/sections.html" title="Espa�ol">&nbsp;es&nbsp;</a> |
<a href="./ja/sections.html" hreflang="ja" rel="alternate" title="Japanese">&nbsp;ja&nbsp;</a> |
<a href="./ko/sections.html" hreflang="ko" rel="alternate" title="Korean">&nbsp;ko&nbsp;</a></p>
</div>
 <p> Las directivas presentes en los <a href="configuring.html">ficheros de configuraci�n</a> pueden ser
de aplicaci�n para todo el servidor, o puede que su
aplicaci�n se limite solamente a determinados directorios,
ficheros, hosts, o URLs. Este documento explica c�mo usar las
secciones de configuraci�n y los ficheros <code>.htaccess</code>
para modificar el �mbito de aplicaci�n de las directivas de
configuraci�n.</p> </div>
<div id="quickview"><ul id="toc"><li><img alt="" src="./images/down.gif" /> <a href="#types">Tipos de secciones de
configuraci�n</a></li>
<li><img alt="" src="./images/down.gif" /> <a href="#file-and-web">Sistemas de ficheros y espacio
web</a></li>
<li><img alt="" src="./images/down.gif" /> <a href="#virtualhost">Hosts virtuales</a></li>
<li><img alt="" src="./images/down.gif" /> <a href="#proxy">Proxy</a></li>
<li><img alt="" src="./images/down.gif" /> <a href="#whatwhere">�Qu� directivas se pueden
usar?</a></li>
<li><img alt="" src="./images/down.gif" /> <a href="#mergin">�C�mo se fusionan las distintas
secciones?</a></li>
</ul></div>
<div class="top"><a href="#page-header"><img alt="top" src="./images/up.gif" /></a></div>
<div class="section">
<h2><a name="types" id="types">Tipos de secciones de
configuraci�n</a></h2>

<table class="related"><tr><th>M�dulos Relacionados</th><th>Directivas Relacionadas</th></tr><tr><td><ul><li><code class="module"><a href="./mod/core.html">core</a></code></li><li><code class="module"><a href="./mod/mod_proxy.html">mod_proxy</a></code></li></ul></td><td><ul><li><code class="directive"><a href="./mod/core.html#directory">&lt;Directory&gt;</a></code></li><li><code class="directive"><a href="./mod/core.html#directorymatch">&lt;DirectoryMatch&gt;</a></code></li><li><code class="directive"><a href="./mod/core.html#files">&lt;Files&gt;</a></code></li><li><code class="directive"><a href="./mod/core.html#filesmatch">&lt;FilesMatch&gt;</a></code></li><li><code class="directive"><a href="./mod/core.html#ifdefine">&lt;IfDefine&gt;</a></code></li><li><code class="directive"><a href="./mod/core.html#ifmodule">&lt;IfModule&gt;</a></code></li><li><code class="directive"><a href="./mod/core.html#location">&lt;Location&gt;</a></code></li><li><code class="directive"><a href="./mod/core.html#locationmatch">&lt;LocationMatch&gt;</a></code></li><li><code class="directive"><a href="./mod/mod_proxy.html#proxy">&lt;Proxy&gt;</a></code></li><li><code class="directive"><a href="./mod/mod_proxy.html#proxymatch">&lt;ProxyMatch&gt;</a></code></li><li><code class="directive"><a href="./mod/core.html#virtualhost">&lt;VirtualHost&gt;</a></code></li></ul></td></tr></table>

<p>Exiten dos tipos b�sicos de secciones de
configuraci�n. Por un lado, la mayor�a de las secciones de
configuraci�n se eval�an para cada petici�n que se
recibe y se aplican las directivas que se incluyen en las distintas
secciones solamente a las peticiones que se adec�an a
determinadas caracter�sticas. Por otro lado, las secciones de tipo
<code class="directive"><a href="./mod/core.html#ifdefine">&lt;IfDefine&gt;</a></code> e
<code class="directive"><a href="./mod/core.html#ifmodule">&lt;IfModule&gt;</a></code>, se
eval�an solamente al inicio o reinicio del servidor. Si al
iniciar el servidor las condiciones son las adecuadas, las directivas
que incluyen estas secciones se aplicar�n a todas las peticiones
que se reciban. Es caso contrario, esas directivas que incluyen se
ignoran completamente.</p>

<p>Las secciones <code class="directive"><a href="./mod/core.html#ifdefine">&lt;IfDefine&gt;</a></code> incluyen directivas que se
aplicar�n solamente si se pasa un determinado par�metro por
l�nea de comandos al ejecutar <code class="program"><a href="./programs/httpd.html">httpd</a></code>.  Por
ejemplo, con la siguiente configuraci�n, todas las peticiones
ser�n redireccionadas a otro sitio web solamente si el servidor
se inici� usando <code>httpd -DClosedForNow</code>:</p>

<div class="example"><p><code>
&lt;IfDefine ClosedForNow&gt;<br />
Redirect / http://otherserver.example.com/<br />
&lt;/IfDefine&gt;
</code></p></div>

<p>La secci�n <code class="directive"><a href="./mod/core.html#ifmodule">&lt;IfModule&gt;</a></code> es muy parecida. La diferencia
respecto a <code class="directive"><a href="./mod/core.html#ifdefine">&lt;IfDefine&gt;</a></code> est� en que incluye directivas
que se aplicar�n solamente si un determinado m�dulo en
particular est� disponible en el servidor. El m�dulo debe
estar compilado est�ticamente en el servidor, o si est�
compilado de forma din�mica ha de ponerse antes una l�nea
<code class="directive"><a href="./mod/mod_so.html#loadmodule">LoadModule</a></code> en el fichero de
configuraci�n. Esta directiva debe usarla solamente si necesita
que su fichero de configuraci�n funcione est�n o no
instalados determinados m�dulos. No debe usarla para incluir
directivas que quiera que se apliquen siempre, porque puede suprimir
mensajes de error que pueden ser de mucha utilidad para detectar la
falta de alg�n m�dulo.</p>

<p>En el siguiente ejemplo, la directiva <code class="directive"><a href="./mod/mod_mime_magic.html#mimemagicfiles">MimeMagicFiles</a></code> se aplicar�
solamente si el m�dulo <code class="module"><a href="./mod/mod_mime_magic.html">mod_mime_magic</a></code> est�
disponible.</p>

<div class="example"><p><code>
&lt;IfModule mod_mime_magic.c&gt;<br />
MimeMagicFile conf/magic<br />
&lt;/IfModule&gt;
</code></p></div>

<p>Tanto <code class="directive"><a href="./mod/core.html#ifdefine">&lt;IfDefine&gt;</a></code>
como <code class="directive"><a href="./mod/core.html#ifmodule">&lt;IfModule&gt;</a></code>
pueder usarse con condiones negativas anteponiendo al test el
car�cter "!".  Estas secciones tambi�n pueden anidarse para
establecer restricciones m�s complejas.</p>

</div><div class="top"><a href="#page-header"><img alt="top" src="./images/up.gif" /></a></div>
<div class="section">
<h2><a name="file-and-web" id="file-and-web">Sistemas de ficheros y espacio
web</a></h2>

<p>Las secciones de configuraci�n usadas con m�s frecuencia
son las que cambian la configuraci�n de �reas del sistema de
ficheros o del espacio web. En primer lugar, es importante comprender
la diferencia que existe entre estos dos conceptos. El sistema de
ficheros es la visi�n de sus discos desde el punto de vista del
sistema operativo. Por ejemplo, en una instalaci�n est�ndar,
Apache estar� en <code>/usr/local/apache2</code> en un sistema
Unix o en <code>"c:/Program Files/Apache Group/Apache2"</code> en un
sistema Windows.  (Tenga en cuenta que con Apache debe usar siempre
barras /, incluso en Windows.)  Por el contrario, el espacio web lo
que presenta el servidor web y que visualiza el cliente. De manera que
la ruta <code>/dir/</code> en el espacio web se corresponde con la
ruta <code>/usr/local/apache2/htdocs/dir/</code> en el sistema de
ficheros de una instalaci�n est�ndar en Unix.  El espacio
web no tiene que tener correspondencia directa con el sistema de
ficheros, porque las p�ginas web pueden generarse de forma
din�mica a partir de bases de datos o partiendo de otras
ubicaciones.</p>

<h3><a name="filesystem" id="filesystem">Secciones relacionadas con el sistema
de ficheros</a></h3>

<p>Las secciones <code class="directive"><a href="./mod/core.html#directory">&lt;Directory&gt;</a></code> y <code class="directive"><a href="./mod/core.html#files">&lt;Files&gt;</a></code>, junto con sus contrapartes que usan
expresiones regulares, aplican sus directivas a �reas del sistema de
ficheros. Las directivas incluidas en una secci�n <code class="directive"><a href="./mod/core.html#directory">&lt;Directory&gt;</a></code> se aplican al
directorio del sistema de ficheros especificado y a sus
subdirectorios. El mismo resultado puede obtenerse usando <a href="howto/htaccess.html">ficheros .htaccess</a>.  Por ejemplo, en la
siguiente configuraci�n, se activar�n los �ndices de
directorio para el directorio <code>/var/web/dir1</code> y sus
subdirectorios.</p>

<div class="example"><p><code>
&lt;Directory /var/web/dir1&gt;<br />
Options +Indexes<br />
&lt;/Directory&gt;
</code></p></div>

<p>Las directivas incluidas en una secci�n <code class="directive"><a href="./mod/core.html#files">&lt;Files&gt;</a></code> se aplicar�n a
cualquier fichero cuyo nombre se especifique, sin tener en cuenta en
que directorio se encuentra. Por ejemplo, las siguientes directivas de
configuraci�n, cuando se colocan en la secci�n principal del
fichero de configuraci�n, deniegan el acceso a cualquier fichero
llamado <code>private.html</code> sin tener en cuenta de donde se
encuentre.</p>

<div class="example"><p><code>
&lt;Files private.html&gt;<br />
Order allow,deny<br />
Deny from all<br />
&lt;/Files&gt;
</code></p></div>

<p>Para referirse a archivos que se encuentren en un determinado lugar
del sistema de ficheros, se pueden combinar las secciones <code class="directive"><a href="./mod/core.html#files">&lt;Files&gt;</a></code> y <code class="directive"><a href="./mod/core.html#directory">&lt;Directory&gt;</a></code>. Por ejemplo, la
siguiente configuraci�n denegar� el acceso a
<code>/var/web/dir1/private.html</code>,
<code>/var/web/dir1/subdir2/private.html</code>,
<code>/var/web/dir1/subdir3/private.html</code>, y cualquier otra
aparici�n de <code>private.html</code> que se encuentre en
<code>/var/web/dir1/</code> o cualquiera de sus subdirectorios.</p>

<div class="example"><p><code>
&lt;Directory /var/web/dir1&gt;<br />
&lt;Files private.html&gt;<br />
Order allow,deny<br />
Deny from all<br />
&lt;/Files&gt;<br />
&lt;/Directory&gt;
</code></p></div>


<h3><a name="webspace" id="webspace">Secciones relacionadas con el espacio
web</a></h3>

<p>La secci�n <code class="directive"><a href="./mod/core.html#location">&lt;Location&gt;</a></code> y su contraparte que usa
 expresiones regulares, cambian
 la configuraci�n para el contenido del espacio web. Por ejemplo,
 la siguiente configuraci�n evita que se acceda a cualquier URL
 que empiece por /private.  En concreto, se aplicar� a
 peticiones que vayan dirigidas a
 <code>http://yoursite.example.com/private</code>,
 <code>http://yoursite.example.com/private123</code>, y a
 <code>http://yoursite.example.com/private/dir/file.html</code>
 as� como
 tambi�n a cualquier otra petici�n que comience por
 <code>/private</code>.</p>

<div class="example"><p><code>
&lt;Location /private&gt;<br />
Order Allow,Deny<br />
Deny from all<br />
&lt;/Location&gt;
</code></p></div>

<p>La secci�n <code class="directive"><a href="./mod/core.html#location">&lt;Location&gt;</a></code> puede no tener nada que ver con el
sistema de ficheros. Por ejemplo, el siguiente ejemplo muestra como
asociar una determinada URL a un handler interno de Apache del
m�dulo <code class="module"><a href="./mod/mod_status.html">mod_status</a></code>.  No tiene por qu�
existir ning�n fichero <code>server-status</code> en el sistema
de ficheros.</p>

<div class="example"><p><code>
&lt;Location /server-status&gt;<br />
SetHandler server-status<br />
&lt;/Location&gt;
</code></p></div>


<h3><a name="wildcards" id="wildcards">Caracteres comod�n y expresiones
regulares</a></h3>

<p>Las secciones <code class="directive"><a href="./mod/core.html#directory">&lt;Directory&gt;</a></code>, <code class="directive"><a href="./mod/core.html#files">&lt;Files&gt;</a></code>, y <code class="directive"><a href="./mod/core.html#location">&lt;Location&gt;</a></code> pueden usar caracteres comod�n
del tipo <code>fnmatch</code> de la librer�a est�ndar de C.
El car�cter "*" equivale a cualquier secuencia de caracteres, "?"
equivale a cualquier car�cter individual, y "[<em>seq</em>]"
equivale a cualquier car�cter en <em>seq</em>.  Ning�n
car�cter comod�n equivale a"/", que debe siempre
especificarse expl�citamente.</p>

<p>Si necesita un sistema de equivalencias m�s flexible, cada
secci�n tiene una contraparte que acepta <a href="glossary.html#regex">expresiones regulares</a> compatibles con
Perl: <code class="directive"><a href="./mod/core.html#directorymatch">&lt;DirectoryMatch&gt;</a></code>, <code class="directive"><a href="./mod/core.html#filesmatch">&lt;FilesMatch&gt;</a></code>, y <code class="directive"><a href="./mod/core.html#locationmatch">&lt;LocationMatch&gt;</a></code>. Consulte la secci�n
sobre la fusi�n de secciones de configuraci�n para ver la
forma en que las secciones expresiones regulares cambian el modo en
que se aplican las directivas.</p>

<p>Abajo se muestra un ejemplo en el que una secci�n de
configuraci�n que usa caracteres comod�n en lugar de una
expresi�n regular modifica la configuraci�n de todos los
directorios de usuario:</p>

<div class="example"><p><code>
&lt;Directory /home/*/public_html&gt;<br />
Options Indexes<br />
&lt;/Directory&gt;
</code></p></div>

<p>Usando expresiones regulares, podemos denegar el acceso a muchos
tipos ficheros de im�genes de una sola vez:</p>

<div class="example"><p><code>
&lt;FilesMatch \.(?i:gif|jpe?g|png)$&gt;<br /> 
Order allow,deny<br />
Deny from all<br /> 
&lt;/FilesMatch&gt; 
</code></p></div>



<h3><a name="whichwhen" id="whichwhen">Qu� usar en cada momento</a></h3>

<p>Decidir cuando hay que usar secciones que se apliquen sobre el
sistema de ficheros y cuando usar secciones que se apliquen sobre el
espacio web es bastante f�cil. Cuando se trata de directivas que
se aplican a objetos que residen en el sistema de ficheros, siempre se
deben usar <code class="directive"><a href="./mod/core.html#directory">&lt;Directory&gt;</a></code> o <code class="directive"><a href="./mod/core.html#files">&lt;Files&gt;</a></code>.  Cuando se trata de directivas que se
aplican a objetos que no residen en el sistema de ficheros (por
ejemplo una p�gina web generada a partir de una base de datos),
se usa <code class="directive"><a href="./mod/core.html#location">&lt;Location&gt;</a></code>.</p>

<p>Es importante no usar nunca <code class="directive"><a href="./mod/core.html#location">&lt;Location&gt;</a></code> cuando se trata de restringir el
acceso a objetos en el sistema de ficheros. Esto se debe a que varias
URLs diferentes pueden corresponderse con una misma ubicaci�n en
el sistema de ficheros, haciendo que la restricci�n pueda ser
evitada. Por ejemplo, considere la siguiente configuraci�n:</p>

<div class="example"><p><code>
&lt;Location /dir/&gt;<br />
Order allow,deny<br />
Deny from all<br />
&lt;/Location&gt;
</code></p></div>

<p>La restricci�n funciona si se produce una petici�n a
<code>http://yoursite.example.com/dir/</code>.  Pero, �qu�
ocurrir�a si se trata de un sistema de ficheros que no distingue
may�sculas de min�sculas? Entonces, la restricci�n que
ha establecido podr�a evitarse f�cilmente haciendo una
peticion a <code>http://yoursite.example.com/DIR/</code>.  Una
secci�n <code class="directive"><a href="./mod/core.html#directory">&lt;Directory&gt;</a></code> por el contrario, se aplicar�
a cualquier contenido servido desde esa ubicaci�n,
independientemente de c�mo se llame. (Una excepci�n son los
enlaces del sistema de ficheros. El mismo directorio puede ser
colocado en m�s de una ubicaci�n del sistema de ficheros
usando enlaces simb�licos.  La secci�n <code class="directive"><a href="./mod/core.html#directory">&lt;Directory&gt;</a></code> seguir� los
enlaces simb�licos sin resetear la ruta de fichero (resetting the
pathname). Por tanto, para conseguir el mayor nivel de seguridad, los
enlaces simb�licos deben desactivarse con la directiva <code class="directive"><a href="./mod/core.html#options">Options</a></code> correspondiente.)</p>

<p>En el caso de que piense que nada de esto le afecta porque usa un
sistema de ficheros que distingue may�sculas de min�sculas,
recuerde que hay muchas otras maneras de hacer corresponder
m�ltiples direcciones del espacio web con una misma
ubicaci�n del sistema de ficheros. Por tanto, use las secciones
de configuraci�n que se aplican al sistema de ficheros siempre
que sea posible.  Hay, sin embargo, una excepci�n a esta
regla. Poner restricciones de configuraci�n en una secci�n
<code>&lt;Location /&gt;</code> es completamente seguro porque estas
secciones se aplicar�n a todas las peticiones independientemente
de la URL espec�fica que se solicite.</p> 

</div><div class="top"><a href="#page-header"><img alt="top" src="./images/up.gif" /></a></div>
<div class="section">
<h2><a name="virtualhost" id="virtualhost">Hosts virtuales</a></h2>

<p>El contenedor <code class="directive"><a href="./mod/core.html#virtualhost">&lt;VirtualHost&gt;</a></code> agrupa directivas que se
aplicar�n a hosts espec�ficos. Esto es �til cuando se
sirven varios hosts con una misma m�quina y con una
configuraci�n diferente cada uno. Para m�s informaci�n,
consulte la <a href="vhosts/">documentaci�n sobre hosts
virtuales</a>.</p> </div><div class="top"><a href="#page-header"><img alt="top" src="./images/up.gif" /></a></div>
<div class="section">
<h2><a name="proxy" id="proxy">Proxy</a></h2>

<p>Las secciones <code class="directive"><a href="./mod/mod_proxy.html#proxy">&lt;Proxy&gt;</a></code> y <code class="directive"><a href="./mod/mod_proxy.html#proxymatch">&lt;ProxyMatch&gt;</a></code> aplican las directivas de
configuraci�n que engloban solo a los sitios accedidos a
trav�s del servidor proxy del m�dulo
<code class="module"><a href="./mod/mod_proxy.html">mod_proxy</a></code> que tengan equivalencia con la URL
especificada. Por ejemplo, la siguiente configuraci�n
evitar� que se use el servidor proxy para acceder al sitio web
<code>cnn.com</code>.</p>

<div class="example"><p><code>
&lt;Proxy http://cnn.com/*&gt;<br />
Order allow,deny<br />
Deny from all<br />
&lt;/Proxy&gt;
</code></p></div>
</div><div class="top"><a href="#page-header"><img alt="top" src="./images/up.gif" /></a></div>
<div class="section">
<h2><a name="whatwhere" id="whatwhere">�Qu� directivas se pueden
usar?</a></h2>

<p>Para ver que directivas son las que se pueden usar en cada
secci�n de configuraci�n, consulte el <a href="mod/directive-dict.html#Context">Context</a> de la directiva.
Todas las directivas que est� permitido usar en las secciones
<code class="directive"><a href="./mod/core.html#directory">&lt;Directory&gt;</a></code> se
pueden usar tambi�n en las secciones <code class="directive"><a href="./mod/core.html#directorymatch">&lt;DirectoryMatch&gt;</a></code>, <code class="directive"><a href="./mod/core.html#files">&lt;Files&gt;</a></code>, <code class="directive"><a href="./mod/core.html#filesmatch">&lt;FilesMatch&gt;</a></code>, <code class="directive"><a href="./mod/core.html#location">&lt;Location&gt;</a></code>, <code class="directive"><a href="./mod/core.html#locationmatch">&lt;LocationMatch&gt;</a></code>, <code class="directive"><a href="./mod/mod_proxy.html#proxy">&lt;Proxy&gt;</a></code>, y <code class="directive"><a href="./mod/mod_proxy.html#proxymatch">&lt;ProxyMatch&gt;</a></code>. Sin embargo, hay algunas
excepciones:</p>

<ul> <li>La directiva <code class="directive"><a href="./mod/core.html#allowoverride">AllowOverride</a></code> funciona en las secciones
<code class="directive"><a href="./mod/core.html#directory">&lt;Directory&gt;</a></code>.</li>

<li>Las directivas <code class="directive"><a href="./mod/core.html#options">Options</a></code>
<code>FollowSymLinks</code> y <code>SymLinksIfOwnerMatch</code>
<code class="directive"><a href="./mod/core.html#options">Options</a></code> funcionan solo en las
secciones <code class="directive"><a href="./mod/core.html#directory">&lt;Directory&gt;</a></code> y en los ficheros
<code>.htaccess</code>.</li>

<li>La direcitva <code class="directive"><a href="./mod/core.html#options">Options</a></code> no puede
ser usada en secciones <code class="directive"><a href="./mod/core.html#files">&lt;Files&gt;</a></code> y <code class="directive"><a href="./mod/core.html#filesmatch">&lt;FilesMatch&gt;</a></code>.</li>
</ul>
</div><div class="top"><a href="#page-header"><img alt="top" src="./images/up.gif" /></a></div>
<div class="section">
<h2><a name="mergin" id="mergin">�C�mo se fusionan las distintas
secciones?</a></h2>

<p>Las secciones de configuraci�n se aplican en un determinado
orden. Como este orden puede tener efectos significativos en como se
interpretan las directivas de configuraci�n, es importante
entender c�mo funciona este proceso.</p>

    <p>El orden de fusi�n es el siguiente:</p>

    <ol>
      <li> <code class="directive"><a href="./mod/core.html#directory">&lt;Directory&gt;</a></code> (excepto expresiones
      regulares) y <code>.htaccess</code> simult�neamente (si el
      uso de <code>.htaccess</code> est� permitido, prevaleciendo
      sobre <code class="directive"><a href="./mod/core.html#directory">&lt;Directory&gt;</a></code>)</li>

      <li><code class="directive"><a href="./mod/core.html#directorymatch">&lt;DirectoryMatch&gt;</a></code>
      (y <code>&lt;Directory ~&gt;</code>)</li>

      <li><code class="directive"><a href="./mod/core.html#files">&lt;Files&gt;</a></code> y
      <code class="directive"><a href="./mod/core.html#filesmatch">&lt;FilesMatch&gt;</a></code>
      simult�neamente</li>

      <li><code class="directive"><a href="./mod/core.html#location">&lt;Location&gt;</a></code>
      y <code class="directive"><a href="./mod/core.html#locationmatch">&lt;LocationMatch&gt;</a></code>
      simult�neamente</li>
    </ol>

    <p>Aparte de <code class="directive"><a href="./mod/core.html#directory">&lt;Directory&gt;</a></code>, cada grupo se procesa en el
    orden en que aparezca en los ficheros de configuraci�n.
    <code class="directive"><a href="./mod/core.html#directory">&lt;Directory&gt;</a></code>
    (grupo 1 arriba) se procesa empezando por los componentes de la
    ruta al directorio m�s cortos. Por ejemplo,
    <code>&lt;Directory
    /var/web/dir&gt;</code> se procesar� antes de
    <code>&lt;Directory /var/web/dir/subdir&gt;</code>. Si hay que
    aplicar varias secciones <code class="directive"><a href="./mod/core.html#directory">&lt;Directory&gt;</a></code> a un mismo directorio, se
    aplican en el orden en que aparezcan en el fichero de
    configuraci�n. Las configuraciones incluidas mediante la
    directiva <code class="directive"><a href="./mod/core.html#include">Include</a></code> se
    tratar�n como si estuvieran dentro del fichero de
    configuraci�n principal en lugar de la secci�n
    <code class="directive"><a href="./mod/core.html#include">Include</a></code>.</p>

    <p>Las secciones incluidas dentro de secciones <code class="directive"><a href="./mod/core.html#virtualhost">&lt;VirtualHost&gt;</a></code> se aplican
    <em>despu�s de</em> las correspondientes secciones fuera
    de la definici�n del host virtual. Esto permite que la
    configuraci�n especificada para los hosts virtuales pueda
    prevalecer sobre la configuraci�n del servidor principal.</p>

    <p>Las secciones que aparecen despu�s prevalecen sobre las
    que aparecen antes.</p>

<div class="note"><h3>Nota t�cnica.</h3> Previamente a la fase de
      traducci�n de nombres (en la que se analizan los
      <code>Aliases</code> y <code>DocumentRoots</code> para calcular
      las correspondencias entre URLs y nombres de ficheros) se
      ejecuta una secuencia
      <code>&lt;Location&gt;</code>/<code>&lt;LocationMatch&gt;</code>. Los
      resultados de esta secuencia se desechan despu�s de 
      ejecutar la traducci�n.  </div>

<h3><a name="merge-examples" id="merge-examples">Algunos ejemplos</a></h3>

<p>Abajo se muestra un ejemplo para que se vea claramente cu�l es
el orden de fusi�n. Asumiendo que todas las secciones se aplican
a la petici�n, las de este ejemplo se aplicar�an en el orden
A &gt; B &gt; C &gt; D &gt; E.</p>

<div class="example"><p><code>
&lt;Location /&gt;<br />
E<br />
&lt;/Location&gt;<br />
<br />
&lt;Files f.html&gt;<br />
D<br />
&lt;/Files&gt;<br />
<br />
&lt;VirtualHost *&gt;<br />
&lt;Directory /a/b&gt;<br />
B<br />
&lt;/Directory&gt;<br />
&lt;/VirtualHost&gt;<br />
<br />
&lt;DirectoryMatch "^.*b$"&gt;<br />
C<br />
&lt;/DirectoryMatch&gt;<br />
<br />
&lt;Directory /a/b&gt;<br />
A<br />
&lt;/Directory&gt;<br />
<br />
</code></p></div>

<p>A continuaci�n se muestra un ejemplo m�s concreto.
Independientemente de las restricciones de acceso que se hayan
establecido en las secciones <code class="directive"><a href="./mod/core.html#directory">&lt;Directory&gt;</a></code>, la secci�n <code class="directive"><a href="./mod/core.html#location">&lt;Location&gt;</a></code> ser� evaluada
al final y se permitir� acceso sin restricciones al servidor.  En
otras palabras, el orden de fusi�n es importante, de modo que
ponga atenci�n.</p>

<div class="example"><p><code>
&lt;Location /&gt;<br /> Order deny,allow<br /> Allow from all<br />
&lt;/Location&gt;<br /> <br /> 
# Esta secci�n &lt;Directory&gt; no tendr� efecto<br /> 
&lt;Directory /&gt;<br /> 
Order allow,deny<br /> 
Allow from all<br /> 
Deny from badguy.example.com<br /> 
&lt;/Directory&gt;
</code></p></div>



</div></div>
<div class="bottomlang">
<p><span>Idiomas disponibles: </span><a href="./en/sections.html" hreflang="en" rel="alternate" title="English">&nbsp;en&nbsp;</a> |
<a href="./es/sections.html" title="Espa�ol">&nbsp;es&nbsp;</a> |
<a href="./ja/sections.html" hreflang="ja" rel="alternate" title="Japanese">&nbsp;ja&nbsp;</a> |
<a href="./ko/sections.html" hreflang="ko" rel="alternate" title="Korean">&nbsp;ko&nbsp;</a></p>
</div><div id="footer">
<p class="apache">Copyright 1995-2006 The Apache Software Foundation or its licensors, as applicable.<br />Licencia bajo los t�rminos de la <a href="http://www.apache.org/licenses/LICENSE-2.0">Apache License, Version 2.0</a>.</p>
<p class="menu"><a href="./mod/">M�dulos</a> | <a href="./mod/directives.html">Directivas</a> | <a href="./faq/">Preguntas Frecuentes</a> | <a href="./glossary.html">Glosario</a> | <a href="./sitemap.html">Mapa de este sitio web</a></p></div>
</body></html>