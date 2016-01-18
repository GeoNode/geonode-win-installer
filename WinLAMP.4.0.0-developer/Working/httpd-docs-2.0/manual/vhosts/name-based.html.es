<?xml version="1.0" encoding="ISO-8859-1"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="es" xml:lang="es"><head><!--
        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
              This file is generated from xml source: DO NOT EDIT
        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      -->
<title>Soporte de Hosting Virtual basado en nombres - Servidor HTTP Apache</title>
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
<a href="http://www.apache.org/">Apache</a> &gt; <a href="http://httpd.apache.org/">Servidor HTTP</a> &gt; <a href="http://httpd.apache.org/docs/">Documentaci�n</a> &gt; <a href="../">Versi�n 2.0</a> &gt; <a href="./">Hosting Virtual</a></div><div id="page-content"><div id="preamble"><h1>Soporte de Hosting Virtual basado en nombres</h1>
<div class="toplang">
<p><span>Idiomas disponibles: </span><a href="../de/vhosts/name-based.html" hreflang="de" rel="alternate" title="Deutsch">&nbsp;de&nbsp;</a> |
<a href="../en/vhosts/name-based.html" hreflang="en" rel="alternate" title="English">&nbsp;en&nbsp;</a> |
<a href="../es/vhosts/name-based.html" title="Espa�ol">&nbsp;es&nbsp;</a> |
<a href="../ja/vhosts/name-based.html" hreflang="ja" rel="alternate" title="Japanese">&nbsp;ja&nbsp;</a> |
<a href="../ko/vhosts/name-based.html" hreflang="ko" rel="alternate" title="Korean">&nbsp;ko&nbsp;</a></p>
</div>

    <p>Este documento describe c�mo y cu�ndo debe usarse hosting virtual
    basado en nombres.</p>
</div>
<div id="quickview"><ul id="toc"><li><img alt="" src="../images/down.gif" /> <a href="#namevip">Diferencias entre el hosting vitual
basado en nombres y el basado en IPs</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#using">C�mo usar hosting vitual basado en
nombres</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#compat">Compatibilidad con navegadores
antiguos</a></li>
</ul><h3>Consulte tambi�n</h3><ul class="seealso"><li><a href="ip-based.html">Hosting virtual basado en
IPs</a></li><li><a href="details.html">Discusi�n en profundidad sobre el
proceso de selecci�n de host virtual</a></li><li><a href="mass.html">Configuraci�n din�mica de Hosting virtual masivo</a></li><li><a href="examples.html">Ejemplos de hosting virtual para
configuraciones t�picas</a></li><li><a href="examples.html#serverpath">Ejemplo de 
configuraci�n de ServerPath</a></li></ul></div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="section">
<h2><a name="namevip" id="namevip">Diferencias entre el hosting vitual
basado en nombres y el basado en IPs</a></h2>

    <p>El hosting virtual basado en IPs usa la direcci�n IP de la
    conexi�n para determinar qu� host virtual es el que tiene que
    servir.  Por lo tanto, necesitar� tener diferentes direcciones IP
    para cada host. Si usa hosting virtual basado en nombres, el
    servidor atiende al nombre de host que especifica el cliente en
    las cabeceras de HTTP. Usando esta t�cnica, una sola direcci�n IP
    puede ser compartida por muchos sitios web diferentes.</p>

    <p>El hosting virtual basado en nombres es normalmente m�s
    sencillo, porque solo necesita configurar su servidor de DNS para
    que localice la direcci�n IP correcta y entonces configurar Apache
    para que reconozca los diferentes nombres de host. Usando hosting
    virtual basado en nombres tambi�n se reduce la demanda de
    direcciones IP, que empieza a ser un bien escaso.  Por lo tanto,
    debe usar hosting virtual basado en nombres a no ser que haya
    alguna raz�n especial por la cual tenga que elegir usar hosting
    vitual basado en direcciones IP. Algunas de �stas razones pueden
    ser:</p>

    <ul>
        <li>Algunos clientes antiguos no son compatibles con el
        hosting virtual basado en nombres.  Para que el hosting
        virtual basado en nombres funcione, el cliente debe enviar la
        cabecera de Host HTTP. Esto es necesario para HTTP/1.1, y est�
        implementado como extensi�n en casi todos los navegadores
        actuales. Si necesita dar soporte a clientes obsoletos y usar
        hosting virtual basado en nombres, al final de este documento
        se describe una t�cnica para que pueda hacerlo.</li>

        <li>El hosting virtual basado en nombres no se puede usar
        junto con SSL por la naturaleza del protocolo SSL.</li>

        <li>Algunos sistemas operativos y algunos elementos de red
        tienen implementadas t�cnicas de gesti�n de ancho de banda que
        no pueden diferenciar entre hosts a no ser que no est�n en
        diferentes direcciones IP.</li>
    </ul>

