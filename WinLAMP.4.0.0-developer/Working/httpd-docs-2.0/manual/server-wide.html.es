<?xml version="1.0" encoding="ISO-8859-1"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="es" xml:lang="es"><head><!--
        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
              This file is generated from xml source: DO NOT EDIT
        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      -->
<title>Configuraci�n global del servidor - Servidor HTTP Apache</title>
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
<a href="http://www.apache.org/">Apache</a> &gt; <a href="http://httpd.apache.org/">Servidor HTTP</a> &gt; <a href="http://httpd.apache.org/docs/">Documentaci�n</a> &gt; <a href="./">Versi�n 2.0</a></div><div id="page-content"><div id="preamble"><h1>Configuraci�n global del servidor</h1>
<div class="toplang">
<p><span>Idiomas disponibles: </span><a href="./en/server-wide.html" hreflang="en" rel="alternate" title="English">&nbsp;en&nbsp;</a> |
<a href="./es/server-wide.html" title="Espa�ol">&nbsp;es&nbsp;</a> |
<a href="./ja/server-wide.html" hreflang="ja" rel="alternate" title="Japanese">&nbsp;ja&nbsp;</a> |
<a href="./ko/server-wide.html" hreflang="ko" rel="alternate" title="Korean">&nbsp;ko&nbsp;</a></p>
</div>

<p>Este documento explica algunas directivas del <code class="module"><a href="./mod/core.html">core</a></code>
(n�cleo) de Apache que se usan para configurar las operaciones
b�sicas del servidor.</p>
</div>
<div id="quickview"><ul id="toc"><li><img alt="" src="./images/down.gif" /> <a href="#identification">Identificaci�n del Servidor</a></li>
<li><img alt="" src="./images/down.gif" /> <a href="#locations">Ubicaci�n de ficheros</a></li>
<li><img alt="" src="./images/down.gif" /> <a href="#resource">L�mite en el uso de recursos</a></li>
</ul></div>
<div class="top"><a href="#page-header"><img alt="top" src="./images/up.gif" /></a></div>
<div class="section">
<h2><a name="identification" id="identification">Identificaci�n del Servidor</a></h2>
    

    <table class="related"><tr><th>M�dulos Relacionados</th><th>Directivas Relacionadas</th></tr><tr><td /><td><ul><li><code class="directive"><a href="./mod/core.html#servername">ServerName</a></code></li><li><code class="directive"><a href="./mod/core.html#serveradmin">ServerAdmin</a></code></li><li><code class="directive"><a href="./mod/core.html#serversignature">ServerSignature</a></code></li><li><code class="directive"><a href="./mod/core.html#servertokens">ServerTokens</a></code></li><li><code class="directive"><a href="./mod/core.html#usecanonicalname">UseCanonicalName</a></code></li></ul></td></tr></table>

    <p>Las directivas <code class="directive"><a href="./mod/core.html#serveradmin">ServerAdmin</a></code>
    y <code class="directive"><a href="./mod/core.html#servertokens">ServerTokens</a></code> controlan
    qu� informaci�n relativa al servidor que se est�
    ejecutando ser� incluida en los documentos generados por el
    servidor, por ejemplo en los mensajes de error. La directiva
    <code class="directive"><a href="./mod/core.html#servertokens">ServerTokens</a></code> especifica el
    valor del campo cabecera de las respuestas HTTP del servidor.</p>

    <p>Las directivas <code class="directive"><a href="./mod/core.html#servername">ServerName</a></code>
    y <code class="directive"><a href="./mod/core.html#usecanonicalname">UseCanonicalName</a></code> las usa el
    servidor para determinar c�mo construir URLs
    autorreferenciadas. Por ejemplo, cuando un cliente hace una
    petici�n a un directorio, pero no incluye una barra final
    despu�s del nombre del directorio, Apache debe redirigir al
    cliente a la ubicaci�n que corresponda con el nombre completo
    del directorio incluyendo la barra que deber�a haber puesto
    al final. De esta manera el cliente puede resolver correctamente
    las referencias relativas en el documento.</p>
  </div><div class="top"><a href="#page-header"><img alt="top" src="./images/up.gif" /></a></div>
