<?xml version="1.0" encoding="ISO-8859-1"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="es" xml:lang="es"><head><!--
        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
              This file is generated from xml source: DO NOT EDIT
        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      -->
<title>mpm_common - Servidor HTTP Apache</title>
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
<div id="preamble"><h1>Directivas Comunes de los MPM de
            Apache</h1>
<div class="toplang">
<p><span>Idiomas disponibles: </span><a href="../de/mod/mpm_common.html" hreflang="de" rel="alternate" title="Deutsch">&nbsp;de&nbsp;</a> |
<a href="../en/mod/mpm_common.html" hreflang="en" rel="alternate" title="English">&nbsp;en&nbsp;</a> |
<a href="../es/mod/mpm_common.html" title="Espa�ol">&nbsp;es&nbsp;</a> |
<a href="../ja/mod/mpm_common.html" hreflang="ja" rel="alternate" title="Japanese">&nbsp;ja&nbsp;</a></p>
</div>
<div class="outofdate">Esta traducci�n podr�a estar
            obsoleta. Consulte la versi�n en ingl�s de la
            documentaci�n para comprobar si se han producido cambios
            recientemente.</div>
<table class="module"><tr><th><a href="module-dict.html#Description">Descripci�n:</a></th><td>Es una colecci�n de directivas que est�n implementadas
en m�s de un m�dulo de multiprocesamiento (MPM)</td></tr>
<tr><th><a href="module-dict.html#Status">Estado:</a></th><td>MPM</td></tr></table>
</div>
<div id="quickview"><h3 class="directives">Directivas</h3>
<ul id="toc">
<li><img alt="" src="../images/down.gif" /> <a href="#acceptmutex">AcceptMutex</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#bs2000account">BS2000Account</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#coredumpdirectory">CoreDumpDirectory</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#enableexceptionhook">EnableExceptionHook</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#group">Group</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#listen">Listen</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#listenbacklog">ListenBackLog</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#lockfile">LockFile</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#maxclients">MaxClients</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#maxmemfree">MaxMemFree</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#maxrequestsperchild">MaxRequestsPerChild</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#maxsparethreads">MaxSpareThreads</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#minsparethreads">MinSpareThreads</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#pidfile">PidFile</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#scoreboardfile">ScoreBoardFile</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sendbuffersize">SendBufferSize</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#serverlimit">ServerLimit</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#startservers">StartServers</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#startthreads">StartThreads</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#threadlimit">ThreadLimit</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#threadsperchild">ThreadsPerChild</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#user">User</a></li>
</ul>
</div>

<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="AcceptMutex" id="AcceptMutex">AcceptMutex</a> <a name="acceptmutex" id="acceptmutex">Directiva</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>M�todo que usa Apache para serializar m�ltiples procesos
hijo que aceptan peticiones en las conexiones de red</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>AcceptMutex Default|<var>method</var></code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>AcceptMutex Default</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>MPM</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td><code class="module"><a href="../mod/leader.html">leader</a></code>, <code class="module"><a href="../mod/perchild.html">perchild</a></code>, <code class="module"><a href="../mod/prefork.html">prefork</a></code>, <code class="module"><a href="../mod/threadpool.html">threadpool</a></code>, <code class="module"><a href="../mod/worker.html">worker</a></code></td></tr>
</table>
    <p>Las directivas <code class="directive">AcceptMutex</code> determinan el
    m�todo que usa Apache para serializar m�ltiples procesos
    hijo que aceptan peticiones en las conexiones de red. En las
    versiones de Apache anteriores a la 2.0, el m�todo era
    seleccionable solo cuando se compilaba el servidor. El mejor
    m�todo a usar depende mucho de la arquitectura y de la
    plataforma que use. Si desea m�s informaci�n, consulte
    la documentanci�n sobre <a href="../misc/perf-tuning.html">ajustes para conseguir un mejor
    rendimiento</a>.</p>

    <p>Si el valor especificado en esta directiva es
    <code>Default</code>, entonces se usar� el m�todo
    seleccionado cuando se compil� el servidor. M�s abajo
    puede encontrar una lista con otros m�todos. Tenga en cuenta
    que no todos los m�todos est�n disponibles en todas las
    plataformas. Si el m�todo especificado no est�
    disponible, se escribir� un mensaje en el log de errores con
    una lista de los m�todos que puede usar.</p>

    <dl>
      <dt><code>flock</code></dt> <dd>usa la llamada al sistema
      <code>flock(2)</code> para bloquear el fichero especificado en
      la directiva <code class="directive"><a href="#lockfile">LockFile</a></code>.</dd>

      <dt><code>fcntl</code></dt> <dd>usa la llamada al sistema
      <code>fcntl(2)</code> para bloquear el fichero especificado en
      la directiva <code class="directive"><a href="#lockfile">LockFile</a></code>.</dd>

      <dt><code>posixsem</code></dt> <dd>usa sem�foros
      compatibles con POSIX para implementar el mutex.</dd>

      <dt><code>pthread</code></dt>
      <dd>Usa mutexes POSIX implementados seg�n la
      especificaci�n de hebras POSIX (PThreads).</dd>

      <dt><code>sysvsem</code></dt>
      <dd>usa sem�foros de tipo SySV para implementar el mutex.</dd>
    </dl>

    <p>Si quiere ver cu�l es el m�todo por defecto que se
    seleccion� para usar en su sistema al compilar, especifique
    el valor <code>debug</code> en la directiva <code class="directive"><a href="../mod/core.html#loglevel">LogLevel</a></code>. El valor por defecto de la
    directiva <code class="directive">AcceptMutex</code> aparecer�
    escrito en el <code class="directive"><a href="../mod/core.html#errorlog">ErrorLog</a></code>.</p>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="BS2000Account" id="BS2000Account">BS2000Account</a> <a name="bs2000account" id="bs2000account">Directiva</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Define la cuenta sin privilegios en m�quinas
BS2000</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>BS2000Account <var>account</var></code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>MPM</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td><code class="module"><a href="../mod/perchild.html">perchild</a></code>, <code class="module"><a href="../mod/prefork.html">prefork</a></code></td></tr>
<tr><th><a href="directive-dict.html#Compatibility">Compatibilidad:</a></th><td>Solo disponible en m�quinas BS2000</td></tr>
</table>
    <p>La directiva <code class="directive">BS2000Account</code> est�
    disponible solo en hosts BS2000. Debe usarse para definir el
    n�mero de cuenta del usuario sin privilegios del servidor
    Apache (que se configur� usando la directiva <code class="directive"><a href="#user">User</a></code>). Esto es un requerimiento
    del subsistema POSIX BS2000 (@@@@@ para reemplazar el entorno de
    tareas BS2000 subyaciente haciendo un sub-LOGON) para prevenir que
    scripts CGI accedan a recursos de la cuenta con privilegios con la
    que se suele iniciar el servidor, normalmente
    <code>SYSROOT</code>.</p>

    <div class="note"><h3>Nota</h3> 
      <p>La directiva
      <code>BS2000Account</code> solamente puede usarse una vez.</p>
    </div>

