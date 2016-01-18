<?xml version="1.0" encoding="ISO-8859-1"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="es" xml:lang="es"><head><!--
        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
              This file is generated from xml source: DO NOT EDIT
        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      -->
<title>Pasar a usar Apache 2.0 si ahora usa Apache 1.3 - Servidor HTTP Apache</title>
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
<a href="http://www.apache.org/">Apache</a> &gt; <a href="http://httpd.apache.org/">Servidor HTTP</a> &gt; <a href="http://httpd.apache.org/docs/">Documentaci�n</a> &gt; <a href="./">Versi�n 2.0</a></div><div id="page-content"><div id="preamble"><h1>Pasar a usar Apache 2.0 si ahora usa Apache 1.3</h1>
<div class="toplang">
<p><span>Idiomas disponibles: </span><a href="./de/upgrading.html" hreflang="de" rel="alternate" title="Deutsch">&nbsp;de&nbsp;</a> |
<a href="./en/upgrading.html" hreflang="en" rel="alternate" title="English">&nbsp;en&nbsp;</a> |
<a href="./es/upgrading.html" title="Espa�ol">&nbsp;es&nbsp;</a> |
<a href="./fr/upgrading.html" hreflang="fr" rel="alternate" title="Fran�ais">&nbsp;fr&nbsp;</a> |
<a href="./ja/upgrading.html" hreflang="ja" rel="alternate" title="Japanese">&nbsp;ja&nbsp;</a> |
<a href="./ko/upgrading.html" hreflang="ko" rel="alternate" title="Korean">&nbsp;ko&nbsp;</a> |
<a href="./ru/upgrading.html" hreflang="ru" rel="alternate" title="Russian">&nbsp;ru&nbsp;</a></p>
</div>

  <p>Este documento recoge infomaci�n cr�tica sobre el
  proceso de actulizaci�n de la versi�n de Apache que
  usa. Se trata de peque�os comentarios. Puede encontrar m�s
  informaci�n tanto en <a href="new_features_2_0.html">Nuevas
  funcionalidades</a>, como en el archivo
  <code>src/CHANGES</code>.</p>
</div>
<div id="quickview"><ul id="toc"><li><img alt="" src="./images/down.gif" /> <a href="#compile-time">Cambios en el proceso de configuraci�n y
    compilaci�n</a></li>
<li><img alt="" src="./images/down.gif" /> <a href="#run-time">Cambios en el proceso de configuraci�n inicial del
    servidor</a></li>
<li><img alt="" src="./images/down.gif" /> <a href="#misc">Cambios de menor importancia</a></li>
<li><img alt="" src="./images/down.gif" /> <a href="#third-party">M�dulos de terceras partes</a></li>
</ul><h3>Consulte tambi�n</h3><ul class="seealso"><li><a href="new_features_2_0.html">Visi�n general de las
nuevas funcionalidades de Apache 2.0</a></li></ul></div>
<div class="top"><a href="#page-header"><img alt="top" src="./images/up.gif" /></a></div>
<div class="section">
<h2><a name="compile-time" id="compile-time">Cambios en el proceso de configuraci�n y
    compilaci�n</a></h2>
    

    <ul>
      <li>Apache usa ahora <code>autoconf</code> y
      <code>libtool</code> <a href="install.html"> en el proceso de
      compilaci�n</a>.  Este sistema es parecido aunque no igual
      al sistema APACI de Apache 1.3.</li>

      <li>Adem�s de la selecci�n de m�dulos habitual
      que puede hacer al compilar, en Apache 2.0 la mayor parte del
      procesamiento de las petici�n es llevada a cabo por <a href="mpm.html">m�dulos de multiprocesamiento</a>
      (MPMs).</li>
    </ul>
  </div><div class="top"><a href="#page-header"><img alt="top" src="./images/up.gif" /></a></div>
