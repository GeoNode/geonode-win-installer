<?xml version="1.0" encoding="ISO-8859-1"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="es" xml:lang="es"><head><!--
        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
              This file is generated from xml source: DO NOT EDIT
        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      -->
<title>Autentificaci�n, Autorizaci�n y Control de Acceso - Servidor HTTP Apache</title>
<link href="../style/css/manual.css" rel="stylesheet" media="all" type="text/css" title="Main stylesheet" />
<link href="../style/css/manual-loose-100pc.css" rel="alternate stylesheet" media="all" type="text/css" title="No Sidebar - Default font size" />
<link href="../style/css/manual-print.css" rel="stylesheet" media="print" type="text/css" />
<link href="../images/favicon.ico" rel="shortcut icon" /></head>
<body id="manual-page"><div id="page-header">
<p class="menu"><a href="../mod/">M�dulos</a> | <a href="../mod/directives.html">Directivas</a> | <a href="../faq/">Preguntas Frecuentes</a> | <a href="../glossary.html">Glosario</a> | <a href="../sitemap.html">Mapa de este sitio web</a></p>
<p class="apache">Versi�n 2.0 del Servidor HTTP Apache</p>
<img alt="" src="../images/feather.gif" /></div>
<div class="up"><a href="./"><img title="&lt;-" alt="&lt;-" src="../images/left.gif" /></a></div>
<div id="path">
<a href="http://www.apache.org/">Apache</a> &gt; <a href="http://httpd.apache.org/">Servidor HTTP</a> &gt; <a href="http://httpd.apache.org/docs/">Documentaci�n</a> &gt; <a href="../">Versi�n 2.0</a> &gt; <a href="./">How-To / Tutoriales</a></div><div id="page-content"><div id="preamble"><h1>Autentificaci�n, Autorizaci�n y Control de Acceso</h1>
<div class="toplang">
<p><span>Idiomas disponibles: </span><a href="../en/howto/auth.html" hreflang="en" rel="alternate" title="English">&nbsp;en&nbsp;</a> |
<a href="../es/howto/auth.html" title="Espa�ol">&nbsp;es&nbsp;</a> |
<a href="../ja/howto/auth.html" hreflang="ja" rel="alternate" title="Japanese">&nbsp;ja&nbsp;</a> |
<a href="../ko/howto/auth.html" hreflang="ko" rel="alternate" title="Korean">&nbsp;ko&nbsp;</a></p>
</div>
<div class="outofdate">Esta traducci�n podr�a estar
            obsoleta. Consulte la versi�n en ingl�s de la
            documentaci�n para comprobar si se han producido cambios
            recientemente.</div>

    <p>La autentificaci�n es cualquier proceso mediante el cual se
    verifica que alguien es quien dice ser. La autorizaci�n es
    cualquier proceso por el cual a alguien se le permite estar donde
    quiere ir, o tener la informaci�n que quiere tener.</p>
</div>
<div id="quickview"><ul id="toc"><li><img alt="" src="../images/down.gif" /> <a href="#related">M�dulos y Directivas relacionadas</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#introduction">Introducci�n</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#theprerequisites">Los Prerrequisitos</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#gettingitworking">Puesta en funcionamiento</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#lettingmorethanonepersonin">Permitir el acceso a m�s
de una persona</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#possibleproblems">Posibles Problemas</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#whatotherneatstuffcanido">�Qu� otra cosa
sencilla y efectiva puedo hacer?</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#moreinformation">M�s informaci�n</a></li>
</ul></div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="section">
<h2><a name="related" id="related">M�dulos y Directivas relacionadas</a></h2>
    <table class="related"><tr><th>M�dulos Relacionados</th><th>Directivas Relacionadas</th></tr><tr><td><ul><li><code class="module"><a href="../mod/mod_auth.html">mod_auth</a></code></li><li><code class="module"><a href="../mod/mod_access.html">mod_access</a></code></li></ul></td><td><ul><li><code class="directive"><a href="../mod/mod_access.html#allow">Allow</a></code></li><li><code class="directive"><a href="../mod/mod_auth.html#authgroupfile">AuthGroupFile</a></code></li><li><code class="directive"><a href="../mod/core.html#authname">AuthName</a></code></li><li><code class="directive"><a href="../mod/core.html#authtype">AuthType</a></code></li><li><code class="directive"><a href="../mod/mod_auth.html#authuserfile">AuthUserFile</a></code></li><li><code class="directive"><a href="../mod/mod_access.html#deny">Deny</a></code></li><li><code class="directive"><a href="../mod/core.html#options">Options</a></code></li><li><code class="directive"><a href="../mod/core.html#require">Require</a></code></li></ul></td></tr></table>