<h3>Consulte tambi�n</h3>
<ul>
<li><a href="../platform/ebcdic.html">Apache EBCDIC port</a></li>
</ul>
</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="CoreDumpDirectory" id="CoreDumpDirectory">CoreDumpDirectory</a> <a name="coredumpdirectory" id="coredumpdirectory">Directiva</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Directorio al que Apache intenta cambiarse antes de
realizar un volcado de memoria</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>CoreDumpDirectory <var>directory</var></code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>Consulte la secci�n de uso para ver el valor por defecto</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>MPM</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td><code class="module"><a href="../mod/beos.html">beos</a></code>, <code class="module"><a href="../mod/leader.html">leader</a></code>, <code class="module"><a href="../mod/mpm_winnt.html">mpm_winnt</a></code>, <code class="module"><a href="../mod/perchild.html">perchild</a></code>, <code class="module"><a href="../mod/prefork.html">prefork</a></code>, <code class="module"><a href="../mod/threadpool.html">threadpool</a></code>, <code class="module"><a href="../mod/worker.html">worker</a></code></td></tr>
</table>
    <p>Esta directiva controla el directorio al cual intenta cambiarse
    Apache antes de realizar un volcado de memoria. Por defecto, el
    volcado de memoria se hace en el directorio especificado en la
    directiva <code class="directive"><a href="../mod/core.html#serverroot">ServerRoot</a></code>, sin
    embargo, como el usuario con el que se est� ejecutando Apache
    podr�a no tener permisos para escribir en ese directorio, los
    volcados de memoria muchas veces no se hacen en ning�n
    sitio. Si quiere que el volcado se memoria se guarde para analizar
    los fallos posteriormente, puede usar esta directiva para
    especificar un directorio diferente.</p>

    <div class="note"><h3>Volcados de memoria en Linux</h3> <p>Si Apache se
      inicia como usuario root y despu�s se cambia el usuario con
      el se est� ejecutando, el kernel de Linux
      <em>desactiva</em> los volcados de memoria, incluso si se ha
      especificado un directorio en el que se puede escribir para
      realizar este proceso. Apache (en las versiones 2.0.46 y
      posteriores) reactiva los volcados de memoria en los sistemas
      con versiones Linux 2.4 y posteriores, pero solamente si se ha
      configurado expl�citamente la directiva
      <code class="directive">CoreDumpDirectory</code>.</p>
    </div>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="EnableExceptionHook" id="EnableExceptionHook">EnableExceptionHook</a> <a name="enableexceptionhook" id="enableexceptionhook">Directiva</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Activa un hook que inicia handlers de excepci�n
despu�s de un error irrecuperable</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>EnableExceptionHook On|Off</code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>EnableExceptionHook Off</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>MPM</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td><code class="module"><a href="../mod/leader.html">leader</a></code>, <code class="module"><a href="../mod/perchild.html">perchild</a></code>, <code class="module"><a href="../mod/prefork.html">prefork</a></code>, <code class="module"><a href="../mod/threadpool.html">threadpool</a></code>, <code class="module"><a href="../mod/worker.html">worker</a></code></td></tr>
<tr><th><a href="directive-dict.html#Compatibility">Compatibilidad:</a></th><td>Disponible en las versiones de Apache 2.0.49 y posteriores</td></tr>
</table>
    <p>Por razones de seguridad esta directiva est� disponible
    solamente si el servidor ha sido configurado con la opci�n
    <code>--enable-exception-hook</code>. Esto activa un hook que
    permite que se conecten m�dulos externos y que realicen
    alguna acci�n despu�s de que un proceso hijo sufra un
    error irrecuperable.</p>
    
    <p>Hay otros dos m�dulos, <code>mod_whatkilledus</code> y
    <code>mod_backtrace</code> que usan este hook. Por favor, consulte
    el siguiente enlace, <a href="http://www.apache.org/~trawick/exception_hook.html">EnableExceptionHook</a> perteneciente al sitio web de Jeff
    Trawick para obtener m�s informaci�n sobre el tema.</p>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="Group" id="Group">Group</a> <a name="group" id="group">Directiva</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Grupo con el que el servidor atender� las
peticiones</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>Group <var>unix-group</var></code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>Group #-1</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>MPM</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td><code class="module"><a href="../mod/beos.html">beos</a></code>, <code class="module"><a href="../mod/leader.html">leader</a></code>, <code class="module"><a href="../mod/mpmt_os2.html">mpmt_os2</a></code>, <code class="module"><a href="../mod/perchild.html">perchild</a></code>, <code class="module"><a href="../mod/prefork.html">prefork</a></code>, <code class="module"><a href="../mod/threadpool.html">threadpool</a></code>, <code class="module"><a href="../mod/worker.html">worker</a></code></td></tr>
<tr><th><a href="directive-dict.html#Compatibility">Compatibilidad:</a></th><td>Solamente puede usarse en global server config a partir de la versi�n de Apache 2.0</td></tr>
</table>
    <p>La directiva <code class="directive">Group</code> determina el grupo
    con el que el servidor atender� las peticiones. Para usar
    esta directiva, el servidor debe haber sido iniciado con el
    usuario <code>root</code>. Si inicia el servidor con un usuario
    que no sea root, el servidor no podr� cambiarse al grupo
    especificado, en lugar de esto continuar� ejecut�ndose
    con el grupo del usuario que lo inici�. <var>Unix-group</var>
    debe tomar un de los siguiente valores:</p>

    <dl>
      <dt>El nombre de un grupo</dt>
      <dd>Se refiere al grupo que lleva el nombre que se especifica.</dd>

      <dt><code>#</code> seguido del n�mero de un grupo.</dt>
      <dd>Se refiere al grupo asociado a ese n�mero.</dd>
    </dl>

    <div class="example"><h3>Por ejemplo</h3><p><code>
      Group www-group
    </code></p></div>

    <p>Se recomienda que cree un nuevo grupo espec�ficamente para
    ejecutar el servidor. Algunos administradores usan el ususario
    <code>nobody</code>, pero esto no es siempre posible ni
    aconsejable.</p>

    <div class="warning"><h3>Seguridad</h3> <p>No ponga el valor
      <code>root</code> en la directiva <code class="directive">Group</code>
      (o en la directiva <code class="directive"><a href="#user">User</a></code>) a menos que sepa
      exactamente lo que est� haciendo y los peligros que
      conlleva.</p>
    </div>

    <p>Importante: El uso de esta directiva en <code class="directive"><a href="../mod/core.html#virtualhost">&lt;VirtualHost&gt;</a></code> no est�
    permitido ya. Para configurar su servidor para
    <code class="program"><a href="../programs/suexec.html">suexec</a></code> use la directiva <code class="directive"><a href="../mod/mod_suexec.html#suexecusergroup">SuexecUserGroup</a></code>.</p>

    <div class="note"><h3>Nota</h3> <p>Aunque la directiva
      <code class="directive">Group</code> est� presente en los
      m�dulos MPM <code class="module"><a href="../mod/beos.html">beos</a></code> y
      <code class="module"><a href="../mod/mpmt_os2.html">mpmt_os2</a></code>, no est�n operativas y solamente
      est�n presentes por razones de compatibilidad.</p>
    </div>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="Listen" id="Listen">Listen</a> <a name="listen" id="listen">Directiva</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Direcciones IP y puertos en los que escucha el servidor</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>Listen [<var>IP-address</var>:]<var>portnumber</var></code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>MPM</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td><code class="module"><a href="../mod/beos.html">beos</a></code>, <code class="module"><a href="../mod/leader.html">leader</a></code>, <code class="module"><a href="../mod/mpm_netware.html">mpm_netware</a></code>, <code class="module"><a href="../mod/mpm_winnt.html">mpm_winnt</a></code>, <code class="module"><a href="../mod/mpmt_os2.html">mpmt_os2</a></code>, <code class="module"><a href="../mod/perchild.html">perchild</a></code>, <code class="module"><a href="../mod/prefork.html">prefork</a></code>, <code class="module"><a href="../mod/threadpool.html">threadpool</a></code>, <code class="module"><a href="../mod/worker.html">worker</a></code></td></tr>
