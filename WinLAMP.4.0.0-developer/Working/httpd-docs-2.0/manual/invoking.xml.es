<?xml version='1.0' encoding='UTF-8' ?>
<!DOCTYPE manualpage SYSTEM "./style/manualpage.dtd">
<?xml-stylesheet type="text/xsl" href="./style/manual.es.xsl"?>
<!-- English Revision: 396609 -->

<!--
 Copyright 2004-2005 The Apache Software Foundation or it licensors,
                     as applicable.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
-->

<manualpage metafile="invoking.xml.meta">

  <title>Iniciar Apache</title>

<summary>
    <p>En Windows, Apache se ejecuta normalmente como un servicio en
    Windows NT, 2000 y XP, y como una aplicaci&#243;n de consola en
    Windows 9x y ME. Para obtener m&#225;s informaci&#243;n, consulte
    <a href="platform/windows.html#winsvc">Ejecutar Apache como un
    servicio</a> y <a href="platform/windows.html#wincons">Ejecutar
    Apache como una aplicaci&#243;n de consola</a>.</p>

    <p>En Unix, el programa <program>httpd</program> se ejecuta como
    un demonio (daemon) en modo silencioso y atiende las peticiones
    que le lleguen.  Este documento explica c&#243;mo invocar el
    programa <program>httpd</program>.</p>
</summary>

<seealso><a href="stopping.html">Parar y reiniciar Apache</a></seealso>
<seealso><program>httpd</program></seealso>
<seealso><program>apachectl</program></seealso>

<section id="startup"><title>C&#243;mo iniciar Apache</title>

    <p>Si el puerto especificado en la directiva <directive
    module="mpm_common">Listen</directive> del fichero de
    configuraci&#243;n es el que viene por defecto, es decir, el
    puerto 80 (o cualquier otro puerto por debajo del 1024), es
    necesario tener privilegios de usuario root (superusuario) para
    iniciar Apache. Solamente con esos privilegios puede establecerse
    una conexi&#243;n a trav&#233;s de esos puertos. Una vez que el
    servidor Apache se ha iniciado y ha completado algunas tareas
    preliminares, como abrir sus ficheros log, lanzar&#225; varios
    procesos <em>hijo</em>, que hacen el trabajo de escuchar y atender
    las peticiones de los clientes.  El proceso principal,
    <code>httpd</code> contin&#250;a ejecutandose como root, pero los
    procesos hijo se ejecutan con menores privilegios de usuario.
    Esto lo controla el <a href="mpm.html">m&#243;dulo de
    multiprocesamiento (MPM)</a> seleccionado.</p>

    <p>El m&#233;todo recomendado para invocar el ejecutable
    <program>httpd</program> es usar el script de control
    <program>apachectl</program>.  Este script fija los valores de
    determinadas variables de entorno que son necesarias para que
    <code>httpd</code> funcione correctamente en el sistema operativo,
    y despu&#233;s invoca el binario <program>httpd</program>.
    <program>apachectl</program> pasa a httpd cualquier argumento que
    se le pase a trav&#233;s de la l&#237;nea de comandos, de forma
    que cualquier opci&#243;n de <program>httpd</program> puede ser
    usada tambi&#233;n con <program>apachectl</program>.  Puede editar
    directamente el script <program>apachectl</program> y cambiar la
    variable <code>HTTPD</code> que est&#225; al principio y que
    especifica la ubicaci&#243;n exacta en la que est&#225; el binario
    <program>httpd</program> y cualquier argumento de l&#237;nea de
    comandos que quiera que est&#233; <em>siempre</em> presente cuando
    use este script.</p>

    <p>La primera cosa que hace <code>httpd</code> cuando es invocado
    es localizar y leer el <a href="configuring.html">fichero de
    configuraci&#243;n</a> <code>httpd.conf</code>. El lugar en el que
    est&#225; ese fichero se determina al compilar, pero tambi&#233;n
    es posible especificar la ubicaci&#243;n en la que se encuentra al
    iniciar el servidor Apache usando la opci&#243;n de l&#237;nea de
    comandos <code>-f</code></p>