</div><div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="section">
<h2><a name="introduction" id="introduction">Introducci�n</a></h2>
    <p>Si en su sitio web tiene informaci�n sensible o dirigida
    s�lo a un peque�o grupo de personas, las t�cnicas
    explicadas en �ste art�culo le ayudar�n a
    asegurarse de que las personas que ven esas p�ginas son las
    personas que usted quiere que las vean.</p>

    <p>Este art�culo cubre la manera "est�ndar" de proteger
    partes de su sitio web que la mayor�a de ustedes van a usar.</p>
</div><div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="section">
<h2><a name="theprerequisites" id="theprerequisites">Los Prerrequisitos</a></h2>
    <p>Las directivas tratadas en �ste art�culo necesitar�n
    ir en el archivo de configuraci�n principal de su servidor
    (t�picamente en una secci�n del tipo
    <code class="directive"><a href="../mod/core.html#directory">&lt;Directory&gt;</a></code>),
    o en archivos de configuraci�n por directorios (archivos 
    <code>.htaccess</code>).</p>

    <p>Si planea usar archivos <code>.htaccess</code>, necesitar�
    tener una configuraci�n en el servidor que permita poner directivas
    de autentificaci�n en estos archivos. Esto se logra con la
    directiva <code class="directive"><a href="../mod/core.html#allowoverride">AllowOverride</a></code>,
    la cual especifica cu�les directivas, en caso de existir, pueden
    ser colocadas en los archivos de configuraci�n por directorios.</p>

    <p>Ya que se est� hablando de autentificaci�n, necesitar�
    una directiva <code class="directive"><a href="../mod/core.html#allowoverride">AllowOverride</a></code> como
    la siguiente:</p>

    <div class="example"><p><code>
      AllowOverride AuthConfig
    </code></p></div>

    <p>O, si s�lo va a colocar directivas directamente en el principal
    archivo de configuraci�n del servidor, por supuesto necesitar�
    tener permiso de escritura a ese archivo.</p>

    <p>Y necesitar� saber un poco acerca de la estructura de
    directorios de su servidor, con la finalidad de que sepa d�nde
    est�n algunos archivos. Esto no deber�a ser muy
    dif�cil, y tratar� de hacerlo sencillo cuando lleguemos a
    ese punto.</p>
