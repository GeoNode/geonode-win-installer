<?xml version="1.0" encoding="ISO-8859-1"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="es" xml:lang="es"><head><!--
        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
              This file is generated from xml source: DO NOT EDIT
        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      -->
<title>Documentaci�n sobre Hosting Virtual en Apache - Servidor HTTP Apache</title>
<link href="../style/css/manual.css" rel="stylesheet" media="all" type="text/css" title="Main stylesheet" />
<link href="../style/css/manual-loose-100pc.css" rel="alternate stylesheet" media="all" type="text/css" title="No Sidebar - Default font size" />
<link href="../style/css/manual-print.css" rel="stylesheet" media="print" type="text/css" />
<link href="../images/favicon.ico" rel="shortcut icon" /></head>
<body id="manual-page"><div id="page-header">
<p class="menu"><a href="../mod/">M�dulos</a> | <a href="../mod/directives.html">Directivas</a> | <a href="../faq/">Preguntas Frecuentes</a> | <a href="../glossary.html">Glosario</a> | <a href="../sitemap.html">Mapa de este sitio web</a></p>
<p class="apache">Versi�n 2.0 del Servidor HTTP Apache</p>
<img alt="" src="../images/feather.gif" /></div>
<div class="up"><a href="../"><img title="&lt;-" alt="&lt;-" src="../images/left.gif" /></a></div>
<div id="path">
<a href="http://www.apache.org/">Apache</a> &gt; <a href="http://httpd.apache.org/">Servidor HTTP</a> &gt; <a href="http://httpd.apache.org/docs/">Documentaci�n</a> &gt; <a href="../">Versi�n 2.0</a></div><div id="page-content"><div id="preamble"><h1>Documentaci�n sobre Hosting Virtual en Apache</h1>
<div class="toplang">
<p><span>Idiomas disponibles: </span><a href="../de/vhosts/" hreflang="de" rel="alternate" title="Deutsch">&nbsp;de&nbsp;</a> |
<a href="../en/vhosts/" hreflang="en" rel="alternate" title="English">&nbsp;en&nbsp;</a> |
<a href="../es/vhosts/" title="Espa�ol">&nbsp;es&nbsp;</a> |
<a href="../ja/vhosts/" hreflang="ja" rel="alternate" title="Japanese">&nbsp;ja&nbsp;</a> |
<a href="../ko/vhosts/" hreflang="ko" rel="alternate" title="Korean">&nbsp;ko&nbsp;</a> |
<a href="../ru/vhosts/" hreflang="ru" rel="alternate" title="Russian">&nbsp;ru&nbsp;</a></p>
</div>


    <p>El t�rmino <cite>Hosting Virtual</cite> se refiere a hacer
    funcionar m�s de un sitio web (tales como
    <code>www.company1.com</code> y <code>www.company2.com</code>) en
    una sola m�quina. Los sitios web virtuales pueden estar "<a href="ip-based.html">basados en direcciones IP</a>", lo que
    significa que cada sitio web tiene una direcci�n IP diferente, o
    "<a href="name-based.html">basados en nombres diferentes</a>", lo
    que significa que con una sola direcci�n IP est�n funcionando
    sitios web con diferentes nombres (de dominio). El hecho de que est�n
    funcionando en la misma m�quina f�sica pasa completamente
    desapercibido para el usuario que visita esos sitios web.</p>

    <p>Apache fue uno de los primeros servidores web en soportar
    hosting virtual basado en direcciones IP. Las versiones 1.1 y
    posteriores de Apache soportan hosting virtual (vhost) basado tanto
    en direcciones IP como basado en nombres. �sta �ltima variante de
    hosting virtual se llama algunas veces <em>basada en host</em> o
    <em>hosting virtual no basado en IP</em>.</p>

    <p>M�s abajo se muestra un listado de documentos que explican en
    detalle c�mo funciona el hosting virtual en las versiones de
    Apache 1.3 y posteriores.</p>