<div class="section">
<h2><a name="locations" id="locations">Ubicaci�n de ficheros</a></h2>
    

    <table class="related"><tr><th>M�dulos Relacionados</th><th>Directivas Relacionadas</th></tr><tr><td /><td><ul><li><code class="directive"><a href="./mod/mpm_common.html#coredumpdirectory">CoreDumpDirectory</a></code></li><li><code class="directive"><a href="./mod/core.html#documentroot">DocumentRoot</a></code></li><li><code class="directive"><a href="./mod/core.html#errorlog">ErrorLog</a></code></li><li><code class="directive"><a href="./mod/mpm_common.html#lockfile">LockFile</a></code></li><li><code class="directive"><a href="./mod/mpm_common.html#pidfile">PidFile</a></code></li><li><code class="directive"><a href="./mod/mpm_common.html#scoreboardfile">ScoreBoardFile</a></code></li><li><code class="directive"><a href="./mod/core.html#serverroot">ServerRoot</a></code></li></ul></td></tr></table>

    <p>Estas directivas controlan las ubicaciones de varios ficheros
    que Apache necesita para funcionar correctamente. Cuando se
    especifica una ruta que no empieza por una barra (/), se asume que
    la ruta usada es relativa al directorio especificado en <code class="directive"><a href="./mod/core.html#serverroot">ServerRoot</a></code>. Tenga cuidado con poner
    ficheros en rutas en las que tengan permisos de escritura usuarios
    que no sean root.  Consulte la documentaci�n sobre <a href="misc/security_tips.html#serverroot">consejos de
    seguridad</a> para obtener m�s informaci�n.</p>
  </div><div class="top"><a href="#page-header"><img alt="top" src="./images/up.gif" /></a></div>
<div class="section">
<h2><a name="resource" id="resource">L�mite en el uso de recursos</a></h2>
    

    <table class="related"><tr><th>M�dulos Relacionados</th><th>Directivas Relacionadas</th></tr><tr><td /><td><ul><li><code class="directive"><a href="./mod/core.html#limitrequestbody">LimitRequestBody</a></code></li><li><code class="directive"><a href="./mod/core.html#limitrequestfields">LimitRequestFields</a></code></li><li><code class="directive"><a href="./mod/core.html#limitrequestfieldsize">LimitRequestFieldsize</a></code></li><li><code class="directive"><a href="./mod/core.html#limitrequestline">LimitRequestLine</a></code></li><li><code class="directive"><a href="./mod/core.html#rlimitcpu">RLimitCPU</a></code></li><li><code class="directive"><a href="./mod/core.html#rlimitmem">RLimitMEM</a></code></li><li><code class="directive"><a href="./mod/core.html#rlimitnproc">RLimitNPROC</a></code></li><li><code class="directive"><a href="./mod/mpm_netware.html#threadstacksize">ThreadStackSize</a></code></li></ul></td></tr></table>

    <p>Las directivas <code class="directive">LimitRequest</code>* se usan
    para poner l�mites en la cantidad de recursos que Apache
    utilizar� leyendo peticiones de clientes. Limitando esos
    valores, se pueden evitar algunos tipos de ataque de
    denegaci�n de servicio.</p>

    <p>Las directivas <code class="directive">RLimit</code>* se usan para
    limitar la cantidad de recursos que pueden utilizarse por procesos
    nacidos de la clonaci�n de procesos hijo de Apache. En
    particular, esto controlar� los recursos usados por los
    script CGI y por los comandos de ejecuci�n SSI.</p>

    <p>La directiva <code class="directive"><a href="./mod/mpm_netware.html#threadstacksize">ThreadStackSize</a></code> se usa solamente
    en Netware para controlar el tama�o de la pila de
    ejecuci�n.</p>
  </div></div>
<div class="bottomlang">
<p><span>Idiomas disponibles: </span><a href="./en/server-wide.html" hreflang="en" rel="alternate" title="English">&nbsp;en&nbsp;</a> |
<a href="./es/server-wide.html" title="Espa�ol">&nbsp;es&nbsp;</a> |
<a href="./ja/server-wide.html" hreflang="ja" rel="alternate" title="Japanese">&nbsp;ja&nbsp;</a> |
<a href="./ko/server-wide.html" hreflang="ko" rel="alternate" title="Korean">&nbsp;ko&nbsp;</a></p>
</div><div id="footer">
<p class="apache">Copyright 1995-2006 The Apache Software Foundation or its licensors, as applicable.<br />Licencia bajo los t�rminos de la <a href="http://www.apache.org/licenses/LICENSE-2.0">Apache License, Version 2.0</a>.</p>
<p class="menu"><a href="./mod/">M�dulos</a> | <a href="./mod/directives.html">Directivas</a> | <a href="./faq/">Preguntas Frecuentes</a> | <a href="./glossary.html">Glosario</a> | <a href="./sitemap.html">Mapa de este sitio web</a></p></div>
</body></html>