<div class="section">
<h2><a name="run-time" id="run-time">Cambios en el proceso de configuraci�n inicial del
    servidor</a></h2>
    

    <ul>
      <li>Muchas directivas que pertenec�an al core (n�cleo)
      del servidor en Apache 1.3 se encuentran ahora en distintos
      m�dulos de multiprocesamiento. Si desea que el nuevo
      servidor de comporte de la forma m�s parecida posible a
      como lo hac�a Apache 1.3, debe usar el m�dulo de
      multiprocesamiento <code class="module"><a href="./mod/prefork.html">prefork</a></code>. Otros m�dulos
      de multiprocesamiento tienen diferentes directivas para
      controlar la creaci�n de procesos y el procesamiento de
      peticiones.</li>

      <li>El <a href="mod/mod_proxy.html">m�dulo proxy</a> ha
      sido remodelado para ponerlo al d�a con la
      especificaci�n HTTP/1.1.  Entre los cambios m�s
      importantes est� el que ahora el control de acceso al proxy
      est� dentro de un bloque <code class="directive"><a href="./mod/mod_proxy.html#proxy">&lt;Proxy&gt;</a></code> en lugar de en un bloque
      <code>&lt;Directory proxy:&gt;</code>.</li>

      <li>El procesamiento de <code>PATH_INFO</code> (la
      informaci�n que aparece detr�s de un nombre de fichero
      v�lido) ha cambiado en algunos m�dulos. Los
      m�dulos que fueron previamente implementados como un handler
      pero que ahora son implementados como un filtro puede que no
      acepten peticiones que incluyan <code>PATH_INFO</code>. Filtros
      como <a href="mod/mod_include.html">INCLUDES</a> o <a href="http://www.php.net/">PHP</a> est�n implementados
      sobre el handler principal (core handler), y por tanto
      rechazar�n peticiones con <code>PATH_INFO</code>. Puede
      usar la directiva <code class="directive"><a href="./mod/core.html#acceptpathinfo">AcceptPathInfo</a></code> para forzar al handler
      principal a aceptar peticiones con <code>PATH_INFO</code> y por
      tanto restaurar la posibilidad de usar <code>PATH_INFO</code> en
      server-side includes.</li>

      <li>La directiva <code class="directive"><a href="./mod/mod_negotiation.html#cachenegotiateddocs">CacheNegotiatedDocs</a></code> toma
      ahora como argumento <code>on</code> u <code>off</code>. Las
      instancias existentes de <code class="directive">CacheNegotiatedDocs</code> deben reemplazarse por
      <code>CacheNegotiatedDocs on</code>.</li>

      <li>
        La directiva <code class="directive"><a href="./mod/core.html#errordocument">ErrorDocument</a></code> no usa ya dobles
        comillas al principio del argumento para indicar el mensaje de
        texto a mostrar. En lugar de esto, ponga entre comillas todo
        el mensaje. Por ejemplo,

        <div class="example"><p><code>
          ErrorDocument 403 "Mensaje
        </code></p></div>
        debe sustituirse por

        <div class="example"><p><code>
          ErrorDocument 403 "Mensaje"
        </code></p></div>

        Si el segundo argumento no es una URL o una ruta v�lida a
        un archivo, ser� tratado como un mensaje de texto.
      </li>

      <li>Las directivas <code>AccessConfig</code> y
      <code>ResourceConfig</code> han desaparecido.  Las instancias
      existentes de estas directivas pueden ser sustituidas por
      directivas <code class="directive"><a href="./mod/core.html#include">Include</a></code> que
      tienen una funcionalidad equivalente. Si hac�a uso de los
      valores por defecto de esas directivas sin incluirlas en los
      ficheros de configuraci�n, puede que necesite a�adir
      <code>Include conf/access.conf</code> e <code>Include
      conf/srm.conf</code> a su fichero <code>httpd.conf</code>. Para
      asegurar que Apache lee el fichero de configuraci�n en el
      mismo orden que asum�an las antiguas directivas, las
      directivas <code class="directive"><a href="./mod/core.html#include">Include</a></code> deben
      ser reemplazadas al final del fichero <code>httpd.conf</code>,
      con la de <code>srm.conf</code> precediendo a la de
      <code>access.conf</code>.</li>

      <li>Las directivas <code>BindAddress</code> y <code>Port</code>
      no existen ya. Las funcionalidades que ofrec�an esas
      directivas est�n ahora cubiertas por la directiva
      <code class="directive"><a href="./mod/mpm_common.html#listen">Listen</a></code>, que es mucho
      m�s flexible.</li>

      <li>Otro uso de la directiva <code>Port</code> en Apache 1.3 era
      fijar el n�mero de puerto que se usaba para URLs
      autoreferenciadas. La directiva equivalente en Apache 2.0 es la
      nueva directiva <code class="directive"><a href="./mod/core.html#servername">ServerName</a></code>:
      este cambio se ha introducido para permitir la
      especificaci�n del nombre de host <em>y</em> del
      n�mero de puerto para URLs autorreferenciadas en una sola
      directiva.</li>

      <li>La directiva <code>ServerType</code> ha dejado de existir.
      El m�todo usado para servir peticiones est� ahora
      determinado por la selecci�n del m�dulo de
      multiprocesamiento. Actualmente no hay dise�ado un
      m�dulo de multiprocesamiento que pueda ser ejecutado por
      inetd.</li>

      <li>Los m�dulos <code>mod_log_agent</code> y
      <code>mod_log_referer</code> que conten�an las directivas
      <code>AgentLog</code>, <code>RefererLog</code> y
      <code>RefererIgnore</code> han desaparecido. Los registros de
      "agente" y de "referer" est�n disponibles todav�a
      usando la directiva <code class="directive"><a href="./mod/mod_log_config.html#customlog">CustomLog</a></code> del m�dulo
      <code class="module"><a href="./mod/mod_log_config.html">mod_log_config</a></code>.</li>

      <li>Las directivas <code>AddModule</code> y
      <code>ClearModuleList</code> no est�n presentes en la nueva
      versi�n de Apache.  Estas directivas se usaban para
      asegurar que los m�dulos pudieran activarse en el orden
      correcto. La nueva API de Apache 2.0 permite a los m�dulos
      especificar expl�citamente su orden de activaci�n,
      eliminando la necesidad de las antiguas directivas.</li>

      <li>La directiva <code>FancyIndexing</code> se ha eliminado.  La
      funcionalidad que cubr�a est� ahora disponible a
      trav�s de la opci�n <code>FancyIndexing</code> de la
      directiva <code class="directive"><a href="./mod/mod_autoindex.html#indexoptions">IndexOptions</a></code>.</li>

      <li>La t�cnica de negociaci�n de contenido MultiViews
      ofrecida por <code class="module"><a href="./mod/mod_negotiation.html">mod_negotiation</a></code> es ahora m�s
      estricta en su algoritmo de selecci�n de ficheros y solo
      seleccionar� ficheros <em>negociables</em>.  El antiguo
      comportamiento puede restaurarse usando la directiva <code class="directive"><a href="./mod/mod_mime.html#multiviewsmatch">MultiviewsMatch</a></code>.</li>

      <li>(<em>a partir de la versi�n 2.0.51</em>) <p>La
      funcionalidad de la directiva <code>ErrorHeader</code> se ha
      unido con la de la directiva <code class="directive"><a href="./mod/mod_headers.html#header">Header</a></code>, porque se estaba usando
      un t�rmino equivocado. Use</p>
 
      <div class="example"><p><code>
        Header always set foo bar
      </code></p></div>

      <p>en lugar de conseguir el comportamiento deseado.</p></li>

    </ul>
  </div><div class="top"><a href="#page-header"><img alt="top" src="./images/up.gif" /></a></div>