<tr><th><a href="directive-dict.html#Compatibility">Compatibilidad:</a></th><td>Directiva de uso obligatorio en Apache 2.0</td></tr>
</table>
    <p>La directiva <code class="directive">Listen</code> indica las
    direcciones IP y los puertos en los que debe escuchar Apache; por
    defecto, el servidor responde a las peticiones que se reciban en
    cualquier direcci�n IP de las interfaces de red. El uso de
    <code class="directive">Listen</code> es ahora obligatorio. Si no
    est� en el fichero de configuraci�n, el servidor no
    podr� iniciarse. Esto supone un cambio respecto a las
    versiones anteriores de Apache.</p>

    <p>La directiva <code class="directive">Listen</code> le especifica al
    servidor los puertos o las combinaciones de direcciones y puertos
    cuyas peticiones debe aceptar. Si solamente se especifica un
    n�mero de puerto, el servidor escuchar� en ese puerto,
    en todas las interfaces de red. Si se especifica una
    direcci�n IP y un puerto, el servidor escuchar�
    solamente en esa direcci�n IP y en ese puerto.</p>

    <p>Se pueden usar varias directivas <code class="directive">Listen</code>
    para especificar varias direcciones y puertos de escucha. El
    servidor responder� a peticiones de cualquiera de esas
    direcciones y puertos.</p>

    <p>Por ejemplo, para hacer que el servidor acepte conexiones en
    los puertos 80 y 8000, use:</p>

    <div class="example"><p><code>
      Listen 80<br />
      Listen 8000
    </code></p></div>

    <p>Para hacer que el servidor acepte conexiones en dos direcciones
    y puertos difrentes, use </p>

    <div class="example"><p><code>
      Listen 192.170.2.1:80<br />
      Listen 192.170.2.5:8000
    </code></p></div>

    <p>Las direcciones IPv6 deben escribirse entre corchetes, como en
    el siguiente ejemplo:</p>

    <div class="example"><p><code>
      Listen [2001:db8::a00:20ff:fea7:ccea]:80
    </code></p></div>

    <div class="note"><h3>Condici�n de error</h3> Varias directivas
      <code class="directive">Listen</code> para la misma direcci�n IP y
      el mismo puerto tendr�n como resultado un mensaje de error
      del tipo <code>Direcci�n actualmente en uso</code>.
    </div>

<h3>Consulte tambi�n</h3>
<ul>
<li><a href="../dns-caveats.html">Problemas con DNS</a></li>
<li><a href="../bind.html">Especificaci�n de las direcciones y puertos que usa Apache</a></li>
</ul>
</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="ListenBackLog" id="ListenBackLog">ListenBackLog</a> <a name="listenbacklog" id="listenbacklog">Directiva</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Longitud m�xima de la cola de conexiones en espera</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>ListenBacklog <var>backlog</var></code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>ListenBacklog 511</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>MPM</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td><code class="module"><a href="../mod/beos.html">beos</a></code>, <code class="module"><a href="../mod/leader.html">leader</a></code>, <code class="module"><a href="../mod/mpm_netware.html">mpm_netware</a></code>, <code class="module"><a href="../mod/mpm_winnt.html">mpm_winnt</a></code>, <code class="module"><a href="../mod/mpmt_os2.html">mpmt_os2</a></code>, <code class="module"><a href="../mod/perchild.html">perchild</a></code>, <code class="module"><a href="../mod/prefork.html">prefork</a></code>, <code class="module"><a href="../mod/threadpool.html">threadpool</a></code>, <code class="module"><a href="../mod/worker.html">worker</a></code></td></tr>
</table>
    <p>Longitud m�xima de la cola de conexiones en espera. En
    general, no es necesario ni deseable hacer ninguna
    modificaci�n, pero en algunos sistemas es beneficioso
    incrementar esta longitud cuando se est� sufriendo un ataque
    TCP SYN flood. Consulte la informaci�n sobre el
    par�metro backlog de la llamada al sistema
    <code>listen(2)</code>.</p>

    <p>Este n�mero estar� la mayor parte de las veces
    limitado a un valor a�n menor por el sistema operativo. Esto
    var�a de un sistema operativo a otro. Tenga en cuenta
    tambi�n que muchos sistemas operativos no usan exactamente lo
    que se especifica en el backlog, sino que usan un n�mero
    basado en el valor especificado (aunque normalmente mayor).</p>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="LockFile" id="LockFile">LockFile</a> <a name="lockfile" id="lockfile">Directiva</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Ubicaci�n del fichero de lock de serializaci�n de aceptacio�n de peticiones</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>LockFile <var>filename</var></code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>LockFile logs/accept.lock</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>MPM</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td><code class="module"><a href="../mod/leader.html">leader</a></code>, <code class="module"><a href="../mod/perchild.html">perchild</a></code>, <code class="module"><a href="../mod/prefork.html">prefork</a></code>, <code class="module"><a href="../mod/threadpool.html">threadpool</a></code>, <code class="module"><a href="../mod/worker.html">worker</a></code></td></tr>
</table>
    <p>La directiva <code class="directive">LockFile</code> especifica la ruta
    al archivo de lock (lockfile) que se utiliza cuando la directiva
    <code class="directive"><a href="#acceptmutex">AcceptMutex</a></code> tiene valor
    <code>fcntl</code> o <code>flock</code>. En principio no se debe
    modificar el valor por defecto de esta directiva. La raz�n
    principal para moficiarlo es que el directorio de
    <code>logs</code> est� montado en NFS, porque <strong>el
    archivo de lock debe almacenarse en un disco local</strong>. El
    PID del proceso principal del servidor se a�ade
    autom�ticamente al nombre del fichero.</p>

    <div class="warning"><h3>Seguridad</h3> <p>Es aconsejable
      <em>no</em> poner este fichero en un directorio en el que tenga
      permisos de escritura todos los usuarios como
      <code>/var/tmp</code> porque alguien podr�a provocar un
      ataque de denegaci�n de servicio y evitar que el servidor
      se inicie creando un archivo de lock con el mismo nombre que el
      que el servidor intentar� crear.</p>
    </div>

