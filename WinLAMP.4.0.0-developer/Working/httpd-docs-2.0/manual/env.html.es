<?xml version="1.0" encoding="ISO-8859-1"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="es" xml:lang="es"><head><!--
        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
              This file is generated from xml source: DO NOT EDIT
        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      -->
<title>Variables de entorno de Apache - Servidor HTTP Apache</title>
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
<a href="http://www.apache.org/">Apache</a> &gt; <a href="http://httpd.apache.org/">Servidor HTTP</a> &gt; <a href="http://httpd.apache.org/docs/">Documentaci�n</a> &gt; <a href="./">Versi�n 2.0</a></div><div id="page-content"><div id="preamble"><h1>Variables de entorno de Apache</h1>
<div class="toplang">
<p><span>Idiomas disponibles: </span><a href="./en/env.html" hreflang="en" rel="alternate" title="English">&nbsp;en&nbsp;</a> |
<a href="./es/env.html" title="Espa�ol">&nbsp;es&nbsp;</a> |
<a href="./fr/env.html" hreflang="fr" rel="alternate" title="Fran�ais">&nbsp;fr&nbsp;</a> |
<a href="./ja/env.html" hreflang="ja" rel="alternate" title="Japanese">&nbsp;ja&nbsp;</a> |
<a href="./ko/env.html" hreflang="ko" rel="alternate" title="Korean">&nbsp;ko&nbsp;</a></p>
</div>
<div class="outofdate">Esta traducci�n podr�a estar
            obsoleta. Consulte la versi�n en ingl�s de la
            documentaci�n para comprobar si se han producido cambios
            recientemente.</div>

    <p>El servidor HTTP Apache HTTP ofrece un mecanismo para almacenar
    informaci�n en variables especiales que se llaman
    <em>variables de entorno</em>. Esta informaci�n puede ser
    usada para controlar diversas operaciones como por ejemplo,
    almacenar datos en ficheros de registro (log files) o controlar el
    acceso al servidor. Las variables de entorno se usan tambi�n
    como un mecanismo de comunicaci�n con programas externos como
    por ejemplo, scripts CGI. Este documento explica las diferentes
    maneras de usar y manipular esas variables.</p>

    <p>Aunque estas variables se llaman <em>variables de entorno</em>,
    no son iguales que las variables de entorno que controla el
    sistema operativo de la m�quina en que se est�
    ejecutando Apache. Las variables de entorno de Apache se almacenan
    y manipulan la en estructura interna de Apache. Solamente se
    convierten en aut�nticas variables de entorno del sistema
    operativo cuando se pasan a scripts CGI o a scripts Server Side
    Include. Si quiere manipular el entorno del sistema operativo
    sobre el que Apache se est� ejecutando, debe usar los
    mecanismos est�ndar de manipulaci�n que tenga su sistema
    operativo.</p>
  </div>