<div class="section">
<h2><a name="misc" id="misc">Cambios de menor importancia</a></h2>
    

    <ul>
      <li>El m�dulo <code class="module"><a href="./mod/mod_auth_digest.html">mod_auth_digest</a></code>, que era
      experimental en Apache 1.3, es ahora un m�dulo
      est�ndar.</li>

      <li>El m�dulo <code>mod_mmap_static</code>, que era
      experimental en Apache 1.3, ha sido sustituido por el
      m�dulo <code class="module"><a href="./mod/mod_file_cache.html">mod_file_cache</a></code>.</li>

      <li>La distribuci�n de Apache ha sido reorganizada por
      completo para que no contenga a partir de ahora el directorio
      independiente <code>src</code>. En su lugar, el c�digo
      fuente se ha organizado a partir del directorio principal de la
      distribuci�n, y las intalaciones del servidor compilado
      deben hacerse en un directorio diferente.</li>
    </ul>
  </div><div class="top"><a href="#page-header"><img alt="top" src="./images/up.gif" /></a></div>
<div class="section">
<h2><a name="third-party" id="third-party">M�dulos de terceras partes</a></h2>
    

    <p>La API de Apache 2.0 ha sufrido grandes cambios respecto a la
    versi�n 1.3. Los m�dulos que se dise�aron para la
    API de Apache 1.3 <strong>no</strong> funcionar�n si no se
    hacen las modificaciones necasarias para adaptarlos a Apache 2.0.
    En la <a href="developer/">documentaci�n para
    desarrolladores</a> puede encontrar informaci�n detallada
    sobre este asunto.</p>
  </div></div>
<div class="bottomlang">
<p><span>Idiomas disponibles: </span><a href="./de/upgrading.html" hreflang="de" rel="alternate" title="Deutsch">&nbsp;de&nbsp;</a> |
<a href="./en/upgrading.html" hreflang="en" rel="alternate" title="English">&nbsp;en&nbsp;</a> |
<a href="./es/upgrading.html" title="Espa�ol">&nbsp;es&nbsp;</a> |
<a href="./fr/upgrading.html" hreflang="fr" rel="alternate" title="Fran�ais">&nbsp;fr&nbsp;</a> |
<a href="./ja/upgrading.html" hreflang="ja" rel="alternate" title="Japanese">&nbsp;ja&nbsp;</a> |
<a href="./ko/upgrading.html" hreflang="ko" rel="alternate" title="Korean">&nbsp;ko&nbsp;</a> |
<a href="./ru/upgrading.html" hreflang="ru" rel="alternate" title="Russian">&nbsp;ru&nbsp;</a></p>
</div><div id="footer">
<p class="apache">Copyright 1995-2006 The Apache Software Foundation or its licensors, as applicable.<br />Licencia bajo los t�rminos de la <a href="http://www.apache.org/licenses/LICENSE-2.0">Apache License, Version 2.0</a>.</p>
<p class="menu"><a href="./mod/">M�dulos</a> | <a href="./mod/directives.html">Directivas</a> | <a href="./faq/">Preguntas Frecuentes</a> | <a href="./glossary.html">Glosario</a> | <a href="./sitemap.html">Mapa de este sitio web</a></p></div>
</body></html>