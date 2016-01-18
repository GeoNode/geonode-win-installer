<?xml version="1.0" encoding="ISO-8859-1"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="es" xml:lang="es"><head><!--
        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
              This file is generated from xml source: DO NOT EDIT
        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      -->
<title>Asuntos relacionados con Apache y las DNS - Servidor HTTP Apache</title>
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
<a href="http://www.apache.org/">Apache</a> &gt; <a href="http://httpd.apache.org/">Servidor HTTP</a> &gt; <a href="http://httpd.apache.org/docs/">Documentaci�n</a> &gt; <a href="./">Versi�n 2.0</a></div><div id="page-content"><div id="preamble"><h1>Asuntos relacionados con Apache y las DNS</h1>
<div class="toplang">
<p><span>Idiomas disponibles: </span><a href="./en/dns-caveats.html" hreflang="en" rel="alternate" title="English">&nbsp;en&nbsp;</a> |
<a href="./es/dns-caveats.html" title="Espa�ol">&nbsp;es&nbsp;</a> |
<a href="./fr/dns-caveats.html" hreflang="fr" rel="alternate" title="Fran�ais">&nbsp;fr&nbsp;</a> |
<a href="./ja/dns-caveats.html" hreflang="ja" rel="alternate" title="Japanese">&nbsp;ja&nbsp;</a> |
<a href="./ko/dns-caveats.html" hreflang="ko" rel="alternate" title="Korean">&nbsp;ko&nbsp;</a></p>
</div>

    <p>Este documento puede resumirse en la siguiente frase: no
    configure Apache de manera que el an�lisis sint�ctico de
    los ficheros de configuraci�n tenga que confiar en
    resoluciones DNS. Si Apache necesita de resoluciones DNS para
    analizar los ficheros de configuraci�n, entonces su servidor
    puede no funcionar correctamente (por ejemplo, podr�a no
    iniciarse), o sufrir ataques de denegaci�n o robo de servicio
    (incluyendo que otas web puedan "robar" peticiones de otras
    web).</p>
  </div>
<div id="quickview"><ul id="toc"><li><img alt="" src="./images/down.gif" /> <a href="#example">Un ejemplo sencillo</a></li>
<li><img alt="" src="./images/down.gif" /> <a href="#denial">Denegaci�n de servicio</a></li>
<li><img alt="" src="./images/down.gif" /> <a href="#main">La direcci�n del "servidor principal"</a></li>
<li><img alt="" src="./images/down.gif" /> <a href="#tips">Consejos para evitar problemas</a></li>
<li><img alt="" src="./images/down.gif" /> <a href="#appendix">Ap�ndice: L�neas de evoluci�n de Apache</a></li>
</ul></div>
<div class="top"><a href="#page-header"><img alt="top" src="./images/up.gif" /></a></div>
<div class="section">
<h2><a name="example" id="example">Un ejemplo sencillo</a></h2>
    

    <div class="example"><p><code>
      &lt;VirtualHost www.abc.dom&gt; <br />
      ServerAdmin webgirl@abc.dom <br />
      DocumentRoot /www/abc <br />
      &lt;/VirtualHost&gt;
    </code></p></div>

    <p>Para que Apache funcione correctamente, es imprescindible
    conocer dos aspectos sobre cada host virtual: el valor de la
    directiva <code class="directive"><a href="./mod/core.html#servername">ServerName</a></code> y al
    menos una direcci�n IP en la que servidor escuchar� y
    responder� a las peticiones que se produzcan. El ejemplo
    mostrado arriba no incluye la direccion IP, de manera que Apache
    tiene que usar una resoluci�n DNS para encontrar la
    direcci�n IP correspondiente a <code>www.abc.dom</code>. Si
    por alguna raz�n la resoluci�n DNS no est�
    disponible en el momento en que su servidor est� analizando
    sint�nticamente su fichero de configuraci�n, entonces
    este host virtual <strong>no se configurar�</strong> y no
    ser� capaz de responder a ninguna de las peticiones que se
    hagan a ese host virtual (en las versiones de Apache anteriores a
    la 1.2 el servidor ni siquiera se iniciaba).</p>

    <p>Suponga que <code>www.abc.dom</code> tiene como direcci�n
    IP la 10.0.0.1. Considere la siguiente configuraci�n:</p>

    <div class="example"><p><code>
      &lt;VirtualHost 10.0.0.1&gt; <br />
      ServerAdmin webgirl@abc.dom <br />
      DocumentRoot /www/abc <br />
      &lt;/VirtualHost&gt;
    </code></p></div>

    <p>Ahora Apache necesita hacer una b�squeda DNS inversa para
    encontrar el <code>ServerName</code> de este host virtual. Si esta
    b�squeda inversa falla entonces el host virtual se
    desactivar� parcialmente (en las versiones de Apache
    anteriores a la 1.2 el servidor ni siquiera se iniciaba). Si el
    host virtual est� basado en el nombre, entonces se
    desactivar� completamente, pero si est� basado en la
    direcci�n IP, entonces funcionar� para la mayor parte de
    las cosas. Sin embargo, si Apache tiene que generar en alg�n
    momento una URL completa que incluya el nombre del servidor, no
    ser� capaz de generar una URL v�lida.</p>

    <p>Aqu� tiene una forma de evitar ambos problemas:</p>

    <div class="example"><p><code>
      &lt;VirtualHost 10.0.0.1&gt; <br />
      ServerName www.abc.dom <br />
      ServerAdmin webgirl@abc.dom <br />
      DocumentRoot /www/abc <br />
      &lt;/VirtualHost&gt;
    </code></p></div>
  </div><div class="top"><a href="#page-header"><img alt="top" src="./images/up.gif" /></a></div>