<div id="quickview"><ul id="toc"><li><img alt="" src="./images/down.gif" /> <a href="#setting">Especificaci�n de variables de entorno</a></li>
<li><img alt="" src="./images/down.gif" /> <a href="#using">C�mo usar las variables de entorno</a></li>
<li><img alt="" src="./images/down.gif" /> <a href="#special">Variables de entorno con funciones especiales</a></li>
<li><img alt="" src="./images/down.gif" /> <a href="#examples">Ejemplos</a></li>
</ul></div>
<div class="top"><a href="#page-header"><img alt="top" src="./images/up.gif" /></a></div>
<div class="section">
<h2><a name="setting" id="setting">Especificaci�n de variables de entorno</a></h2>
    
    <table class="related"><tr><th>M�dulos Relacionados</th><th>Directivas Relacionadas</th></tr><tr><td><ul><li><code class="module"><a href="./mod/mod_env.html">mod_env</a></code></li><li><code class="module"><a href="./mod/mod_rewrite.html">mod_rewrite</a></code></li><li><code class="module"><a href="./mod/mod_setenvif.html">mod_setenvif</a></code></li><li><code class="module"><a href="./mod/mod_unique_id.html">mod_unique_id</a></code></li></ul></td><td><ul><li><code class="directive"><a href="./mod/mod_setenvif.html#browsermatch">BrowserMatch</a></code></li><li><code class="directive"><a href="./mod/mod_setenvif.html#browsermatchnocase">BrowserMatchNoCase</a></code></li><li><code class="directive"><a href="./mod/mod_env.html#passenv">PassEnv</a></code></li><li><code class="directive"><a href="./mod/mod_rewrite.html#rewriterule">RewriteRule</a></code></li><li><code class="directive"><a href="./mod/mod_env.html#setenv">SetEnv</a></code></li><li><code class="directive"><a href="./mod/mod_setenvif.html#setenvif">SetEnvIf</a></code></li><li><code class="directive"><a href="./mod/mod_setenvif.html#setenvifnocase">SetEnvIfNoCase</a></code></li><li><code class="directive"><a href="./mod/mod_env.html#unsetenv">UnsetEnv</a></code></li></ul></td></tr></table>

    <h3><a name="basic-manipulation" id="basic-manipulation">Manipulaci�n b�sica del entorno</a></h3>
        

        <p>El modo m�s b�sico de especificar el valor de una
        variable de entorno en Apache es usando la directiva
        incondicional <code class="directive"><a href="./mod/mod_env.html#setenv">SetEnv</a></code>. Las variables pueden
        tambi�n pasarse desde el shell en el que se inicio Apache
        usando la directiva <code class="directive"><a href="./mod/mod_env.html#passenv">PassEnv</a></code>.</p>

    
    <h3><a name="conditional" id="conditional">Especificaci�n condicional por petici�n</a></h3>
        

        <p>Si necesita m�s flexibilidad, las directivas incluidas
        con mod_setenvif permiten especificar valores para las
        variables de entorno de manera condicional en funci�n de
        las caracteristicas particulares de la petici�n que se
        est� procesando. Por ejemplo, se puede especificar un
        valor para una variable solamente cuando la petici�n se
        haga con un navegador espec�fico, o solamente cuando la
        petici�n contenga una determinada informaci�n en su
        cabecera. Si necesita a�n m�s flexibilidad, puede
        conseguirla con la directiva <code class="directive"><a href="./mod/mod_rewrite.html#rewriterule">RewriteRule</a></code> del m�dulo
        mod_rewrite que tiene la opci�n <code>[E=...]</code> para
        especificar valores en las variables de entorno.</p>

    
    <h3><a name="unique-identifiers" id="unique-identifiers">Identificadores �nicos</a></h3>
        

        <p>Finalmente, mod_unique_id determina el valor de la variable
        de entorno <code>UNIQUE_ID</code> para cada
        petici�n. Este valor est� garantizado que sea
        �nico entre todas las peticiones bajo condiciones muy
        espec�ficas.</p>

    
    <h3><a name="standard-cgi" id="standard-cgi">Variables CGI est�ndar</a></h3>
        

        <p>Adem�s de todas las variables de entorno especificadas
        en la configuraci�n de Apache y las que se pasan desde el
        shell, los scripts CGI y las p�ginas SSI tienen un
        conjunto de variables de entorno que contienen
        meta-informaci�n sobre la petici�n tal y como
        establece la <a href="http://cgi-spec.golux.com/">especificaci�n
        CGI</a>.</p>

    
    <h3><a name="caveats" id="caveats">Algunas limitaciones</a></h3>
        

        <ul>
          <li>No es posible reeemplazar los valores o cambiar las
          variables est�ndar CGI usando las directivas de
          manipulaci�n del entorno.</li>

          <li>Cuando se usa <code class="program"><a href="./programs/suexec.html">suexec</a></code> para
          lanzar scripts CGI, el entorno se limpia y se queda reducido
          a un conjunto de variables <em>seguras</em> antes de que se
          lancen los scripts. La lista de variables <em>seguras</em>
          se define en el momento de compilar en
          <code>suexec.c</code>.</li>

          <li>Por razones de portabilidad, los nombres de las
          variables de entorno solo pueden contener letras,
          n�meros y guiones bajos. Adem�s, el primer
          caracter no puede ser un n�mero. Los caracteres que no
          cumplan con esta restricci�n, se reemplazan
          autom�ticamente por un gui�n bajo cuando se pasan
          a scripts CGI y a p�ginas SSI.</li>
        </ul>
    
  </div><div class="top"><a href="#page-header"><img alt="top" src="./images/up.gif" /></a></div>