</div><div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="section">
<h2><a name="using" id="using">C�mo usar hosting vitual basado en
nombres</a></h2>

<table class="related"><tr><th>M�dulos Relacionados</th><th>Directivas Relacionadas</th></tr><tr><td><ul><li><code class="module"><a href="../mod/core.html">core</a></code></li></ul></td><td><ul><li><code class="directive"><a href="../mod/core.html#documentroot">DocumentRoot</a></code></li><li><code class="directive"><a href="../mod/core.html#namevirtualhost">NameVirtualHost</a></code></li><li><code class="directive"><a href="../mod/core.html#serveralias">ServerAlias</a></code></li><li><code class="directive"><a href="../mod/core.html#servername">ServerName</a></code></li><li><code class="directive"><a href="../mod/core.html#serverpath">ServerPath</a></code></li><li><code class="directive"><a href="../mod/core.html#virtualhost">&lt;VirtualHost&gt;</a></code></li></ul></td></tr></table>

    <p>Para usar hosting virtual basado en nombres, debe especificar
    en el servidor qu� direcci�n IP (y posiblemente qu� puerto) se va
    a usar para atender las peticiones a los diferentes hosts.  Esto
    se hace con la directiva <code class="directive"><a href="../mod/core.html#namevirtualhost">NameVirtualHost</a></code>. Normalmente, cualquiera
    o todas las direcciones IP del servidor pueden usarse, tambi�n
    puede usar <code>*</code> como argumento para la directiva
    <code class="directive"><a href="../mod/core.html#namevirtualhost">NameVirtualHost</a></code>. Si va a usar
    m�s de un puerto (por ejemplo si va usar SSL) debe a�adir un
    puerto a cada argumento, por ejemplo <code>*:80</code>. Tenga en
    cuenta que especificando una direcci�n IP en la directiva
    <code class="directive"><a href="../mod/core.html#namevirtualhost">NameVirtualHost</a></code> no hace que
    el servidor escuche autom�ticamente en esa direcci�n IP. Consulte
    la secci�n <a href="../bind.html">Especificar las direcciones y
    puertos que usa Apache</a> para obtener m�s informaci�n. Adem�s,
    cualquier direcci�n IP especificada debe asociarse con un
    dispositivo de red del servidor.</p>

    <p>El siguiente paso es crear un bloque <code class="directive"><a href="../mod/core.html#virtualhost">&lt;VirtualHost&gt;</a></code> para cada host diferente que
    quiera alojar en el servidor. El argumento de la directiva
    <code class="directive"><a href="../mod/core.html#virtualhost">&lt;VirtualHost&gt;</a></code>
    debe ser el mismo que el argumento de la directiva <code class="directive"><a href="../mod/core.html#namevirtualhost">NameVirtualHost</a></code> (por ejemplo, una
    direcci�n IP, o un <code>*</code> para usar todas las direcciones
    que tenga el servidor).  Dentro de cada bloque <code class="directive"><a href="../mod/core.html#virtualhost">&lt;VirtualHost&gt;</a></code>, necesitar�
    como m�nimo una directiva <code class="directive"><a href="../mod/core.html#servername">ServerName</a></code> para designar qu� host se
    sirve y una directiva <code class="directive"><a href="../mod/core.html#documentroot">DocumentRoot</a></code> para indicar d�nde est�n
    los contenidos a servir dentro del sistema de ficheros.</p>

    <div class="note"><h3>A�adir hosts vituales a un servidor web ya existente</h3>     
        <p>Si est� a�adiendo hosts virtuales a un servidor web ya
        existente, debe crear tambi�n un bloque <code class="directive"><a href="../mod/core.html#virtualhost">&lt;VirtualHost&gt;</a></code> para el
        host que ya tenga funcionando. Los valores de las directivas
        <code class="directive"><a href="../mod/core.html#servername">ServerName</a></code> y <code class="directive"><a href="../mod/core.html#documentroot">DocumentRoot</a></code> desde este nuevo host
        virtual deben tener los mismos valores que los de las
        directivas <code class="directive"><a href="../mod/core.html#servername">ServerName</a></code>
        <code class="directive"><a href="../mod/core.html#documentroot">DocumentRoot</a></code>
        globales. Ponga este host virtual como el primero en el
        archivo de configuraci�n para que sea el que act�e como host
        por defecto.</p>
    </div>

    <p>Por ejemplo, suponga que est� sirviendo el dominio
    <code>www.domain.tld</code> y quiere a�adir el host virtual
    <code>www.otherdomain.tld</code>, que apunta a la misma direcci�n
    IP. Entonces, lo �nico que tiene que hacer es a�adir lo siguiente
    al fichero <code>httpd.conf</code>:</p>

    <div class="example"><p><code>
        NameVirtualHost *:80<br />
        <br />
        &lt;VirtualHost *:80&gt;<br />
        <span class="indent">
            ServerName www.domain.tld<br />
            ServerAlias domain.tld *.domain.tld<br />
            DocumentRoot /www/domain<br />
        </span>
        &lt;/VirtualHost&gt;<br />
        <br />
        &lt;VirtualHost *:80&gt;<br />
        <span class="indent">ServerName www.otherdomain.tld<br />
            DocumentRoot /www/otherdomain<br />
        </span>
        &lt;/VirtualHost&gt;<br />
    </code></p></div>

    <p>Tambi�n puede optar por especificar una direcci�n IP
    expl�citamente en lugar de usar un <code>*</code> en las
    directivas <code class="directive"><a href="../mod/core.html#namevirtualhost">NameVirtualHost</a></code> y
    <code class="directive"><a href="../mod/core.html#virtualhost">&lt;VirtualHost&gt;</a></code>. Por ejemplo, puede hacer esto
    para hacer funcionar diferentes hosts virtuales basados en nombres
    en una direcci�n IP, o basados en IPs, o un conjunto de hosts
    virtuales basados en nombres en otra direcci�n.</p>

    <p>Tambi�n puede que quiera que se acceda a un determinado sitio
    web usando diferentes nombres. Esto es posible con la directiva
    <code class="directive"><a href="../mod/core.html#serveralias">ServerAlias</a></code>, puesta dentro de
    la secci�n <code class="directive"><a href="../mod/core.html#virtualhost">&lt;VirtualHost&gt;</a></code>. Por ejemplo, en el primer bloque
    <code class="directive"><a href="../mod/core.html#virtualhost">&lt;VirtualHost&gt;</a></code> de
    arriba, la directiva <code class="directive"><a href="../mod/core.html#serveralias">ServerAlias</a></code> indica la lista de nombres
    que pueden usarse para acceder a un mismo sitio web:</p>

    <div class="example"><p><code>
        ServerAlias domain.tld *.domain.tld
    </code></p></div>

    <p>entonces las peticiones para todos los hosts en el dominio
    <code>domain.tld</code> ser�n servidas por el host virtual
    <code>www.domain.tld</code>. Los car�cteres comodines
    <code>*</code> y <code>?</code> pueden usarse para encontrar
    equivalencias con los nombres.  Por supuesto, no puede inventarse
    nombres y ponerlos en la directiva <code class="directive"><a href="../mod/core.html#servername">ServerName</a></code> o
    <code>ServerAlias</code>. Primero debe tener su servidor de DNS
    debidamente configurado para que pueda hacer corresponder esos
    nombres con una direcci�n IP de su servidor.</p>

    <p>Para terminar, puede mejorar el rendimiento de la configuraci�n
    de los hosts virtuales poniendo otras directivas dentro de las
    secciones <code class="directive"><a href="../mod/core.html#virtualhost">&lt;VirtualHost&gt;</a></code>. La mayor parte de las
    directivas pueden ponerse en esos containers y cambiar�n solo la
    configuraci�n del host virtual al que se refieran. Para ver si una
    directiva en particualar puede usarse as�, consulte el <a href="../mod/directive-dict.html#Context">Contexto</a> de la
    directiva. Las directivas de configuraci�n especificadas en el
    <em>contexto del servidor principal</em> (fuera de
    cualquier secci�n <code class="directive"><a href="../mod/core.html#virtualhost">&lt;VirtualHost&gt;</a></code>) se usan �nica y
    exclusivamente si sus valores no son sustituidos por alguno de los
    par�metros de configuraci�n del host virtual.</p>

    <p>Cuando llega una petici�n, el servidor primero verifica si se
    est� usando una direcci�n IP que coincide con el valor de la
    directiva <code class="directive"><a href="../mod/core.html#namevirtualhost">NameVirtualHost</a></code>. Si es el caso, mirar� en cada
    secci�n <code class="directive"><a href="../mod/core.html#virtualhost">&lt;VirtualHost&gt;</a></code> cuya IP coincida e intentar�
    encontrar si el valor de la directiva <code class="directive"><a href="../mod/core.html#servername">ServerName</a></code> o de la directiva <code>ServerAlias</code>
    coincide con el nombre del sitio web de la petici�n. Si encuentra
    una coincidencia, usa la configuraci�n de ese servidor. Si no la
    encuentra, usa <strong>el primer host virtual de la lista</strong>
    cuya direcci�n IP coincida con el de la petici�n.</p>

    <p>Como consecuencia, el primer host virtual de la lista es el que
    se usa <em>por defecto</em>.  La directiva <code class="directive"><a href="../mod/core.html#documentroot">DocumentRoot</a></code> del <em>servidor
    principal</em> no se usar� <strong>nunca</strong> cuando una
    direcci�n IP coincida con el valor de la directiva <code class="directive"><a href="../mod/core.html#namevirtualhost">NameVirtualHost</a></code>. Si quiere usar una
    configuraci�n especial para peticiones que no coinciden con ning�n
    host virtual en concreto, ponga esa configuraci�n en una secci�n
    <code class="directive"><a href="../mod/core.html#virtualhost">&lt;VirtualHost&gt;</a></code> y
    p�ngala la primera en el fichero de configuraci�n.</p>