<h3>Consulte tambi�n</h3>
<ul>
<li><code class="directive"><a href="#acceptmutex">AcceptMutex</a></code></li>
</ul>
</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="MaxClients" id="MaxClients">MaxClients</a> <a name="maxclients" id="maxclients">Directiva</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>N�mero m�ximo de procesos hijo que ser�n creados para
atender peticiones</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>MaxClients <var>number</var></code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>Consulte la secci�n de uso para obtener m�s informaci�n</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>MPM</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td><code class="module"><a href="../mod/beos.html">beos</a></code>, <code class="module"><a href="../mod/leader.html">leader</a></code>, <code class="module"><a href="../mod/prefork.html">prefork</a></code>, <code class="module"><a href="../mod/threadpool.html">threadpool</a></code>, <code class="module"><a href="../mod/worker.html">worker</a></code></td></tr>
</table>
    <p>La directiva <code class="directive">MaxClients</code> especifica el
    l�mite de peticiones simult�neas que ser�n
    atendidas. Cualquier intento de conexi�n por encima del
    l�mite <code class="directive">MaxClients</code> se pondr� en
    cola, hasta llegar a un l�mite basado en el valor de la
    directiva <code class="directive"><a href="#listenbacklog">ListenBacklog</a></code>. Una vez que un
    proceso hijo termina de atender una petici�n y queda libre, se
    atender� una conexi�n en cola.</p>

    <p>En servidores que no usan hebras (por ejemplo,
    <code class="module"><a href="../mod/prefork.html">prefork</a></code>), el valor especificado en
    <code class="directive">MaxClients</code> se traduce en el n�mero
    m�ximo de procesos hijo que se crear�n para atender
    peticiones. El valor por defecto es <code>256</code>; para
    incrementarlo, debe incrementar tambi�n el valor especificado
    en la directiva <code class="directive"><a href="#serverlimit">ServerLimit</a></code>.</p>

    <p>En servidores que usan hebras y en servidores h�bridos
    (por ejemplo, <code class="module"><a href="../mod/beos.html">beos</a></code> o <code class="module"><a href="../mod/worker.html">worker</a></code>)
    <code class="directive">MaxClients</code> limita el n�mero total de
    hebras que van a estar disponibles para servir clientes. El valor
    por defecto para <code class="module"><a href="../mod/beos.html">beos</a></code> es <code>50</code>. Para
    MPMs h�bridos el valor por defecto es <code>16</code>
    (<code class="directive"><a href="#serverlimit">ServerLimit</a></code>)
    multiplicado por <code>25</code> (<code class="directive"><a href="#threadsperchild">ThreadsPerChild</a></code>). Por lo tanto, si va a usar en
    <code class="directive">MaxClients</code> un valor que requiera m�s
    de 16 procesos deber� tambi�n incrementar el valor de la
    directiva <code class="directive"><a href="#serverlimit">ServerLimit</a></code>.</p>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="MaxMemFree" id="MaxMemFree">MaxMemFree</a> <a name="maxmemfree" id="maxmemfree">Directiva</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Cantidad m�xima de memoria que el asignador principal puede tomar sin hacer una llamada a <code>free()</code></td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>MaxMemFree <var>KBytes</var></code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>MaxMemFree 0</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>MPM</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td><code class="module"><a href="../mod/beos.html">beos</a></code>, <code class="module"><a href="../mod/leader.html">leader</a></code>, <code class="module"><a href="../mod/mpm_netware.html">mpm_netware</a></code>, <code class="module"><a href="../mod/prefork.html">prefork</a></code>, <code class="module"><a href="../mod/threadpool.html">threadpool</a></code>, <code class="module"><a href="../mod/worker.html">worker</a></code>, <code class="module"><a href="../mod/mpm_winnt.html">mpm_winnt</a></code></td></tr>
</table>
    <p>La directiva <code class="directive">MaxMemFree</code> especifica el
    n�mero m�ximo de kbytes libres que el asignador de memoria
    principal puede tomar sin hacer una llamada al sistema
    <code>free()</code>. Cuando no se especifica ning�n valor en esta
    directiva, o cuando se especifica el valor cero, no existir� tal
    l�mite.</p>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="MaxRequestsPerChild" id="MaxRequestsPerChild">MaxRequestsPerChild</a> <a name="maxrequestsperchild" id="maxrequestsperchild">Directiva</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>L�mite en el n�mero de peticiones que un proceso hijo puede
atender durante su vida</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>MaxRequestsPerChild <var>number</var></code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>MaxRequestsPerChild 10000</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>MPM</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td><code class="module"><a href="../mod/leader.html">leader</a></code>, <code class="module"><a href="../mod/mpm_netware.html">mpm_netware</a></code>, <code class="module"><a href="../mod/mpm_winnt.html">mpm_winnt</a></code>, <code class="module"><a href="../mod/mpmt_os2.html">mpmt_os2</a></code>, <code class="module"><a href="../mod/perchild.html">perchild</a></code>, <code class="module"><a href="../mod/prefork.html">prefork</a></code>, <code class="module"><a href="../mod/threadpool.html">threadpool</a></code>, <code class="module"><a href="../mod/worker.html">worker</a></code></td></tr>
</table>
    <p>La directiva <code class="directive">MaxRequestsPerChild</code>
    especifica el n�mero m�ximo de peticiones que un proceso hijo
    atender� durante su existencia. Despu�s de atender
    <code class="directive">MaxRequestsPerChild</code> peticiones, el proceso
    hijo se eliminar�. Si el valor especificado en esta directiva
    <code class="directive">MaxRequestsPerChild</code> es <code>0</code>, no
    habr� l�mite.</p>

    <div class="note"><h3>Diferentes valores por defecto</h3> 
      <p>El valor por defecto para los m�dulos
      <code class="module"><a href="../mod/mpm_netware.html">mpm_netware</a></code> y <code class="module"><a href="../mod/mpm_winnt.html">mpm_winnt</a></code> es
      <code>0</code>.</p>
    </div>

    <p>Especificar en la directiva
    <code class="directive">MaxRequestsPerChild</code> un valor distinto de
    cero tiene dos ventajas:</p>

    <ul>
      <li>limita la cantidad de memoria que un proceso puede consumir
      en caso de que haya un fuga (accidental) de memoria;</li>

      <li>establece un l�mite finito a la vida de los procesos, lo que
      ayuda a reducir el n�mero existente de procesos cuando se reduce
      la carga de trabajo en el servidor.</li>
    </ul>

    <div class="note"><h3>Nota</h3> 
      <p>Para las peticiones <code class="directive"><a href="../mod/core.html#keepalive">KeepAlive</a></code>, solamente la primera petici�n
      cuenta para este l�mite. De hecho, en ese caso lo que se
      limita es el n�mero de <em>conexiones</em> por proceso hijo.</p>
    </div>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="MaxSpareThreads" id="MaxSpareThreads">MaxSpareThreads</a> <a name="maxsparethreads" id="maxsparethreads">Directiva</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>N�mero m�ximo de hebras en espera</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>MaxSpareThreads <var>number</var></code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>Consulte la secci�n de uso para obtener m�s informaci�n</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>MPM</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td><code class="module"><a href="../mod/beos.html">beos</a></code>, <code class="module"><a href="../mod/leader.html">leader</a></code>, <code class="module"><a href="../mod/mpm_netware.html">mpm_netware</a></code>, <code class="module"><a href="../mod/mpmt_os2.html">mpmt_os2</a></code>, <code class="module"><a href="../mod/perchild.html">perchild</a></code>, <code class="module"><a href="../mod/threadpool.html">threadpool</a></code>, <code class="module"><a href="../mod/worker.html">worker</a></code></td></tr>
