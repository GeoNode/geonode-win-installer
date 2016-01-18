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

<manualpage metafile="upgrading.xml.meta">

<title>������� �� ������ 1.3 � ������ 2.0</title>

<summary>
  <p>���� �������� ��������� ��� ����, ����� ������ �������������
  ������� � ������������� ������� ������ 2.0. ����� �� ���ģ�� ����
  ������� ���������; ����� ��������� ���������� � ������������� �����
  ����� ���� � ��������� <a href="new_features_2_0.html"
  >����� �����������</a>, ���� � ����� <code>src/CHANGES</code>.</p>
</summary>
<seealso><a href="new_features_2_0.html">����� ����� ������������
� Apache 2.0</a></seealso>

  <section id="compile-time">
    <title>��������� � ���������������� �������� ������ �������</title>

    <ul>
      <li>Apache ������ ���������� ������� <code>autoconf</code> �
      <code>libtool</code> ��� <a
      href="install.html">���������������� �������� ������</a>.
      ������������� ���� ������� ������ �� �������������
      APACI � Apache 1.3, ���� � �� �������� ��������� ��� �� �����.</li>

      <li>� ������� � �������� ������ �������, ������� �� ������
      ������� ��� ������ �������, � Apache 2.0 ��������� <a href="mpm.html"
      >������ - ���������� ������</a> (�� - ������), � ������� ������
      ���������������� �������� ����� ����, ����������� �� ���������
      ��������.</li>
    </ul>
  </section>

  <section id="run-time">
    <title>��������� � ���������������� ������ �������</title>

    <ul>
      <li>������ �� ��� ��������, ������� ������������� ����� �������
      Apache 1.3, ������ ���������� � ������ - ���������� ������. ���� ��
      ������, ����� ��������� ������� ���� �������� ���������� � ���������
      Apache 1.3, �� ��� ������ �� ������ ������� ��-������
      <module>prefork</module>. ������ ��-������ �������������
      ���� ���������, ���������� �� ������ ��������� ������� � ���������
      ��������.</li>

      <li><a href="mod/mod_proxy.html">������ ������</a> ��� ���������,
      � ������ ������������ ������������ HTTP/1.1. ����� �� ��������
      ������ ��������� �������� ��, ��� ���������, �������������� ������
      ������, ������ ������������� � ������ <directive type="section"
      module="mod_proxy">Proxy</directive>, � �� �
      &lt;Directory proxy:&gt;, ��� ��� ���� �����.</li>

      <li>��������� <code>PATH_INFO</code> (������� ����������, ��������� ��
      ������ �������������� ���������) ���������� ��� ��������� �������.
      ������, ������� ������ ���� �������� ��� ����������� (handler), �
      ������ ��������� ���� ��������, ����� ����� �� ��������� �������,
      ���������� <code>PATH_INFO</code>. ����� �������, ��� <a
      href="mod/mod_include.html">INCLUDES</a> ��� <a
      href="http://www.php.net/">PHP</a> ����������� ������� � �������
      �����������, ����� ������� ��� �� ����� ��������� �������, ����������
      <code>PATH_INFO</code>. �� ������ ������������ ��������� <directive
      module="core">AcceptPathInfo</directive>, ����� ��������� �������
      ���������� ��������� �������� �������, � ����� ������� ������������
      ����������� ������������� <code>PATH_INFO</code> � ����������,
      ������������ ��������� �� ������� ������� (SSI).</li>

      <li>��������� <directive
      module="mod_negotiation">CacheNegotiatedDocs</directive>
      ������ ����� ��������� ��������� <code>on</code> �
      <code>off</code>. ��� ������������ ���������� ���������
      <directive>CacheNegotiatedDocs</directive> ������ ���� �������� ��
      <code>CacheNegotiatedDocs on</code>.</li>

      <li>
        ��������� <directive module="core">ErrorDocument</directive>
        ����� �� ���������� ����������� ������� � ������ ���������
        ��� ����������� ����, ��� �������� �������� ��������� ����������.
        ������ ����� ��� ���������� ��������� ���� ����� ���������
        � ������� �������. ��������, ������������ ���������

        <example>
          ErrorDocument 403 "��������� ���������
        </example>
        ������ ���� �������� ��

        <example>
          ErrorDocument 403 "��������� ���������"
        </example>
        ���� ������ �������� �� �������� ��������� �����������
        ��������������� ������� (URL) ��� ������� ������, �� ��
        ����� ������������������ ��� ��������� ���������.
      </li>

      <li>��������� <code>AccessConfig</code> �
      <code>ResourceConfig</code> ����� �� ����������.
      ��������� �� ����� ����� ���� �������� ����������
      <directive module="core">Include</directive>, ������� �����
      �� �� ����������������. ���� ������ �� �� �������� �� � ����������������
      �����, ��� ����� ��������� �� �������� �� ���������, �� ������,
      ��� ���������� ���� �� ����������, ��� ����
      �������� ��������� ������ � ���� httpd.conf: <code
      >Include conf/access.conf</code> � <code>Include
      conf/srm.conf</code>. ��� ���� ����� ���� ��������� � ���, ���
      Apache ��������� ���������������� ����� ������ � ��� �������,
      ������� ��� ������������ ������� �����������, ���� ���������
      ��������� <code>Include</code> � ����� ����� httpd.conf, ���ޣ�
      ������ ��, ��� �������� <code>srm.conf</code>, � ����� ��, ���
      �������� <code>access.conf</code>.</li>

      <li>��������� <code>BindAddress</code> � <code>Port</code>
      ����� �� ����������. ������������� ���������������� ���������������
      ����� ������ ���������� <directive module="mpm_common">Listen</directive>.
      </li>

      <li>� Apache 1.3 ��������� <code>Port</code>
      ��������������, ����� ����� �������, ��� ���� ����� ������
      ��� ����������� ���������� ������ �� ������ ����. � Apache 2.0 ���
      ��� �� ����� ������ ����� ��������� ��������� <directive module="core"
      >ServerName</directive>: �� ��� ����Σ� ����� �������, ��� ������
      ��� ����� <em>�</em> ����� ����� ����� ��������� � ����� ���� ���������.</li>

      <li>��������� <code>ServerType</code> ����� �� ����������.
      ����� ��������� �������� ������ ������������ �����������
      ������ ��-������. � ��������� ����� ��� ������ ��-������,
      ������� ��� �� ����������� ����������� ������ inetd.</li>

      <li>������ <code>mod_log_agent</code> � <code>mod_log_referer</code>, ������� �������������
      ����� ���������, ��� <code>AgentLog</code>, <code>RefererLog</code>
      � <code>RefererIgnore</code>, ���� ������. ������� ������� �������
      ������������� (agent logs) � ������������ (referer logs) ��-��������
      �������� ����������� ������������� ��������� <directive
      module="mod_log_config">CustomLog</directive> ������ <module>mod_log_config</module>.</li>

      <li>��������� <code>AddModule</code> �
      <code>ClearModuleList</code> ����� �� ����������. ��� ��������������
      ��� ����������� ����������� ������� �������� �������. ����� API ���
      Apache 2.0 ��������� ������� ����� ��������� ������� �� ��������, ���
      ������ ��� ��������� ���������.</li>

      <li>��������� <code>FancyIndexing</code> ���� ������. �� ����������������
      ������ �������������� ������ <code>FancyIndexing</code> � ��������� <directive
      module="mod_autoindex">IndexOptions</directive></li>
      
      <li>��������� ���������� ���������� (content-negotiation),
      ����������� ������� <module>mod_negotiation</module>,
      ����� ����� �������� � ��� �����, ��� ������������ ����� �� ���������.
      ������ ��� ��������� ����� �������� ����� ������ �� ������
      <em>��������� (negotiable)</em> ������. ������ ��������� �����
      ���� ������������� ���������� <directive
      module="mod_mime">MultiviewsMatch</directive>.</li>

      <li>(<em>������� � ������ 2.0.51</em>)
      <p>���������������� ��������� <code>ErrorHeader</code> ����
      �������� ��������� <directive module="mod_headers">Header</directive>,
      ������ ��� ������� �������� ��������� ���� �����������.
      ������ ���������� ������</p>

      <example>
        Header always set foo bar
      </example>

      <p>����� �������� �������� ���������.</p></li>
    </ul>
  </section>

  <section id="misc">
    <title>������ ���������</title>

    <ul>
      <li>������ <module>mod_auth_digest</module>, ������� ���� ����������������� ������ �
      Apache 1.3, ������ �������� ����������� �������.</li>

      <li>������ <code>mod_mmap_static</code>, ������� ���� ����������������� ������ �
      Apache 1.3, ����Σ� ������� <module>mod_file_cache</module>.</li>

      <li>����������� ������������ ��������� �������� � ������
      ����� �� �������� ������������ �������� <code>src</code>. ������ �����
      �������� ���� ��������� ������������ � �������� �������� ������������, �
      ��������� ����������������� ������� ������������ � ��������� �������.</li>
    </ul>
  </section>

  <section id="third-party">
    <title>������ ��������� �������������</title>

    <p>������������ ��������� ���� ������� � API ��� Apache 2.0.
    ������������ ������, ���������� � �������������� Apache 1.3 API,
    <strong>��</strong> ����� �������� ��� Apache 2.0, ���� �� ������
    � ��� ����������� ���������. ����� ��������� ���������� �� ����� ������
    �������� � <a href="developer/">������������ ��� �������������</a>.</p>
  </section>
</manualpage>
