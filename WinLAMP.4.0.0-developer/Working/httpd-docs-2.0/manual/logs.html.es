<?xml version="1.0" encoding="ISO-8859-1"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="es" xml:lang="es"><head><!--
        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
              This file is generated from xml source: DO NOT EDIT
        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      -->
<title>Archivos de Registro (Log Files) - Servidor HTTP Apache</title>
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
<a href="http://www.apache.org/">Apache</a> &gt; <a href="http://httpd.apache.org/">Servidor HTTP</a> &gt; <a href="http://httpd.apache.org/docs/">Documentaci�n</a> &gt; <a href="./">Versi�n 2.0</a></div><div id="page-content"><div id="preamble"><h1>Archivos de Registro (Log Files)</h1>
<div class="toplang">
<p><span>Idiomas disponibles: </span><a href="./en/logs.html" hreflang="en" rel="alternate" title="English">&nbsp;en&nbsp;</a> |
<a href="./es/logs.html" title="Espa�ol">&nbsp;es&nbsp;</a> |
<a href="./ja/logs.html" hreflang="ja" rel="alternate" title="Japanese">&nbsp;ja&nbsp;</a> |
<a href="./ko/logs.html" hreflang="ko" rel="alternate" title="Korean">&nbsp;ko&nbsp;</a></p>
</div>

    <p>Para administrar de manera efectiva un servidor web, es
    necesario tener registros de la actividad y el rendimiento del
    servidor as� como de cualquier problema que haya podido
    ocurrir durante su operaci�n. El servidor HTTP Apache ofrece
    capacidades muy amplias de registro de este tipo de
    informaci�n. Este documento explica c�mo configurar esas
    capacidades de registro, y c�mo comprender qu�
    informaci�n contienen los ficheros de registro.</p>
  </div>
<div id="quickview"><ul id="toc"><li><img alt="" src="./images/down.gif" /> <a href="#security">Advertencia de seguridad</a></li>
<li><img alt="" src="./images/down.gif" /> <a href="#errorlog">Registro de Errores (Error Log)</a></li>
<li><img alt="" src="./images/down.gif" /> <a href="#accesslog">Registro de Acceso (Access Log)</a></li>
<li><img alt="" src="./images/down.gif" /> <a href="#rotation">Rotaci�n de los ficheros de registro</a></li>
<li><img alt="" src="./images/down.gif" /> <a href="#piped">Ficheros de registro redireccionados (Piped Logs)</a></li>
<li><img alt="" src="./images/down.gif" /> <a href="#virtualhost">Hosts Virtuales</a></li>
<li><img alt="" src="./images/down.gif" /> <a href="#other">Otros ficheros de registro</a></li>
</ul></div>
<div class="top"><a href="#page-header"><img alt="top" src="./images/up.gif" /></a></div>
<div class="section">
<h2><a name="security" id="security">Advertencia de seguridad</a></h2>
    

    <p>Cualquiera que tenga permisos de escritura sobre el directorio
    en el que Apache est� escribiendo un archivo de registro
    puede con casi toda seguridad tener acceso al identificador de
    usuario con el que se inici� el servidor, normalmente
    root. <em>NO</em> le de a nadie permisos de escritura sobre el
    directorio en que se almacenan los ficheros de registro sin tener
    en cuenta las consecuencias; consulte los <a href="misc/security_tips.html">consejos de seguridad</a> para
    obtener m�s informaci�n.</p>

    <p>Adem�s, los ficheros de registro pueden contener
    informaci�n suministrada directamente por el cliente, sin
    sustituir. Es posible por tanto que clientes con malas intenciones
    inserten caracteres de control en los ficheros de registro. Por
    ello es necesario tener cuidado cuando se procesan los ficheros de
    registro originales.</p>
  </div><div class="top"><a href="#page-header"><img alt="top" src="./images/up.gif" /></a></div>