<div class="section">
<h2><a name="using" id="using">C�mo usar las variables de entorno</a></h2>
    

    <table class="related"><tr><th>M�dulos Relacionados</th><th>Directivas Relacionadas</th></tr><tr><td><ul><li><code class="module"><a href="./mod/mod_access.html">mod_access</a></code></li><li><code class="module"><a href="./mod/mod_cgi.html">mod_cgi</a></code></li><li><code class="module"><a href="./mod/mod_ext_filter.html">mod_ext_filter</a></code></li><li><code class="module"><a href="./mod/mod_headers.html">mod_headers</a></code></li><li><code class="module"><a href="./mod/mod_include.html">mod_include</a></code></li><li><code class="module"><a href="./mod/mod_log_config.html">mod_log_config</a></code></li><li><code class="module"><a href="./mod/mod_rewrite.html">mod_rewrite</a></code></li></ul></td><td><ul><li><code class="directive"><a href="./mod/mod_access.html#allow">Allow</a></code></li><li><code class="directive"><a href="./mod/mod_log_config.html#customlog">CustomLog</a></code></li><li><code class="directive"><a href="./mod/mod_access.html#deny">Deny</a></code></li><li><code class="directive"><a href="./mod/mod_ext_filter.html#extfilterdefine">ExtFilterDefine</a></code></li><li><code class="directive"><a href="./mod/mod_headers.html#header">Header</a></code></li><li><code class="directive"><a href="./mod/mod_log_config.html#logformat">LogFormat</a></code></li><li><code class="directive"><a href="./mod/mod_rewrite.html#rewritecond">RewriteCond</a></code></li><li><code class="directive"><a href="./mod/mod_rewrite.html#rewriterule">RewriteRule</a></code></li></ul></td></tr></table>

    <h3><a name="cgi-scripts" id="cgi-scripts">Scripts CGI</a></h3>
        

        <p>Uno de los principales usos de las variables de entorno es
        pasar informaci�n a scripts CGI. Tal y como se explicaba
        m�s arriba, el entorno que se pasa a los scripts CGI
        incluye meta-informaci�n est�ndar acerca de la
        petici�n adem�s de cualquier variable especificada
        en la configuraci�n de Apache. Para obtener m�s
        informaci�n sobre este tema consulte el <a href="howto/cgi.html">tutorial sobre CGIs</a>.</p>

    
    <h3><a name="ssi-pages" id="ssi-pages">P�ginas SSI</a></h3>
        

        <p>Los documentos procesados por el servidor con el filtro
        <code>INCLUDES</code> perteneciente a mod_include pueden
        imprimir las variables de entorno usando el elemento
        <code>echo</code>, y pueden usar las variables de entorno en
        elementos de control de flujo para dividir en partes una
        p�gina condicional seg�n las caracter�sticas de
        la petici�n. Apache tambi�n sirve p�ginas SSI
        con las variables CGI est�ndar tal y como se explica
        m�s arriba en este documento. Para obetener m�s
        informaci�n, consulte el <a href="howto/ssi.html">tutorial sobre SSI</a>.</p>

    
    <h3><a name="access-control" id="access-control">Control de acceso</a></h3>
        

        <p>El acceso al servidor puede ser controlado en funci�n
        del valor de las variables de entorno usando las directivas
        <code>allow from env=</code> y <code>deny from env=</code>. En
        combinaci�n con la directiva <code class="directive"><a href="./mod/mod_setenvif.html#setenvif">SetEnvIf</a></code>, se puede tener un
        control m�s flexible del acceso al servidor en
        funci�n de las caracter�sticas del cliente. Por
        ejemplo, puede usar estas directivas para denegar el acceso si
        el cliente usa un determinado navegador.</p>

    
    <h3><a name="logging" id="logging">Registro condicional</a></h3>
        

        <p>Los valores de las variables de entorno pueden registrarse
        en el log de acceso usando la directiva <code class="directive"><a href="./mod/mod_log_config.html#logformat">LogFormat</a></code> con la
        opci�n <code>%e</code>. Adem�s, la decisi�n
        sobre qu� peticiones se registran puede ser tomada en
        funci�n del valor de las variables de entorno usando la
        forma condicional de la directiva <code class="directive"><a href="./mod/mod_log_config.html#customlog">CustomLog</a></code>. En
        combinaci�n con <code class="directive"><a href="./mod/mod_setenvif.html#setenvif">SetEnvIf</a></code>, esto permite controlar de forma
        flexible de qu� peticiones se guarda registro. Por
        ejemplo, puede elegir no registrar las peticiones que se hagan
        a ficheros cuyo nombre termine en <code>gif</code>, o puede
        elegir registrar �nicamente las peticiones que provengan
        de clientes que est�n fuera de su propia red.</p>

    
    <h3><a name="response-headers" id="response-headers">Cabeceras de respuesta condicionales</a></h3>
        

        <p>La directiva <code class="directive"><a href="./mod/mod_headers.html#header">Header</a></code> puede utilizar la
        presencia o ausencia de una variable de entorno para
        determinar si una determinada cabecera HTTP se incluye en la
        respuesta al cliente. Esto permite, por ejemplo, que una
        determinada cabecera de respuesta sea enviada �nicamente
        si tambi�n estaba presente en la petici�n del
        cliente.</p>

    

    <h3><a name="external-filter" id="external-filter">Activaci�n de filtros externos</a></h3>
        

        <p>External filters configured by <code class="module"><a href="./mod/mod_ext_filter.html">mod_ext_filter</a></code>
        using the <code class="directive"><a href="./mod/mod_ext_filter.html#extfilterdefine">ExtFilterDefine</a></code> directive can
        by activated conditional on an environment variable using the
        <code>disableenv=</code> and <code>enableenv=</code> options.</p>
    

    <h3><a name="url-rewriting" id="url-rewriting">Reescritura de URLs</a></h3>
        

        <p>La expresion <code>%{ENV:...}</code> de <em>TestString</em>
         en una directiva <code class="directive"><a href="./mod/mod_rewrite.html#rewritecond">RewriteCond</a></code> permite que el
         motor de reescritura de mod_rewrite pueda tomar decisiones en
         funci�n del valor de variables de entorno. Tenga en
         cuenta que las variables accesibles en mod_rewrite sin el
         prefijo <code>ENV:</code> no son realmente variables de
         entorno. En realidad, son variables especiales de mod_rewrite
         que no pueden ser accedidas desde otros m�dulos.</p>
    
  </div><div class="top"><a href="#page-header"><img alt="top" src="./images/up.gif" /></a></div>
