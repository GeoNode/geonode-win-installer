<?xml version="1.0" encoding="ISO-8859-1"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="es" xml:lang="es"><head><!--
        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
              This file is generated from xml source: DO NOT EDIT
        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      -->
<title>Iniciar Apache - Servidor HTTP Apache</title>
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
<a href="http://www.apache.org/">Apache</a> &gt; <a href="http://httpd.apache.org/">Servidor HTTP</a> &gt; <a href="http://httpd.apache.org/docs/">Documentaci�n</a> &gt; <a href="./">Versi�n 2.0</a></div><div id="page-content"><div id="preamble"><h1>Iniciar Apache</h1>
<div class="toplang">
<p><span>Idiomas disponibles: </span><a href="./de/invoking.html" hreflang="de" rel="alternate" title="Deutsch">&nbsp;de&nbsp;</a> |
<a href="./en/invoking.html" hreflang="en" rel="alternate" title="English">&nbsp;en&nbsp;</a> |
<a href="./es/invoking.html" title="Espa�ol">&nbsp;es&nbsp;</a> |
<a href="./ja/invoking.html" hreflang="ja" rel="alternate" title="Japanese">&nbsp;ja&nbsp;</a> |
<a href="./ko/invoking.html" hreflang="ko" rel="alternate" title="Korean">&nbsp;ko&nbsp;</a> |
<a href="./ru/invoking.html" hreflang="ru" rel="alternate" title="Russian">&nbsp;ru&nbsp;</a></p>
</div>

    <p>En Windows, Apache se ejecuta normalmente como un servicio en
    Windows NT, 2000 y XP, y como una aplicaci�n de consola en
    Windows 9x y ME. Para obtener m�s informaci�n, consulte
    <a href="platform/windows.html#winsvc">Ejecutar Apache como un
    servicio</a> y <a href="platform/windows.html#wincons">Ejecutar
    Apache como una aplicaci�n de consola</a>.</p>

    <p>En Unix, el programa <code class="program"><a href="./programs/httpd.html">httpd</a></code> se ejecuta como
    un demonio (daemon) en modo silencioso y atiende las peticiones
    que le lleguen.  Este documento explica c�mo invocar el
    programa <code class="program"><a href="./programs/httpd.html">httpd</a></code>.</p>