<div class="section">
<h2><a name="denial" id="denial">Denegaci�n de servicio</a></h2>
    

    <p>Hay (al menos) dos formas de que ocurra una denegaci�n de
    servicio. Si est� ejecutando una versi�n de Apache
    anterior a la 1.2, entonces su servidor no se iniciar� si una
    de las dos b�squedas de DNS mencionadas arriba falla para
    cualquiera de sus hosts virtuales. En algunos casos estas
    b�squedas DNS puede que no est�n bajo su control; por
    ejemplo, si <code>abc.dom</code> es uno de sus clientes y ellos
    controlan su propia DNS, pueden forzar a su servidor (pre-1.2) a
    fallar al iniciarse simplemente borrando el registro
    <code>www.abc.dom</code>.</p>

    <p>Otra formas pueden ser bastante m�s complicadas. F�jese
    en esta configuraci�n:</p>

    <div class="example"><p><code>
      &lt;VirtualHost www.abc.dom&gt; <br />
      &nbsp;&nbsp;ServerAdmin webgirl@abc.dom <br />
      &nbsp;&nbsp;DocumentRoot /www/abc <br />
      &lt;/VirtualHost&gt; <br />
      <br />
      &lt;VirtualHost www.def.com&gt; <br />
      &nbsp;&nbsp;ServerAdmin webguy@def.com <br />
      &nbsp;&nbsp;DocumentRoot /www/def <br />
      &lt;/VirtualHost&gt;
    </code></p></div>

    <p>Suponga que ha asignado la direcci�n 10.0.0.1 a
    <code>www.abc.dom</code> y 10.0.0.2 a
    <code>www.def.com</code>. Todav�a m�s, suponga que
    <code>def.com</code> tiene el control de sus propias DNS. Con esta
    configuraci�n ha puesto <code>def.com</code> en una
    posici�n en la que puede robar todo el trafico destinado a
    <code>abc.dom</code>. Para conseguirlo, todo lo que tiene que
    hacer es asignarle a <code>www.def.com</code> la direcci�n
    10.0.0.1. Como ellos controlan sus propias DNS no puede evitar que
    apunten el registro <code>www.def.com</code> a donde quieran.</p>

    <p>Las peticiones dirigidas a la direcci�n 10.0.0.1
    (inclu�das aquellas en las los usuarios escriben URLs de tipo
    <code>http://www.abc.dom/whatever</code>) ser�n todas
    servidas por el host virtual <code>def.com</code>. Comprender por
    qu� ocurre esto requiere una discusi�n m�s profunda
    acerca de como Apache asigna las peticiones que recibe a los hosts
    virtuales que las servir�n. Puede consultar <a href="vhosts/details.html">aqu�</a> un documento que trata el
    tema.</p>
  </div><div class="top"><a href="#page-header"><img alt="top" src="./images/up.gif" /></a></div>
<div class="section">
<h2><a name="main" id="main">La direcci�n del "servidor principal"</a></h2>
    

    <p>El que Apache soporte <a href="vhosts/name-based.html">hosting
    virtual basado en nombres</a> desde la version 1.1 hace que sea
    necesario que el servidor conozca la direcci�n (o
    direcciones) IP del host que <code class="program"><a href="./programs/httpd.html">httpd</a></code> est�
    ejecutando. Para tener acceso a esta direcci�n puede usar la
    directiva global <code class="directive"><a href="./mod/core.html#servername">ServerName</a></code>
    (si est� presente) o llamar a la funci�n de C
    <code>gethostname</code> (la cu�l debe devolver el mismo
    resultado que devuelve ejecutar por l�nea de comandos
    "hostname"). Entonces se produce una b�squeda DNS de esa
    direcci�n. Actualmente, no hay forma de evitar que se
    produzca esta b�squeda.</p>

    <p>Si teme que esta b�squeda pueda fallar porque su servidor
    DNS est� desactivado entonces puede insertar el nombre de
    host en <code>/etc/hosts</code> (donde probablemente ya lo tiene
    para que la m�quina pueda arrancar
    correctamente). Aseg�rese de que su m�quina est�
    configurada para usar <code>/etc/hosts</code> en caso de que esa
    b�squeda DNS falle. En funci�n del sistema operativo que
    use, puede conseguir esto editando <code>/etc/resolv.conf</code>,
    o puede que <code>/etc/nsswitch.conf</code>.</p>

    <p>Si su servidor no tiene que ejecutar b�squedas DNS por
    ninguna otra raz�n entonces considere ejecutar Apache
    especificando el valor "local" en la variable de entorno
    <code>HOSTRESORDER</code>. Todo esto depende del sistema operativo
    y de las librer�as de resoluci�n que use. Esto
    tambi�n afecta a los CGIs a menos que use
    <code class="module"><a href="./mod/mod_env.html">mod_env</a></code> para controlar el entorno. Por favor,
    consulte las p�ginas de ayuda o la secci�n de Preguntas
    M�s Frecuentes de su sistema operativo.</p>
  </div><div class="top"><a href="#page-header"><img alt="top" src="./images/up.gif" /></a></div>
<div class="section">
<h2><a name="tips" id="tips">Consejos para evitar problemas</a></h2>
    

    <ul>
      <li>
        use direcciones IP en 
        <code class="directive"><a href="./mod/core.html#virtualhost">VirtualHost</a></code>
      </li>

      <li>
        use direcciones IP en
        <code class="directive"><a href="./mod/mpm_common.html#listen">Listen</a></code>
      </li>

      <li>
        aseg�rese de que todos los host virtuales tienen
        expl�citamente especificados una directiva <code class="directive"><a href="./mod/core.html#servername">ServerName</a></code>
      </li>

      <li>cree un servidor <code>&lt;VirtualHost _default_:*&gt;</code>
      que no tenga p�ginas que servir.</li>
    </ul>
  </div><div class="top"><a href="#page-header"><img alt="top" src="./images/up.gif" /></a></div>
<div class="section">
<h2><a name="appendix" id="appendix">Ap�ndice: L�neas de evoluci�n de Apache</a></h2>
    

    <p>La situaci�n actual respecto a las b�squedas DNS
    est� lejos de ser la deseable. En Apache 1.2 se intent�
    hacer que el servidor al menos se iniciara a pesar de que fallara
    la b�squeda DNS, pero puede que esa no sea la mejor
    soluci�n. En cualquier caso, requerir el uso de direcciones
    IP expl�citas en los ficheros de configuraci�n no es ni
    mucho menos una soluci�n deseable con la situaci�n
    actual de Internet, donde la renumeraci�n es una
    necesidad.</p>

    <p>Una posible soluci�n a los ataques de robo de servicio
    descritos m�s arriba, ser�a hacer una b�squeda DNS
    inversa de la direcci�n IP devuelta por la b�squeda
    previa y comparar los dos nombres -- en caso de que sean
    diferentes, el host virtual se desactivar�a. Esto
    requerir�a configurar correctamente DNS inverso (una tarea
    con la que suelen estar familiarizados la mayor�a de los
    administradores de sistemas).</p>

    <p>En cualquier caso, no parece posible iniciar en las condiciones
    apropiadas un servidor web alojado virtualmente cuando DNS ha
    fallado a no ser que se usen direcciones IP. Soluciones parciales
    tales como desactivar partes de la configuraci�n podr�an
    ser incluso peores que no iniciar el servidor en absoluto,
    dependiendo de las funciones que se espera que realice el servidor
    web.</p>

    <p>Como HTTP/1.1 est� ampliamente extendido y los navegadores
    y los servidores proxy empiezan a usar la cabecera
    <code>Host</code>, en el futuro ser� posible evitar el uso de
    hosting virtual basado en direcciones IP completamente. En ese
    caso, un servidor web no tiene ninguna necesidad de hacer
    b�squedas de DNS durante la configuraci�n. Sin embargo,
    en Marzo de 1997 esas funcionalidades no estaban lo
    suficientemente implantadas como para ponerlas en uso en
    servidores web que realizaban tareas de importancia
    cr�tica.</p>
  </div></div>
<div class="bottomlang">
<p><span>Idiomas disponibles: </span><a href="./en/dns-caveats.html" hreflang="en" rel="alternate" title="English">&nbsp;en&nbsp;</a> |
<a href="./es/dns-caveats.html" title="Espa�ol">&nbsp;es&nbsp;</a> |
<a href="./fr/dns-caveats.html" hreflang="fr" rel="alternate" title="Fran�ais">&nbsp;fr&nbsp;</a> |
<a href="./ja/dns-caveats.html" hreflang="ja" rel="alternate" title="Japanese">&nbsp;ja&nbsp;</a> |
<a href="./ko/dns-caveats.html" hreflang="ko" rel="alternate" title="Korean">&nbsp;ko&nbsp;</a></p>
</div><div id="footer">
<p class="apache">Copyright 1995-2006 The Apache Software Foundation or its licensors, as applicable.<br />Licencia bajo los t�rminos de la <a href="http://www.apache.org/licenses/LICENSE-2.0">Apache License, Version 2.0</a>.</p>
<p class="menu"><a href="./mod/">M�dulos</a> | <a href="./mod/directives.html">Directivas</a> | <a href="./faq/">Preguntas Frecuentes</a> | <a href="./glossary.html">Glosario</a> | <a href="./sitemap.html">Mapa de este sitio web</a></p></div>
</body></html>