</div>
<div id="quickview"><ul id="toc"><li><img alt="" src="../images/down.gif" /> <a href="#support">Soporte de Hosting Virtual</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#directives">Directivas de configuraci�n</a></li>
</ul><h3>Consulte tambi�n</h3><ul class="seealso"><li><code class="module"><a href="../mod/mod_vhost_alias.html">mod_vhost_alias</a></code></li><li><a href="name-based.html">Hosting virtual basado en nombres</a></li><li><a href="ip-based.html">Hosting virtual basado en IPs</a></li><li><a href="examples.html">Ejemplo de Hosting Virtual</a></li><li><a href="fd-limits.html">L�mites de descriptores de ficheros</a></li><li><a href="mass.html">Hosting virtual masivo</a></li><li><a href="details.html">Detalles del proceso de selecci�n de
host virtual</a></li></ul></div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="section">
<h2><a name="support" id="support">Soporte de Hosting Virtual</a></h2>

    <ul>
      <li><a href="name-based.html">Hosting virtual basado en
      nombres</a> (M�s de un sitio web con una sola direcci�n IP)</li>
      <li><a href="ip-based.html">Hosting virtual basado en IPs</a>
      (Una direcci�n IP para cada sitio web)</li>
      <li><a href="examples.html">Ejemplos t�picos de
      configuraci�n para usar hosting virtual</a></li>
      <li><a href="fd-limits.html">L�mites a los descriptores de
      ficheros</a> (o, <em>demasiados ficheros de registro</em>)</li>
      <li><a href="mass.html">Configuraci�n din�mica de
      Hosting virtual masivo</a></li>
      <li><a href="details.html">Discusi�n en profundidad sobre el
      proceso de selecci�n de hosting virtual</a></li>
    </ul>

</div><div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="section">
<h2><a name="directives" id="directives">Directivas de configuraci�n</a></h2>

    <ul>
      <li><code class="directive"><a href="../mod/core.html#virtualhost">&lt;VirtualHost&gt;</a></code></li>
      <li><code class="directive"><a href="../mod/core.html#namevirtualhost">NameVirtualHost</a></code></li>
      <li><code class="directive"><a href="../mod/core.html#servername">ServerName</a></code></li>
      <li><code class="directive"><a href="../mod/core.html#serveralias">ServerAlias</a></code></li>
      <li><code class="directive"><a href="../mod/core.html#serverpath">ServerPath</a></code></li>
    </ul>

    <p>Si est� tratando de solucionar problemas de
    configuraci�n de su hosting virtual, puede que le sea de
    utilidad usar la opci�n de l�nea de comandos de Apache
    <code>-S</code>. Es decir, el siguiente comando:</p>

    <div class="example"><p><code>
    /usr/local/apache2/bin/httpd -S
    </code></p></div>

    <p>Este comando le devolver� una descripci�n de
    c�mo Apache analiza e interpreta el fichero de
    configuraci�n. Para saber si contiene errores de
    configuraci�n, es conveniente que examine con atenci�n
    las direcciones IP y los nombres de servidor que est�
    usando. (Consulte la documentaci�n sobre el programa
    <code class="program"><a href="../programs/httpd.html">httpd</a></code> para obtener informaci�n sobre otras
    opciones de l�nea de comandos)</p>

</div></div>
<div class="bottomlang">
<p><span>Idiomas disponibles: </span><a href="../de/vhosts/" hreflang="de" rel="alternate" title="Deutsch">&nbsp;de&nbsp;</a> |
<a href="../en/vhosts/" hreflang="en" rel="alternate" title="English">&nbsp;en&nbsp;</a> |
<a href="../es/vhosts/" title="Espa�ol">&nbsp;es&nbsp;</a> |
<a href="../ja/vhosts/" hreflang="ja" rel="alternate" title="Japanese">&nbsp;ja&nbsp;</a> |
<a href="../ko/vhosts/" hreflang="ko" rel="alternate" title="Korean">&nbsp;ko&nbsp;</a> |
<a href="../ru/vhosts/" hreflang="ru" rel="alternate" title="Russian">&nbsp;ru&nbsp;</a></p>
</div><div id="footer">
<p class="apache">Copyright 1995-2006 The Apache Software Foundation or its licensors, as applicable.<br />Licencia bajo los t�rminos de la <a href="http://www.apache.org/licenses/LICENSE-2.0">Apache License, Version 2.0</a>.</p>
<p class="menu"><a href="../mod/">M�dulos</a> | <a href="../mod/directives.html">Directivas</a> | <a href="../faq/">Preguntas Frecuentes</a> | <a href="../glossary.html">Glosario</a> | <a href="../sitemap.html">Mapa de este sitio web</a></p></div>
</body></html>