</div>
<div id="quickview"><ul id="toc"><li><img alt="" src="./images/down.gif" /> <a href="#startup">C�mo iniciar Apache</a></li>
<li><img alt="" src="./images/down.gif" /> <a href="#errors">Errores Durante el Arranque</a></li>
<li><img alt="" src="./images/down.gif" /> <a href="#boot">Iniciar Apache al Iniciar el Sistema</a></li>
<li><img alt="" src="./images/down.gif" /> <a href="#info">Informaci�n Adicional</a></li>
</ul><h3>Consulte tambi�n</h3><ul class="seealso"><li><a href="stopping.html">Parar y reiniciar Apache</a></li><li><code class="program"><a href="./programs/httpd.html">httpd</a></code></li><li><code class="program"><a href="./programs/apachectl.html">apachectl</a></code></li></ul></div>
<div class="top"><a href="#page-header"><img alt="top" src="./images/up.gif" /></a></div>
<div class="section">
<h2><a name="startup" id="startup">C�mo iniciar Apache</a></h2>

    <p>Si el puerto especificado en la directiva <code class="directive"><a href="./mod/mpm_common.html#listen">Listen</a></code> del fichero de
    configuraci�n es el que viene por defecto, es decir, el
    puerto 80 (o cualquier otro puerto por debajo del 1024), es
    necesario tener privilegios de usuario root (superusuario) para
    iniciar Apache. Solamente con esos privilegios puede establecerse
    una conexi�n a trav�s de esos puertos. Una vez que el
    servidor Apache se ha iniciado y ha completado algunas tareas
    preliminares, como abrir sus ficheros log, lanzar� varios
    procesos <em>hijo</em>, que hacen el trabajo de escuchar y atender
    las peticiones de los clientes.  El proceso principal,
    <code>httpd</code> contin�a ejecutandose como root, pero los
    procesos hijo se ejecutan con menores privilegios de usuario.
    Esto lo controla el <a href="mpm.html">m�dulo de
    multiprocesamiento (MPM)</a> seleccionado.</p>

    <p>El m�todo recomendado para invocar el ejecutable
    <code class="program"><a href="./programs/httpd.html">httpd</a></code> es usar el script de control
    <code class="program"><a href="./programs/apachectl.html">apachectl</a></code>.  Este script fija los valores de
    determinadas variables de entorno que son necesarias para que
    <code>httpd</code> funcione correctamente en el sistema operativo,
    y despu�s invoca el binario <code class="program"><a href="./programs/httpd.html">httpd</a></code>.
    <code class="program"><a href="./programs/apachectl.html">apachectl</a></code> pasa a httpd cualquier argumento que
    se le pase a trav�s de la l�nea de comandos, de forma
    que cualquier opci�n de <code class="program"><a href="./programs/httpd.html">httpd</a></code> puede ser
    usada tambi�n con <code class="program"><a href="./programs/apachectl.html">apachectl</a></code>.  Puede editar
    directamente el script <code class="program"><a href="./programs/apachectl.html">apachectl</a></code> y cambiar la
    variable <code>HTTPD</code> que est� al principio y que
    especifica la ubicaci�n exacta en la que est� el binario
    <code class="program"><a href="./programs/httpd.html">httpd</a></code> y cualquier argumento de l�nea de
    comandos que quiera que est� <em>siempre</em> presente cuando
    use este script.</p>

    <p>La primera cosa que hace <code>httpd</code> cuando es invocado
    es localizar y leer el <a href="configuring.html">fichero de
    configuraci�n</a> <code>httpd.conf</code>. El lugar en el que
    est� ese fichero se determina al compilar, pero tambi�n
    es posible especificar la ubicaci�n en la que se encuentra al
    iniciar el servidor Apache usando la opci�n de l�nea de
    comandos <code>-f</code></p>

<div class="example"><p><code>/usr/local/apache2/bin/apachectl -f
      /usr/local/apache2/conf/httpd.conf</code></p></div>

    <p>Si todo va bien durante el arranque, la sesi�n de terminal
    se suspender� un momento y volver� a estar activa casi
    inmediatamente. Esto quiere decir que el servidor est� activo
    y funcionando.  Puede usar su navegador para conectarse al
    servidor y ver la p�gina de prueba que hay en el directorio
    <code class="directive"><a href="./mod/core.html#documentroot">DocumentRoot</a></code> y la copia local
    de esta documentaci�n a la que se puede acceder desde esa
    p�gina.</p>
</div><div class="top"><a href="#page-header"><img alt="top" src="./images/up.gif" /></a></div>
<div class="section">
<h2><a name="errors" id="errors">Errores Durante el Arranque</a></h2>

    <p>Si se produce alg�n error irrecuperable durante el proceso de
    arranque de Apache, aparecer� un mensaje describiendo el
    problema en la consola o en el archivo <code class="directive"><a href="./mod/core.html#errorlog">ErrorLog</a></code> antes de abortar la
    ejecuci�n. Uno de los mensajes de error m�s comunes es
    "<code>Unable to bind to Port ...</code>". Cuando se recibe este
    mensaje es normalmente por alguna de las siguientes razones:</p>

    <ul>
      <li>Est� intentando iniciar el servidor Apache en un puerto
      privilegiado (del 0 al 1024) sin haber hecho login como usuario
      root; �</li>

      <li>Est� intentando iniciar el servidor Apache mientras
      est� ya ejecutando Apache o alg�n otro servidor web en
      el mismo puerto.</li>
    </ul>

    <p>Puede encontrar m�s informaci�n sobre c�mo
    solucionar estos problemas, en la secci�n de <a href="faq/">Preguntas Frecuentes</a> de Apache.</p>