</div><div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="section">
<h2><a name="compat" id="compat">Compatibilidad con navegadores
antiguos</a></h2>

    <p>Como se dijo antes, hay algunos clientes que no env�an los
    datos necesarios para que funcione correctamente el hosting
    virtual basado en nombres. Estos clientes van a recibir siempre
    como respuesta a sus peticiones, p�ginas del primer host virtual
    que haya en la lista para esa direcci�n IP (el host virtual
    <cite>primario</cite> basado en nombres).</p>

    <div class="note"><h3>�C�mo de antiguo?</h3> 
    <p>Tenga en cuenta que cuando decimos antiguo, queremos decir
    realmente antiguo. Es muy poco probable que encuentre uno de esos
    navegadores en uso todav�a. Todas las versiones actuales de
    cualquier navegador env�an la cabecera <code>Host</code> que se
    necesita para que el hosting virtual basado en nombres
    funcione.</p>
    </div>

    <p>Existe una manera de evitar este problema con la directiva
    <code class="directive"><a href="../mod/core.html#serverpath">ServerPath</a></code>, aunque es un poco
    complicada:</p>

    <p>Ejemplo de configuraci�n:</p>

    <div class="example"><p><code>
        NameVirtualHost 111.22.33.44<br />
        <br />
        &lt;VirtualHost 111.22.33.44&gt;<br />
        <span class="indent">
            ServerName www.domain.tld<br />
            ServerPath /domain<br />
            DocumentRoot /web/domain<br />
        </span>
        &lt;/VirtualHost&gt;<br />
    </code></p></div>

    <p>�Qu� significa esto? Esto significa que una petici�n de
    cualquier URI que empiece por "<code>/domain</code>" ser� servida
    por el host virtual <code>www.domain.tld</code>. Esto significa
    que las p�ginas pueden accederse como
    <code>http://www.domain.tld/domain/</code> por todos los clientes,
    aunque los clientes que env�en una cabecera <code>Host:</code>
    pueden tambi�n acceder con
    <code>http://www.domain.tld/</code>.</p>

    <p>Para hacer que esto funcione, ponga un enlace en la p�gina de
    su host virtual primario a
    <code>http://www.domain.tld/domain/</code>. Entonces, en las
    p�ginas del host virtual, aseg�rese de que usa o enlaces relativos
    (<em>por ejemplo</em>, "<code>file.html</code>" o
    "<code>../icons/image.gif</code>") o enlaces que contengan el
    <code>/domain/</code> anterior (<em>por ejemplo</em>,
    "<code>http://www.domain.tld/domain/misc/file.html</code>" o
    "<code>/domain/misc/file.html</code>").</p>

    <p>Esto requiere un poco de disciplina, pero siguiendo estas
    reglas, puede asegurarse, casi en todos los casos, de que las
    p�ginas de su sitio web podr�n ser accedidas desde cualquier
    navegador, ya sea nuevo o antiguo.</p>