</div><div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="section">
<h2><a name="gettingitworking" id="gettingitworking">Puesta en funcionamiento</a></h2>
    <p>Aqu� est� lo esencial en cuanto a proteger con
    contrase�a un directorio de su servidor.</p>

    <p>Necesitar� crear un archivo de contrase�as. �ste
    archivo deber�a colocarlo en alg�n sitio no accesible
    mediante la Web. Por ejemplo, si sus documentos son servidos desde
    <code>/usr/local/apache/htdocs</code> usted podr�a querer colocar
    el(los) archivo(s) de contrase�as en
    <code>/usr/local/apache/passwd</code>.</p>

    <p>Para crear un archivo de contrase�as, use la utilidad
    <code class="program"><a href="../programs/htpasswd.html">htpasswd</a></code> que viene con Apache.
    �sta utilidad puede encontrarla en el directorio <code>bin</code>
    de cualquier sitio en que haya instalado Apache. Para crear el
    archivo, escriba:</p>

    <div class="example"><p><code>
      htpasswd -c /usr/local/apache/passwd/passwords rbowen
    </code></p></div>

    <p><code class="program"><a href="../programs/htpasswd.html">htpasswd</a></code> le pedir� la contrase�a, y luego se
    la volver� a pedir para confirmarla:</p>

    <div class="example"><p><code>
      # htpasswd -c /usr/local/apache/passwd/passwords rbowen<br />
      New password: mypassword<br />
      Re-type new password: mypassword<br />
      Adding password for user rbowen
    </code></p></div>

    <p>Si <code class="program"><a href="../programs/htpasswd.html">htpasswd</a></code> no est� en su ruta, por supuesto
    tendr� que escribir la ruta completa al archivo para ejecutarlo.
    En mi servidor, �ste archivo est� en
    <code>/usr/local/apache/bin/htpasswd</code></p>

    <p>El siguiente paso es configurar el servidor para que solicite una
    contrase�a y decirle al servidor a qu� usuarios se les
    permite el acceso. Puede hacer esto editando el archivo
    <code>httpd.conf</code> o usando un archivo <code>.htaccess</code>.
    Por ejemplo, si desea proteger el directorio
    <code>/usr/local/apache/htdocs/secret</code>, puede usar las siguientes
    directivas, ya sea coloc�ndolas en el archivo
    <code>/usr/local/apache/htdocs/secret/.htaccess</code>,
    o en <code>httpd.conf</code> dentro de una secci�n &lt;Directory
    /usr/local/apache/apache/htdocs/secret&gt;.</p>

    <div class="example"><p><code>
      AuthType Basic<br />
      AuthName "Restricted Files"<br />
      AuthUserFile /usr/local/apache/passwd/passwords<br />
      Require user rbowen
    </code></p></div>

    <p>Vamos a examinar cada una de estas directivas por separado. La
    directiva <code class="directive"><a href="../mod/core.html#authtype">AuthType</a></code> selecciona
    el m�todo que se va a usar para autentificar al usuario. El
    m�todo m�s com�n es <code>Basic</code>, y �ste
    m�todo est� implementado en <code class="module"><a href="../mod/mod_auth.html">mod_auth</a></code>. Es importante
    ser consciente, sin embargo, de que la autentificaci�n B�sica
    env�a la contrase�a desde el cliente hasta el navegador sin
    encriptar. Por lo tanto, este m�todo no deber�a ser usado
    para informaci�n altamente sensible. Apache soporta otro m�todo
    de autentificaci�n: <code>AuthType Digest</code>. Este m�todo
    est� implementado en <code class="module"><a href="../mod/mod_auth_digest.html">mod_auth_digest</a></code> y es mucho m�s
    seguro. S�lo las versiones m�s recientes de clientes soportan
    la autentificaci�n del tipo Digest.</p>

    <p>La directiva <code class="directive"><a href="../mod/core.html#authname">AuthName</a></code> establece
    el <dfn>Dominio (Realm)</dfn> a usar en la
    autentificaci�n. El dominio (realm) cumple
    dos funciones importantes. Primero, el cliente frecuentemente presenta
    esta informaci�n al usuario como parte del cuatro de di�logo
    para la contrase�a. Segundo, es usado por el cliente para determinar 
    qu� contrase�a enviar para un �rea autentificada dada.</p>

    <p>As�, por ejemplo, una vez que el cliente se haya autentificado en
    el �rea <code>"Restricted Files"</code>,
    autom�ticamente se volver� a tratar de usar la misma
    contrase�a en cualquier �rea del mismo servidor que est�
    marcado con el Dominio (Realm) <code>"Restricted Files"</code>. Por lo tanto,
    puede evitar que se le pida al usuario la contrase�a
    m�s de una vez permitiendo compartir el mismo dominio (realm)
    para m�ltiples �reas restringidas. Por supuesto, por
    razones de seguridad, el cliente siempre necesitar� pedir de
    nuevo la contrase�a cuando cambie el nombre de la
    m�quina del servidor.</p>

    <p>La directiva <code class="directive"><a href="../mod/mod_auth.html#authuserfile">AuthUserFile</a></code>
    establece la ruta al archivo de contrase�a que acabamos de crear
    con <code class="program"><a href="../programs/htpasswd.html">htpasswd</a></code>. Si tiene un gran n�mero de usuarios,
    ser�a bastante lento buscar por medio de un archivo en texto plano
    para autentificar al usuario en cada solicitud. Apache tambi�n tiene
    la capacidad de almacenar la informaci�n del usuario en 
    archivos r�pidos de bases de datos. El m�dulo <code class="module"><a href="../mod/mod_auth_dbm.html">mod_auth_dbm</a></code>
    proporciona la directiva <code class="directive"><a href="../mod/mod_auth_dbm.html#authdbmuserfile">AuthDBMUserFile</a></code>. Estos archivos pueden
    ser creados y manipulados con el programa
    <code class="program"><a href="../programs/dbmmanage.html">dbmmanage</a></code>. Muchos otros tipos
    de opciones de autentificaci�n est�n disponibles en m�dulos
    de terceras partes en la <a href="http://modules.apache.org/">Base de
    datos de M�dulos de Apache</a>.</p>

    <p>Finalmente, la directiva <code class="directive"><a href="../mod/core.html#require">Require</a></code>
    proporciona la parte de la autorizaci�n del proceso estableciendo
    el usuario al que se le permite acceder a ese �rea del servidor.
    En la pr�xima secci�n, discutimos varias formas de usar la
    directiva <code class="directive"><a href="../mod/core.html#require">Require</a></code>.</p>