<div class="section">
<h2><a name="special" id="special">Variables de entorno con funciones especiales</a></h2>
    

        <p>Los problemas de interoperatividad han conducido a la
        introducci�n de mecanismos para modificar el
        comportamiento de Apache cuando se comunica con determinados
        clientes. Para hacer que esos mecanismos sean tan flexibles
        como sea posible, se invocan definiendo variables de entorno,
        normalmente con la directiva <code class="directive"><a href="./mod/mod_setenvif.html#browsermatch">BrowserMatch</a></code>, aunque
        tambi�n se puede usar por ejemplo con las directivas
        <code class="directive"><a href="./mod/mod_env.html#setenv">SetEnv</a></code> y <code class="directive"><a href="./mod/mod_env.html#passenv">PassEnv</a></code>.</p>

    <h3><a name="downgrade" id="downgrade">downgrade-1.0</a></h3>
        

        <p>Fuerza que la petici�n sea tratada como una petici�n
        HTTP/1.0 incluso si viene en una especificaci�n posterior.</p>

    
    <h3><a name="force-no-vary" id="force-no-vary">force-no-vary</a></h3>
        

        <p>Hace que cualquier campo <code>Vary</code> se elimine de la
        cabecera de la respuesta antes de ser enviada al
        cliente. Algunos clientes no interpretan este campo
        correctamente (consulte la secci�n sobre <a href="misc/known_client_problems.html">problemas conocidos con
        clientes</a>); usar esta variable puede evitar esos
        problemas. Usar esta variable implica tambi�n el uso de
        <strong>force-response-1.0</strong>.</p>

    
    <h3><a name="force-response" id="force-response">force-response-1.0</a></h3>
        

      <p>Fuerza que la respuesta a una petici�n HTTP/1.0 se haga
      tambi�n seg�n la especificaci�n HTTP/1.0. Esto se
      implement� originalmente como resultado de un problema con
      los proxies de AOL. Algunos clientes HTTP/1.0 no se comportan
      correctamente cuando se les env�a una respuesta HTTP/1.1, y
      este mecanismo hace que se pueda interactuar con ellos.</p>

    

    <h3><a name="gzip-only-text-html" id="gzip-only-text-html">gzip-only-text/html</a></h3>
        

        <p>Cuando tiene valor "1", esta variable desactiva el filtro
        de salida DEFLATE de <code class="module"><a href="./mod/mod_deflate.html">mod_deflate</a></code> para
        contenidos de tipo diferentes de <code>text/html</code>.</p>
    

    <h3><a name="no-gzip" id="no-gzip">no-gzip</a></h3>

        <p>Cuando se especifica, se desactiva el filtro
        <code>DEFLATE</code> de <code class="module"><a href="./mod/mod_deflate.html">mod_deflate</a></code>.</p>

    

    <h3><a name="nokeepalive" id="nokeepalive">nokeepalive</a></h3>
        

        <p>Desactiva <code class="directive"><a href="./mod/core.html#keepalive">KeepAlive</a></code>.</p>

    

    <h3><a name="prefer-language" id="prefer-language">prefer-language</a></h3>

        <p>Influye en el comportamiento de
        <code class="module"><a href="./mod/mod_negotiation.html">mod_negotiation</a></code>. Si contiene una etiqueta de
        idioma (del tipo <code>en</code>, <code>ja</code> o
        <code>x-klingon</code>), <code class="module"><a href="./mod/mod_negotiation.html">mod_negotiation</a></code>
        intenta que se use ese mismo idioma en la respuesta. Si no
        est� disponible ese idioma, se aplica el proceso de <a href="content-negotiation.html">negociaci�n</a>
        normal.</p>

    

    <h3><a name="redirect-carefully" id="redirect-carefully">redirect-carefully</a></h3>
        

        <p>Fuerza que el servidor sea especialmente cuidadoso al
        enviar una redirecci�n al cliente. Se usa normalmente
        cuando un cliente tiene un problema conocido tratando las
        redirecciones. Fue implementado originalmente por el problema
        que presentaba el software de WebFolders de Microsoft, que
        ten�a problemas interpretando redirecciones originadas
        cuando se acced�a a recursos servidos usando DAV.</p>

    

   <h3><a name="suppress-error-charset" id="suppress-error-charset">suppress-error-charset</a></h3>
       

    <p><em>Disponible en las versiones de Apache 2.0.40 y posteriores</em></p>

    <p>Cuando Apache efect�a una redirecci�n en respuesta a la
    petici�n de un cliente, la respuesta incluye alg�n texto para que
    se muestre en caso de que el cliente no pueda seguir (o no siga)
    autom�ticamente la redirecci�n. Apache normalmente etiqueta este
    texto siguiendo la codificaci�n ISO-8859-1.</p> 

    <p>Sin embargo, si la redirecci�n es a una p�gina que
    usa una codificaci�n diferente, algunas versiones de
    navegadores que no funcionan correctamente intentar�n usar la
    codificaci�n del texto de redirecci�n en lugar de la de
    pagina a la que ha sido redireccionado. La consecuencia de esto
    puede ser, por ejemplo, que una p�gina en griego no se
    muestre correctamente.</p>

    <p>Especificar un valor en esta variable de entorno hace que
    Apache omita la codificaci�n en el texto que incluye con las
    redirecciones, y que esos navegadores que no funcionan
    correctamente muestren correctamente la p�gina de destino.</p>

   

  </div><div class="top"><a href="#page-header"><img alt="top" src="./images/up.gif" /></a></div>
