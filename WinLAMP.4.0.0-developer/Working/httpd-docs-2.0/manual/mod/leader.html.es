<?xml version="1.0" encoding="ISO-8859-1"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="es" xml:lang="es"><head><!--
        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
              This file is generated from xml source: DO NOT EDIT
        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      -->
<title>leader - Servidor HTTP Apache</title>
<link href="../style/css/manual.css" rel="stylesheet" media="all" type="text/css" title="Main stylesheet" />
<link href="../style/css/manual-loose-100pc.css" rel="alternate stylesheet" media="all" type="text/css" title="No Sidebar - Default font size" />
<link href="../style/css/manual-print.css" rel="stylesheet" media="print" type="text/css" />
<link href="../images/favicon.ico" rel="shortcut icon" /></head>
<body>
<div id="page-header">
<p class="menu"><a href="../mod/">M�dulos</a> | <a href="../mod/directives.html">Directivas</a> | <a href="../faq/">Preguntas Frecuentes</a> | <a href="../glossary.html">Glosario</a> | <a href="../sitemap.html">Mapa de este sitio web</a></p>
<p class="apache">Versi�n 2.0 del Servidor HTTP Apache</p>
<img alt="" src="../images/feather.gif" /></div>
<div class="up"><a href="./"><img title="&lt;-" alt="&lt;-" src="../images/left.gif" /></a></div>
<div id="path">
<a href="http://www.apache.org/">Apache</a> &gt; <a href="http://httpd.apache.org/">Servidor HTTP</a> &gt; <a href="http://httpd.apache.org/docs/">Documentaci�n</a> &gt; <a href="../">Versi�n 2.0</a> &gt; <a href="./">M�dulos</a></div>
<div id="page-content">
<div id="preamble"><h1>MPM de Apache leader</h1>
<div class="toplang">
<p><span>Idiomas disponibles: </span><a href="../de/mod/leader.html" hreflang="de" rel="alternate" title="Deutsch">&nbsp;de&nbsp;</a> |
<a href="../en/mod/leader.html" hreflang="en" rel="alternate" title="English">&nbsp;en&nbsp;</a> |
<a href="../es/mod/leader.html" title="Espa�ol">&nbsp;es&nbsp;</a> |
<a href="../ko/mod/leader.html" hreflang="ko" rel="alternate" title="Korean">&nbsp;ko&nbsp;</a></p>
</div>
<div class="outofdate">Esta traducci�n podr�a estar
            obsoleta. Consulte la versi�n en ingl�s de la
            documentaci�n para comprobar si se han producido cambios
            recientemente.</div>
<table class="module"><tr><th><a href="module-dict.html#Description">Descripci�n:</a></th><td>Variante experimental del MPM est�ndar
<code class="module"><a href="../mod/worker.html">worker</a></code></td></tr>
<tr><th><a href="module-dict.html#Status">Estado:</a></th><td>MPM</td></tr>
<tr><th><a href="module-dict.html#ModuleIdentifier">Identificador de M�dulos:</a></th><td>mpm_leader_module</td></tr>
<tr><th><a href="module-dict.html#SourceFile">Fichero de C�digo Fuente:</a></th><td>leader.c</td></tr></table>
<h3>Resumen de contenidos</h3>

    <div class="warning"><h3>Advertencia</h3>
      <p>Este m�dulo es todav�a experimental, lo que
      significa que podr�a no funcionar como se espera.</p>
    </div>
    
    <p>Este m�dulo es una variante experimental del m�dulo
    de multiprocesamiento est�ndar <code class="module"><a href="../mod/worker.html">worker</a></code>. Usa
    un patr�n de dise�o Leader/Followers para coordinar el
    trabajo entre las hebras. Para m�s informaci�n, consulte
    <a href="http://deuce.doc.wustl.edu/doc/pspdfs/lf.pdf">http://deuce.doc.wustl.edu/doc/pspdfs/lf.pdf</a>.</p>

    <p>Para usar el m�dulo de multiprocesamiento
      <code class="module"><a href="../mod/leader.html">leader</a></code>, a�ada
      <code>--with-mpm=leader</code> como argumento al script
      <code class="program"><a href="../programs/configure.html">configure</a></code> en el momento de compilar
      <code class="program"><a href="../programs/httpd.html">httpd</a></code>.</p>
  
    <p>Este m�dulo de multiprocesamiento depende de operaciones
    at�micas compare-and-swap del APR para sincronizar las
    hebras. Si est� compilando el servidor para una m�quina
    x86 y no necesita soportar la arquitectura 386, o est�
    compilando para una m�quina SPARC y no necesita ejecutar el
    servidor en chips pre-UltraSPARC, a�ada
    <code>--enable-nonportable-atomics=yes</code> como argumento al
    script <code class="program"><a href="../programs/configure.html">configure</a></code>. Esto har� que APR implemente
    las operaciones at�micas usando opciones m�s eficientes
    que no est�n presentes para CPUs antiguas.</p>
