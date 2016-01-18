<?xml version="1.0" encoding="ISO-8859-1"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="es" xml:lang="es"><head><!--
        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
              This file is generated from xml source: DO NOT EDIT
        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      -->
<title>Soporte de Objetos Dinamicos Compartidos (DSO) - Servidor HTTP Apache</title>
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
<a href="http://www.apache.org/">Apache</a> &gt; <a href="http://httpd.apache.org/">Servidor HTTP</a> &gt; <a href="http://httpd.apache.org/docs/">Documentaci�n</a> &gt; <a href="./">Versi�n 2.0</a></div><div id="page-content"><div id="preamble"><h1>Soporte de Objetos Dinamicos Compartidos (DSO)</h1>
<div class="toplang">
<p><span>Idiomas disponibles: </span><a href="./en/dso.html" hreflang="en" rel="alternate" title="English">&nbsp;en&nbsp;</a> |
<a href="./es/dso.html" title="Espa�ol">&nbsp;es&nbsp;</a> |
<a href="./fr/dso.html" hreflang="fr" rel="alternate" title="Fran�ais">&nbsp;fr&nbsp;</a> |
<a href="./ja/dso.html" hreflang="ja" rel="alternate" title="Japanese">&nbsp;ja&nbsp;</a> |
<a href="./ko/dso.html" hreflang="ko" rel="alternate" title="Korean">&nbsp;ko&nbsp;</a></p>
</div>

    <p>El servidor HTTP Apache es un programa modular en el que el
    administrador puede elegir qu� funcionalidades se incluyen
    mediante la selecci�n de un conjunto de m�dulos. En
    primer lugar, los m�dulos pueden compilarse de manera
    est�tica en el binario <code class="program"><a href="./programs/httpd.html">httpd</a></code>. De forma
    alternativa, los m�dulos tambi�n pueden compilarse como
    Objetos Dinamicos Compartidos (DSOs) que existen de forma
    independiente del archivo binario <code class="program"><a href="./programs/httpd.html">httpd</a></code>. Los
    m�dulos que se deseen usar como objetos din�micos
    compartidos pueden compilarse al mismo tiempo que el servidor, o
    pueden compilarse en otro momento y ser a�adidos despu�s
    usando la Herramienta de Extensi�n de Apache
    (<code class="program"><a href="./programs/apxs.html">apxs</a></code>).</p>

    <p>Este documento describe c�mo usar los m�dulos en
    forma de objeto din�mico compartido (DSO) as� como los
    fundamentos te�ricos que hay detr�s para explicar su
    funcionamiento.</p>
  </div>
<div id="quickview"><ul id="toc"><li><img alt="" src="./images/down.gif" /> <a href="#implementation">Implementaci�n</a></li>
<li><img alt="" src="./images/down.gif" /> <a href="#usage">Resumen de uso</a></li>
<li><img alt="" src="./images/down.gif" /> <a href="#background">Fundamentos teor�ricos
detr�s de los objetos din�micos compartidos</a></li>
<li><img alt="" src="./images/down.gif" /> <a href="#advantages">Ventajas e Inconvenientes</a></li>
</ul></div>
<div class="top"><a href="#page-header"><img alt="top" src="./images/up.gif" /></a></div>
<div class="section">
<h2><a name="implementation" id="implementation">Implementaci�n</a></h2>