</table>
    <p>N�mero m�ximo de hebras en espera. Los diferentes MPMs tienen
    diferentes comportamientos respecto a esta directiva.</p>

    <p>En el m�dulo <code class="module"><a href="../mod/perchild.html">perchild</a></code> el valor por
    defecto usado es <code>MaxSpareThreads 10</code>. Este MPM
    monitoriza el n�mero de hebras en espera por proceso hijo. Si
    hay demasiadas hebras en espera en un proceso hijo, el servidor
    empezar� a eliminar las hebras de sobra.</p>

    <p>En los m�dulos <code class="module"><a href="../mod/worker.html">worker</a></code>,
    <code class="module"><a href="../mod/leader.html">leader</a></code> y <code class="module"><a href="../mod/threadpool.html">threadpool</a></code> el valor
    por defecto usado es <code>MaxSpareThreads 250</code>. Estos MPMs
    monitorizan el n�mero del hebras en espera en servidor en
    conjunto. Si hay demasiadas hebras en espera en el servidor, se
    eliminan algunos procesos hijo hasta que el n�mero de hebras
    en espera se ajuste al l�mite especificado.</p>

    <p>En el m�dulo <code class="module"><a href="../mod/mpm_netware.html">mpm_netware</a></code> el valor por
    defecto usado es <code>MaxSpareThreads 100</code>. Como este MPM
    ejecuta �nico proceso, las hebras en espera se calculan
    tambi�n en base al servidor en conjunto.</p>

    <p>Los m�dulos <code class="module"><a href="../mod/beos.html">beos</a></code> y <code class="module"><a href="../mod/mpmt_os2.html">mpmt_os2</a></code>
    funcionan de manera similar a <code class="module"><a href="../mod/mpm_netware.html">mpm_netware</a></code>. El
    valor por defecto para <code class="module"><a href="../mod/beos.html">beos</a></code> es
    <code>MaxSpareThreads 50</code>. Para <code class="module"><a href="../mod/mpmt_os2.html">mpmt_os2</a></code> el
    valor por defecto es <code>10</code>.</p>

    <div class="note"><h3>Restricciones</h3> 
      <p>El rango de valores que puede tomar
      <code class="directive">MaxSpareThreads</code> est� acotado. Apache
      corregir� autom�ticamente el valor especificado de
      acuerdo con las siguientes reglas:</p>
      <ul>
        <li>Si usa el m�dulo <code class="module"><a href="../mod/perchild.html">perchild</a></code> el valor
        especificado en la directiva
        <code class="directive">MaxSpareThreads</code> tiene que ser menor o
        igual al valor especificado en <code class="directive"><a href="#threadlimit">ThreadLimit</a></code>.</li>

        <li><code class="module"><a href="../mod/mpm_netware.html">mpm_netware</a></code> necesita que el valor de esta
        directiva sea mayor que el valor de la directiva <code class="directive"><a href="#minsparethreads">MinSpareThreads</a></code>.</li>

        <li>En los m�dulos <code class="module"><a href="../mod/leader.html">leader</a></code>,
        <code class="module"><a href="../mod/threadpool.html">threadpool</a></code> y <code class="module"><a href="../mod/worker.html">worker</a></code> el valor
        especificado tiene que ser mayor o igual a la suma de los
        valores especificados en las directivas <code class="directive"><a href="#minsparethreads">MinSpareThreads</a></code> y <code class="directive"><a href="#threadsperchild">ThreadsPerChild</a></code>.</li>
      </ul>
    </div>

<h3>Consulte tambi�n</h3>
<ul>
<li><code class="directive"><a href="#minsparethreads">MinSpareThreads</a></code></li>
<li><code class="directive"><a href="#startservers">StartServers</a></code></li>
</ul>
</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="MinSpareThreads" id="MinSpareThreads">MinSpareThreads</a> <a name="minsparethreads" id="minsparethreads">Directiva</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>N�mero m�nimo de hebras en espera para atender picos de
demanda en las peticiones</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>MinSpareThreads <var>number</var></code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>Consulte la secci�n de uso para obtener m�s informaci�n</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>MPM</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td><code class="module"><a href="../mod/beos.html">beos</a></code>, <code class="module"><a href="../mod/leader.html">leader</a></code>, <code class="module"><a href="../mod/mpm_netware.html">mpm_netware</a></code>, <code class="module"><a href="../mod/mpmt_os2.html">mpmt_os2</a></code>, <code class="module"><a href="../mod/perchild.html">perchild</a></code>, <code class="module"><a href="../mod/threadpool.html">threadpool</a></code>, <code class="module"><a href="../mod/worker.html">worker</a></code></td></tr>
</table>
    <p>N�mero m�nimo de hebras en espera para atender picos
    de demanda en las peticiones. Los diferentes MPMs tratan esta
    directiva de forma diferente.</p>

    <p>El m�dulo <code class="module"><a href="../mod/perchild.html">perchild</a></code> usa por defecto
    <code>MinSpareThreads 5</code> y calcula el n�mero de hebras
    en espera en base al n�mero de procesos hijo. Si no hay
    suficientes hebras en espera en un proceso hijo, el servidor
    empezar� a crear nuevas hebras dentro de ese proceso hijo. De
    esta manera, si especifica en la directiva <code class="directive"><a href="../mod/perchild.html#numservers">NumServers</a></code> el valor <code>10</code>
    y en la directiva <code class="directive">MinSpareThreads</code> un valor
    de <code>5</code>, tendr� como m�nimo 50 hebras en
    espera en su sistema.</p>

    <p>Los m�dulos <code class="module"><a href="../mod/worker.html">worker</a></code>,
    <code class="module"><a href="../mod/leader.html">leader</a></code> y <code class="module"><a href="../mod/threadpool.html">threadpool</a></code> usan un
    valor por defecto <code>MinSpareThreads 75</code> y calculan el
    n�mero de hebras en espera en el servidor en conjunto. Si no
    hay suficientes hebras en espera en el servidor, entonces se crean
    procesos hijo hasta que el n�mero de hebras en espera sea
    suficiente.</p>

    <p>El m�dulo <code class="module"><a href="../mod/mpm_netware.html">mpm_netware</a></code> usa un valor por defecto
    <code>MinSpareThreads 10</code> y como es un MPM que trabaja con
    un �nico proceso, calcula el n�mero de hebras en espera en base al
    n�mero total que hay en el servidor.</p>

    <p>Los m�dulos <code class="module"><a href="../mod/beos.html">beos</a></code> y <code class="module"><a href="../mod/mpmt_os2.html">mpmt_os2</a></code>
    funcionan de modo similar a como lo hace el m�dulo
    <code class="module"><a href="../mod/mpm_netware.html">mpm_netware</a></code>. El valor por defecto que usa
    <code class="module"><a href="../mod/beos.html">beos</a></code> es <code>MinSpareThreads 1</code>.
    <code class="module"><a href="../mod/mpmt_os2.html">mpmt_os2</a></code> usa por defecto el valor
    <code>5</code>.</p>