</div><div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="section">
<h2><a name="lettingmorethanonepersonin" id="lettingmorethanonepersonin">Permitir el acceso a m�s
de una persona</a></h2>
    <p>Las directivas anteriores s�lo permiten que una persona
    (espec�ficamente alguien con un nombre de usuario de
    <code>rbowen</code>) acceda al directorio. En la mayor�a de los
    casos, usted querr� permitir el acceso a m�s de una persona.
    Aqu� es donde entra la directiva <code class="directive"><a href="../mod/mod_auth.html#authgroupfile">AuthGroupFile</a></code>.</p>

    <p>Si desea permitir la entrada a m�s de una persona, necesitar�
    crear un archivo de grupo que asocie nombres de grupo con una lista
    de usuarios perteneciente a ese grupo. El formato de este archivo es muy sencillo,
    y puede crearlo con su editor favorito. El contenido del archivo
    ser� parecido a este:</p>

   <div class="example"><p><code>
     GroupName: rbowen dpitts sungo rshersey
   </code></p></div>

    <p>Esto es solo una lista de miembros del grupo escritos en una 
    l�nea separados por espacios.</p>

    <p>Para agregar un usuario a un archivo de contrase�as ya existente,
    escriba:</p>

    <div class="example"><p><code>
      htpasswd /usr/local/apache/passwd/passwords dpitts
    </code></p></div>

    <p>Obtendr� la misma respuesta que antes, pero el nuevo usuario ser� agregado
    al archivo existente, en lugar de crear un nuevo archivo.
    (Es la opci�n <code>-c</code> la que se cree un nuevo archivo
    de contrase�as).</p>

    <p>Ahora, necesita modificar su archivo <code>.htaccess</code> para que
    sea como el siguiente:</p>

    <div class="example"><p><code>
      AuthType Basic<br />
      AuthName "By Invitation Only"<br />
      AuthUserFile /usr/local/apache/passwd/passwords<br />
      AuthGroupFile /usr/local/apache/passwd/groups<br />
      Require group GroupName
    </code></p></div>

    <p>Ahora, cualquiera que est� listado en el grupo <code>GroupName</code>,
    y figure en el archivo <code>password</code>, se le permitir�
    el acceso, si escribe la contrase�a correcta.</p>

    <p>Existe otra manera de permitir entrar a m�ltiples usuarios que
    es menos espec�fica. En lugar de crear un archivo de grupo, puede
    usar s�lo la siguiente directiva:</p>

    <div class="example"><p><code>
      Require valid-user
    </code></p></div>

    <p>Usando eso en vez de la l�nea <code>Require user rbowen</code>,
    le permitir� el acceso a cualquiera que est� listado en el
    archivo de contrase�as y que haya introducido correctamente su
    contrase�a. Incluso puede emular el comportamiento del grupo
    aqu�, s�lo manteniendo un archivo de contrase�a para
    cada grupo. La ventaja de esta t�cnica es que Apache s�lo
    tiene que verificar un archivo, en vez de dos. La desventaja es que
    usted tiene que mantener un grupo de archivos de contrase�a, y
    recordar referirse al correcto en la directiva <code class="directive"><a href="../mod/mod_auth.html#authuserfile">AuthUserFile</a></code>.</p>
</div><div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="section">
<h2><a name="possibleproblems" id="possibleproblems">Posibles Problemas</a></h2>
    <p>Por la manera en la que la autentificaci�n b�sica est�
    especificada, su nombre de usuario y contrase�a debe ser verificado
    cada vez que se solicita un documento del servidor. Incluso si est�
    recargando la misma p�gina, y por cada imagen de la p�gina
    (si vienen de un directorio protegido). Como se puede imaginar, esto
    retrasa un poco las cosas. El retraso es proporcional al
    tama�o del archivo de contrase�a, porque se tiene que abrir ese
    archivo, y recorrer la lista de usuarios hasta que encuentre su nombre.
    Y eso se tiene que hacer cada vez que se cargue la p�gina.</p>

    <p>Una consecuencia de esto es que hay un l�mite pr�ctico
    de cu�ntos usuarios puede colocar en un archivo de contrase�as.
    Este l�mite variar� dependiendo del rendimiento de su equipo
    servidor en particular, pero puede esperar observar una disminuci�n
    una vez que inserte unos cientos de entradas, y puede que entonces considere
    un m�todo distinto de autentificaci�n.</p>