<div class="section">
<h2><a name="examples" id="examples">Ejemplos</a></h2>
    

    <h3><a name="misbehaving" id="misbehaving">C�mo cambiar el comportamiento de clientes que se
        comportan de manera inapropiada</a></h3>
        

        <p>Recomendamos que incluya las siguentes l�neas en el
        fichero httpd.conf para evitar problemas conocidos</p>
<div class="example"><pre>

#
# Las siguientes directivas modifican el comportamiento normal de las respuestas HTTP.
# La primera directiva desactiva keepalive para Netscape 2.x y para navegadores 
# que la simulan. Hay problemas conocidos con esos navegadores.
# La segunda directiva es para Microsoft Internet Explorer 4.0b2
# que tiene un fallo en la implemantaci�n de HTTP/1.1 y no soporta
# keepalive adecuadamente cuando se usan respuestas 301 � 302 (redirecciones).
#
BrowserMatch "Mozilla/2" nokeepalive
BrowserMatch "MSIE 4\.0b2;" nokeepalive downgrade-1.0 force-response-1.0

#
# La siguiente directiva desactiva las respuestas HTTP/1.1 para navegadores que
# violan la especificaci�n HTTP/1.0 @@@ by not being able to grok a
# basic 1.1 response @@@.
#
BrowserMatch "RealPlayer 4\.0" force-response-1.0
BrowserMatch "Java/1\.0" force-response-1.0
BrowserMatch "JDK/1\.0" force-response-1.0</pre></div>

    
    <h3><a name="no-img-log" id="no-img-log">No almacenar entradas en registro de acceso para las
        im�genes</a></h3>
        

        <p>Este ejemplo evita que las peticiones de im�genes
        aparezcan en el registro de acceso. Puede ser modificada
        f�cilmente para evitar que se registren entradas de
        peticiones de directorios, o provenientes de determinados
        clientes.</p>

        <div class="example"><pre> 