<table class="related"><tr><th>M�dulos Relacionados</th><th>Directivas Relacionadas</th></tr><tr><td><ul><li><code class="module"><a href="./mod/mod_so.html">mod_so</a></code></li></ul></td><td><ul><li><code class="directive"><a href="./mod/mod_so.html#loadmodule">LoadModule</a></code></li></ul></td></tr></table>

    <p>Cargar m�dulos de Apache individualmente como objetos
    din�micos compartidos (DSO) es posible gracias a un
    m�dulo llamado <code class="module"><a href="./mod/mod_so.html">mod_so</a></code> que debe compilarse
    est�ticamente en el n�cleo (kernel) de Apache. Es el
    �nico m�dulo junto con el m�dulo
    <code class="module"><a href="./mod/core.html">core</a></code> que no se puede usar como objeto
    din�mico compartido. Pr�cticamente todos los dem�s
    m�dulos distribuidos con Apache se pueden usar como objetos
    din�micos compartidos individualmente siempre y cuando se
    haya activado la posibilidad de usarlos con la opci�n de
    <code class="program"><a href="./programs/configure.html">configure</a></code>
    <code>--enable-<em>module</em>=shared</code> tal y como se
    explic� en la <a href="install.html">documentaci�n de
    instalaci�n</a>. Una vez que haya compilado un m�dulo
    como objeto din�mico compartido y le haya puesto un nombre
    del tipo <code>mod_foo.so</code>, puede cargarlo al iniciar o
    reiniciar el servidor usando el comando <code class="directive"><a href="./mod/mod_so.html#loadmodule">LoadModule</a></code> de <code class="module"><a href="./mod/mod_so.html">mod_so</a></code>
    en el fichero <code>httpd.conf</code>.</p>

    <p>Para simplificar la creaci�n de objetos din�micos
    compartidos para Apache (especialmente m�dulos de terceras
    partes) est� disponible un nuevo programa de soporte llamado
    <code class="program"><a href="./programs/apxs.html">apxs</a></code> (<em>APache eXtenSion</em>). Puede usar
    este programa para crear m�dulos como objetos din�micos
    compartidos <em>sin tener que</em> crearlos al mismo tiempo que
    compila su servidor Apache. La idea es simple: cuando se instala
    Apache el procedimiento <code>make install</code> de
    <code class="program"><a href="./programs/configure.html">configure</a></code> @@@ installs the Apache C header
    files and puts the platform-dependent compiler and linker flags
    for building DSO files into the apxs program / instala los
    ficheros de cabecera de C de Apache y especifica las opciones de
    compilaci�n y enlace dependientes de la plataforma para
    generar objetos din�micos compartidos con
    <code class="program"><a href="./programs/apxs.html">apxs</a></code>. De esta manera el usuario puede usar
    <code class="program"><a href="./programs/apxs.html">apxs</a></code> para compilar el c�digo fuente de
    m�dulos de Apache de manera independiente y sin tener que
    preocuparse por las opciones de compilaci�n y enlace
    dependientes de la plataforma que soportan objetos din�micos
    compartidos.</p>

</div><div class="top"><a href="#page-header"><img alt="top" src="./images/up.gif" /></a></div>
<div class="section">
<h2><a name="usage" id="usage">Resumen de uso</a></h2>

    <p>Para que se haga una idea de lo que permite el soporte de
    objetos din�micos compartidos en Apache 2.0, aqu� tiene
    un resumen breve pero conciso:</p>

    <ol>
      <li>
        Construir e instalar un m�dulo <em>incluido en la
        distribuci�n</em> de Apache, digamos
        <code>mod_foo.c</code>, como un objeto din�mico
        compartido de nombre <code>mod_foo.so</code>:

<div class="example"><p><code>
$ ./configure --prefix=/path/to/install --enable-foo=shared<br />
$ make install
</code></p></div>
      </li>

      <li>
        Construir e instalar un m�dulo de Apache de una
        <em>tercera parte</em>, digamos <code>mod_foo.c</code>, como
        un objeto din�mico compartido de nombre
        <code>mod_foo.so</code>:

<div class="example"><p><code>
$ ./configure --add-module=module_type:/path/to/3rdparty/mod_foo.c --enable-foo=shared<br />
$ make install
</code></p></div>
      </li>

      <li>
        Configurar Apache para poder <em>instalar despu�s</em>
        objetos din�micos compartidos:

<div class="example"><p><code>
$ ./configure --enable-so<br />
$ make install
</code></p></div>
      </li>

      <li>
	Construir e instalar un m�dulo de Apache de una
        <em>tercera parte</em>, digamos <code>mod_foo.c</code>, como
        un objeto din�mico compartido de nombre
        <code>mod_foo.so</code> <em>fuera</em> de la estructura de
        directorios de Apache usando <code class="program"><a href="./programs/apxs.html">apxs</a></code>:

<div class="example"><p><code>
$ cd /path/to/3rdparty<br />
$ apxs -c mod_foo.c<br />
$ apxs -i -a -n foo mod_foo.la
</code></p></div>
      </li>
    </ol>

    <p>En todos los casos, una vez que se compila el objeto
        din�mico compartido, debe usar una directiva <code class="directive"><a href="./mod/mod_so.html#loadmodule">LoadModule</a></code> en
        <code>httpd.conf</code> para activar dicho m�dulo.</p>
</div><div class="top"><a href="#page-header"><img alt="top" src="./images/up.gif" /></a></div>
<div class="section">
<h2><a name="background" id="background">Fundamentos teor�ricos
detr�s de los objetos din�micos compartidos</a></h2>

    <p>En las versiones modernas de Unix, existe un mecanismo
    especialmente �til normalmente llamado enlazado/carga de
    <em>Objetos Din�micos Compartidos</em> (DSO). Este mecanismo
    ofrece una forma de construir trozos de c�digo de programa en
    un formato especial para cargarlo en tiempo de ejecuci�n en
    el espacio de direcciones de memoria de un programa
    ejecutable.</p>

    <p>Esta carga puede hacerse de dos maneras: autom�ticamente
    con un programa de sistema llamado <code>ld.so</code> al inicio de
    un programa ejecutable o manualmente desde dentro del programa en
    ejecuci�n con una interfaz program�tica del sistema al
    cargador de Unix mediante llamadas al sistema
    <code>dlopen()/dlsym()</code>.</p>

    <p>Si se usa el primer m�todo, los objetos din�micos
        compartidos se llaman normalmente <em>librer�as
        compartidas</em> � <em>librer�as DSO</em> y se
        nombran como <code>libfoo.so</code> o
        <code>libfoo.so.1.2</code>. Residen en un directorio de
        sistema (normalmente <code>/usr/lib</code>) y el enlace con el
        programa ejecutable se establece al construir la librer�a
        especificando la opci�n<code>-lfoo</code> al comando de
        enlace. Esto incluye las referencias literales a las
        librer�as en el programa ejecutable de manera que cuando
        se inicie, el cargador de Unix ser� capaz de localizar
        <code>libfoo.so</code> en <code>/usr/lib</code>, en rutas
        referenciadas literalmente mediante opciones del linker como
        <code>-R</code> o en rutas configuradas mediante la variable
        de entorno <code>LD_LIBRARY_PATH</code>. Entonces se resuelven
        los s�mbolos (todav�a no resueltos) en el programa
        ejecutable que est�n presentes en el objeto din�mico
        compartido.</p>

    <p>Los s�mbolos en el programa ejecutable no est�n
    referenciados normalmente en el objeto din�mico compartido
    (porque son librer�as reusables de prop�sito general) y
    por tanto, no se producen m�s resoluciones. El programa
    ejecutable no tiene que hacer nada por s� mismo para usar los
    s�mbolos del objeto din�mico compartido porque todo el
    trabajo de resoluci�n lo hace @@@ Unix loader / el cargador
    de Unix @@@. (De hecho, el c�digo para invocar
    <code>ld.so</code> es parte del c�digo que se ejecuta al
    iniciar, y que hay en cualquier programa ejecutable que haya sido
    construido de forma no est�tica). La ventaja de cargar
    din�micamente el c�digo de las librer�as comunes es
    obvia: el c�digo de las librer�as necesita ser almacenado
    solamente una vez, en una librer�a de sistema como
    <code>libc.so</code>, ahorrando as� espacio en disco.</p>

    <p>Por otro lado, los objetos din�micos compartidos
        tambi�n suelen llamarse <em>objetos compatidos</em> o
        <em>ficheros DSO</em> y se les puede nombrar con cualquier
        extensi�n (aunque su nombre can�nico es
        <code>foo.so</code>). Estos archivos normalmente permanecen
        dentro de un directorio espec�fico del programa y no se
        establecen enlaces autom�ticamente con los programas
        ejecutables con los que se usan.  En lugar de esto, el
        programa ejecutable carga manualmente el objeto din�mico
        compartido en tiempo de ejecuci�n en su espacio de
        direcciones de memoria con <code>dlopen()</code>. En ese
        momento no se resuelven los s�mbolos del objeto
        din�mico compartido para el programa ejecutable. En lugar
        de esto, el cargador de Unix resuelve autom�ticamente los
        s�mbolos (a�n no resueltos en el objeto
        din�mico compartido del conjunto de s�mbolos
        exportados por el programa ejecutable y de las librer�as
        DSO que tenga ya cargadas (especialmente todos los
        s�mbolos de la omnipresente <code>libc.so</code>). De
        esta manera el objeto din�mico compartido puede conocer
        el conjunto de s�mbolos del programa ejecutable como si
        hubiera sido enlazado est�ticamente en un primer
        momento.</p>

    <p>Finalmente, para beneficiarse de la API de las DSOs, el
    programa ejecutable tiene que resolver los s�mbolos
    particulares de la DSO con <code>dlsym()</code> para ser usado
    m�s tarde dentro de tablas de direccionamiento (dispatch
    tables) <em>etc.</em> En otras palabras: El programa ejecutable
    tiene que resolver manualmente cada uno de los s�mbolos que
    necesita para poder usarlo despu�s. La ventaja de ese
    mecanismo es que las partes opcionales del programa no necesitan
    ser cargadas (y por tanto no consumen memoria) hasta que se
    necesitan por el programa en cuesti�n. Cuando es necesario,
    estas partes del programa pueden cargarse din�micamente para
    expandir las funcionalidades b�sicas del programa.</p>

    <p>Aunque este mecanismo DSO parece muy claro, hay al menos un
    paso de cierta dificultad: la resoluci�n de los s�mbolos
    que usa el programa ejecutable por la DSO cuando se usa una DSO
    para extender la funcionalidad de una programa (segundo caso). Por
    qu�? Porque la resoluci�n inversa de s�mbolos de
    DSOs del conjunto de s�mbolos del programa ejecutable se hace
    en contra del dise�o de la librer�a (donde la
    librer�a no tiene conocimiento sobre los programas que la
    usan) y tampoco est� disponible en todas las plataformas no
    estandarizadas. En la pr�ctica los s�mbolos globales del
    programa ejecutable est�n disponibles para su uso en una
    DSO. El mayor problema que hay que resolver cuando se usan DSOs
    para extender un programa en tiempo de ejecuci�n es encontrar
    un modo de forzar al enlazador a exportar todos los s�mbolos
    globales.</p>

    <p>El enfoque de las librer�as compartidas es bastante
    t�pico, porque es para lo que se dise�o el mecanismo
    DSO, por tanto se usa para casi todos los tipos de librer�as
    que incluye el sistema operativo. Por otro lado, no muchos
    programas usan objetos compartidos para expandir sus
    funcionalidades.</p>

    <p>En 1998, hab�a solamente unos pocos programas disponibles
    que usaban el mecanismo DSO para extender su funcionalidad en
    tiempo de ejecucion: Perl 5 (por medio de su mecanismo XS y el
    m�dulo DynaLoader), Netscape Server, <em>etc.</em> A partir
    de la version 1.3, Apache se uni� a este grupo, Apache usa
    desde entonces una concepci�n modular para extender su
    funcionalidad e internamente usa un enfoque de tablas de
    direccionamiento (dispatch-list-based) para enlazar m�dulos
    externos con las funcionalidades propias del servidor. De esta
    manera, Apache puede usar el mecanismo DSO para cargar sus
    m�dulos en tiempo de ejecuci�n.</p>
</div><div class="top"><a href="#page-header"><img alt="top" src="./images/up.gif" /></a></div>
<div class="section">
<h2><a name="advantages" id="advantages">Ventajas e Inconvenientes</a></h2>

    <p>Las caracter�sticas de las librer�as din�micas
    compartidas arriba explicadas tienen las siguientes ventajas:</p>

    <ul>
      <li>El servidor es mucho m�s flexible en tiempo de
      ejecuci�n porque pueden a�adirse m�dulos mediante
      comandos de configuraci�n <code class="directive"><a href="./mod/mod_so.html#loadmodule">LoadModule</a></code> en
      <code>httpd.conf</code> en lugar de tener que hacerlo con las
      opciones de <code class="program"><a href="./programs/configure.html">configure</a></code> al compilar. Por
      ejemplo, de esta manera uno puede ejecutar diferentes instancias
      del servidor (est�ndar &amp; SSL, m�nima &amp; super
      potente [mod_perl, PHP3], <em>etc.</em>) con una �nica
      instalaci�n de Apache.</li>

      <li>El servidor puede ser extendido f�cilmente con
      m�dulos de terceras partes despu�s de la
      instalaci�n. Esto es un gran beneficio al menos para los
      mantenedores de paquetes de distribuciones, que pueden crear un
      paquete b�sico de Apache y paquetes adicionales que
      contengan extensiones tales como PHP3, mod_perl, mod_fastcgi,
      <em>etc.</em></li>

      <li>Facilita la labor de hacer prototipos de m�dulos de
      Apache porque con el d�o DSO/<code class="program"><a href="./programs/apxs.html">apxs</a></code> se
      puede trabajar fuera de la estructura de directorios de Apache y
      �nicamente es necesario el comando <code>apxs -i</code>
      seguido del comando <code>apachectl restart</code> para probar
      la nueva versi�n del m�dulo que se est�
      desarrollando.</li>
    </ul>

    <p>DSO presenta los siguientes inconvenientes:</p>

    <ul>
      <li>El mecanismo DSO no puede ser usado en todas las plataformas
      porque no todos los sistemas operativos soportan la carga
      din�mica de c�digo en el espacio de direcciones de
      memoria de un programa.</li>

      <li>El servidor es aproximadamente un 20% m�s lento
      inici�ndose por la sobrecarga que implica la
      resoluci�n de s�mbolos por parte del cargador de Unix.</li>

      <li>El servidor es aproximadamente un 5% m�s lento
      ejecut�ndose en algunas plataformas porque el c�digo
      posicionado independientemente (PIC) necesita algunas veces
      procesos bastante complicados para calcular direcciones
      relativas que no son en principio tan r�pidos como los que
      se usan para calcular direcciones absolutas.</li>

      <li>Como los m�dulos DSO no pueden enlazarse a otras
      librer�as basadas en DSO (<code>ld -lfoo</code>) en todas
      las plataformas (por ejemplo en las plataformas basadas en a.out
      normalmente no puede ser usada esta funcionalidad, mientras que
      s� puede ser usada en las plataformas basadas en ELF) no se
      puede usar el mecanismo DSO para todos los tipos de
      m�dulos. En otras palabras, los m�dulos compilados
      como ficheros DSO solamente pueden usar s�mbolos del
      n�cleo (kernel) de Apache, los de las librer�as de C
      (<code>libc</code>) y de todas las demas librer�as
      din�micas o est�ticas usadas por el n�cleo de
      Apache, o de archivos de librer�as est�ticas
      (<code>libfoo.a</code>) que contengan c�digo independiente
      de su posici�n. Las �nicas posibilidades para usar
      otro c�digo es asegurarse de que el n�cleo de Apache
      contiene una referencia a �l o cargar el c�digo por
      medio de <code>dlopen()</code>.</li>
    </ul>

</div></div>
<div class="bottomlang">
<p><span>Idiomas disponibles: </span><a href="./en/dso.html" hreflang="en" rel="alternate" title="English">&nbsp;en&nbsp;</a> |
<a href="./es/dso.html" title="Espa�ol">&nbsp;es&nbsp;</a> |
<a href="./fr/dso.html" hreflang="fr" rel="alternate" title="Fran�ais">&nbsp;fr&nbsp;</a> |
<a href="./ja/dso.html" hreflang="ja" rel="alternate" title="Japanese">&nbsp;ja&nbsp;</a> |
<a href="./ko/dso.html" hreflang="ko" rel="alternate" title="Korean">&nbsp;ko&nbsp;</a></p>
</div><div id="footer">
<p class="apache">Copyright 1995-2006 The Apache Software Foundation or its licensors, as applicable.<br />Licencia bajo los t�rminos de la <a href="http://www.apache.org/licenses/LICENSE-2.0">Apache License, Version 2.0</a>.</p>
<p class="menu"><a href="./mod/">M�dulos</a> | <a href="./mod/directives.html">Directivas</a> | <a href="./faq/">Preguntas Frecuentes</a> | <a href="./glossary.html">Glosario</a> | <a href="./sitemap.html">Mapa de este sitio web</a></p></div>
</body></html>