</div>
<div id="quickview"><h3 class="directives">Directivas</h3>
<ul id="toc">
<li><img alt="" src="../images/right.gif" /> <a href="mpm_common.html#acceptmutex">AcceptMutex</a></li>
<li><img alt="" src="../images/right.gif" /> <a href="mpm_common.html#coredumpdirectory">CoreDumpDirectory</a></li>
<li><img alt="" src="../images/right.gif" /> <a href="mpm_common.html#enableexceptionhook">EnableExceptionHook</a></li>
<li><img alt="" src="../images/right.gif" /> <a href="mpm_common.html#group">Group</a></li>
<li><img alt="" src="../images/right.gif" /> <a href="mpm_common.html#listen">Listen</a></li>
<li><img alt="" src="../images/right.gif" /> <a href="mpm_common.html#listenbacklog">ListenBacklog</a></li>
<li><img alt="" src="../images/right.gif" /> <a href="mpm_common.html#lockfile">LockFile</a></li>
<li><img alt="" src="../images/right.gif" /> <a href="mpm_common.html#maxclients">MaxClients</a></li>
<li><img alt="" src="../images/right.gif" /> <a href="mpm_common.html#maxmemfree">MaxMemFree</a></li>
<li><img alt="" src="../images/right.gif" /> <a href="mpm_common.html#maxrequestsperchild">MaxRequestsPerChild</a></li>
<li><img alt="" src="../images/right.gif" /> <a href="mpm_common.html#maxsparethreads">MaxSpareThreads</a></li>
<li><img alt="" src="../images/right.gif" /> <a href="mpm_common.html#minsparethreads">MinSpareThreads</a></li>
<li><img alt="" src="../images/right.gif" /> <a href="mpm_common.html#pidfile">PidFile</a></li>
<li><img alt="" src="../images/right.gif" /> <a href="mpm_common.html#scoreboardfile">ScoreBoardFile</a></li>
<li><img alt="" src="../images/right.gif" /> <a href="mpm_common.html#sendbuffersize">SendBufferSize</a></li>
<li><img alt="" src="../images/right.gif" /> <a href="mpm_common.html#serverlimit">ServerLimit</a></li>
<li><img alt="" src="../images/right.gif" /> <a href="mpm_common.html#startservers">StartServers</a></li>
<li><img alt="" src="../images/right.gif" /> <a href="mpm_common.html#threadlimit">ThreadLimit</a></li>
<li><img alt="" src="../images/right.gif" /> <a href="mpm_common.html#threadsperchild">ThreadsPerChild</a></li>
<li><img alt="" src="../images/right.gif" /> <a href="mpm_common.html#user">User</a></li>
</ul>
</div>

</div>
<div class="bottomlang">
<p><span>Idiomas disponibles: </span><a href="../de/mod/leader.html" hreflang="de" rel="alternate" title="Deutsch">&nbsp;de&nbsp;</a> |
<a href="../en/mod/leader.html" hreflang="en" rel="alternate" title="English">&nbsp;en&nbsp;</a> |
<a href="../es/mod/leader.html" title="Espa�ol">&nbsp;es&nbsp;</a> |
<a href="../ko/mod/leader.html" hreflang="ko" rel="alternate" title="Korean">&nbsp;ko&nbsp;</a></p>
</div><div id="footer">
<p class="apache">Copyright 1995-2006 The Apache Software Foundation or its licensors, as applicable.<br />Licencia bajo los t�rminos de la <a href="http://www.apache.org/licenses/LICENSE-2.0">Apache License, Version 2.0</a>.</p>
<p class="menu"><a href="../mod/">M�dulos</a> | <a href="../mod/directives.html">Directivas</a> | <a href="../faq/">Preguntas Frecuentes</a> | <a href="../glossary.html">Glosario</a> | <a href="../sitemap.html">Mapa de este sitio web</a></p></div>
</body></html>