</div><div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="section">
<h2><a name="whatotherneatstuffcanido" id="whatotherneatstuffcanido">�Qu� otra cosa
sencilla y efectiva puedo hacer?</a></h2>
    <p>La autentificaci�n por nombre de usuario y contrase�a es
    s�lo parte del cuento. Frecuentemente se desea permitir el acceso
    a los usuarios basandose en algo m�s que qui�nes son. Algo como de
    d�nde vienen.</p>

    <p>Las directivas <code class="directive"><a href="../mod/mod_access.html#allow">Allow</a></code> y
    <code class="directive"><a href="../mod/mod_access.html#deny">Deny</a></code> posibilitan permitir
    y rechazar el acceso dependiendo del nombre o la direcci�n de la
    m�quina que solicita un documento. La directiva <code class="directive"><a href="../mod/mod_access.html#order">Order</a></code> va de la mano con estas dos, y le
    dice a Apache en qu� orden aplicar los filtros.</p>

    <p>El uso de estas directivas es:</p>

    <div class="example"><p><code>
      Allow from <var>address</var>
    </code></p></div>

    <p>donde <var>address</var> es una direcci�n IP (o una
    direcci�n IP parcial) o un nombre de dominio completamente
    cualificado (o un nombre de dominio parcial); puede proporcionar
    m�ltiples direcciones o nombres de dominio, si lo desea.</p>

    <p>Por ejemplo, si usted tiene a alguien que manda mensajes no deseados
    a su foro, y quiere que no vuelva a acceder, podr�a hacer lo
    siguiente:</p>

    <div class="example"><p><code>
      Deny from 205.252.46.165
    </code></p></div>

    <p>Los visitantes que vengan de esa direcci�n no podr�n
    ver el contenido afectado por esta directiva. Si, por el
    contrario, usted tiene un nombre de m�quina pero no una
    direcci�n IP, tambi�n puede usarlo.</p>

    <div class="example"><p><code>
      Deny from <var>host.example.com</var>
    </code></p></div>

    <p>Y, si le gustar�a bloquear el acceso de un dominio entero,
    puede especificar s�lo parte de una direcci�n o nombre de
    dominio:</p>

    <div class="example"><p><code>
      Deny from <var>192.101.205</var><br />
      Deny from <var>cyberthugs.com</var> <var>moreidiots.com</var><br />
      Deny from ke
    </code></p></div>

    <p>Usar <code class="directive"><a href="../mod/mod_access.html#order">Order</a></code> le permitir�
    estar seguro de que efectivamente est� restringiendo el acceso
    al grupo al que quiere permitir el acceso, combinando una directiva
    <code class="directive"><a href="../mod/mod_access.html#deny">Deny</a></code> y una <code class="directive"><a href="../mod/mod_access.html#allow">Allow</a></code>:</p>

    <div class="example"><p><code>
      Order deny,allow<br />
      Deny from all<br />
      Allow from <var>dev.example.com</var>
    </code></p></div>

    <p>Usando s�lo la directiva <code class="directive"><a href="../mod/mod_access.html#allow">Allow</a></code> no har�a lo que desea, porque
    le permitir�a entrar a la gente proveniente de esa m�quina, y
    adicionalmente a cualquier persona. Lo que usted quiere es dejar entrar
    <em>s�lo</em> aquellos.</p>
</div><div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="section">
<h2><a name="moreinformation" id="moreinformation">M�s informaci�n</a></h2>
    <p>Tambi�n deber�a leer la documentaci�n de
    <code class="module"><a href="../mod/mod_auth.html">mod_auth</a></code> y <code class="module"><a href="../mod/mod_access.html">mod_access</a></code> que
    contiene m�s informaci�n acerca de c�mo funciona todo esto.</p>
</div></div>
<div class="bottomlang">
<p><span>Idiomas disponibles: </span><a href="../en/howto/auth.html" hreflang="en" rel="alternate" title="English">&nbsp;en&nbsp;</a> |
<a href="../es/howto/auth.html" title="Espa�ol">&nbsp;es&nbsp;</a> |
<a href="../ja/howto/auth.html" hreflang="ja" rel="alternate" title="Japanese">&nbsp;ja&nbsp;</a> |
<a href="../ko/howto/auth.html" hreflang="ko" rel="alternate" title="Korean">&nbsp;ko&nbsp;</a></p>
</div><div id="footer">
<p class="apache">Copyright 1995-2006 The Apache Software Foundation or its licensors, as applicable.<br />Licencia bajo los t�rminos de la <a href="http://www.apache.org/licenses/LICENSE-2.0">Apache License, Version 2.0</a>.</p>
<p class="menu"><a href="../mod/">M�dulos</a> | <a href="../mod/directives.html">Directivas</a> | <a href="../faq/">Preguntas Frecuentes</a> | <a href="../glossary.html">Glosario</a> | <a href="../sitemap.html">Mapa de este sitio web</a></p></div>
</body></html>