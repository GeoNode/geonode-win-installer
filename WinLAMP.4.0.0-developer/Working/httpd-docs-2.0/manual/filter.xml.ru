<?xml version="1.0" encoding="KOI8-R" ?>
<!DOCTYPE manualpage SYSTEM "./style/manualpage.dtd">
<?xml-stylesheet type="text/xsl" href="./style/manual.en.xsl"?>
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

<manualpage metafile="filter.xml.meta">

  <title>�������</title>

  <summary>
    <p>������ �������� ��������� ������������� �������� � Apache.</p>
  </summary>

  <section id="filters">
    <title>�������</title>
    <related>
      <modulelist>
        <module>mod_deflate</module>
        <module>mod_ext_filter</module>
        <module>mod_include</module>
      </modulelist>
      <directivelist>
        <directive module="mod_mime">AddInputFilter</directive>
        <directive module="mod_mime">AddOutputFilter</directive>
        <directive module="mod_mime">RemoveInputFilter</directive>
        <directive module="mod_mime">RemoveOutputFilter</directive>
        <directive module="mod_ext_filter">ExtFilterDefine</directive>
        <directive module="mod_ext_filter">ExtFilterOptions</directive>
        <directive module="core">SetInputFilter</directive>
        <directive module="core">SetOutputFilter</directive>
      </directivelist>
    </related>
    
    <p><em>������</em> - ��� �������, ������������� ������, �������
    ���������� ��� ���������� ��������. ������, ���������� ��
    �������, �������������� <em>������� (input)</em> ��������,
    � �� ����� ��� ������, ���������� �������� ������� -
    <em>�������� (output)</em>. � ����� � ��� �� ������ �����
    ��������� ��������������� ��������� ��������, ���ޣ�
    ������� �� ���������� ����� ���� ���� �����.</p>

    <p>������� ������������ ����� ������� Apache ��� ����������
    ������� ��������� ������. � ���������� � ����� ������� �����
    ��������������� �������� - � ���� ������ ���������� ���
    ������������ ����������� ��������������� ��������,
    ����������� � ���������������� �����. � ����� ����� ��������
    ��������� ���������:
    <directive module="core">SetInputFilter</directive>,
    <directive module="core">SetOutputFilter</directive>,
    <directive module="mod_mime">AddInputFilter</directive>,
    <directive module="mod_mime">AddOutputFilter</directive>,
    <directive module="mod_mime">RemoveInputFilter</directive>, �
    <directive module="mod_mime">RemoveOutputFilter</directive>.</p>

    <p>� ����������� ����������� HTTP ������� Apache � ��������� �����
    ������ ��������� �������, ��������� ��� ������������:</p>

    <dl>
      <dt>INCLUDES</dt>
      <dd>��������� Server-Side Includes �������������� �������� <module>mod_include</module></dd>
      <dt>DEFLATE</dt>
      <dd>����� �������� ������ ����� ��������� ����� � ������� �������
          <module>mod_deflate</module>
      </dd>
    </dl>

    <p>������ <module>mod_ext_filter</module>
     ��������� ������������ ������� ��������� � �������� ��������.</p>
  </section>
</manualpage>