</div><div class="top"><a href="#page-header"><img alt="top" src="./images/up.gif" /></a></div>
<div class="section">
<h2><a name="boot" id="boot">Iniciar Apache al Iniciar el Sistema</a></h2>

    <p>Si quiere que el servidor Apache contin�e su
    ejecuci�n despu�s de reiniciar el sistema, debe
    a�adir una llamada a <code class="program"><a href="./programs/apachectl.html">apachectl</a></code> en sus
    archivos de arranque (normalmente <code>rc.local</code> o
    alg�n fichero un directorio del tipo <code>rc.N</code>). Esto
    iniciar� Apache como usuario root. Antes de hacer esto,
    aseg�rese de que la configuraci�n de seguridad y las
    restricciones de acceso de su servidor Apache est�n
    correctamente configuradas.</p>

    <p>El script <code class="program"><a href="./programs/apachectl.html">apachectl</a></code> est� dise�ado
    para actuar como un script est�ndar de tipo SysV init; puede
    tomar los argumentos <code>start</code>, <code>restart</code>, y
    <code>stop</code> y traducirlos en las se�ales apropiadas
    para <code class="program"><a href="./programs/httpd.html">httpd</a></code>.  De esta manera, casi siempre puede
    simplemente enlazar <code class="program"><a href="./programs/apachectl.html">apachectl</a></code> con el directorio
    init adecuado. Pero aseg�rese de comprobar cuales son los
    requerimientos espec�ficos de su sistema.</p>
</div><div class="top"><a href="#page-header"><img alt="top" src="./images/up.gif" /></a></div>
<div class="section">
<h2><a name="info" id="info">Informaci�n Adicional</a></h2>

    <p>En la secci�n <a href="programs/">El Servidor y Programas
    de Soporte</a> puede encontrar m�s informaci�n sobre las
    opciones de l�nea de comandos que puede pasar a
    <code class="program"><a href="./programs/httpd.html">httpd</a></code> y a <code class="program"><a href="./programs/apachectl.html">apachectl</a></code> as�
    como sobre otros programas de soporte incluidos con el servidor
    Apache. Tambi�n hay documentaci�n sobre todos los <a href="mod/">m�dulos</a> incluidos con la distribuci�n de
    Apache y sus correspondientes <a href="mod/directives.html">directivas</a> asociadas.</p>
</div></div>
<div class="bottomlang">
<p><span>Idiomas disponibles: </span><a href="./de/invoking.html" hreflang="de" rel="alternate" title="Deutsch">&nbsp;de&nbsp;</a> |
<a href="./en/invoking.html" hreflang="en" rel="alternate" title="English">&nbsp;en&nbsp;</a> |
<a href="./es/invoking.html" title="Espa�ol">&nbsp;es&nbsp;</a> |
<a href="./ja/invoking.html" hreflang="ja" rel="alternate" title="Japanese">&nbsp;ja&nbsp;</a> |
<a href="./ko/invoking.html" hreflang="ko" rel="alternate" title="Korean">&nbsp;ko&nbsp;</a> |
<a href="./ru/invoking.html" hreflang="ru" rel="alternate" title="Russian">&nbsp;ru&nbsp;</a></p>
</div><div id="footer">
<p class="apache">Copyright 1995-2006 The Apache Software Foundation or its licensors, as applicable.<br />Licencia bajo los t�rminos de la <a href="http://www.apache.org/licenses/LICENSE-2.0">Apache License, Version 2.0</a>.</p>
<p class="menu"><a href="./mod/">M�dulos</a> | <a href="./mod/directives.html">Directivas</a> | <a href="./faq/">Preguntas Frecuentes</a> | <a href="./glossary.html">Glosario</a> | <a href="./sitemap.html">Mapa de este sitio web</a></p></div>
</body></html>