<example>/usr/local/apache2/bin/apachectl -f
      /usr/local/apache2/conf/httpd.conf</example>

    <p>Si todo va bien durante el arranque, la sesi&#243;n de terminal
    se suspender&#225; un momento y volver&#225; a estar activa casi
    inmediatamente. Esto quiere decir que el servidor est&#225; activo
    y funcionando.  Puede usar su navegador para conectarse al
    servidor y ver la p&#225;gina de prueba que hay en el directorio
    <directive module="core">DocumentRoot</directive> y la copia local
    de esta documentaci&#243;n a la que se puede acceder desde esa
    p&#225;gina.</p>
</section>

<section id="errors"><title>Errores Durante el Arranque</title>

    <p>Si se produce alg&#250;n error irrecuperable durante el proceso de
    arranque de Apache, aparecer&#225; un mensaje describiendo el
    problema en la consola o en el archivo <directive
    module="core">ErrorLog</directive> antes de abortar la
    ejecuci&#243;n. Uno de los mensajes de error m&#225;s comunes es
    "<code>Unable to bind to Port ...</code>". Cuando se recibe este
    mensaje es normalmente por alguna de las siguientes razones:</p>

    <ul>
      <li>Est&#225; intentando iniciar el servidor Apache en un puerto
      privilegiado (del 0 al 1024) sin haber hecho login como usuario
      root; &#243;</li>

      <li>Est&#225; intentando iniciar el servidor Apache mientras
      est&#225; ya ejecutando Apache o alg&#250;n otro servidor web en
      el mismo puerto.</li>
    </ul>

    <p>Puede encontrar m&#225;s informaci&#243;n sobre c&#243;mo
    solucionar estos problemas, en la secci&#243;n de <a
    href="faq/">Preguntas Frecuentes</a> de Apache.</p>
</section>

<section id="boot"><title>Iniciar Apache al Iniciar el Sistema</title>

    <p>Si quiere que el servidor Apache contin&#250;e su
    ejecuci&#243;n despu&#233;s de reiniciar el sistema, debe
    a&#241;adir una llamada a <program>apachectl</program> en sus
    archivos de arranque (normalmente <code>rc.local</code> o
    alg&#250;n fichero un directorio del tipo <code>rc.N</code>). Esto
    iniciar&#225; Apache como usuario root. Antes de hacer esto,
    aseg&#250;rese de que la configuraci&#243;n de seguridad y las
    restricciones de acceso de su servidor Apache est&#225;n
    correctamente configuradas.</p>

    <p>El script <program>apachectl</program> est&#225; dise&#241;ado
    para actuar como un script est&#225;ndar de tipo SysV init; puede
    tomar los argumentos <code>start</code>, <code>restart</code>, y
    <code>stop</code> y traducirlos en las se&#241;ales apropiadas
    para <program>httpd</program>.  De esta manera, casi siempre puede
    simplemente enlazar <program>apachectl</program> con el directorio
    init adecuado. Pero aseg&#250;rese de comprobar cuales son los
    requerimientos espec&#237;ficos de su sistema.</p>
</section>

<section id="info"><title>Informaci&#243;n Adicional</title>

    <p>En la secci&#243;n <a href="programs/">El Servidor y Programas
    de Soporte</a> puede encontrar m&#225;s informaci&#243;n sobre las
    opciones de l&#237;nea de comandos que puede pasar a
    <program>httpd</program> y a <program>apachectl</program> as&#237;
    como sobre otros programas de soporte incluidos con el servidor
    Apache. Tambi&#233;n hay documentaci&#243;n sobre todos los <a
    href="mod/">m&#243;dulos</a> incluidos con la distribuci&#243;n de
    Apache y sus correspondientes <a
    href="mod/directives.html">directivas</a> asociadas.</p>
</section>

</manualpage>