</div></div>
<div class="bottomlang">
<p><span>Idiomas disponibles: </span><a href="../de/vhosts/name-based.html" hreflang="de" rel="alternate" title="Deutsch">&nbsp;de&nbsp;</a> |
<a href="../en/vhosts/name-based.html" hreflang="en" rel="alternate" title="English">&nbsp;en&nbsp;</a> |
<a href="../es/vhosts/name-based.html" title="Espa�ol">&nbsp;es&nbsp;</a> |
<a href="../ja/vhosts/name-based.html" hreflang="ja" rel="alternate" title="Japanese">&nbsp;ja&nbsp;</a> |
<a href="../ko/vhosts/name-based.html" hreflang="ko" rel="alternate" title="Korean">&nbsp;ko&nbsp;</a></p>
</div><div id="footer">
<p class="apache">Copyright 1995-2006 The Apache Software Foundation or its licensors, as applicable.<br />Licencia bajo los t�rminos de la <a href="http://www.apache.org/licenses/LICENSE-2.0">Apache License, Version 2.0</a>.</p>
<p class="menu"><a href="../mod/">M�dulos</a> | <a href="../mod/directives.html">Directivas</a> | <a href="../faq/">Preguntas Frecuentes</a> | <a href="../glossary.html">Glosario</a> | <a href="../sitemap.html">Mapa de este sitio web</a></p></div>
</body></html>