<h3>Consulte tambi�n</h3>
<ul>
<li><code class="directive"><a href="#maxsparethreads">MaxSpareThreads</a></code></li>
<li><code class="directive"><a href="#startservers">StartServers</a></code></li>
</ul>
</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="PidFile" id="PidFile">PidFile</a> <a name="pidfile" id="pidfile">Directiva</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Fichero en el que el servidor guarda
el ID del proceso demonio de escucha (daemon)</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>PidFile <var>filename</var></code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>PidFile logs/httpd.pid</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>MPM</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td><code class="module"><a href="../mod/beos.html">beos</a></code>, <code class="module"><a href="../mod/leader.html">leader</a></code>, <code class="module"><a href="../mod/mpm_winnt.html">mpm_winnt</a></code>, <code class="module"><a href="../mod/mpmt_os2.html">mpmt_os2</a></code>, <code class="module"><a href="../mod/perchild.html">perchild</a></code>, <code class="module"><a href="../mod/prefork.html">prefork</a></code>, <code class="module"><a href="../mod/threadpool.html">threadpool</a></code>, <code class="module"><a href="../mod/worker.html">worker</a></code></td></tr>
</table>
    <p>La directiva <code class="directive">PidFile</code> especifica el
    fichero en el que el servidor guarda el ID del proceso demonio de
    escucha (daemon). Si el nombre del fichero especificado no es una
    ruta absoluta, entonces se asume que es relativa al directorio
    especificado en <code class="directive"><a href="../mod/core.html#serverroot">ServerRoot</a></code>.</p>

    <div class="example"><h3>Ejemplo</h3><p><code>
      PidFile /var/run/apache.pid
    </code></p></div>

    <p>Con frecuencia es �til tener la posibilidad de enviar al
    servidor una se�al, de manera que cierre y vuelva a abrir el
    <code class="directive"><a href="../mod/core.html#errorlog">ErrorLog</a></code> y el <code class="directive"><a href="../mod/mod_log_config.html#transferlog">TransferLog</a></code>, y vuelva a leer
    los ficheros de configuraci�n. Esto es lo que ocurre cuando
    se env�a la se�al SIGHUP (kill -1) al ID del proceso que
    aparece en <code class="directive">PidFile</code>.</p>

    <p>El <code class="directive">PidFile</code> est� sujeto a las mismas
    advertencias que se hicieron para los ficheros log sobre su
    ubicaci�n y sobre su <a href="../misc/security_tips.html#serverroot">seguridad</a>.</p>

    <div class="note"><h3>Nota</h3> <p>Se recomienda que para Apache 2 se
      use solamente el script <code class="program"><a href="../programs/apachectl.html">apachectl</a></code> para
      (re-)iniciar o parar el servidor.</p>
    </div>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="ScoreBoardFile" id="ScoreBoardFile">ScoreBoardFile</a> <a name="scoreboardfile" id="scoreboardfile">Directiva</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Ubicaci�n del fichero que almacena los datos necesarios para
coordinar el funcionamiento de los procesos hijo del servidor </td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>ScoreBoardFile <var>file-path</var></code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>ScoreBoardFile logs/apache_status</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>MPM</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td><code class="module"><a href="../mod/beos.html">beos</a></code>, <code class="module"><a href="../mod/leader.html">leader</a></code>, <code class="module"><a href="../mod/mpm_winnt.html">mpm_winnt</a></code>, <code class="module"><a href="../mod/perchild.html">perchild</a></code>, <code class="module"><a href="../mod/prefork.html">prefork</a></code>, <code class="module"><a href="../mod/threadpool.html">threadpool</a></code>, <code class="module"><a href="../mod/worker.html">worker</a></code></td></tr>
</table>
    <p>Apache usa un marcador para que los procesos hijo se
    comuniquen con sus procesos padre.  Algunas arquitecturas
    necesitan un archivo para facilitar esta comunicaci�n. Si no
    se especifica ning�n fichero, Apache intenta en primer lugar
    crear el marcador en memoria (usando memoria compartida
    an�nima) y, si esto falla, intentar� crear el fichero en
    disco (usando memoria compartida basada en ficheros). Si se especifica un
    valor en esta directiva, Apache crear� directamente el
    archivo en disco.</p>

    <div class="example"><h3>Ejemplo</h3><p><code>
      ScoreBoardFile /var/run/apache_status
    </code></p></div>

    <p>El uso de memoria compartida basada en ficheros es �til
    para aplicaciones de terceras partes que necesitan acceso directo
    al marcador.</p>

    <p>Si usa la directiva <code class="directive">ScoreBoardFile</code>,
    puede mejorar la velocidad del servidor poniendo el fichero en
    memoria RAM. Pero tenga cuidado y siga las mismas recomendaciones
    acerca del lugar donde se almacenan los ficheros log y su <a href="../misc/security_tips.html">seguridad</a>.</p>

<h3>Consulte tambi�n</h3>
<ul>
<li><a href="../stopping.html">Parar y reiniciar
Apache</a></li>
</ul>
</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="SendBufferSize" id="SendBufferSize">SendBufferSize</a> <a name="sendbuffersize" id="sendbuffersize">Directiva</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Tama�o del buffer TCP</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SendBufferSize <var>bytes</var></code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>SendBufferSize 0</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>MPM</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td><code class="module"><a href="../mod/beos.html">beos</a></code>, <code class="module"><a href="../mod/leader.html">leader</a></code>, <code class="module"><a href="../mod/mpm_netware.html">mpm_netware</a></code>, <code class="module"><a href="../mod/mpm_winnt.html">mpm_winnt</a></code>, <code class="module"><a href="../mod/mpmt_os2.html">mpmt_os2</a></code>, <code class="module"><a href="../mod/perchild.html">perchild</a></code>, <code class="module"><a href="../mod/prefork.html">prefork</a></code>, <code class="module"><a href="../mod/threadpool.html">threadpool</a></code>, <code class="module"><a href="../mod/worker.html">worker</a></code></td></tr>
</table>
    <p>El servidor fijar� el tama�o del buffer TCP en los
    bytes que se especifiquen en esta directiva. Incrementar este
    valor por encima de los valores est�ndar del sistema
    operativo es muy �til en situaciones de alta velocidad y gran
    latencia (por ejemplo, 100ms o as�, como en el caso de
    conexiones intercontinentales de gran capacidad).</p>

    <p>Si se especifica el valor <code>0</code>, el servidor usar� el
    valor por defecto del sistema operativo.</p>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="ServerLimit" id="ServerLimit">ServerLimit</a> <a name="serverlimit" id="serverlimit">Directiva</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>L�mite superior del n�mero configurable de procesos</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>ServerLimit <var>number</var></code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>Consulte la secci�n de uso para obtener m�s informaci�n</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>MPM</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td><code class="module"><a href="../mod/leader.html">leader</a></code>, <code class="module"><a href="../mod/perchild.html">perchild</a></code>, <code class="module"><a href="../mod/prefork.html">prefork</a></code>, <code class="module"><a href="../mod/threadpool.html">threadpool</a></code>, <code class="module"><a href="../mod/worker.html">worker</a></code></td></tr>
