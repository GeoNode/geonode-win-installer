<?xml version="1.0" encoding="KOI8-R" ?>
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

<manualpage metafile="handler.xml.meta">

  <title>������������� ������������ � Apache</title>

  <summary>
    <p>���� �������� ��������� ������������� ������������ (handlers) � Apache.</p>
  </summary>

  <section id="definition">
    <title>��� ����� ����������</title>
    <related>
      <modulelist>
        <module>mod_actions</module>
        <module>mod_asis</module>
        <module>mod_cgi</module>
        <module>mod_imap</module>
        <module>mod_info</module>
        <module>mod_mime</module>
        <module>mod_negotiation</module>
        <module>mod_status</module>
     </modulelist>
      <directivelist>
        <directive module="mod_actions">Action</directive>
        <directive module="mod_mime">AddHandler</directive>
        <directive module="mod_mime">RemoveHandler</directive>
        <directive module="core">SetHandler</directive>
      </directivelist>
    </related>


    <p>���������� �������� ���������� ����������
    Apache, ������� ������ ��������� ������� ��� ���������
    �������������� �����. ��� �������, ������� ����� �������������
    ���� ���������� ����������, ������� ����������� ��������
    ������ �� ���� �����. ������ ����� ������ ������������
    ������������, �� ��������� ���� ������ ��������������
    �������������� (handled) ��������.</p>

    <p>� Apache 1.1 ��������� ����������� ������������ �����������
    ����. ���ޣ� ��������� ������ ����� ������������
    ������ �� ������ �� �� ����, �� � �� ���������� ������ ���
    �� ���������������. ��� �������������� �������� �������
    ��������, ��-������ ������, ��� ��� ������� ���������, �
    ��-������, ��� ��������� ������������� � ������ ���
    ���, <strong>��� �</strong> ����������. (��. �����
    <a href="mod/mod_mime.html#multipleext">&#171;����� � �����������
    ������������&#187;</a>)</p>

    <p>����������� ����� ������������ �� ���� ���
    ���������������� � ������ (��� ������������ � �������
    �������) �������, ��� ��� ����� ���� ��������� � �������
    ��������� <directive module="mod_actions">Action</directive>.
    � ����������� ������������ ������� ������� ��������� ����������
    �����������:</p>

    <ul>
      <li><strong>default-handler</strong>: �������� ����, ��������� �������
      <code>default_handler()</code>, ������� �������� ������������
      ��-��������� ��� ����������� ������. (����)</li>

      <li><strong>send-as-is</strong>: �������� ����, ���������� �
      ���� HTTP ���������, ��� ����. (<module>mod_asis</module>)</li>

      <li><strong>cgi-script</strong>: ������������ ���� ��� CGI-������.
      (<module>mod_cgi</module>)</li>

      <li><strong>imap-file</strong>: ������������ ���� ��� ����� �����������
      (imagemap). (<module>mod_imap</module>)</li>

      <li><strong>server-info</strong>: ���������� ����������������
      ���������� �������. (<module>mod_info</module>)</li>

      <li><strong>server-status</strong>: ���������� ����� � ���������
      �������. (<module>mod_status</module>)</li>

      <li><strong>type-map</strong>: ������������ ���� ��� ����� �����
      (type map). (<module>mod_negotiation</module>)</li>
    </ul>
  </section>
  <section id="examples">
    <title>�������</title>

    <section id="example1">
      <title>��������� ������������ ��������� CGI-��������</title>

      <p>��� ������������� ��������� ��������, ������ ������ �����
      � ����������� <code>html</code> ����� ��������� �� ����������
      CGI-������ <code>footer.pl</code> ��� ��������������� ���������
      �������������� �����.</p>

      <example>
        Action add-footer /cgi-bin/footer.pl<br/>
        AddHandler add-footer .html
      </example>

      <p>� ���� ������� CGI-������ ������������ �� ��, �����
      ������� ������������ ����������� �������� (�� ������� ���������
      ���������� ��������� <code>PATH_TRANSLATED</code>), ������
      � Σ� �������������� ��� ����������� ���������.</p>

    </section>
    <section id="example2">
      <title>����� � HTTP �����������</title>

      <p>��������� ��������� �������� �������� ����������� ����������
      <code>send-as-is</code>, ������� ������������ ��� ������, ����������
      ���� ����������� HTTP-���������. ��� ����� � ��������
      <code>/web/htdocs/asis/</code> ����� �������������� ������������
      <code>send-as-is</code>, ���������� �� �� ����������.</p>

      <example>
        &lt;Directory /web/htdocs/asis&gt;<br/>
        SetHandler send-as-is<br/>
        &lt;/Directory&gt;
      </example>

    </section>
  </section>
  <section id="programmer">
    <title>��������� ��� �������������</title>

    <p>��� ���� ����� ����� ���� ������������ �����������, �
    <a href="developer/API.html">Apache API</a> ���� �������
    ��������� ����������. � ���������, � ��������� <code>request_rec</code>
    ���� ��������� ����� ����:</p>

    <example>
      char *handler
    </example>

    <p>���� �� ������ � ��ϣ� ������ ������������ ����������,
    �� �ӣ, ��� ��� ���� �������, ��� �������� � <code>r-&gt;handler</code>
    ��� ���������������� �����������, ���ޣ� ������� ��� ����������
    ����� ���, ��� ������ ������� �� ������ <code>invoke_handler</code>.
    ����������� ����������� ����� ��� ��, ��� � ������,
    �� ����������� ���� ����, ��� ������ ���������� ���������
    ��� �����������, � �� ��� ����������� (content type).
    ���� ��� � �� �������� ������������, �� ���������� ���������
    ������� ���������� ������������ - ���������� ������������
    �����, �����̣���� ������� � �� ���������� ����� ���� - ���
    �������� �� ������������ � ������������� �ͣ� �����-����� (media type).</p>
  </section>
</manualpage>