SetEnvIf Request_URI \.gif image-request
SetEnvIf Request_URI \.jpg image-request 
SetEnvIf Request_URI \.png image-request 
CustomLog logs/access_log common env=!image-request</pre></div>

    
    <h3><a name="image-theft" id="image-theft">Evitar el "robo de imagenes"</a></h3>
        

        <p>Este ejemplo muestra como evitar que otras webs usen las
        im�genes de su servidor para sus p�ginas. Esta
        configuraci�n no se recomienda, pero puede funcionar en
        determinadas circunstancias. Asumimos que que todas sus
        im�genes est�n en un directorio llamado
        /web/images.</p>

        <div class="example"><pre> 
SetEnvIf Referer "^http://www.example.com/" local_referal 
# Allow browsers that do not send Referer info
SetEnvIf Referer "^$" local_referal 
&lt;Directory  /web/images&gt; 
   Order Deny,Allow 
   Deny from all 
   Allow from env=local_referal 
&lt;/Directory&gt;</pre></div>

        <p>Para obtener m�s informaci�n sobre esta
        t�cnica, consulte el tutorial de ApacheToday " <a href="http://apachetoday.com/news_story.php3?ltsn=2000-06-14-002-01-PS">
        Keeping Your Images from Adorning Other Sites</a>".</p>
         </div></div>
<div class="bottomlang">
<p><span>Idiomas disponibles: </span><a href="./en/env.html" hreflang="en" rel="alternate" title="English">&nbsp;en&nbsp;</a> |
<a href="./es/env.html" title="Espa�ol">&nbsp;es&nbsp;</a> |
<a href="./fr/env.html" hreflang="fr" rel="alternate" title="Fran�ais">&nbsp;fr&nbsp;</a> |
<a href="./ja/env.html" hreflang="ja" rel="alternate" title="Japanese">&nbsp;ja&nbsp;</a> |
<a href="./ko/env.html" hreflang="ko" rel="alternate" title="Korean">&nbsp;ko&nbsp;</a></p>
</div><div id="footer">
<p class="apache">Copyright 1995-2006 The Apache Software Foundation or its licensors, as applicable.<br />Licencia bajo los t�rminos de la <a href="http://www.apache.org/licenses/LICENSE-2.0">Apache License, Version 2.0</a>.</p>
<p class="menu"><a href="./mod/">M�dulos</a> | <a href="./mod/directives.html">Directivas</a> | <a href="./faq/">Preguntas Frecuentes</a> | <a href="./glossary.html">Glosario</a> | <a href="./sitemap.html">Mapa de este sitio web</a></p></div>
</body></html>