</table>
   <p>En el m�dulo MPM <code class="module"><a href="../mod/prefork.html">prefork</a></code>, esta directiva
    significa el valor m�ximo que se puede especificar en la
    directiva <code class="directive"><a href="#maxclients">MaxClients</a></code>
    sobre el tiempo de vida de un proceso de Apache.  En el
    m�dulo MPM <code class="module"><a href="../mod/worker.html">worker</a></code>, esta diretiva en
    combinaci�n con la directiva <code class="directive"><a href="#threadlimit">ThreadLimit</a></code> significa el valor
    m�ximo que puede especificarse en la directiva <code class="directive"><a href="#maxclients">MaxClients</a></code> sobre el tiempo de vida
    de un proceso de Apache. Los intententos de cambiar el valor de
    esta directiva durante el reinicio del servidor ser�n
    ignorados. El valor de <code class="directive"><a href="#maxclients">MaxClients</a></code> s� que puede
    modificarse durante el reinicio.</p>

    <p>Cuando se usa esta directiva hay que tener especial cuidado.
    Si en la directiva <code class="directive">ServerLimit</code> se
    especifica un valor mucho m�s alto de lo necesario, se reservar�
    memoria compartida que no ser� usada.  Si ambas directivas
    <code class="directive">ServerLimit</code> y <code class="directive"><a href="#maxclients">MaxClients</a></code> tienen especificados
    valores mayores que los que el sistema puede manejar, Apache puede
    que no se inicie o que el sistema se vuelva inestable.</p>

    <p>Con el m�dulo MPM <code class="module"><a href="../mod/prefork.html">prefork</a></code>, use esta
    directiva solamente si necesita especificar en la directiva
    <code class="directive"><a href="#maxclients">MaxClients</a></code> un valor
    mayor a 256 (el valor por defecto). No especifique un valor mayor
    del que vaya a especificar en la directiva <code class="directive"><a href="#maxclients">MaxClients</a></code>.</p>

    <p>Con los m�dulos <code class="module"><a href="../mod/worker.html">worker</a></code>,
    <code class="module"><a href="../mod/leader.html">leader</a></code> y <code class="module"><a href="../mod/threadpool.html">threadpool</a></code> use esta
    directiva solamente si los valores especificados en las directivas
    <code class="directive"><a href="#maxclients">MaxClients</a></code> y <code class="directive"><a href="#threadsperchild">ThreadsPerChild</a></code> precisan m�s de 16
    procesos del servidor (valor por defecto). No especifique en esta
    directiva un valor mayor que el n�mero de procesos del servidor
    requeridos por lo especificado en las directivas <code class="directive"><a href="#maxclients ">MaxClients </a></code> y <code class="directive"><a href="#threadsperchild">ThreadsPerChild</a></code>.</p>

    <p>Con el MPM <code class="module"><a href="../mod/perchild.html">perchild</a></code>, use esta directiva solo
    si tiene que especificar en la directiva <code class="directive"><a href="../mod/perchild.html#numservers">NumServers</a></code> un valor mayor de 8 (el
    valor por defecto).</p>

    <div class="note"><h3>Nota</h3> 
      <p>Existe un l�mite inviolable compilado en el servidor que es
      <code>ServerLimit 20000</code>. Con este l�mite se intentan
      evitar las consecuencias que pueden tener los errores tipogr�ficos.</p>
    </div>

<h3>Consulte tambi�n</h3>
<ul>
<li><a href="../stopping.html">Parar y reiniciar
Apache</a></li>
</ul>
</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="StartServers" id="StartServers">StartServers</a> <a name="startservers" id="startservers">Directiva</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>N�mero de procesos hijo del servidor que se crean al
iniciar Apache</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>StartServers <var>number</var></code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>Consulte la secci�n de uso para obtener m�s informaci�n</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>MPM</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td><code class="module"><a href="../mod/leader.html">leader</a></code>, <code class="module"><a href="../mod/mpmt_os2.html">mpmt_os2</a></code>, <code class="module"><a href="../mod/prefork.html">prefork</a></code>, <code class="module"><a href="../mod/threadpool.html">threadpool</a></code>, <code class="module"><a href="../mod/worker.html">worker</a></code></td></tr>
</table>
    <p>La directiva <code class="directive">StartServers</code> especifica el
    n�mero de procesos hijo que se crean al iniciar Apache. Como
    el n�mero de procesos est� controlado din�micamente
    seg�n la carga del servidor, no hay normalmente ninguna
    raz�n para modificar el valor de este par�metro.</p>

    <p>El valor por defecto cambia seg�n el MPM de que se trate. Para
    <code class="module"><a href="../mod/leader.html">leader</a></code>, <code class="module"><a href="../mod/threadpool.html">threadpool</a></code> y
    <code class="module"><a href="../mod/worker.html">worker</a></code> el valor por defecto es <code>StartServers
    3</code>.  Para <code class="module"><a href="../mod/prefork.html">prefork</a></code> el valor por defecto es
    <code>5</code> y para <code class="module"><a href="../mod/mpmt_os2.html">mpmt_os2</a></code> es
    <code>2</code>.</p>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="StartThreads" id="StartThreads">StartThreads</a> <a name="startthreads" id="startthreads">Directiva</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>N�mero de hebras que se crean al iniciar Apache</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>StartThreads <var>number</var></code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>Consulte la secci�n de uso para obtener m�s informaci�n</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>MPM</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td><code class="module"><a href="../mod/beos.html">beos</a></code>, <code class="module"><a href="../mod/mpm_netware.html">mpm_netware</a></code>, <code class="module"><a href="../mod/perchild.html">perchild</a></code></td></tr>
</table>
    <p>N�mero de hebras que se crean al iniciar Apache. Como el
    n�mero de procesos est� controlado din�micamente
    seg�n la carga del servidor, no hay normalmente ninguna
    raz�n para modificar el valor de este par�metro.</p>

    <p>En el m�dulo <code class="module"><a href="../mod/perchild.html">perchild</a></code> el valor por defecto es
    <code>StartThreads 5</code> y esta directiva controla el n�mero de
    hebras por proceso al inicio.</p>

    <p>En el m�dulo <code class="module"><a href="../mod/mpm_netware.html">mpm_netware</a></code> el valor por
    defecto es <code>StartThreads 50</code> y, como solamente hay un
    proceso, este es el n�mero total de hebras creadas al iniciar
    el servidor para servir peticiones.</p>

    <p>En el m�dulo <code class="module"><a href="../mod/beos.html">beos</a></code> el valor usado por
    defecto es <code>StartThreads 10</code>. En este caso tambi�n
    representa el n�mero total de hebras creadas al iniciar el
    servidor para servir peticiones.</p>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="ThreadLimit" id="ThreadLimit">ThreadLimit</a> <a name="threadlimit" id="threadlimit">Directiva</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Marca el l�mite superior del n�mero de hebras por
proceso hijo que pueden especificarse</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>ThreadLimit <var>number</var></code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>Consulte la secci�n de uso para obtener m�s informaci�n</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>MPM</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td><code class="module"><a href="../mod/leader.html">leader</a></code>, <code class="module"><a href="../mod/mpm_winnt.html">mpm_winnt</a></code>, <code class="module"><a href="../mod/perchild.html">perchild</a></code>, <code class="module"><a href="../mod/threadpool.html">threadpool</a></code>, <code class="module"><a href="../mod/worker.html">worker</a></code></td></tr>
<tr><th><a href="directive-dict.html#Compatibility">Compatibilidad:</a></th><td>Disponible para <code class="module"><a href="../mod/mpm_winnt.html">mpm_winnt</a></code> en las versiones de Apache
2.0.41 y posteriores</td></tr>
</table>
    <p>Esta directiva determina el valor m�ximo que puede especificarse
    en la directiva <code class="directive"><a href="#threadsperchild">ThreadsPerChild</a></code> para el tiempo de
    vida de un proceso de Apache. Los intentos por modificar este
    valor durante un reinicio ser�n ingnorados, pero el valor de la
    directiva <code class="directive"><a href="#threadsperchild">ThreadsPerChild</a></code> puede modificarse
    durante un reinicio hasta un valor igual al de esta directiva.</p>

    <p>Cuando se usa esta directiva hay que poner especial
    atenci�n. Si en la directiva
    <code class="directive">ThreadLimit</code> se especifica un valor mucho
    m�s grande que en <code class="directive"><a href="#threadsperchild">ThreadsPerChild</a></code>, se reservar�
    memoria compartida en exceso que no ser� usada.  Si tanto en
    <code class="directive">ThreadLimit</code> como en <code class="directive"><a href="#threadsperchild">ThreadsPerChild</a></code> se especifican
    valores mayores de los que el sistema puede tratar, Apache
    podr�a no iniciarse o su funcionamiento podr�a volverse
    inestable. No especifique en esta directiva un valor mayor del
    mayor valor posible que piense que va a especificar en <code class="directive"><a href="#threadsperchild">ThreadsPerChild</a></code> para la
    ejecuci�n de Apache de ese momento.</p>

    <p>El valor por defecto de la directiva
    <code class="directive">ThreadLimit</code> es <code>1920</code> cuando se
    usa con <code class="module"><a href="../mod/mpm_winnt.html">mpm_winnt</a></code> y <code>64</code> en otro caso.</p>

    <div class="note"><h3>Nota</h3> <p>Hay un l�mite estricto compilado
      en el servidor: <code>ThreadLimit 20000</code> (o
      <code>ThreadLimit 15000</code> si usa
      <code class="module"><a href="../mod/mpm_winnt.html">mpm_winnt</a></code>). Este l�mite existe para evitar
      los efectos que pueden ser provocados por errores
      tipogr�ficos.</p>
    </div>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="ThreadsPerChild" id="ThreadsPerChild">ThreadsPerChild</a> <a name="threadsperchild" id="threadsperchild">Directiva</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>N�mero de hebras creadas por cada proceso
