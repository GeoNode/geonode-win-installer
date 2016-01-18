<?xml version="1.0" encoding="ISO-8859-1"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="es" xml:lang="es"><head><!--
        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
              This file is generated from xml source: DO NOT EDIT
        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      -->
<title>worker - Servidor HTTP Apache</title>
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
<div id="preamble"><h1>MPM de Apache worker</h1>
<div class="toplang">
<p><span>Idiomas disponibles: </span><a href="../de/mod/worker.html" hreflang="de" rel="alternate" title="Deutsch">&nbsp;de&nbsp;</a> |
<a href="../en/mod/worker.html" hreflang="en" rel="alternate" title="English">&nbsp;en&nbsp;</a> |
<a href="../es/mod/worker.html" title="Espa�ol">&nbsp;es&nbsp;</a> |
<a href="../ja/mod/worker.html" hreflang="ja" rel="alternate" title="Japanese">&nbsp;ja&nbsp;</a></p>
</div>
<div class="outofdate">Esta traducci�n podr�a estar
            obsoleta. Consulte la versi�n en ingl�s de la
            documentaci�n para comprobar si se han producido cambios
            recientemente.</div>
<table class="module"><tr><th><a href="module-dict.html#Description">Descripci�n:</a></th><td>M�dulo de MultiProcesamiento que implementa un
servidor web h�brido multihebra-multiproceso</td></tr>
<tr><th><a href="module-dict.html#Status">Estado:</a></th><td>MPM</td></tr>
<tr><th><a href="module-dict.html#ModuleIdentifier">Identificador de M�dulos:</a></th><td>mpm_worker_module</td></tr>
<tr><th><a href="module-dict.html#SourceFile">Fichero de C�digo Fuente:</a></th><td>worker.c</td></tr></table>
<h3>Resumen de contenidos</h3>

    <p>Este M�dulo de MultiProcesamiento (MPM) implementa un
    servidor h�brido multiproceso-multihebra.  Usando hebras para
    atender peticiones, el servidor puede servir un mayor n�mero
    de peticiones con menos recursos de sistema que un servidor basado
    �nicamente en procesos. No obtante, se mantiene casi por
    completo la estabilidad de un servidor basado en procesos
    manteniendo la capacidad multiproceso, pudiendo cada proceso tener
    muchas hebras.</p>

    <p>Las directivas m�s importantes que se usan para controlar
    este MPM son <code class="directive"><a href="../mod/mpm_common.html#threadsperchild">ThreadsPerChild</a></code>, que controla el
    n�mero de hebras que tiene cada proceso hijo y <code class="directive"><a href="../mod/mpm_common.html#maxclients">MaxClients</a></code>, que controla el
    n�mero m�ximo de hebras que pueden crearse.</p>
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
<h3>Temas</h3>
<ul id="topics">
<li><img alt="" src="../images/down.gif" /> <a href="#how-it-works">C�mo funciona</a></li>
</ul><h3>Consulte tambi�n</h3>
<ul class="seealso">
<li><a href="../bind.html">Especificar las direcciones y los
puertos que usa Apache</a></li>
</ul></div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="section">
<h2><a name="how-it-works" id="how-it-works">C�mo funciona</a></h2> <p>Un
    solo proceso de control (el padre) es el responsable de crear los
    procesos hijo. Cada proceso hijo crea un n�mero fijo de
    hebras del servidor de la forma que se especifica en la directiva
    <code class="directive"><a href="../mod/mpm_common.html#threadsperchild">ThreadsPerChild</a></code>,
    as� como una hebra de escucha que escuchar� si se
    producen peticiones y las pasar� a una hebra del servidor
    para que la procese.</p>

    <p>Apache siempre intenta mantener en reserva cierto n�mero
    de hebras <dfn>de sobra</dfn> o en espera, que est�n
    preparadas para servir peticiones en el momento en que
    lleguen. As�, los clientes no tienen que esperar a que se
    creen nuevas hebras o procesos para que sean atendidas sus
    peticiones. El n�mero de procesos que se crean al principio
    est� determinado por la directiva <code class="directive"><a href="../mod/mpm_common.html#startservers">StartServers</a></code>. Despu�s durante
    el funcionamiento del servidor, Apache calcula el n�mero
    total de hebras en espera entre todos los procesos, y crea o
    elimina procesos para mantener ese n�mero dentro de los
    l�mites especificados en las directivas <code class="directive"><a href="../mod/mpm_common.html#minsparethreads">MinSpareThreads</a></code> y <code class="directive"><a href="../mod/mpm_common.html#maxsparethreads">MaxSpareThreads</a></code>. Como este proceso
    est� bastante autorregulado, no es muy habitual que sea
    necesario modificar los valores que estas directivas traen por
    defecto. El n�mero m�ximo de clientes que pueden ser
    servidos simult�neamente (por ejemplo, el n�mero
    m�ximo de hebras entre todos los procesos) est�
    determinado por la directiva <code class="directive"><a href="../mod/mpm_common.html#maxclients">MaxClients</a></code>.  El n�mero
    m�ximo de procesos hijo activos est� determinado por el
    valor especificado en la directiva <code class="directive"><a href="../mod/mpm_common.html#maxclients">MaxClients</a></code> dividido por el valor
    especificado en la directiva <code class="directive"><a href="../mod/mpm_common.html#&#10;    threadsperchild">
    ThreadsPerChild</a></code>.</p>

    <p>Hay dos directivas que establecen l�mites estrictos al
    n�mero de procesos hijo activos y al n�mero de hebras
    del servidor en un proceso hijo, y puede cambiarse solo parando
    completamente el servidor y volviendo a iniciarlo. La directiva
    <code class="directive"><a href="../mod/mpm_common.html#serverlimit ">ServerLimit </a></code> marca el
    l�mite estricto de procesos hijo activos posibles, y debe ser
    mayor o igual al valor de la directiva <code class="directive"><a href="../mod/mpm_common.html#maxclients">MaxClients</a></code> dividido por el valor
    de la directiva <code class="directive"><a href="../mod/mpm_common.html#&#10;    threadsperchild">
    ThreadsPerChild</a></code>.  El valor de la directiva <code class="directive"><a href="../mod/mpm_common.html#threadlimit">ThreadLimit</a></code> es el l�mite
    estricto del n�mero de hebras del servidor, y debe ser mayor
    o igual al valor de la directiva <code class="directive"><a href="../mod/mpm_common.html#threadsperchild">ThreadsPerChild</a></code>.  Si los valores
    de esas directivas no son los que vienen por defecto, deben
    aparecer antes que el resto de directivas del m�dulo
    <code class="module"><a href="../mod/worker.html">worker</a></code>.</p>

    <p>Adem�s del conjunto de procesos hijo activos, puede haber
    otros procesos hijo que est�n terminando pero en los que al
    menos una hebra del servidor est� todav�a tratando una
    conexi�n con un cliente.  Puede haber hasta <code class="directive"><a href="../mod/mpm_common.html#maxclients">MaxClients</a></code> procesos terminando,
    aunque el n�mero real de estos procesos que puede esperarse
    es mucho menor. Este comportamiento puede evitarse desactivando la
    eliminaci�n individual de procesos hijo, lo que se hace de la
    siguiente manera:</p>

    <ul>
      <li>fijar el valor de la directiva <code class="directive"><a href="../mod/mpm_common.html#&#10;      maxrequestsperchild">
      MaxRequestsPerChild</a></code> a cero</li>

      <li>fijar el valor de la directiva <code class="directive"><a href="../mod/mpm_common.html# maxsparethreads"> MaxSpareThreads</a></code> al mismo valor
      que la directiva <code class="directive"><a href="../mod/mpm_common.html#maxclients">MaxClients</a></code></li>
    </ul>

    <p>Una configuraci�n t�pica del sistema de control de
    procesos y hebras del m�dulo de MPM <code class="module"><a href="../mod/worker.html">worker</a></code>
    prodr�a ser como sigue:</p>

    <div class="example"><p><code>
      ServerLimit         16<br />
      StartServers         2<br />
      MaxClients         150<br />
      MinSpareThreads     25<br />
      MaxSpareThreads     75<br />
      ThreadsPerChild     25
    </code></p></div>

    <p>Mientras que el proceso padre se inicia con privilegios de
    usuario <code>root</code> en Unix para usar el puerto de escucha
    80, los procesos hijo y las hebras se inician con menores
    privilegios de usuario. Las directivas <code class="directive"><a href="../mod/mpm_common.html#user">User</a></code> y <code class="directive"><a href="../mod/mpm_common.html#group">Group</a></code> se usan para determinar los
    privilegios con los que se iniciar�n los procesos hijo. Los
    procesos hijo deben ser capaces de leer los contenidos que van a
    servir, pero solo los permisos extrictamente necesarios para
    cumplir su tarea. Adem�s. a menos que se use <a href="../suexec.html">suexec</a>, los privilegios fijados en estas
    directivas son los que que van a heredar los scripts CGI.</p>

    <p>La directiva <code class="directive"><a href="../mod/mpm_common.html#maxrequestsperchild">MaxRequestsPerChild</a></code> controla con
    qu� frecuencia el servidor recicla los procesos eliminando
    los antiguos y creando nuevos.</p>
</div>
</div>
<div class="bottomlang">
<p><span>Idiomas disponibles: </span><a href="../de/mod/worker.html" hreflang="de" rel="alternate" title="Deutsch">&nbsp;de&nbsp;</a> |
<a href="../en/mod/worker.html" hreflang="en" rel="alternate" title="English">&nbsp;en&nbsp;</a> |
<a href="../es/mod/worker.html" title="Espa�ol">&nbsp;es&nbsp;</a> |
<a href="../ja/mod/worker.html" hreflang="ja" rel="alternate" title="Japanese">&nbsp;ja&nbsp;</a></p>
</div><div id="footer">
<p class="apache">Copyright 1995-2006 The Apache Software Foundation or its licensors, as applicable.<br />Licencia bajo los t�rminos de la <a href="http://www.apache.org/licenses/LICENSE-2.0">Apache License, Version 2.0</a>.</p>
<p class="menu"><a href="../mod/">M�dulos</a> | <a href="../mod/directives.html">Directivas</a> | <a href="../faq/">Preguntas Frecuentes</a> | <a href="../glossary.html">Glosario</a> | <a href="../sitemap.html">Mapa de este sitio web</a></p></div>
</body></html>