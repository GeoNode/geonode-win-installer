<?xml version="1.0"?>
<!DOCTYPE quickreference SYSTEM "../style/modulesynopsis.dtd">
<?xml-stylesheet type="text/xsl" href="../style/manual.es.xsl"?>
<!-- English Revision: 396609 -->

<!--
 Copyright 2004 The Apache Software Foundation

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

<quickreference metafile="quickreference.xml.meta">
  <title>Gu&#237;a R&#225;pida de Referencia de Directivas</title>
  <summary>
    <p>La Gu&#237;a R&#225;pida de Referencia de Directivas muestra el uso, las
    opciones por defecto, el estado y el contexto de cada directiva de
    configuraci&#243;n de Apache.  Para m&#225;s informaci&#243;n sobre cada
    directiva, consulte el <a href="directive-dict.html">Diccionario
    de Directivas</a>.</p>

    <p>La primera columna muestra el nombre y el uso de la directiva.
    La segunda columna muestra el valor por defecto de la directiva,
    si existe ese valor por defecto.  Si el valor por defecto es
    demasiado largo para mostrarlo, el primer caracter va seguido de
    un signo "+".</p>

    <p>La tercera y la cuarta columna listan los contextos en los que
    la directiva puede funcionar y el estado de la directiva de
    acuerdo con las notas que detallan m&#225;s abajo.</p>
  </summary>

  <legend>
    <table>
      <columnspec><column width=".1"/><column width=".2"/></columnspec>
      <tr><th>s</th><td>server&#160;config</td></tr>
      <tr><th>v</th><td>virtual&#160;host</td></tr>
      <tr><th>d</th><td>directory</td></tr>
      <tr><th>h</th><td>.htaccess</td></tr>
    </table>

    <table>
      <columnspec><column width=".1"/><column width=".2"/></columnspec>
      <tr><th>C</th><td>Core</td></tr>
      <tr><th>M</th><td>MPM</td></tr>
      <tr><th>B</th><td>Base</td></tr>
      <tr><th>E</th><td>Extensi&#243;n</td></tr>
      <tr><th>X</th><td>Experimental</td></tr>
    </table>
  </legend>
</quickreference>

