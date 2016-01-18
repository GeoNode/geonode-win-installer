<?xml version='1.0' encoding='KOI8-R' ?>
<!DOCTYPE manualpage SYSTEM "./style/manualpage.dtd">
<?xml-stylesheet type="text/xsl" href="./style/manual.ru.xsl"?>
<!-- English Revision: 396609 -->

<!--
 Copyright 2002-2005 The Apache Software Foundation or its licensors, as
 applicable.

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

<!--***************************************************-->
<!-- Translator: Ilia Soldatenko (soldis@tversu.ru)    -->
<!-- Reviewers:                                        -->
<!--             Ivan Shvedov (ivan@tversu.ru)         -->
<!--             Arthur Reznikov (art@altair.tversu.ru)-->
<!--***************************************************-->

<manualpage metafile="invoking.xml.meta">

  <title>������ Apache</title>

<summary>
    <p>�� Windows ���������� Apache ������ �������� ��� ������ Windows NT/2000/XP
    ��� ��� ���������� ���������� Windows 95/ME. ��� ��������� ����� ���������
    ���������� �� ����� �������, ���������� � ����������, ����������� <a
    href="platform/windows.html#winsvc">������ Apache ��� Windows � �������� �������</a> �
    <a href="platform/windows.xml#wincons">������ Apache ��� Windows � �������� �����������
    ����������</a>.</p>

    <p>� Unix ��������� <program>httpd</program> ������������ �����
    �����, ������������� � ������� ������ � ������������� ����������� �������.
    � ���, ����� ������� ����� ��������� <program>httpd</program> � ��� � ���������� �����
    ���������, � �������������� � ���� ���������.</p>
</summary>

<seealso><a href="stopping.html">������� � ����������</a></seealso>
<seealso><program>httpd</program></seealso>
<seealso><program>apachectl</program></seealso>

<section id="startup"><title>��� ���������� � ������ ������� Apache</title>

    <p>���� � ��������� <directive module="mpm_common">Listen</directive>
    � ���������������� ����� ������� �������� 80 (���������� �� ���������)
    ��� ����� ������ �������� ����� ������� 1024, �� ��� ������� Apache
    ���������� ���� ����������������� �������������, ��� ��� Apache ��������
    ������������ � ������������������ �����. ����� ����, ��� ������ ����������
    � �������� ��� ���������������� ��������, ����� ��� �������� ����� log-������,
    �� ��������� ��������� <em>��������� ��������</em>, ������� � ����� ���������
    ��� ������ �� ��������� �������� �� ��������. �������� ������� <code>httpd</code>
    ����������� � ������� ������������������ ������������, � �� ����� ��� ��������
    ������� ����� ������� ���������. ��� ��� �������������� <a
    href="mpm.html">��-�������</a>, ������� ������������� ������ � ��������.</p>

    <p>��� ������� ������ <program>httpd</program> ����� ����� ������������ ������
    <program>apachectl</program>. ���� ������ ������������� ���
    ���������� ���������, ����������� ��� ���������� ������ ������� ��� ����������
    ������������� ���������, � ����� ��������� ����������� ���� <program>httpd</program>.
    ������ <program>apachectl</program> �������� ������� ����� ��������� ������, ��� ���
    ��� ������ ����� ��������� � ��� ��������� ������ ��� ����������� ��� ������� �����.
    �� ����� ������ ������� ������ ��������� ��������� � ������ <program>apachectl</program>,
    � ���������, ������� �������� ���������� <code>HTTPD</code> ��� ������� Apache
    �� ������� ��������, � ������ �����, ������� ����� ������������ ������� <em>������ ���</em>
    ��� ��� �������.</p>

    <p>������ ����� <code>httpd</code> ������� � ��������� <a href="configuring.html">����������������
    ����</a> <code>httpd.conf</code>. ���� � ����� ����� �������� ��� �� ����� ������ �������,
    �� ��� ����� �������� � ����� �����, �������� ������ � ������ <code>-f</code>, ��� ��� ��������
    � ��������� �������</p>

<example>/usr/local/apache2/bin/apachectl -f
      /usr/local/apache2/conf/httpd.conf</example>

    <p>���� �� ����� ������� �� �������� ������� �������, �� ������ ������������
    �� ������� � ����������� �� ���� ��������� ������ �������� � ������������
    ����������� ���������. ��� ��������� �� ��, ��� ������ ���������� � ������
    ��������� ���� ������. ������ �� ������, ��������� �������, ������������ �
    ���� � ������� �������� ��������, ����������� � ��������
    <directive module="core">DocumentRoot</directive>, � ����� ��������� ����� ������������,
    ������ �� ������� �� ������� �� ��� �� ��������.</p>
</section>

<section id="errors"><title>������, ������� ����� ���������� �� ����� �������</title>

    <p>���� �� ����� ������� Apache ���������� �����-���� ��������� ������,
    �� ����� ���, ��� ��������� ���� ������, ������ ������ �� ������� ��� �
    <directive module="core">ErrorLog</directive> ���������, �����������
    ������ ������. �������� ���������������� ���������� �� ������ ��������
    <code>"Unable to bind to Port ..."</code>. �������� ������ ��������� � ���� �������:</p>

    <ul>
      <li>���� �� ��������� ��������� ������ �� ����������������� �����, ������ ������������������
      � ������� ��� ������� ������������; ���</li>

      <li>���� �� ��������� ������� ������, ����� � ������� ��� ���� ������������� ����� Apache
      ��� ������ web-������, ��������� ��� �� ����� ����.</li>
    </ul>

    <p>������� ������ �������� ������� ����� ����� �� ��������
    <a href="faq/">FAQ</a>.</p>
</section>

<section id="boot"><title>������ ������� ������ � �������� ���� �������</title>

    <p>���� �� ������, ����� ������ ���������� ������������� ����� ������������ �������,
    �������� ����� ������� <program>apachectl</program> � ��������� �����, ���������� �� ��������
    ������������ ����� (������ ��� <code>rc.local</code> ��� ����� � �������� <code>rc.N</code>).
    ��� �������� � ������� Apache �� ����� ������������������ ������������.
    �� ��������� ������� � ������������� �������, ���������, ��� ������ ��������������� ���������.</p>

    <p>������ <program>apachectl</program> ���������� ����� �������, ��� �� �����
    ����������� ��� ����������� init-������ ������� SysV; �� ����� ���������
    ��������� <code>start</code>, <code>restart</code>, � <code>stop</code>
    � ���������� �� � ��������������� ������� �������� <program>httpd</program>.
    ������� ���� ����� ��� ���������� ������� ������ �� <program>apachectl</program>
    � ��������� �������� �������� init. �� ������ ��� ������ ���, �������
    ������ ���������� ����� �������.</p>
</section>

<section id="info"><title>�������������� ����������</title>

    <p>�������������� ���������� �� ������ ��������� ������ <program>httpd</program>
    � <program>apachectl</program>, � ����� ������
    ��������������� ��������, �� ������ ����� �� �������� <a href="programs/">"������
    � ��������������� ���������"</a>. ������� ����� <a href="mod/directives.html">������������</a>
    �� ��� ������, �������� � ����������� Apache, � ��� ���������, ������� ��� �������������.</p>
</section>

</manualpage>