<div class="section">
<h2><a name="errorlog" id="errorlog">Registro de Errores (Error Log)</a></h2>
    

    <table class="related"><tr><th>M�dulos Relacionados</th><th>Directivas Relacionadas</th></tr><tr><td /><td><ul><li><code class="directive"><a href="./mod/core.html#errorlog">ErrorLog</a></code></li><li><code class="directive"><a href="./mod/core.html#loglevel">LogLevel</a></code></li></ul></td></tr></table>

    <p>El registro de errores del servidor, cuyo nombre y
    ubicaci�n se especifica en la directiva <code class="directive"><a href="./mod/core.html#errorlog">ErrorLog</a></code>, es el m�s importante de
    todos los registros. Apache enviar� cualquier
    informaci�n de diagn�stico y registrar� cualquier
    error que encuentre al procesar peticiones al archivo de registro
    seleccionado. Es el primer lugar donde tiene que mirar cuando
    surja un problema al iniciar el servidor o durante su
    operaci�n normal, porque con frecuencia encontrar� en
    �l informaci�n detallada de qu� ha ido mal y
    c�mo solucionar el problema.</p>

    <p>El registro de errores se escribe normalmente en un fichero
    (cuyo nombre suele ser <code>error_log</code> en sistemas Unix y
    <code>error.log</code> en Windows y OS/2). En sistemas Unix
    tambi�n es posible hacer que el servidor env�e los
    mensajes de error al <code>syslog</code> o <a href="#piped">pasarlos a un programa</a>.</p>

    <p>El formato del registro de errores es relativamente libre y
    descriptivo. No obstante, hay cierta informaci�n que se
    incluye en casi todas las entradas de un registro de errores. Por
    ejemplo, este es un mensaje t�pico.</p>

    <div class="example"><p><code>
      [Wed Oct 11 14:32:52 2000] [error] [client 127.0.0.1]
      client denied by server configuration:
      /export/home/live/ap/htdocs/test
    </code></p></div>

    <p>El primer elemento de la entrada es la fecha y la hora del
    mensaje. El segundo elemento indica la gravedad del error que se
    ha producido. La directiva <code class="directive"><a href="./mod/core.html#loglevel">LogLevel</a></code> se usa para controlar los tipos
    de errores que se env�an al registro de errores seg�n su
    gravedad. La tercera parte contiene la direcci�n IP del
    cliente que gener� el error. Despu�s de la direcci�n
    IP est� el mensaje de error propiamente dicho, que en este
    caso indica que el servidor ha sido configurado para denegar el
    acceso a ese cliente. El servidor reporta tambi�n la ruta en
    el sistema de ficheros (en vez de la ruta en el servidor
    web) del documento solicitado.</p>

    <p>En el registro de errores puede aparecer una amplia variedad de
    mensajes diferentes. La mayor�a tienen un aspecto similar al
    del ejemplo de arriba. El registro de errores tambi�n
    contiene mensaje de depuraci�n de scripts CGI. Cualquier
    informaci�n escrita en el <code>stderr</code> por un script
    CGI se copiar� directamente en el registro de errores.</p>

    <p>El registro de errores no se puede personalizar a�adiendo
    o quitando informaci�n. Sin embargo, las entradas del
    registro de errores que se refieren a determinadas peticiones
    tienen sus correspondientes entradas en el <a href="#accesslog">registro de acceso</a>. El ejemplo de arriba se
    corresponde con una entrada en el registro de acceso que
    tendr� un c�digo de estado 403. Como es posible
    personalizar el registro de acceso, puede obtener m�s
    informaci�n sobre los errores que se producen usando ese
    registro tambi�n.</p>

    <p>Si hace pruebas, suele ser de utilidad monitorizar de forma
    continua el registro de errores para comprobar si ocurre
    alg�n problema. En sistemas Unix, puede hacer esto
    usando:</p>

    <div class="example"><p><code>
      tail -f error_log
    </code></p></div>
  </div><div class="top"><a href="#page-header"><img alt="top" src="./images/up.gif" /></a></div>