hijo</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>ThreadsPerChild <var>number</var></code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>Consulte la secci�n de uso para obtener m�s informaci�n</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>MPM</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td><code class="module"><a href="../mod/leader.html">leader</a></code>, <code class="module"><a href="../mod/mpm_winnt.html">mpm_winnt</a></code>, <code class="module"><a href="../mod/threadpool.html">threadpool</a></code>, <code class="module"><a href="../mod/worker.html">worker</a></code></td></tr>
</table>
    <p>Esta directiva especifica el n�mero de hebras creadas por
    cada proceso hijo. El proceso hijo crea estas hebras al inicio y
    no vuelve a crear m�s. Si se usa un MPM como
    <code class="module"><a href="../mod/mpm_winnt.html">mpm_winnt</a></code>, en el que solamente hay un proceso
    hijo, este n�mero deber�a ser lo suficientemente grande
    como para atender toda la carga del servidor. Si se usa un
    m�dulo MPM como <code class="module"><a href="../mod/worker.html">worker</a></code>, en el que hay
    m�ltiples procesos hijo, el n�mero <em>total</em> de
    hebras deber�a ser lo suficientemente grande como para
    atender la carga en circustancias normales del servidor.</p>

    <p>El valor por defecto de la directiva
    <code class="directive">ThreadsPerChild</code> es <code>64</code> cuando
    se usa <code class="module"><a href="../mod/mpm_winnt.html">mpm_winnt</a></code> y <code>25</code> en otro caso.</p>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="User" id="User">User</a> <a name="user" id="user">Directiva</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Nombre de usuario con el que el servidor responder� a las
peticiones</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>User <var>unix-userid</var></code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>User #-1</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>MPM</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td><code class="module"><a href="../mod/leader.html">leader</a></code>, <code class="module"><a href="../mod/perchild.html">perchild</a></code>, <code class="module"><a href="../mod/prefork.html">prefork</a></code>, <code class="module"><a href="../mod/threadpool.html">threadpool</a></code>, <code class="module"><a href="../mod/worker.html">worker</a></code></td></tr>
<tr><th><a href="directive-dict.html#Compatibility">Compatibilidad:</a></th><td>V�lida solamente en global server config a partir
de la versi�n de Apache 2.0</td></tr>
</table>
    <p>La directiva <code class="directive">User</code> especifica el
    identificador de usuario con el que el servidor responder� a
    las peticiones. Para usar esta directiva, el servidor debe haber
    sido iniciado como <code>root</code>.  Si se inicia Apache con un
    usario distinto de root, no se podr� cambiar a un usuario con
    menores privilegios, y el servidor continuar� ejecut�ndose
    con el usuario original. Si inicia el servidor como
    <code>root</code>, entonces es normal que el procedimiento padre
    siga ejecut�ndose como root. <var>Unix-userid</var> puede tomar
    uno de los siguientes valores:</p>

    <dl>
      <dt>Un nombre de ususario</dt>
      <dd>Se refiere al usuario dado por su nombre.</dd>

      <dt># seguido por un n�mero de usuario.</dt>
      <dd>Se refiere al usuario que corresponde a ese n�mero.</dd>
    </dl>

    <p>El usuario debe no tener privilegios suficientes para acceder a
    ficheros que no deban ser visibles para el mundo exterior, y de
    igual manera, el usuario no debe ser capaz de ejecutar c�digo que
    no sea susceptible de ser objeto de respuestas a peticiones
    HTTP. Se recomienda que especifique un nuevo usuario y un nuevo
    grupo solamente para ejecutar el servidor. Algunos
    administradores usan el usuario <code>nobody</code>, pero esto no
    es siempre deseable, porque el usuario <code>nobody</code> puede
    tener otras funciones en su sistema.</p>

    <div class="warning"><h3>Seguriad</h3>
      <p>No espcifique en la directiva <code class="directive">User</code> (o
      <code class="directive"><a href="#group">Group</a></code>) el valor
      <code>root</code> a no ser que sepa exactamente lo que est�
      haciendo, y cu�les son los peligros.</p>
    </div>

    <p>Con el MPM <code class="module"><a href="../mod/perchild.html">perchild</a></code>, que est�
    dise�ado para ejecutar hosts virtuales por diferentes ID de
    usuario, la directiva <code class="directive">User</code> define el ID de
    usuario para el servidor principal y para el resto de las
    secciones <code class="directive"><a href="../mod/core.html#virtualhost">&lt;VirtualHost&gt;</a></code> sin una directiva <code class="directive"><a href="../mod/perchild.html#assignuserid">AssignUserID</a></code>.</p>

    <p>Nota especial: El uso de esta directiva en <code class="directive"><a href="../mod/core.html#virtualhost">&lt;VirtualHost&gt;</a></code> no est�
    ya soportado. Para configurar su servidor para
    <code class="program"><a href="../programs/suexec.html">suexec</a></code> use <code class="directive"><a href="../mod/mod_suexec.html#suexecusergroup">SuexecUserGroup</a></code>.</p>

    <div class="note"><h3>Nota</h3> 
     <p>Aunque la directiva <code class="directive">User</code> est�
     presente en los MPMs <code class="module"><a href="../mod/beos.html">beos</a></code> y
     <code class="module"><a href="../mod/mpmt_os2.html">mpmt_os2</a></code> MPMs, no est� operativa y
     solamente est� presente por razones de compatibilidad.</p>
    </div>

</div>
</div>
<div class="bottomlang">
<p><span>Idiomas disponibles: </span><a href="../de/mod/mpm_common.html" hreflang="de" rel="alternate" title="Deutsch">&nbsp;de&nbsp;</a> |
<a href="../en/mod/mpm_common.html" hreflang="en" rel="alternate" title="English">&nbsp;en&nbsp;</a> |
<a href="../es/mod/mpm_common.html" title="Espa�ol">&nbsp;es&nbsp;</a> |
<a href="../ja/mod/mpm_common.html" hreflang="ja" rel="alternate" title="Japanese">&nbsp;ja&nbsp;</a></p>
</div><div id="footer">
<p class="apache">Copyright 1995-2006 The Apache Software Foundation or its licensors, as applicable.<br />Licencia bajo los t�rminos de la <a href="http://www.apache.org/licenses/LICENSE-2.0">Apache License, Version 2.0</a>.</p>
<p class="menu"><a href="../mod/">M�dulos</a> | <a href="../mod/directives.html">Directivas</a> | <a href="../faq/">Preguntas Frecuentes</a> | <a href="../glossary.html">Glosario</a> | <a href="../sitemap.html">Mapa de este sitio web</a></p></div>
</body></html>