<div class="section">
<h2><a name="accesslog" id="accesslog">Registro de Acceso (Access Log)</a></h2>
    

    <table class="related"><tr><th>M�dulos Relacionados</th><th>Directivas Relacionadas</th></tr><tr><td><ul><li><code class="module"><a href="./mod/mod_log_config.html">mod_log_config</a></code></li><li><code class="module"><a href="./mod/mod_setenvif.html">mod_setenvif</a></code></li></ul></td><td><ul><li><code class="directive"><a href="./mod/mod_log_config.html#customlog">CustomLog</a></code></li><li><code class="directive"><a href="./mod/mod_log_config.html#logformat">LogFormat</a></code></li><li><code class="directive"><a href="./mod/mod_setenvif.html#setenvif">SetEnvIf</a></code></li></ul></td></tr></table>

    <p>El servidor almacena en el registro de acceso informaci�n
    sobre todas las peticiones que procesa. La ubicaci�n del
    fichero de registro y el contenido que se registra se pueden
    modificar con la directiva <code class="directive"><a href="./mod/mod_log_config.html#customlog">CustomLog</a></code>. Puede usar la
    directiva <code class="directive"><a href="./mod/mod_log_config.html#logformat">LogFormat</a></code>
    para simplificar la selecci�n de los contenidos que quiere
    que se incluyan en los registros. Esta secci�n explica como
    configurar el servidor para que registre la informaci�n que
    usted considere oportuno en el registro de acceso.</p>

    <p>Por supuesto, almacenar informaci�n en el registro de
    acceso es solamente el principio en la gesti�n de los
    registros. El siguiente paso es analizar la informaci�n que
    contienen para producir estad�sticas que le resulten de
    utilidad. Explicar el an�lisis de los registros en general
    est� fuera de los prop�sitos de este documento, y no es
    propiamente una parte del trabajo del servidor web. Para m�s
    informaci�n sobre este tema, y para aplicaciones que analizan
    los registros, puede visitar
    <a href="http://dmoz.org/Computers/Software/Internet/Site_Management/Log_analysis/">
    Open Directory</a> o <a href="http://dir.yahoo.com/Computers_and_Internet/Software/Internet/World_Wide_Web/Servers/Log_Analysis_Tools/">
    Yahoo</a>.</p>

    <p>Diferentes versiones de Apache httpd han usado otros
    m�dulos y directivas para controlar la informaci�n que
    se almacena en el registro de acceso, incluyendo mod_log_referer,
    mod_log_agent, y la directiva <code>TransferLog</code>. Ahora la
    directiva <code class="directive"><a href="./mod/mod_log_config.html#customlog">CustomLog</a></code>
    asume toda la funcionalidad que antes estaba repartida.</p>

    <p>El formato del registro de acceso es altamente configurable. El
    formato se especifica usando una cadena de caracteres de formato
    similar a las de printf(1) en lenguaje C. Hay algunos ejemplos en
    las siguientes secciones. Si quiere una lista completa de los
    posibles contenidos que se pueden incluir, consulte la
    documentaci� sobre <a href="mod/mod_log_config.html#formats">las cadenas de caracteres
    de formato</a> del <code class="module"><a href="./mod/mod_log_config.html">mod_log_config</a></code>.</p>

    <h3><a name="common" id="common">Formato Com�n de Registro (Common Log
      Format)</a></h3>
      

      <p>Una configuraci�n t�pica del registro de acceso
      podr�a tener un aspecto similar a este.</p>

      <div class="example"><p><code>
        LogFormat "%h %l %u %t \"%r\" %&gt;s %b" common<br />
         CustomLog logs/access_log common
      </code></p></div>

      <p>Con esto se define el <em>apodo (nickname)</em> <code>common</code> y se
      le lo asocia con un determinado formato. El formato consiste en
      una serie de directivas con tantos por ciento, cada una de las
      cuales le dice al servidor que registre una determinada
      informaci�n en particular. El formato tambi�n puede
      incluir caracteres literales, que se copiar�n directamente
      en el registro. Si usa el caracter comillas (<code>"</code>)
      debe anteponerle una barra invertida para evitar que sea
      interpretado como el final la cadena de caracteres a
      registrar. El formato que especifique tambi�n puede
      contener los caracteres de control especiales "<code>\n</code>"
      para salto de l�nea y "<code>\t</code>" para tabulador.</p>

      <p>La directiva <code class="directive"><a href="./mod/mod_log_config.html#customlog">CustomLog</a></code> crea un nuevo
	  fichero de registro usando el <em>apodo</em> definido. El
	  nombre del fichero de registro de acceso se asume que es
	  relativo al valor especificado en <code class="directive"><a href="./mod/core.html#serverroot">ServerRoot</a></code> a no ser que empiece
	  por una barra (/).</p>

      <p>La configuraci�n de arriba escribir� las entradas
      en el registro con el formato conocido como Formato Com�n
      de Registro (CLF). Este formato est�ndar lo pueden generar
      muchos servidores web diferentes y lo pueden leer muchos de los
      progrmas que analizan registros. Las entradas de un fichero de
      registro que respetan ese formato com�n tienen una
      aparariencia parecida es esta:</p>

      <div class="example"><p><code>
        127.0.0.1 - frank [10/Oct/2000:13:55:36 -0700] "GET
        /apache_pb.gif HTTP/1.0" 200 2326
      </code></p></div>

      <p>Cada una de las partes de la entrada se explican a
      continuaci#243;n.</p>

      <dl>
        <dt><code>127.0.0.1</code> (<code>%h</code>)</dt>

        <dd>Es la direcci�n IP del cliente (host remoto) que hizo
        la petici�n al servidor. Si la directiva <code class="directive"><a href="./mod/core.html#hostnamelookups">HostnameLookups</a></code> tiene valor
        <code>On</code>, el servidor intentar� determinar el
        nombre del host y registrar ese nombre en lugar de la
        direcci�n IP. Sin embargo, no se recomienda que use esta
        configuraci�n porque puede ralentizar significativamente
        las operaciones del servidor. En su lugar, es mejor usar un
        programa que realice esta tarea posteriormente sobre el
        registro, por ejemplo <code class="program"><a href="./programs/logresolve.html">logresolve</a></code>. Las
        direcciones IP que se registren no son necesariamente las
        direcciones de las m�quinas de los usuarios finales. Si
        existe un servidor proxy entre el usuario final y el servidor,
        la direcci�n que se registra es la del proxy.</dd>

        <dt><code>-</code> (<code>%l</code>)</dt>

        <dd>Un "gui�n" siginifica que la informaci�n que
        deber�a ir en ese lugar no est� disponible. En este
        caso, esa informaci�n es la identidad RFC 1413 del
        cliente determinada por <code>identd</code> en la m�quina
        del cliente. Esta informaci�n es muy poco fiable y no
        deber�a ser usada nunca excepto con clientes que
        est�n sometidos a controles muy estrictos en redes
        internas. Apache httpd ni siquiera intenta recoger esa
        informaci�n a menos que la directiva <code class="directive"><a href="./mod/core.html#identitycheck">IdentityCheck</a></code> tenga valor
        <code>On</code>.</dd>

        <dt><code>frank</code> (<code>%u</code>)</dt>

        <dd>Este es el identificador de usuario de la persona que
        solicita el documento determinado por la autentificaci�n
        HTTP. Normalmente ese mismo valor se pasa a los scripts CGI
        con la variable de entorno <code>REMOTE_USER</code>. Si el
        c�digo de estado de la petici�n (ver abajo) es 401,
        entonces no debe confiar en la veracidad de ese dato porque el
        usuario no ha sido a�n autentificado. Si el documento no
        est� protegido por contrase�a, se mostrar� un
        gui�n "<code>-</code>" en esta entrada.</dd>

        <dt><code>[10/Oct/2000:13:55:36 -0700]</code>
        (<code>%t</code>)</dt>

        <dd>
          La hora a la que el servidor recibi� la
          petici�n. El formato es:

          <p class="indent">
            <code>[d�a/mes/a�o:hora:minuto:segundo zona_horaria]<br />
             day = 2*digit<br />
             month = 3*letter<br />
             year = 4*digit<br />
             hour = 2*digit<br />
             minute = 2*digit<br />
             second = 2*digit<br />
             zone = (`+' | `-') 4*digit</code>
          </p>
          Es posible mostrar la hora de otra manera especificando
          <code>%{format}</code> en el formato a usar en el registro,
          donde <code>format</code> se sustituye como se har�a al
          usar <code>strftime(3)</code> de la librer�a
          est�ndar de C.
        </dd>

        <dt><code>"GET /apache_pb.gif HTTP/1.0"</code>
        (<code>\"%r\"</code>)</dt>

        <dd>La l�nea de la petici�n del cliente se muestra
        entre dobles comillas. La l�nea de petici�n contiene
        mucha informaci�n de utilidad. Primero, el m�todo
        usado por el cliente es <code>GET</code>. Segundo, el cliente
        ha hecho una petici�n al recurso
        <code>/apache_pb.gif</code>, y tercero, el cliente uso el
        protocolo <code>HTTP/1.0</code>. Tambi�n es posible
        registrar una o m�s partes de la l�nea de
        petici�n independientemente. Por ejemplo, el formato
        "<code>%m %U%q %H</code>" registrar� el m�todo, ruta,
        cadena de consulta y protocolo, teniendo exactamente el mismo
        resultado que "<code>%r</code>".</dd>

        <dt><code>200</code> (<code>%&gt;s</code>)</dt>

        <dd>Es el c�digo de estado que el servidor env�a de
        vuelta al cliente. Esta informaci�n es muy valiosa,
        porque revela si la petici�n fue respondida con
        �xito por el servidor (los c�digos que empiezan por
        2), una redirecci�n (los c�digos que empiezan por
        3), un error provocado por el cliente (los c�digos que
        empiezan por 4), o un error en el servidor (los c�digos
        que empiezan por 5). La lista completa de c�digos de
        estado posibles puede consultarle en <a href="http://www.w3.org/Protocols/rfc2616/rfc2616.txt">la
        especificaci�n de HTTP</a> (RFC2616 secci�n
        10).</dd>

        <dt><code>2326</code> (<code>%b</code>)</dt>

        <dd>La �ltima entrada indica el tama�o del objeto
        retornado por el cliente, no inclu�das las cabeceras de
        respuesta. Si no se respondi� con ning�n contenido
        al cliente, este valor mostrar� valor
        "<code>-</code>". Para registrar "<code>0</code>" en ese caso,
        use <code>%B</code> en su lugar.</dd>
      </dl>
    

    <h3><a name="combined" id="combined">Formato de Registro Combinado (Combined Log Format)</a></h3>
      

      <p>Otro formato usado a menudo es el llamado Formato de Registro
      Combinado. Este formato puede ser usado como sigue.</p>

      <div class="example"><p><code>
        LogFormat "%h %l %u %t \"%r\" %&gt;s %b \"%{Referer}i\"
        \"%{User-agent}i\"" combined<br />
         CustomLog log/access_log combined
      </code></p></div>

      <p>Es exactamente igual que Formato Com�n de Registro, pero
      a�ade dos campos. Cada campo adicional usa la directiva
      <code>%{<em>header</em>}i</code>, donde <em>header</em> puede
      ser cualquier cabecera de petici�n HTTP. El registro de
      acceso cuando se usa este formato tendr� este aspecto:</p>

      <div class="example"><p><code>
        127.0.0.1 - frank [10/Oct/2000:13:55:36 -0700] "GET
        /apache_pb.gif HTTP/1.0" 200 2326
        "http://www.example.com/start.html" "Mozilla/4.08 [en]
        (Win98; I ;Nav)"
      </code></p></div>

      <p>Los campos adicionales son:</p>

      <dl>
        <dt><code>"http://www.example.com/start.html"</code>
        (<code>\"%{Referer}i\"</code>)</dt>

        <dd>La cabecera de petici�n de HTTP "Referer"
        (sic). Muestra el servidor del que proviene el cliente. (Esta
        deber�a ser la p�gina que contiene un enlace o
        que contiene a <code>/apache_pb.gif</code>).</dd>

        <dt><code>"Mozilla/4.08 [en] (Win98; I ;Nav)"</code>
        (<code>\"%{User-agent}i\"</code>)</dt>

        <dd>La cabecera de petici�n HTTP "User-Agent". Es la
        informaci�n de identificaci�n que el navegador del
        cliente incluye sobre s� mismo.</dd>
      </dl>
    

    <h3><a name="multiple" id="multiple">C�mo usar varios registros de acceso</a></h3>
      

      <p>Para crear varios registros de acceso solamente tiene que
      especificar varias directivas <code class="directive"><a href="./mod/mod_log_config.html#customlog">CustomLog</a></code> en el fichero de
      configuraci�n. Por ejemplo, las siguientes directivas
      crear�n tres registros de acceso. El primero contendr�
      la informaci�n b�sica en Formato Com�n de
      Registro, mientras que el segundo y el tercero contendr�n
      contendr�n la informaci�n de los "referer" y de los
      navegadores usados. Las dos �ltimas l�neas <code class="directive"><a href="./mod/mod_log_config.html#customlog">CustomLog</a></code> muestran c�mo
      reproducir el comportamiento de las directivas
      <code>ReferLog</code> y <code>AgentLog</code>.</p>

      <div class="example"><p><code>
        LogFormat "%h %l %u %t \"%r\" %&gt;s %b" common<br />
        CustomLog logs/access_log common<br />
        CustomLog logs/referer_log "%{Referer}i -&gt; %U"<br />
        CustomLog logs/agent_log "%{User-agent}i"
      </code></p></div>

      <p>Este ejemplo tambi�n muestra que no es necesario definir un
      "apodo" con la directiva <code class="directive"><a href="./mod/mod_log_config.html#logformat">LogFormat</a></code>. En lugar de esto,
      el formato de registro puede especificarse directamente en la
      directiva <code class="directive"><a href="./mod/mod_log_config.html#customlog">CustomLog</a></code>.</p>
    

    <h3><a name="conditional" id="conditional">Registro Condicional</a></h3>
      

      <p>Algunas veces es m�s conveniente excluir determinadas
      entradas del registro de acceso en funci�n de las
      caracter�sticas de la petici�n del cliente. Puede
      hacer esto f�cilmente con la ayuda de <a href="env.html">variables de entorno</a>. Primero, debe
      especificar una variable de entorno que indique que la
      petici�n cumple determinadas condiciones. Esto se hace
      normalmente con <code class="directive"><a href="./mod/mod_setenvif.html#setenvif">SetEnvIf</a></code>. Entonces puede usar
      la cla�sula <code>env=</code> de la directiva <code class="directive"><a href="./mod/mod_log_config.html#customlog">CustomLog</a></code> para incluir o
      excluir peticiones en las que est� presente la variable de
      entorno. Algunos ejemplos:</p>

      <div class="example"><p><code>
        # Marcar las peticiones de la interfaz loop-back<br />
        SetEnvIf Remote_Addr "127\.0\.0\.1" dontlog<br /> 
        # Marcar las peticiones del fichero robots.txt<br /> 
        SetEnvIf Request_URI "^/robots\.txt$" dontlog<br /> 
        # Registrar lo que quede<br />
        CustomLog logs/access_log common env=!dontlog
      </code></p></div>

      <p>Como otro ejemplo, considere registrar las peticiones de los
      angloparlantes en un fichero de registro, y el resto de
      peticiones en un fichero de registro diferente.</p>

      <div class="example"><p><code>
        SetEnvIf Accept-Language "en" english<br />
        CustomLog logs/english_log common env=english<br />
        CustomLog logs/non_english_log common env=!english
      </code></p></div>

      <p>Aunque acabamos de mostar que el registro condicional es muy
      potente y flexible, no es la �nica manera de controlar los
      contenidos de los ficheros de registro. Los ficheros de registro
      son m�s �tiles cuanta m�s informaci�n sobre
      la actividad del servidor contengan. A menudo es m�s
      f�cil eliminar las peticiones que no le interesen
      procesando posteriormente los ficheros de registro
      originales.</p>
    
  </div><div class="top"><a href="#page-header"><img alt="top" src="./images/up.gif" /></a></div>
<div class="section">
<h2><a name="rotation" id="rotation">Rotaci�n de los ficheros de registro</a></h2>
    

    <p>Incluso en un servidor con una actividad moderada, la cantidad
    de informaci�n almacenada en los ficheros de registro es muy
    grande. El registro de acceso crece normalmente en 1MB por cada
    10.000 peticiones. Por lo tanto, es necesario rotar
    peri�dicamente los registros moviendo o borrando su
    contenido. Esto no se puede hacer con el servidor funcionando,
    porque Apache continuar� escribiendo en el antiguo registro
    mientras que el archivo est� abierto. En lugar de esto, el
    servidor debe ser <a href="stopping.html">reiniciado</a>
    despu�s de mover o borrar los ficheros de registro para que
    se abran nuevos ficheros de registro.</p>

    <p>Usando un reinicio <em>graceful</em>, se le puede indicar al
    servidor que abra nuevos ficheros de registro sin perder ninguna
    petici�n siendo servida o en espera de alg�n cliente. Sin
    embargo, para hacer esto, el servidor debe continuar escribiendo
    en los ficheros de registro antiguos mientras termina de servir
    esas peticiones. Por lo tanto, es preciso esperar alg�n
    tiempo despu�s del reinicio antes de realizar ninguna
    operaci�n sobre los antiguos ficheros de registro. Una
    situaci�n t�pica que simplemente rota los registros y
    comprime los registros antiguos para ahorrar espacio es:</p>

    <div class="example"><p><code>
      mv access_log access_log.old<br />
      mv error_log error_log.old<br />
      apachectl graceful<br />
      sleep 600<br />
      gzip access_log.old error_log.old
    </code></p></div>

    <p>Otra manera de realizar la rotaci�n de los registros es
    usando <a href="#piped">ficheros de registro redireccionados
    (piped logs)</a> de la forma en que se explica en la siguiente
    secci�n.</p>
  </div><div class="top"><a href="#page-header"><img alt="top" src="./images/up.gif" /></a></div>
<div class="section">
<h2><a name="piped" id="piped">Ficheros de registro redireccionados (Piped Logs)</a></h2>
    

    <p>Apache httpd es capaz de escribir la informaci�n del
    registro de acceso y errores mediante una redirecci�n a otro
    proceso, en lugar de directamente a un fichero. Esta capacidad
    incrementa de forma muy importante la flexibilidad de registro,
    sin a�adir c�digo al servidor principal. Para escribir
    registros a una redirecci�n, simplemente reemplace el nombre
    de fichero por el car�cter "<code>|</code>", seguido por el
    nombre del ejecutable que deber�a aceptar las entradas de
    registro por su canal de entrada est�ndar. Apache
    iniciar� el proceso de registro redireccionado cuando se
    inicie el servidor, y lo reiniciar� si se produce alg�n
    error irrecuperable durante su ejecuci�n. (Esta �ltima
    funcionalidad es la que hace que se llame a esta t�cnica
    "registro redireccionado fiable".)</p>

    <p>Los procesos de registros son engendrados por el proceso padre
    de Apache httpd, y heredan el identificador de usuario de ese
    proceso. Esto significa que los programas a los que se
    redireccionan los registros se ejecutan normalmente como root. Es
    por ello que es muy importante que los programas sean simples y
    seguros.</p>

    <p>Un uso importante de los registros redireccionados es permitir
    la rotaci�n de los registros sin tener que reiniciar el
    servidor. El servidor Apache HTTP incluye un programa simple
    llamado <code class="program"><a href="./programs/rotatelogs.html">rotatelogs</a></code> con este prop�sito. Por
    ejemplo para rotar los registros cada 24 horas, puede usar:</p>

    <div class="example"><p><code>
      CustomLog "|/usr/local/apache/bin/rotatelogs
      /var/log/access_log 86400" common
    </code></p></div>

    <p>Tenga en cuenta que las comillas se usan para abarcar el
    comando entero que ser� invocado por la
    redirecci�n. Aunque estos ejemplos son para el registro de
    acceso, la misma t�cnica se puede usar para el registro de
    errores.</p>

    <p>Otro programa para la rotaci�n de los registros mucho
    m�s flexible llamado <a href="http://www.cronolog.org/">cronolog</a> est� disponible
    en un sitio web externo.</p>

    <p>Como ocurre con el registro condicional, la redirecci�n de
    registros es una herramienta muy potente, pero no deben ser usados
    si hay disponible una soluci�n m�s simple de procesado
    posterior de los registros fuera de l�nea.</p>
  </div><div class="top"><a href="#page-header"><img alt="top" src="./images/up.gif" /></a></div>
<div class="section">
<h2><a name="virtualhost" id="virtualhost">Hosts Virtuales</a></h2>
    

    <p>Cuando se est� ejecutando un servidor con muchos <a href="vhosts/">hosts virtuales</a>, hay varias formas de abordar
    el asunto de los registros. Primero, es posible usar los registros
    de la misma manera que se usar�an si hubiera solamente un
    host en el servidor. Simplemente poniendo las directivas que
    tienen que ver con los registros fuera de las secciones <code class="directive"><a href="./mod/core.html#virtualhost">&lt;VirtualHost&gt;</a></code> en el
    contexto del servidor principal, puede almacenar toda la
    informaci�n de todas las peticiones en los mismos registros
    de acceso y errores. Esta t�cnica no permite una
    recolecci�n f�cil de las estad�sticas individuales
    de cada uno de los hosts virtuales.</p>

    <p>Si una directiva <code class="directive"><a href="./mod/mod_log_config.html#customlog">CustomLog</a></code> o <code class="directive"><a href="./mod/core.html#errorlog">ErrorLog</a></code> se pone dentro una secci�n
    <code class="directive"><a href="./mod/core.html#virtualhost">&lt;VirtualHost&gt;</a></code>,
    todas las peticiones de ese host virtual se registrar�n
    solamente en el fichero especificado. Las peticiones de cualquier
    host virtual que no tenga directivas de registro espec�ficas
    para �l se registrar�n en los registros del servidor
    principal. Esta t�cnica es muy �til si usa un
    peque�o n�mero de hosts virtuales, pero si usa un gran
    n�mero de ellos, puede ser complicado de
    gestionar. Adem�s, puede a menudo provocar problemas con <a href="vhosts/fd-limits.html"> descriptores de fichero
    insuficientes</a>.</p>

    <p>Para el registro de acceso, se puede llegar a un buen
    equilibrio. A�adiendo informaci�n del host virtual al
    formato de registro, es posible registrar las operaciones de todos
    los hosts en un �nico registro, y posteriormente dividir el
    fichero con todos los registros en ficheros individualizados. Por
    ejemplo, considere las siguientes directivas.</p>

    <div class="example"><p><code>
      LogFormat "%v %l %u %t \"%r\" %&gt;s %b"
      comonvhost<br />
      CustomLog logs/access_log comonvhost
    </code></p></div>

    <p>El <code>%v</code> se usa para registrar el nombre del host
    virtual que est� sirviendo la petici�n. Puede usar un
    programa como <a href="programs/other.html">split-logfile</a> para
    procesar posteriormente el registro de acceso y dividirlo en
    ficheros independientes para cada host virtual.</p>
  </div><div class="top"><a href="#page-header"><img alt="top" src="./images/up.gif" /></a></div>
<div class="section">
<h2><a name="other" id="other">Otros ficheros de registro</a></h2>
    

    <table class="related"><tr><th>M�dulos Relacionados</th><th>Directivas Relacionadas</th></tr><tr><td><ul><li><code class="module"><a href="./mod/mod_cgi.html">mod_cgi</a></code></li><li><code class="module"><a href="./mod/mod_rewrite.html">mod_rewrite</a></code></li></ul></td><td><ul><li><code class="directive"><a href="./mod/mpm_common.html#pidfile">PidFile</a></code></li><li><code class="directive"><a href="./mod/mod_rewrite.html#rewritelog">RewriteLog</a></code></li><li><code class="directive"><a href="./mod/mod_rewrite.html#rewriteloglevel">RewriteLogLevel</a></code></li><li><code class="directive"><a href="./mod/mod_cgi.html#scriptlog">ScriptLog</a></code></li><li><code class="directive"><a href="./mod/mod_cgi.html#scriptlogbuffer">ScriptLogBuffer</a></code></li><li><code class="directive"><a href="./mod/mod_cgi.html#scriptloglength">ScriptLogLength</a></code></li></ul></td></tr></table>

    <h3><a name="pidfile" id="pidfile">Fichero PID (PID File)</a></h3>
      

      <p>Al iniciar, Apache httpd guarda el identificador del proceso
      padre del servidor en el fichero
      <code>logs/httpd.pid</code>. Puede modificar el nombre de este
      fichero con la directiva <code class="directive"><a href="./mod/mpm_common.html#pidfile">PidFile</a></code>. El identificador del
      proceso puede usarlo el administrador para reiniciar y finalizar
      el demonio (daemon) mediante el env�o de se�ales al
      proceso padre; en Windows, use la opci�n de l�nea de
      comandos -k en su lugar.  Para m�s informaci�n al
      respecto, consulte la documentaci�n sobre <a href="stopping.html">parar y reiniciar Apache</a>.</p>
    

    <h3><a name="scriptlog" id="scriptlog">Registro de actividad de scripts (Script Log)</a></h3>
      

      <p>Para ayudar a la detecci�n de errores, la directiva
      <code class="directive"><a href="./mod/mod_cgi.html#scriptlog">ScriptLog</a></code> permite
      guardar la entrada y la salida de los scripts CGI. Esta
      directiva solamente deber�a usarla para hacer pruebas - no
      en servidores en producci�n.  Puede encontrar m�s
      informaci�n al respecto en la documentaci�n de <a href="mod/mod_cgi.html">mod_cgi</a>.</p>
    

    <h3><a name="rewritelog" id="rewritelog">Registro de actividad de Rewrite (Rewrite Log)</a></h3>
      

      <p>Cuando use las potentes y complejas funcionalidades de <a href="mod/mod_rewrite.html">mod_rewrite</a>, ser� casi
      siempre necesario usar la direcitiva <code class="directive"><a href="./mod/mod_rewrite.html#rewritelog">RewriteLog</a></code> para ayudar a la
      detecci�n de errores. Este fichero de registro produce un
      an�lisis detallado de c�mo act�a este
      m�dulo sobre las peticiones. El nivel de detalle del
      registro se controla con la directiva <code class="directive"><a href="./mod/mod_rewrite.html#rewriteloglevel">RewriteLogLevel</a></code>.</p>
    
  </div></div>
<div class="bottomlang">
<p><span>Idiomas disponibles: </span><a href="./en/logs.html" hreflang="en" rel="alternate" title="English">&nbsp;en&nbsp;</a> |
<a href="./es/logs.html" title="Espa�ol">&nbsp;es&nbsp;</a> |
<a href="./ja/logs.html" hreflang="ja" rel="alternate" title="Japanese">&nbsp;ja&nbsp;</a> |
<a href="./ko/logs.html" hreflang="ko" rel="alternate" title="Korean">&nbsp;ko&nbsp;</a></p>
</div><div id="footer">
<p class="apache">Copyright 1995-2006 The Apache Software Foundation or its licensors, as applicable.<br />Licencia bajo los t�rminos de la <a href="http://www.apache.org/licenses/LICENSE-2.0">Apache License, Version 2.0</a>.</p>
<p class="menu"><a href="./mod/">M�dulos</a> | <a href="./mod/directives.html">Directivas</a> | <a href="./faq/">Preguntas Frecuentes</a> | <a href="./glossary.html">Glosario</a> | <a href="./sitemap.html">Mapa de este sitio web</a></p></div>
</body></html>