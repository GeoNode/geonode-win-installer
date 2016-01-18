<?xml version="1.0" encoding="ISO-8859-1"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="es" xml:lang="es"><head><!--
        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
              This file is generated from xml source: DO NOT EDIT
        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      -->
<title>Gu�a R�pida de Referencia de Directivas - Servidor HTTP Apache</title>
<link href="../style/css/manual.css" rel="stylesheet" media="all" type="text/css" title="Main stylesheet" />
<link href="../style/css/manual-loose-100pc.css" rel="alternate stylesheet" media="all" type="text/css" title="No Sidebar - Default font size" />
<link href="../style/css/manual-print.css" rel="stylesheet" media="print" type="text/css" />
<link href="../images/favicon.ico" rel="shortcut icon" /></head>
<body id="directive-index">
<div id="page-header">
<p class="menu"><a href="../mod/">M�dulos</a> | <a href="../mod/directives.html">Directivas</a> | <a href="../faq/">Preguntas Frecuentes</a> | <a href="../glossary.html">Glosario</a> | <a href="../sitemap.html">Mapa de este sitio web</a></p>
<p class="apache">Versi�n 2.0 del Servidor HTTP Apache</p>
<img alt="" src="../images/feather.gif" /></div>
<div class="up"><a href="./"><img title="&lt;-" alt="&lt;-" src="../images/left.gif" /></a></div>
<div id="path">
<a href="http://www.apache.org/">Apache</a> &gt; <a href="http://httpd.apache.org/">Servidor HTTP</a> &gt; <a href="http://httpd.apache.org/docs/">Documentaci�n</a> &gt; <a href="../">Versi�n 2.0</a> &gt; <a href="./">M�dulos</a></div>
<div id="preamble"><h1>Gu�a R�pida de Referencia de Directivas</h1>
<div class="toplang">
<p><span>Idiomas disponibles: </span><a href="../de/mod/quickreference.html" hreflang="de" rel="alternate" title="Deutsch">&nbsp;de&nbsp;</a> |
<a href="../en/mod/quickreference.html" hreflang="en" rel="alternate" title="English">&nbsp;en&nbsp;</a> |
<a href="../es/mod/quickreference.html" title="Espa�ol">&nbsp;es&nbsp;</a> |
<a href="../ja/mod/quickreference.html" hreflang="ja" rel="alternate" title="Japanese">&nbsp;ja&nbsp;</a> |
<a href="../ko/mod/quickreference.html" hreflang="ko" rel="alternate" title="Korean">&nbsp;ko&nbsp;</a> |
<a href="../ru/mod/quickreference.html" hreflang="ru" rel="alternate" title="Russian">&nbsp;ru&nbsp;</a></p>
</div>

    <p>La Gu�a R�pida de Referencia de Directivas muestra el uso, las
    opciones por defecto, el estado y el contexto de cada directiva de
    configuraci�n de Apache.  Para m�s informaci�n sobre cada
    directiva, consulte el <a href="directive-dict.html">Diccionario
    de Directivas</a>.</p>

    <p>La primera columna muestra el nombre y el uso de la directiva.
    La segunda columna muestra el valor por defecto de la directiva,
    si existe ese valor por defecto.  Si el valor por defecto es
    demasiado largo para mostrarlo, el primer caracter va seguido de
    un signo "+".</p>

    <p>La tercera y la cuarta columna listan los contextos en los que
    la directiva puede funcionar y el estado de la directiva de
    acuerdo con las notas que detallan m�s abajo.</p>
  </div>
<div id="directive-ref"><table id="legend">
<tr><td class="letters"><span><a href="#A">&nbsp;A&nbsp;</a> | <a href="#B">&nbsp;B&nbsp;</a> | <a href="#C">&nbsp;C&nbsp;</a> | <a href="#D">&nbsp;D&nbsp;</a> | <a href="#E">&nbsp;E&nbsp;</a> | <a href="#F">&nbsp;F&nbsp;</a> | <a href="#G">&nbsp;G&nbsp;</a> | <a href="#H">&nbsp;H&nbsp;</a> | <a href="#I">&nbsp;I&nbsp;</a> | <a href="#K">&nbsp;K&nbsp;</a> | <a href="#L">&nbsp;L&nbsp;</a> | <a href="#M">&nbsp;M&nbsp;</a> | <a href="#N">&nbsp;N&nbsp;</a> | <a href="#O">&nbsp;O&nbsp;</a> | <a href="#P">&nbsp;P&nbsp;</a> | <a href="#R">&nbsp;R&nbsp;</a> | <a href="#S">&nbsp;S&nbsp;</a> | <a href="#T">&nbsp;T&nbsp;</a> | <a href="#U">&nbsp;U&nbsp;</a> | <a href="#V">&nbsp;V&nbsp;</a> | <a href="#W">&nbsp;W&nbsp;</a> | <a href="#X">&nbsp;X&nbsp;</a></span></td>
<td><table>
      
      <tr><th>s</th><td>server&nbsp;config</td></tr>
      <tr><th>v</th><td>virtual&nbsp;host</td></tr>
      <tr><th>d</th><td>directory</td></tr>
      <tr><th>h</th><td>.htaccess</td></tr>
    </table></td>
<td><table>
      
      <tr><th>C</th><td>Core</td></tr>
      <tr><th>M</th><td>MPM</td></tr>
      <tr><th>B</th><td>Base</td></tr>
      <tr><th>E</th><td>Extensi�n</td></tr>
      <tr><th>X</th><td>Experimental</td></tr>
    </table></td></tr>
</table>
<table class="qref">
<tr><td><a href="mpm_common.html#acceptmutex" id="A" name="A">AcceptMutex Default|<var>method</var></a></td><td> Default </td><td>s</td><td>M</td></tr><tr><td class="descr" colspan="4">M�todo que usa Apache para serializar m�ltiples procesos
hijo que aceptan peticiones en las conexiones de red</td></tr>
<tr class="odd"><td><a href="core.html#acceptpathinfo">AcceptPathInfo On|Off|Default</a></td><td> Default </td><td>svdh</td><td>C</td></tr><tr class="odd"><td class="descr" colspan="4">Especifica si los recursos aceptan informaci�n de
path a�adida (trailing pathname information)</td></tr>
<tr><td><a href="core.html#accessfilename">AccessFileName <var>filename</var> [<var>filename</var>] ...</a></td><td> .htaccess </td><td>sv</td><td>C</td></tr><tr><td class="descr" colspan="4">Nombre del fichero de configuraci�n distribuida</td></tr>
<tr class="odd"><td><a href="mod_actions.html#action">Action <var>action-type</var> <var>cgi-script</var></a></td><td></td><td>svdh</td><td>B</td></tr><tr class="odd"><td class="descr" colspan="4">Activates a CGI script for a particular handler or
content-type</td></tr>
<tr><td><a href="mod_autoindex.html#addalt">AddAlt <var>string</var> <var>file</var> [<var>file</var>] ...</a></td><td></td><td>svdh</td><td>B</td></tr><tr><td class="descr" colspan="4">Alternate text to display for a file, instead of an
icon selected by filename</td></tr>
<tr class="odd"><td><a href="mod_autoindex.html#addaltbyencoding">AddAltByEncoding <var>string</var> <var>MIME-encoding</var>
[<var>MIME-encoding</var>] ...</a></td><td></td><td>svdh</td><td>B</td></tr><tr class="odd"><td class="descr" colspan="4">Alternate text to display for a file instead of an icon
selected by MIME-encoding</td></tr>
<tr><td><a href="mod_autoindex.html#addaltbytype">AddAltByType <var>string</var> <var>MIME-type</var>
[<var>MIME-type</var>] ...</a></td><td></td><td>svdh</td><td>B</td></tr><tr><td class="descr" colspan="4">Alternate text to display for a file, instead of an
icon selected by MIME content-type</td></tr>
<tr class="odd"><td><a href="mod_mime.html#addcharset">AddCharset <var>charset</var> <var>extension</var>
[<var>extension</var>] ...</a></td><td></td><td>svdh</td><td>B</td></tr><tr class="odd"><td class="descr" colspan="4">Maps the given filename extensions to the specified content
charset</td></tr>
<tr><td><a href="core.html#adddefaultcharset">AddDefaultCharset On|Off|<var>charset</var></a></td><td> Off </td><td>svdh</td><td>C</td></tr><tr><td class="descr" colspan="4">Par�metro del conjunto de caracteres que se
a�ade cuando el tipo de contenido de una respuesta es
<code>text/plain</code> o <code>text/html</code></td></tr>
<tr class="odd"><td><a href="mod_autoindex.html#adddescription">AddDescription <var>string file</var> [<var>file</var>] ...</a></td><td></td><td>svdh</td><td>B</td></tr><tr class="odd"><td class="descr" colspan="4">Description to display for a file</td></tr>
<tr><td><a href="mod_mime.html#addencoding">AddEncoding <var>MIME-enc</var> <var>extension</var>
[<var>extension</var>] ...</a></td><td></td><td>svdh</td><td>B</td></tr><tr><td class="descr" colspan="4">Maps the given filename extensions to the specified encoding
type</td></tr>
<tr class="odd"><td><a href="mod_mime.html#addhandler">AddHandler <var>handler-name</var> <var>extension</var>
[<var>extension</var>] ...</a></td><td></td><td>svdh</td><td>B</td></tr><tr class="odd"><td class="descr" colspan="4">Maps the filename extensions to the specified
handler</td></tr>
<tr><td><a href="mod_autoindex.html#addicon">AddIcon <var>icon</var> <var>name</var> [<var>name</var>]
...</a></td><td></td><td>svdh</td><td>B</td></tr><tr><td class="descr" colspan="4">Icon to display for a file selected by name</td></tr>
<tr class="odd"><td><a href="mod_autoindex.html#addiconbyencoding">AddIconByEncoding <var>icon</var> <var>MIME-encoding</var>
[<var>MIME-encoding</var>] ...</a></td><td></td><td>svdh</td><td>B</td></tr><tr class="odd"><td class="descr" colspan="4">Icon to display next to files selected by MIME 
content-encoding</td></tr>
<tr><td><a href="mod_autoindex.html#addiconbytype">AddIconByType <var>icon</var> <var>MIME-type</var>
[<var>MIME-type</var>] ...</a></td><td></td><td>svdh</td><td>B</td></tr><tr><td class="descr" colspan="4">Icon to display next to files selected by MIME 
content-type</td></tr>
<tr class="odd"><td><a href="mod_mime.html#addinputfilter">AddInputFilter <var>filter</var>[;<var>filter</var>...]
<var>extension</var> [<var>extension</var>] ...</a></td><td></td><td>svdh</td><td>B</td></tr><tr class="odd"><td class="descr" colspan="4">Maps filename extensions to the filters that will process
client requests</td></tr>
<tr><td><a href="mod_mime.html#addlanguage">AddLanguage <var>MIME-lang</var> <var>extension</var>
[<var>extension</var>] ...</a></td><td></td><td>svdh</td><td>B</td></tr><tr><td class="descr" colspan="4">Maps the given filename extension to the specified content
language</td></tr>
<tr class="odd"><td><a href="mod_info.html#addmoduleinfo">AddModuleInfo <var>module-name</var> <var>string</var></a></td><td></td><td>sv</td><td>E</td></tr><tr class="odd"><td class="descr" colspan="4">Adds additional information to the module
information displayed by the server-info handler</td></tr>
<tr><td><a href="mod_mime.html#addoutputfilter">AddOutputFilter <var>filter</var>[;<var>filter</var>...]
<var>extension</var> [<var>extension</var>] ...</a></td><td></td><td>svdh</td><td>B</td></tr><tr><td class="descr" colspan="4">Maps filename extensions to the filters that will process
responses from the server</td></tr>
<tr class="odd"><td><a href="core.html#addoutputfilterbytype">AddOutputFilterByType <var>filter</var>[;<var>filter</var>...]
<var>MIME-type</var> [<var>MIME-type</var>] ...</a></td><td></td><td>svdh</td><td>C</td></tr><tr class="odd"><td class="descr" colspan="4">Asigna un filtro de
salida a un tipo MIME en particular</td></tr>
<tr><td><a href="mod_mime.html#addtype">AddType <var>MIME-type</var> <var>extension</var>
[<var>extension</var>] ...</a></td><td></td><td>svdh</td><td>B</td></tr><tr><td class="descr" colspan="4">Maps the given filename extensions onto the specified content
type</td></tr>
<tr class="odd"><td><a href="mod_alias.html#alias">Alias <var>URL-path</var>
<var>file-path</var>|<var>directory-path</var></a></td><td></td><td>sv</td><td>B</td></tr><tr class="odd"><td class="descr" colspan="4">Maps URLs to filesystem locations</td></tr>
<tr><td><a href="mod_alias.html#aliasmatch">AliasMatch <var>regex</var>
<var>file-path</var>|<var>directory-path</var></a></td><td></td><td>sv</td><td>B</td></tr><tr><td class="descr" colspan="4">Maps URLs to filesystem locations using regular 
expressions</td></tr>
<tr class="odd"><td><a href="mod_access.html#allow"> Allow from
    all|<var>host</var>|env=<var>env-variable</var>
    [<var>host</var>|env=<var>env-variable</var>] ...</a></td><td></td><td>dh</td><td>B</td></tr><tr class="odd"><td class="descr" colspan="4">Controls which hosts can access an area of the
server</td></tr>
<tr><td><a href="mod_proxy.html#allowconnect">AllowCONNECT <var>port</var> [<var>port</var>] ...</a></td><td> 443 563 </td><td>sv</td><td>E</td></tr><tr><td class="descr" colspan="4">Ports that are allowed to <code>CONNECT</code> through the
proxy</td></tr>
<tr class="odd"><td><a href="core.html#allowencodedslashes">AllowEncodedSlashes On|Off</a></td><td> Off </td><td>sv</td><td>C</td></tr><tr class="odd"><td class="descr" colspan="4">Determina si se acepta el uso de separadores de
ubicaci�n codificados en las URLs</td></tr>
<tr><td><a href="core.html#allowoverride">AllowOverride All|None|<var>directive-type</var>
[<var>directive-type</var>] ...</a></td><td> All </td><td>d</td><td>C</td></tr><tr><td class="descr" colspan="4">Tipos de directivas que cuyo uso est� permitido en los ficheros <code>.htaccess</code></td></tr>
<tr class="odd"><td><a href="mod_auth_anon.html#anonymous">Anonymous <var>user</var> [<var>user</var>] ...</a></td><td></td><td>dh</td><td>E</td></tr><tr class="odd"><td class="descr" colspan="4">Specifies userIDs that are allowed access without
password verification</td></tr>
<tr><td><a href="mod_auth_anon.html#anonymous_authoritative">Anonymous_Authoritative On|Off</a></td><td> Off </td><td>dh</td><td>E</td></tr><tr><td class="descr" colspan="4">Configures if authorization will fall-through
to other methods</td></tr>
<tr class="odd"><td><a href="mod_auth_anon.html#anonymous_logemail">Anonymous_LogEmail On|Off</a></td><td> On </td><td>dh</td><td>E</td></tr><tr class="odd"><td class="descr" colspan="4">Sets whether the password entered will be logged in the
error log</td></tr>
<tr><td><a href="mod_auth_anon.html#anonymous_mustgiveemail">Anonymous_MustGiveEmail On|Off</a></td><td> On </td><td>dh</td><td>E</td></tr><tr><td class="descr" colspan="4">Specifies whether blank passwords are allowed</td></tr>
<tr class="odd"><td><a href="mod_auth_anon.html#anonymous_nouserid">Anonymous_NoUserID On|Off</a></td><td> Off </td><td>dh</td><td>E</td></tr><tr class="odd"><td class="descr" colspan="4">Sets whether the userID field may be empty</td></tr>
<tr><td><a href="mod_auth_anon.html#anonymous_verifyemail">Anonymous_VerifyEmail On|Off</a></td><td> Off </td><td>dh</td><td>E</td></tr><tr><td class="descr" colspan="4">Sets whether to check the password field for a correctly
formatted email address</td></tr>
<tr class="odd"><td><a href="perchild.html#assignuserid">AssignUserID <var>user-id</var> <var>group-id</var></a></td><td></td><td>v</td><td>M</td></tr><tr class="odd"><td class="descr" colspan="4">Tie a virtual host to a user and group ID</td></tr>
<tr><td><a href="mod_auth.html#authauthoritative">AuthAuthoritative On|Off</a></td><td> On </td><td>dh</td><td>B</td></tr><tr><td class="descr" colspan="4">Sets whether authorization and authentication are
passed to lower level modules</td></tr>
<tr class="odd"><td><a href="mod_auth_dbm.html#authdbmauthoritative">AuthDBMAuthoritative On|Off</a></td><td> On </td><td>dh</td><td>E</td></tr><tr class="odd"><td class="descr" colspan="4">Sets whether authentication and authorization will be
passed on to lower level modules</td></tr>
<tr><td><a href="mod_auth_dbm.html#authdbmgroupfile">AuthDBMGroupFile <var>file-path</var></a></td><td></td><td>dh</td><td>E</td></tr><tr><td class="descr" colspan="4">Sets the name of the database file containing the list
of user groups for authentication</td></tr>
<tr class="odd"><td><a href="mod_auth_dbm.html#authdbmtype">AuthDBMType default|SDBM|GDBM|NDBM|DB</a></td><td> default </td><td>dh</td><td>E</td></tr><tr class="odd"><td class="descr" colspan="4">Sets the type of database file that is used to
store passwords</td></tr>
<tr><td><a href="mod_auth_dbm.html#authdbmuserfile">AuthDBMUserFile <var>file-path</var></a></td><td></td><td>dh</td><td>E</td></tr><tr><td class="descr" colspan="4">Sets thename of a database file containing the list of users and
passwords for authentication</td></tr>
<tr class="odd"><td><a href="mod_auth_digest.html#authdigestalgorithm">AuthDigestAlgorithm MD5|MD5-sess</a></td><td> MD5 </td><td>dh</td><td>X</td></tr><tr class="odd"><td class="descr" colspan="4">Selects the algorithm used to calculate the challenge and
response hases in digest authentication</td></tr>
<tr><td><a href="mod_auth_digest.html#authdigestdomain">AuthDigestDomain <var>URI</var> [<var>URI</var>] ...</a></td><td></td><td>dh</td><td>X</td></tr><tr><td class="descr" colspan="4">URIs that are in the same protection space for digest
authentication</td></tr>
<tr class="odd"><td><a href="mod_auth_digest.html#authdigestfile">AuthDigestFile <var>file-path</var></a></td><td></td><td>dh</td><td>X</td></tr><tr class="odd"><td class="descr" colspan="4">Location of the text file containing the list
of users and encoded passwords for digest authentication</td></tr>
<tr><td><a href="mod_auth_digest.html#authdigestgroupfile">AuthDigestGroupFile <var>file-path</var></a></td><td></td><td>dh</td><td>X</td></tr><tr><td class="descr" colspan="4">Name of the text file containing the list of groups
for digest authentication</td></tr>
<tr class="odd"><td><a href="mod_auth_digest.html#authdigestnccheck">AuthDigestNcCheck On|Off</a></td><td> Off </td><td>s</td><td>X</td></tr><tr class="odd"><td class="descr" colspan="4">Enables or disables checking of the nonce-count sent by the
server</td></tr>
<tr><td><a href="mod_auth_digest.html#authdigestnonceformat">AuthDigestNonceFormat <var>format</var></a></td><td></td><td>dh</td><td>X</td></tr><tr><td class="descr" colspan="4">Determines how the nonce is generated</td></tr>
<tr class="odd"><td><a href="mod_auth_digest.html#authdigestnoncelifetime">AuthDigestNonceLifetime <var>seconds</var></a></td><td> 300 </td><td>dh</td><td>X</td></tr><tr class="odd"><td class="descr" colspan="4">How long the server nonce is valid</td></tr>
<tr><td><a href="mod_auth_digest.html#authdigestqop">AuthDigestQop none|auth|auth-int [auth|auth-int]</a></td><td> auth </td><td>dh</td><td>X</td></tr><tr><td class="descr" colspan="4">Determines the quality-of-protection to use in digest
authentication</td></tr>
<tr class="odd"><td><a href="mod_auth_digest.html#authdigestshmemsize">AuthDigestShmemSize <var>size</var></a></td><td> 1000 </td><td>s</td><td>X</td></tr><tr class="odd"><td class="descr" colspan="4">The amount of shared memory to allocate for keeping track
of clients</td></tr>
<tr><td><a href="mod_auth.html#authgroupfile">AuthGroupFile <var>file-path</var></a></td><td></td><td>dh</td><td>B</td></tr><tr><td class="descr" colspan="4">Sets the name of a text file containing the list
of user groups for authentication</td></tr>
<tr class="odd"><td><a href="mod_auth_ldap.html#authldapauthoritative">AuthLDAPAuthoritative on|off</a></td><td> on </td><td>dh</td><td>X</td></tr><tr class="odd"><td class="descr" colspan="4">Prevent other authentication modules from
authenticating the user if this one fails</td></tr>
<tr><td><a href="mod_auth_ldap.html#authldapbinddn">AuthLDAPBindDN <em>distinguished-name</em></a></td><td></td><td>dh</td><td>X</td></tr><tr><td class="descr" colspan="4">Optional DN to use in binding to the LDAP server</td></tr>
<tr class="odd"><td><a href="mod_auth_ldap.html#authldapbindpassword">AuthLDAPBindPassword <em>password</em></a></td><td></td><td>dh</td><td>X</td></tr><tr class="odd"><td class="descr" colspan="4">Password used in conjuction with the bind DN</td></tr>
<tr><td><a href="mod_auth_ldap.html#authldapcharsetconfig">AuthLDAPCharsetConfig <em>file-path</em></a></td><td></td><td>s</td><td>X</td></tr><tr><td class="descr" colspan="4">Language to charset conversion configuration file</td></tr>
<tr class="odd"><td><a href="mod_auth_ldap.html#authldapcomparednonserver">AuthLDAPCompareDNOnServer on|off</a></td><td> on </td><td>dh</td><td>X</td></tr><tr class="odd"><td class="descr" colspan="4">Use the LDAP server to compare the DNs</td></tr>
<tr><td><a href="mod_auth_ldap.html#authldapdereferencealiases">AuthLDAPDereferenceAliases never|searching|finding|always</a></td><td> Always </td><td>dh</td><td>X</td></tr><tr><td class="descr" colspan="4">When will the module de-reference aliases</td></tr>
<tr class="odd"><td><a href="mod_auth_ldap.html#authldapenabled"> AuthLDAPEnabled on|off</a></td><td> on </td><td>dh</td><td>X</td></tr><tr class="odd"><td class="descr" colspan="4">Turn on or off LDAP authentication</td></tr>
<tr><td><a href="mod_auth_ldap.html#authldapfrontpagehack">AuthLDAPFrontPageHack on|off</a></td><td> off </td><td>dh</td><td>X</td></tr><tr><td class="descr" colspan="4">Allow LDAP authentication to work with MS FrontPage</td></tr>
<tr class="odd"><td><a href="mod_auth_ldap.html#authldapgroupattribute">AuthLDAPGroupAttribute <em>attribute</em></a></td><td></td><td>dh</td><td>X</td></tr><tr class="odd"><td class="descr" colspan="4">LDAP attributes used to check for group membership</td></tr>
<tr><td><a href="mod_auth_ldap.html#authldapgroupattributeisdn">AuthLDAPGroupAttributeIsDN on|off</a></td><td> on </td><td>dh</td><td>X</td></tr><tr><td class="descr" colspan="4">Use the DN of the client username when checking for
group membership</td></tr>
<tr class="odd"><td><a href="mod_auth_ldap.html#authldapremoteuserisdn">AuthLDAPRemoteUserIsDN on|off</a></td><td> off </td><td>dh</td><td>X</td></tr><tr class="odd"><td class="descr" colspan="4">Use the DN of the client username to set the REMOTE_USER
environment variable</td></tr>
<tr><td><a href="mod_auth_ldap.html#authldapurl">AuthLDAPUrl <em>url</em></a></td><td></td><td>dh</td><td>X</td></tr><tr><td class="descr" colspan="4">URL specifying the LDAP search parameters</td></tr>
<tr class="odd"><td><a href="core.html#authname">AuthName <var>auth-domain</var></a></td><td></td><td>dh</td><td>C</td></tr><tr class="odd"><td class="descr" colspan="4">Ambito de autorizaci�n para su uso en
autentificaci�n HTTP</td></tr>
<tr><td><a href="core.html#authtype">AuthType Basic|Digest</a></td><td></td><td>dh</td><td>C</td></tr><tr><td class="descr" colspan="4">Tipo de autentificaci�n de usuarios</td></tr>
<tr class="odd"><td><a href="mod_auth.html#authuserfile">AuthUserFile <var>file-path</var></a></td><td></td><td>dh</td><td>B</td></tr><tr class="odd"><td class="descr" colspan="4">Sets the name of a text file containing the list of users and
passwords for authentication</td></tr>
<tr><td><a href="mod_setenvif.html#browsermatch" id="B" name="B">BrowserMatch <em>regex [!]env-variable</em>[=<em>value</em>]
[[!]<em>env-variable</em>[=<em>value</em>]] ...</a></td><td></td><td>svdh</td><td>B</td></tr><tr><td class="descr" colspan="4">Sets environment variables conditional on HTTP User-Agent
</td></tr>
<tr class="odd"><td><a href="mod_setenvif.html#browsermatchnocase">BrowserMatchNoCase  <em>regex [!]env-variable</em>[=<em>value</em>]
    [[!]<em>env-variable</em>[=<em>value</em>]] ...</a></td><td></td><td>svdh</td><td>B</td></tr><tr class="odd"><td class="descr" colspan="4">Sets environment variables conditional on User-Agent without
respect to case</td></tr>
<tr><td><a href="mpm_common.html#bs2000account">BS2000Account <var>account</var></a></td><td></td><td>s</td><td>M</td></tr><tr><td class="descr" colspan="4">Define la cuenta sin privilegios en m�quinas
BS2000</td></tr>
<tr class="odd"><td><a href="mod_log_config.html#bufferedlogs">BufferedLogs On|Off</a></td><td> Off </td><td>s</td><td>B</td></tr><tr class="odd"><td class="descr" colspan="4">Buffer log entries in memory before writing to disk</td></tr>
<tr><td><a href="mod_cache.html#cachedefaultexpire" id="C" name="C">CacheDefaultExpire <var>seconds</var></a></td><td> 3600 (one hour) </td><td>sv</td><td>X</td></tr><tr><td class="descr" colspan="4">The default duration to cache a document when no expiry date is specified.</td></tr>
<tr class="odd"><td><a href="mod_disk_cache.html#cachedirlength">CacheDirLength <var>length</var></a></td><td> 2 </td><td>sv</td><td>X</td></tr><tr class="odd"><td class="descr" colspan="4">The number of characters in subdirectory names</td></tr>
<tr><td><a href="mod_disk_cache.html#cachedirlevels">CacheDirLevels <var>levels</var></a></td><td> 3 </td><td>sv</td><td>X</td></tr><tr><td class="descr" colspan="4">The number of levels of subdirectories in the
cache.</td></tr>
<tr class="odd"><td><a href="mod_cache.html#cachedisable">CacheDisable <var> url-string</var></a></td><td></td><td>sv</td><td>X</td></tr><tr class="odd"><td class="descr" colspan="4">Disable caching of specified URLs</td></tr>
<tr><td><a href="mod_cache.html#cacheenable">CacheEnable <var>cache_type</var> <var>url-string</var></a></td><td></td><td>sv</td><td>X</td></tr><tr><td class="descr" colspan="4">Enable caching of specified URLs using a specified storage
manager</td></tr>
<tr class="odd"><td><a href="mod_disk_cache.html#cacheexpirycheck">CacheExpiryCheck On|Off</a></td><td> On </td><td>sv</td><td>X</td></tr><tr class="odd"><td class="descr" colspan="4">Indicates if the cache observes Expires dates when seeking
files</td></tr>
<tr><td><a href="mod_file_cache.html#cachefile">CacheFile <var>file-path</var> [<var>file-path</var>] ...</a></td><td></td><td>s</td><td>X</td></tr><tr><td class="descr" colspan="4">Cache a list of file handles at startup time</td></tr>
<tr class="odd"><td><a href="mod_cache.html#cacheforcecompletion">CacheForceCompletion <var>Percentage</var></a></td><td> 60 </td><td>sv</td><td>X</td></tr><tr class="odd"><td class="descr" colspan="4">Percentage of document served, after which the server
will complete caching the file even if the request is cancelled.</td></tr>
<tr><td><a href="mod_disk_cache.html#cachegcclean">CacheGcClean <var>hours</var> <var>url-string</var></a></td><td> ? </td><td>sv</td><td>X</td></tr><tr><td class="descr" colspan="4">The time to retain unchanged cached files that match a
URL</td></tr>
<tr class="odd"><td><a href="mod_disk_cache.html#cachegcdaily">CacheGcDaily <var>time</var></a></td><td> ? </td><td>sv</td><td>X</td></tr><tr class="odd"><td class="descr" colspan="4">The recurring time each day for garbage collection to be run.
(24 hour clock)</td></tr>
<tr><td><a href="mod_disk_cache.html#cachegcinterval">CacheGcInterval <var>hours</var></a></td><td></td><td>sv</td><td>X</td></tr><tr><td class="descr" colspan="4">The interval between garbage collection attempts.</td></tr>
<tr class="odd"><td><a href="mod_disk_cache.html#cachegcmemusage">CacheGcMemUsage <var>KBytes</var></a></td><td> ? </td><td>sv</td><td>X</td></tr><tr class="odd"><td class="descr" colspan="4">The maximum kilobytes of memory used for garbage
collection</td></tr>
<tr><td><a href="mod_disk_cache.html#cachegcunused">CacheGcUnused <var>hours</var> <var>url-string</var></a></td><td> ? </td><td>sv</td><td>X</td></tr><tr><td class="descr" colspan="4">The time to retain unreferenced cached files that match a
URL.</td></tr>
<tr class="odd"><td><a href="mod_cache.html#cacheignorecachecontrol">CacheIgnoreCacheControl On|Off</a></td><td> Off </td><td>sv</td><td>X</td></tr><tr class="odd"><td class="descr" colspan="4">Ignore the fact that the client requested the content not be
cached.</td></tr>
<tr><td><a href="mod_cache.html#cacheignoreheaders">CacheIgnoreHeaders <var>header-string</var> [<var>header-string</var>] ...</a></td><td> None </td><td>sv</td><td>X</td></tr><tr><td class="descr" colspan="4">Do not store the given HTTP header(s) in the cache.
</td></tr>
<tr class="odd"><td><a href="mod_cache.html#cacheignorenolastmod">CacheIgnoreNoLastMod On|Off</a></td><td> Off </td><td>sv</td><td>X</td></tr><tr class="odd"><td class="descr" colspan="4">Ignore the fact that a response has no Last Modified
header.</td></tr>
<tr><td><a href="mod_cache.html#cachelastmodifiedfactor">CacheLastModifiedFactor <var>float</var></a></td><td> 0.1 </td><td>sv</td><td>X</td></tr><tr><td class="descr" colspan="4">The factor used to compute an expiry date based on the
LastModified date.</td></tr>
<tr class="odd"><td><a href="mod_cache.html#cachemaxexpire">CacheMaxExpire <var>seconds</var></a></td><td> 86400 (one day) </td><td>sv</td><td>X</td></tr><tr class="odd"><td class="descr" colspan="4">The maximum time in seconds to cache a document</td></tr>
<tr><td><a href="mod_disk_cache.html#cachemaxfilesize">CacheMaxFileSize <var>bytes</var></a></td><td> 1000000 </td><td>sv</td><td>X</td></tr><tr><td class="descr" colspan="4">The maximum size (in bytes) of a document to be placed in the
cache</td></tr>
<tr class="odd"><td><a href="mod_disk_cache.html#cacheminfilesize">CacheMinFileSize <var>bytes</var></a></td><td> 1 </td><td>sv</td><td>X</td></tr><tr class="odd"><td class="descr" colspan="4">The minimum size (in bytes) of a document to be placed in the
cache</td></tr>
<tr><td><a href="mod_negotiation.html#cachenegotiateddocs">CacheNegotiatedDocs On|Off</a></td><td> Off </td><td>sv</td><td>B</td></tr><tr><td class="descr" colspan="4">Allows content-negotiated documents to be 
cached by proxy servers</td></tr>
<tr class="odd"><td><a href="mod_disk_cache.html#cacheroot">CacheRoot <var>directory</var></a></td><td></td><td>sv</td><td>X</td></tr><tr class="odd"><td class="descr" colspan="4">The directory root under which cache files are
stored</td></tr>
<tr><td><a href="mod_disk_cache.html#cachesize">CacheSize <var>KBytes</var></a></td><td> 1000000 </td><td>sv</td><td>X</td></tr><tr><td class="descr" colspan="4">The maximum amount of disk space that will be used by the
cache in KBytes</td></tr>
<tr class="odd"><td><a href="mod_disk_cache.html#cachetimemargin">CacheTimeMargin <var>?</var></a></td><td> ? </td><td>sv</td><td>X</td></tr><tr class="odd"><td class="descr" colspan="4">The minimum time margin to cache a document</td></tr>
<tr><td><a href="core.html#cgimapextension">CGIMapExtension <var>cgi-path</var>
<var>.extension</var></a></td><td></td><td>dh</td><td>C</td></tr><tr><td class="descr" colspan="4">T�cnica para localizar
un int�rprete de scripts CGI</td></tr>
<tr class="odd"><td><a href="mod_charset_lite.html#charsetdefault">CharsetDefault <var>charset</var></a></td><td></td><td>svdh</td><td>X</td></tr><tr class="odd"><td class="descr" colspan="4">Charset to translate into</td></tr>
<tr><td><a href="mod_charset_lite.html#charsetoptions">CharsetOptions <var>option</var> [<var>option</var>] ...</a></td><td> DebugLevel=0 NoImpl +</td><td>svdh</td><td>X</td></tr><tr><td class="descr" colspan="4">Configures charset translation behavior</td></tr>
<tr class="odd"><td><a href="mod_charset_lite.html#charsetsourceenc">CharsetSourceEnc <var>charset</var></a></td><td></td><td>svdh</td><td>X</td></tr><tr class="odd"><td class="descr" colspan="4">Source charset of files</td></tr>
<tr><td><a href="mod_speling.html#checkspelling">CheckSpelling on|off</a></td><td> Off </td><td>svdh</td><td>E</td></tr><tr><td class="descr" colspan="4">Enables the spelling 
module</td></tr>
<tr class="odd"><td><a href="perchild.html#childperuserid">ChildPerUserID <var>user-id</var> <var>group-id</var>
<var>num-children</var></a></td><td></td><td>s</td><td>M</td></tr><tr class="odd"><td class="descr" colspan="4">Specify user ID and group ID for a number of child
processes</td></tr>
<tr><td><a href="core.html#contentdigest">ContentDigest On|Off</a></td><td> Off </td><td>svdh</td><td>C</td></tr><tr><td class="descr" colspan="4">Activa la generaci�n de cabeceras de respuesta HTTP
<code>Content-MD5</code></td></tr>
<tr class="odd"><td><a href="mod_usertrack.html#cookiedomain">CookieDomain <em>domain</em></a></td><td></td><td>svdh</td><td>E</td></tr><tr class="odd"><td class="descr" colspan="4">The domain to which the tracking cookie applies</td></tr>
<tr><td><a href="mod_usertrack.html#cookieexpires">CookieExpires <em>expiry-period</em></a></td><td></td><td>svdh</td><td>E</td></tr><tr><td class="descr" colspan="4">Expiry time for the tracking cookie</td></tr>
<tr class="odd"><td><a href="mod_log_config.html#cookielog">CookieLog <var>filename</var></a></td><td></td><td>sv</td><td>B</td></tr><tr class="odd"><td class="descr" colspan="4">Sets filename for the logging of cookies</td></tr>
<tr><td><a href="mod_usertrack.html#cookiename">CookieName <em>token</em></a></td><td> Apache </td><td>svdh</td><td>E</td></tr><tr><td class="descr" colspan="4">Name of the tracking cookie</td></tr>
<tr class="odd"><td><a href="mod_usertrack.html#cookiestyle">CookieStyle
    <em>Netscape|Cookie|Cookie2|RFC2109|RFC2965</em></a></td><td> Netscape </td><td>svdh</td><td>E</td></tr><tr class="odd"><td class="descr" colspan="4">Format of the cookie header field</td></tr>
<tr><td><a href="mod_usertrack.html#cookietracking">CookieTracking on|off</a></td><td> off </td><td>svdh</td><td>E</td></tr><tr><td class="descr" colspan="4">Enables tracking cookie</td></tr>
<tr class="odd"><td><a href="mpm_common.html#coredumpdirectory">CoreDumpDirectory <var>directory</var></a></td><td></td><td>s</td><td>M</td></tr><tr class="odd"><td class="descr" colspan="4">Directorio al que Apache intenta cambiarse antes de
realizar un volcado de memoria</td></tr>
<tr><td><a href="mod_log_config.html#customlog">CustomLog  <var>file</var>|<var>pipe</var>
<var>format</var>|<var>nickname</var>
[env=[!]<var>environment-variable</var>]</a></td><td></td><td>sv</td><td>B</td></tr><tr><td class="descr" colspan="4">Sets filename and format of log file</td></tr>
<tr class="odd"><td><a href="mod_dav.html#dav" id="D" name="D">Dav On|Off|<var>provider-name</var></a></td><td> Off </td><td>d</td><td>E</td></tr><tr class="odd"><td class="descr" colspan="4">Enable WebDAV HTTP methods</td></tr>
<tr><td><a href="mod_dav.html#davdepthinfinity">DavDepthInfinity on|off</a></td><td> off </td><td>svd</td><td>E</td></tr><tr><td class="descr" colspan="4">Allow PROPFIND, Depth: Infinity requests</td></tr>
<tr class="odd"><td><a href="mod_dav_fs.html#davlockdb">DavLockDB <var>file-path</var></a></td><td></td><td>sv</td><td>E</td></tr><tr class="odd"><td class="descr" colspan="4">Location of the DAV lock database</td></tr>
<tr><td><a href="mod_dav.html#davmintimeout">DavMinTimeout <var>seconds</var></a></td><td> 0 </td><td>svd</td><td>E</td></tr><tr><td class="descr" colspan="4">Minimum amount of time the server holds a lock on
a DAV resource</td></tr>
<tr class="odd"><td><a href="mod_autoindex.html#defaulticon">DefaultIcon <var>url-path</var></a></td><td></td><td>svdh</td><td>B</td></tr><tr class="odd"><td class="descr" colspan="4">Icon to display for files when no specific icon is
configured</td></tr>
<tr><td><a href="mod_mime.html#defaultlanguage">DefaultLanguage <var>MIME-lang</var></a></td><td></td><td>svdh</td><td>B</td></tr><tr><td class="descr" colspan="4">Sets all files in the given scope to the specified
language</td></tr>
<tr class="odd"><td><a href="core.html#defaulttype">DefaultType <var>MIME-type</var></a></td><td> text/plain </td><td>svdh</td><td>C</td></tr><tr class="odd"><td class="descr" colspan="4">Tipo de contenido MIME por defecto que usar� el servidor si no
puede determinar el tipo MIME en concreto del documento a servir</td></tr>
<tr><td><a href="mod_deflate.html#deflatebuffersize">DeflateBufferSize <var>value</var></a></td><td> 8096 </td><td>sv</td><td>E</td></tr><tr><td class="descr" colspan="4">Fragment size to be compressed at one time by zlib</td></tr>
<tr class="odd"><td><a href="mod_deflate.html#deflatecompressionlevel">DeflateCompressionLevel <var>value</var></a></td><td></td><td>sv</td><td>E</td></tr><tr class="odd"><td class="descr" colspan="4">How much compression do we apply to the output</td></tr>
<tr><td><a href="mod_deflate.html#deflatefilternote">DeflateFilterNote [<var>type</var>] <var>notename</var></a></td><td></td><td>sv</td><td>E</td></tr><tr><td class="descr" colspan="4">Places the compression ratio in a note for logging</td></tr>
<tr class="odd"><td><a href="mod_deflate.html#deflatememlevel">DeflateMemLevel <var>value</var></a></td><td> 9 </td><td>sv</td><td>E</td></tr><tr class="odd"><td class="descr" colspan="4">How much memory should be used by zlib for compression</td></tr>
<tr><td><a href="mod_deflate.html#deflatewindowsize">DeflateWindowSize <var>value</var></a></td><td> 15 </td><td>sv</td><td>E</td></tr><tr><td class="descr" colspan="4">Zlib compression window size</td></tr>
<tr class="odd"><td><a href="mod_access.html#deny"> Deny from all|<var>host</var>|env=<var>env-variable</var>
[<var>host</var>|env=<var>env-variable</var>] ...</a></td><td></td><td>dh</td><td>B</td></tr><tr class="odd"><td class="descr" colspan="4">Controls which hosts are denied access to the
server</td></tr>
<tr><td><a href="core.html#directory">&lt;Directory <var>directory-path</var>&gt;
... &lt;/Directory&gt;</a></td><td></td><td>sv</td><td>C</td></tr><tr><td class="descr" colspan="4">Engloba a un grupo de directivas
que se aplicar�n solamente al directorio del sistema de ficheros
especificado y a sus subdirectorios</td></tr>
<tr class="odd"><td><a href="mod_dir.html#directoryindex">DirectoryIndex
    <var>local-url</var> [<var>local-url</var>] ...</a></td><td> index.html </td><td>svdh</td><td>B</td></tr><tr class="odd"><td class="descr" colspan="4">List of resources to look for when the client requests
a directory</td></tr>
<tr><td><a href="core.html#directorymatch">&lt;DirectoryMatch <var>regex</var>&gt;
... &lt;/DirectoryMatch&gt;</a></td><td></td><td>sv</td><td>C</td></tr><tr><td class="descr" colspan="4">Incluye las directivas que se
aplican a los directorios y subdirectorios del sistema de ficheros que
equivalen a una expresi�n regular</td></tr>
<tr class="odd"><td><a href="mod_dir.html#directoryslash">DirectorySlash On|Off</a></td><td> On </td><td>svdh</td><td>B</td></tr><tr class="odd"><td class="descr" colspan="4">Toggle trailing slash redirects on or off</td></tr>
<tr><td><a href="core.html#documentroot">DocumentRoot <var>directory-path</var></a></td><td> /usr/local/apache/h +</td><td>sv</td><td>C</td></tr><tr><td class="descr" colspan="4">Directorio principal que contiene la estructura de
directorios visible desde la web</td></tr>
<tr class="odd"><td><a href="mod_dumpio.html#dumpioinput">DumpIOInput On|Off</a></td><td> Off </td><td>s</td><td>X</td></tr><tr class="odd"><td class="descr" colspan="4">Dump all input data to the error log</td></tr>
<tr><td><a href="mod_dumpio.html#dumpiooutput">DumpIOOutput On|Off</a></td><td> Off </td><td>s</td><td>X</td></tr><tr><td class="descr" colspan="4">Dump all output data to the error log</td></tr>
<tr class="odd"><td><a href="mpm_common.html#enableexceptionhook" id="E" name="E">EnableExceptionHook On|Off</a></td><td> Off </td><td>s</td><td>M</td></tr><tr class="odd"><td class="descr" colspan="4">Activa un hook que inicia handlers de excepci�n
despu�s de un error irrecuperable</td></tr>
<tr><td><a href="core.html#enablemmap">EnableMMAP On|Off</a></td><td> On </td><td>svdh</td><td>C</td></tr><tr><td class="descr" colspan="4">Permite el uso de mapeo de memoria para leer archivos mientras se
sirven</td></tr>
<tr class="odd"><td><a href="core.html#enablesendfile">EnableSendfile On|Off</a></td><td> On </td><td>svdh</td><td>C</td></tr><tr class="odd"><td class="descr" colspan="4">Permite el uso del soporte de sendfile del kernel para servir ficheros @@@@@ Use the kernel sendfile support to deliver files to the client @@@@@ </td></tr>
<tr><td><a href="core.html#errordocument">ErrorDocument <var>error-code</var>
<var>document</var></a></td><td></td><td>svdh</td><td>C</td></tr><tr><td class="descr" colspan="4">Es lo que el servidor devuelve al cliente si se produce
alg�n error</td></tr>
<tr class="odd"><td><a href="core.html#errorlog"> ErrorLog <var>file-path</var>|syslog[:<var>facility</var>]</a></td><td> logs/error_log (Uni +</td><td>sv</td><td>C</td></tr><tr class="odd"><td class="descr" colspan="4">Ubicaci�n del fichero en
el que se almacenan los mensajes de error</td></tr>
<tr><td><a href="mod_example.html#example">Example</a></td><td></td><td>svdh</td><td>X</td></tr><tr><td class="descr" colspan="4">Demonstration directive to illustrate the Apache module
API</td></tr>
<tr class="odd"><td><a href="mod_expires.html#expiresactive">ExpiresActive On|Off</a></td><td></td><td>svdh</td><td>E</td></tr><tr class="odd"><td class="descr" colspan="4">Enables generation of <code>Expires</code>
headers</td></tr>
<tr><td><a href="mod_expires.html#expiresbytype">ExpiresByType <var>MIME-type</var>
<var>&lt;code&gt;seconds</var></a></td><td></td><td>svdh</td><td>E</td></tr><tr><td class="descr" colspan="4">Value of the <code>Expires</code> header configured
by MIME type</td></tr>
<tr class="odd"><td><a href="mod_expires.html#expiresdefault">ExpiresDefault <var>&lt;code&gt;seconds</var></a></td><td></td><td>svdh</td><td>E</td></tr><tr class="odd"><td class="descr" colspan="4">Default algorithm for calculating expiration time</td></tr>
<tr><td><a href="mod_status.html#extendedstatus">ExtendedStatus On|Off</a></td><td> Off </td><td>s</td><td>B</td></tr><tr><td class="descr" colspan="4">Keep track of extended status information for each 
request</td></tr>
<tr class="odd"><td><a href="mod_ext_filter.html#extfilterdefine">ExtFilterDefine <var>filtername</var> <var>parameters</var></a></td><td></td><td>s</td><td>E</td></tr><tr class="odd"><td class="descr" colspan="4">Define an external filter</td></tr>
<tr><td><a href="mod_ext_filter.html#extfilteroptions">ExtFilterOptions <var>option</var> [<var>option</var>] ...</a></td><td> DebugLevel=0 NoLogS +</td><td>d</td><td>E</td></tr><tr><td class="descr" colspan="4">Configure <code class="module"><a href="../mod/mod_ext_filter.html">mod_ext_filter</a></code> options</td></tr>
<tr class="odd"><td><a href="core.html#fileetag" id="F" name="F">FileETag <var>component</var> ...</a></td><td> INode MTime Size </td><td>svdh</td><td>C</td></tr><tr class="odd"><td class="descr" colspan="4">Atributos de fichero usados para crear la ETAG de la
cabecera de respuesta HTTP</td></tr>
<tr><td><a href="core.html#files">&lt;Files <var>filename</var>&gt; ... &lt;/Files&gt;</a></td><td></td><td>svdh</td><td>C</td></tr><tr><td class="descr" colspan="4">Contiene directivas que se aplican a los ficheros cuyos
nombres coincidan con los que se especifiquen</td></tr>
<tr class="odd"><td><a href="core.html#filesmatch">&lt;FilesMatch <var>regex</var>&gt; ... &lt;/FilesMatch&gt;</a></td><td></td><td>svdh</td><td>C</td></tr><tr class="odd"><td class="descr" colspan="4">Contiene las directivas que se aplican a los ficheros
cuyos nombres equivalen a las expresiones regulares que se especifiquen</td></tr>
<tr><td><a href="mod_negotiation.html#forcelanguagepriority">ForceLanguagePriority None|Prefer|Fallback [Prefer|Fallback]</a></td><td> Prefer </td><td>svdh</td><td>B</td></tr><tr><td class="descr" colspan="4">Action to take if a single acceptable document is not 
found</td></tr>
<tr class="odd"><td><a href="core.html#forcetype">ForceType <var>MIME-type</var>|None</a></td><td></td><td>dh</td><td>C</td></tr><tr class="odd"><td class="descr" colspan="4">Hace que todos los ficheros cuyos nombres tengan una equivalencia con con lo que se especifique sean
servidos como contenido del tipo MIME que se establezca</td></tr>
<tr><td><a href="mod_log_forensic.html#forensiclog">ForensicLog <var>filename</var>|<var>pipe</var></a></td><td></td><td>sv</td><td>E</td></tr><tr><td class="descr" colspan="4">Sets filename of the forensic log</td></tr>
<tr class="odd"><td><a href="mpm_common.html#group" id="G" name="G">Group <var>unix-group</var></a></td><td> #-1 </td><td>s</td><td>M</td></tr><tr class="odd"><td class="descr" colspan="4">Grupo con el que el servidor atender� las
peticiones</td></tr>
<tr><td><a href="mod_headers.html#header" id="H" name="H">Header [<var>condition</var>] set|append|add|unset|echo
<var>header</var> [<var>value</var>] [env=[!]<var>variable</var>]</a></td><td></td><td>svdh</td><td>E</td></tr><tr><td class="descr" colspan="4">Configure HTTP response headers</td></tr>
<tr class="odd"><td><a href="mod_autoindex.html#headername">HeaderName <var>filename</var></a></td><td></td><td>svdh</td><td>B</td></tr><tr class="odd"><td class="descr" colspan="4">Name of the file that will be inserted at the top
of the index listing</td></tr>
<tr><td><a href="core.html#hostnamelookups">HostnameLookups On|Off|Double</a></td><td> Off </td><td>svd</td><td>C</td></tr><tr><td class="descr" colspan="4">Activa la resoluci�n de
DNS de las direcciones IP de los clientes</td></tr>
<tr class="odd"><td><a href="core.html#identitycheck" id="I" name="I">IdentityCheck On|Off</a></td><td> Off </td><td>svd</td><td>C</td></tr><tr class="odd"><td class="descr" colspan="4">Activa que se registre en los archivos log la entidad RFC1413 del usuario remoto</td></tr>
<tr><td><a href="core.html#ifdefine">&lt;IfDefine [!]<var>parameter-name</var>&gt; ...
    &lt;/IfDefine&gt;</a></td><td></td><td>svdh</td><td>C</td></tr><tr><td class="descr" colspan="4">Engloba directivas que ser�n procesadas solo si se
cumple una determinada condici�n al iniciar el servidor</td></tr>
<tr class="odd"><td><a href="core.html#ifmodule">&lt;IfModule [!]<var>module-name</var>&gt; ...
    &lt;/IfModule&gt;</a></td><td></td><td>svdh</td><td>C</td></tr><tr class="odd"><td class="descr" colspan="4">Engloba directivas que se procesan de forma condicional
seg�n est� presente o ausente un m�dulo espec�fico</td></tr>
<tr><td><a href="mod_version.html#ifversion">&lt;IfVersion [[!]<var>operator</var>] <var>version</var>&gt; ...
&lt;/IfVersion&gt;</a></td><td></td><td>svdh</td><td>E</td></tr><tr><td class="descr" colspan="4">contains version dependent configuration</td></tr>
<tr class="odd"><td><a href="mod_imap.html#imapbase">ImapBase map|referer|<var>URL</var></a></td><td> http://servername/ </td><td>svdh</td><td>B</td></tr><tr class="odd"><td class="descr" colspan="4">Default <code>base</code> for imagemap files</td></tr>
<tr><td><a href="mod_imap.html#imapdefault">ImapDefault error|nocontent|map|referer|<var>URL</var></a></td><td> nocontent </td><td>svdh</td><td>B</td></tr><tr><td class="descr" colspan="4">Default action when an imagemap is called with coordinates
that are not explicitly mapped</td></tr>
<tr class="odd"><td><a href="mod_imap.html#imapmenu">ImapMenu none|formatted|semiformatted|unformatted</a></td><td></td><td>svdh</td><td>B</td></tr><tr class="odd"><td class="descr" colspan="4">Action if no coordinates are given when calling
an imagemap</td></tr>
<tr><td><a href="core.html#include">Include <var>file-path</var>|<var>directory-path</var></a></td><td></td><td>svd</td><td>C</td></tr><tr><td class="descr" colspan="4">Incluye otros ficheros de configuraci�n dentro de
los ficheros de configuraci�n del servidor</td></tr>
<tr class="odd"><td><a href="mod_autoindex.html#indexignore">IndexIgnore <var>file</var> [<var>file</var>] ...</a></td><td></td><td>svdh</td><td>B</td></tr><tr class="odd"><td class="descr" colspan="4">Adds to the list of files to hide when listing 
a directory</td></tr>
<tr><td><a href="mod_autoindex.html#indexoptions">IndexOptions  [+|-]<var>option</var> [[+|-]<var>option</var>]
...</a></td><td></td><td>svdh</td><td>B</td></tr><tr><td class="descr" colspan="4">Various configuration settings for directory 
indexing</td></tr>
<tr class="odd"><td><a href="mod_autoindex.html#indexorderdefault">IndexOrderDefault Ascending|Descending
Name|Date|Size|Description</a></td><td> Ascending Name </td><td>svdh</td><td>B</td></tr><tr class="odd"><td class="descr" colspan="4">Sets the default ordering of the directory index</td></tr>
<tr><td><a href="mod_isapi.html#isapiappendlogtoerrors">ISAPIAppendLogToErrors on|off</a></td><td> off </td><td>svdh</td><td>B</td></tr><tr><td class="descr" colspan="4">Record <code>HSE_APPEND_LOG_PARAMETER</code> requests from
ISAPI extensions to the error log</td></tr>
<tr class="odd"><td><a href="mod_isapi.html#isapiappendlogtoquery">ISAPIAppendLogToQuery on|off</a></td><td> on </td><td>svdh</td><td>B</td></tr><tr class="odd"><td class="descr" colspan="4">Record <code>HSE_APPEND_LOG_PARAMETER</code> requests from
ISAPI extensions to the query field</td></tr>
<tr><td><a href="mod_isapi.html#isapicachefile">ISAPICacheFile <var>file-path</var> [<var>file-path</var>]
...</a></td><td></td><td>sv</td><td>B</td></tr><tr><td class="descr" colspan="4">ISAPI .dll files to be loaded at startup</td></tr>
<tr class="odd"><td><a href="mod_isapi.html#isapifakeasync">ISAPIFakeAsync on|off</a></td><td> off </td><td>svdh</td><td>B</td></tr><tr class="odd"><td class="descr" colspan="4">Fake asynchronous support for ISAPI callbacks</td></tr>
<tr><td><a href="mod_isapi.html#isapilognotsupported">ISAPILogNotSupported on|off</a></td><td> off </td><td>svdh</td><td>B</td></tr><tr><td class="descr" colspan="4">Log unsupported feature requests from ISAPI
extensions</td></tr>
<tr class="odd"><td><a href="mod_isapi.html#isapireadaheadbuffer">ISAPIReadAheadBuffer <var>size</var></a></td><td> 49152 </td><td>svdh</td><td>B</td></tr><tr class="odd"><td class="descr" colspan="4">Size of the Read Ahead Buffer sent to ISAPI
extensions</td></tr>
<tr><td><a href="core.html#keepalive" id="K" name="K">KeepAlive On|Off</a></td><td> On </td><td>sv</td><td>C</td></tr><tr><td class="descr" colspan="4">Permite que se establezcan conexiones HTTP
persistentes</td></tr>
<tr class="odd"><td><a href="core.html#keepalivetimeout">KeepAliveTimeout <var>seconds</var></a></td><td> 15 </td><td>sv</td><td>C</td></tr><tr class="odd"><td class="descr" colspan="4">Tiempo que el servidor esperar� peticiones subsiguientes
en conexiones persistentes</td></tr>
<tr><td><a href="mod_negotiation.html#languagepriority" id="L" name="L">LanguagePriority <var>MIME-lang</var> [<var>MIME-lang</var>]
...</a></td><td></td><td>svdh</td><td>B</td></tr><tr><td class="descr" colspan="4">The precendence of language variants for cases where
the client does not express a preference</td></tr>
<tr class="odd"><td><a href="mod_ldap.html#ldapcacheentries">LDAPCacheEntries <var>number</var></a></td><td> 1024 </td><td>s</td><td>X</td></tr><tr class="odd"><td class="descr" colspan="4">Maximum number of entries in the primary LDAP cache</td></tr>
<tr><td><a href="mod_ldap.html#ldapcachettl">LDAPCacheTTL <var>seconds</var></a></td><td> 600 </td><td>s</td><td>X</td></tr><tr><td class="descr" colspan="4">Time that cached items remain valid</td></tr>
<tr class="odd"><td><a href="mod_ldap.html#ldapconnectiontimeout">LDAPConnectionTimeout <var>seconds</var></a></td><td></td><td>s</td><td>X</td></tr><tr class="odd"><td class="descr" colspan="4">Specifies the socket connection timeout in seconds</td></tr>
<tr><td><a href="mod_ldap.html#ldapopcacheentries">LDAPOpCacheEntries <var>number</var></a></td><td> 1024 </td><td>s</td><td>X</td></tr><tr><td class="descr" colspan="4">Number of entries used to cache LDAP compare 
operations</td></tr>
<tr class="odd"><td><a href="mod_ldap.html#ldapopcachettl">LDAPOpCacheTTL <var>seconds</var></a></td><td> 600 </td><td>s</td><td>X</td></tr><tr class="odd"><td class="descr" colspan="4">Time that entries in the operation cache remain
valid</td></tr>
<tr><td><a href="mod_ldap.html#ldapsharedcachefile">LDAPSharedCacheFile <var>directory-path/filename</var></a></td><td></td><td>s</td><td>X</td></tr><tr><td class="descr" colspan="4">Sets the shared memory cache file</td></tr>
<tr class="odd"><td><a href="mod_ldap.html#ldapsharedcachesize">LDAPSharedCacheSize <var>bytes</var></a></td><td> 102400 </td><td>s</td><td>X</td></tr><tr class="odd"><td class="descr" colspan="4">Size in bytes of the shared-memory cache</td></tr>
<tr><td><a href="mod_ldap.html#ldaptrustedca">LDAPTrustedCA <var>directory-path/filename</var></a></td><td></td><td>s</td><td>X</td></tr><tr><td class="descr" colspan="4">Sets the file containing the trusted Certificate Authority certificate or database</td></tr>
<tr class="odd"><td><a href="mod_ldap.html#ldaptrustedcatype">LDAPTrustedCAType <var>type</var></a></td><td></td><td>s</td><td>X</td></tr><tr class="odd"><td class="descr" colspan="4">Specifies the type of the Certificate Authority file</td></tr>
<tr><td><a href="core.html#limit">&lt;Limit <var>method</var> [<var>method</var>] ... &gt; ...
    &lt;/Limit&gt;</a></td><td></td><td>svdh</td><td>C</td></tr><tr><td class="descr" colspan="4">Restringe la aplicaci�n de los controles de acceso incluidos a solo ciertos m�todos HTTP</td></tr>
<tr class="odd"><td><a href="core.html#limitexcept">&lt;LimitExcept <var>method</var> [<var>method</var>] ... &gt;
    ...  &lt;/LimitExcept&gt;</a></td><td></td><td>svdh</td><td>C</td></tr><tr class="odd"><td class="descr" colspan="4">Restringe los controles de acceso a todos los m�todos
HTTP excepto a los que se especifiquen</td></tr>
<tr><td><a href="core.html#limitinternalrecursion">LimitInternalRecursion <var>number</var> [<var>number</var>]</a></td><td> 10 </td><td>sv</td><td>C</td></tr><tr><td class="descr" colspan="4">Determina el n�mero m�ximo de redirecciones internas y
subpeticiones anidadas</td></tr>
<tr class="odd"><td><a href="core.html#limitrequestbody">LimitRequestBody <var>bytes</var></a></td><td> 0 </td><td>svdh</td><td>C</td></tr><tr class="odd"><td class="descr" colspan="4">Restringe el tama�o total del cuerpo de las peticiones
HTTP enviadas desde el cliente</td></tr>
<tr><td><a href="core.html#limitrequestfields">LimitRequestFields <var>number</var></a></td><td> 100 </td><td>s</td><td>C</td></tr><tr><td class="descr" colspan="4">Limita el n�mero de campos de la cabecera de las
peticiones HTTP del cliente que ser�n aceptadas</td></tr>
<tr class="odd"><td><a href="core.html#limitrequestfieldsize">LimitRequestFieldsize <var>bytes</var></a></td><td></td><td>s</td><td>C</td></tr><tr class="odd"><td class="descr" colspan="4">Limita el tama�o permitido de las cabeceras de las peticiones HTTP de los clientes</td></tr>
<tr><td><a href="core.html#limitrequestline">LimitRequestLine <var>bytes</var></a></td><td> 8190 </td><td>s</td><td>C</td></tr><tr><td class="descr" colspan="4">Limita el tama�o la l�nea de petici�n HTTP que ser�
aceptada</td></tr>
<tr class="odd"><td><a href="core.html#limitxmlrequestbody">LimitXMLRequestBody <var>bytes</var></a></td><td> 1000000 </td><td>svdh</td><td>C</td></tr><tr class="odd"><td class="descr" colspan="4">Limita el tama�o del cuerpo de una petici�n XML</td></tr>
<tr><td><a href="mpm_common.html#listen">Listen [<var>IP-address</var>:]<var>portnumber</var></a></td><td></td><td>s</td><td>M</td></tr><tr><td class="descr" colspan="4">Direcciones IP y puertos en los que escucha el servidor</td></tr>
<tr class="odd"><td><a href="mpm_common.html#listenbacklog">ListenBacklog <var>backlog</var></a></td><td></td><td>s</td><td>M</td></tr><tr class="odd"><td class="descr" colspan="4">Longitud m�xima de la cola de conexiones en espera</td></tr>
<tr><td><a href="mod_so.html#loadfile">LoadFile <em>filename</em> [<em>filename</em>] ...</a></td><td></td><td>s</td><td>E</td></tr><tr><td class="descr" colspan="4">Link in the named object file or library</td></tr>
<tr class="odd"><td><a href="mod_so.html#loadmodule">LoadModule <em>module filename</em></a></td><td></td><td>s</td><td>E</td></tr><tr class="odd"><td class="descr" colspan="4">Links in the object file or library, and adds to the list
of active modules</td></tr>
<tr><td><a href="core.html#location">&lt;Location
    <var>URL-path</var>|<var>URL</var>&gt; ... &lt;/Location&gt;</a></td><td></td><td>sv</td><td>C</td></tr><tr><td class="descr" colspan="4">Aplica las directivas que contiene solo a las URLs que tengan una equivalencia con los valores que se especifiquen</td></tr>
<tr class="odd"><td><a href="core.html#locationmatch">&lt;LocationMatch
    <var>regex</var>&gt; ... &lt;/LocationMatch&gt;</a></td><td></td><td>sv</td><td>C</td></tr><tr class="odd"><td class="descr" colspan="4">Aplica las directiva que incluye solo a las URLs que tengan equivalencia con alguna de las expresiones regulares que se especifiquen</td></tr>
<tr><td><a href="mpm_common.html#lockfile">LockFile <var>filename</var></a></td><td> logs/accept.lock </td><td>s</td><td>M</td></tr><tr><td class="descr" colspan="4">Ubicaci�n del fichero de lock de serializaci�n de aceptacio�n de peticiones</td></tr>
<tr class="odd"><td><a href="mod_log_config.html#logformat">LogFormat <var>format</var>|<var>nickname</var>
[<var>nickname</var>]</a></td><td> "%h %l %u %t \"%r\" +</td><td>sv</td><td>B</td></tr><tr class="odd"><td class="descr" colspan="4">Describes a format for use in a log file</td></tr>
<tr><td><a href="core.html#loglevel">LogLevel <var>level</var></a></td><td> warn </td><td>sv</td><td>C</td></tr><tr><td class="descr" colspan="4">Controla la extensi�n de los mensajes que se almacenan
en el ErrorLog</td></tr>
<tr class="odd"><td><a href="mpm_common.html#maxclients" id="M" name="M">MaxClients <var>number</var></a></td><td></td><td>s</td><td>M</td></tr><tr class="odd"><td class="descr" colspan="4">N�mero m�ximo de procesos hijo que ser�n creados para
atender peticiones</td></tr>
<tr><td><a href="core.html#maxkeepaliverequests">MaxKeepAliveRequests <var>number</var></a></td><td> 100 </td><td>sv</td><td>C</td></tr><tr><td class="descr" colspan="4">N�mero de peticiones permitidas en una conexi�n
persistente</td></tr>
<tr class="odd"><td><a href="mpm_common.html#maxmemfree">MaxMemFree <var>KBytes</var></a></td><td> 0 </td><td>s</td><td>M</td></tr><tr class="odd"><td class="descr" colspan="4">Cantidad m�xima de memoria que el asignador principal puede tomar sin hacer una llamada a <code>free()</code></td></tr>
<tr><td><a href="mpm_common.html#maxrequestsperchild">MaxRequestsPerChild <var>number</var></a></td><td> 10000 </td><td>s</td><td>M</td></tr><tr><td class="descr" colspan="4">L�mite en el n�mero de peticiones que un proceso hijo puede
atender durante su vida</td></tr>
<tr class="odd"><td><a href="beos.html#maxrequestsperthread">MaxRequestsPerThread <var>number</var></a></td><td> 0 </td><td>s</td><td>M</td></tr><tr class="odd"><td class="descr" colspan="4">Limita el n�mero de peticiones que una hebra (thread) puede
atender durante su vida</td></tr>
<tr><td><a href="prefork.html#maxspareservers">MaxSpareServers <var>number</var></a></td><td> 10 </td><td>s</td><td>M</td></tr><tr><td class="descr" colspan="4">N�mero m�ximo de procesos hijo en espera que
puede tener el servdor</td></tr>
<tr class="odd"><td><a href="mpm_common.html#maxsparethreads">MaxSpareThreads <var>number</var></a></td><td></td><td>s</td><td>M</td></tr><tr class="odd"><td class="descr" colspan="4">N�mero m�ximo de hebras en espera</td></tr>
<tr><td><a href="mpm_netware.html#maxthreads">MaxThreads <var>number</var></a></td><td> 2048 </td><td>s</td><td>M</td></tr><tr><td class="descr" colspan="4">Set the maximum number of worker threads</td></tr>
<tr class="odd"><td><a href="perchild.html#maxthreadsperchild">MaxThreadsPerChild <var>number</var></a></td><td> 64 </td><td>s</td><td>M</td></tr><tr class="odd"><td class="descr" colspan="4">Maximum number of threads per child process</td></tr>
<tr><td><a href="mod_mem_cache.html#mcachemaxobjectcount">MCacheMaxObjectCount <var>value</var></a></td><td> 1009 </td><td>s</td><td>X</td></tr><tr><td class="descr" colspan="4">The maximum number of objects allowed to be placed in the
cache</td></tr>
<tr class="odd"><td><a href="mod_mem_cache.html#mcachemaxobjectsize">MCacheMaxObjectSize <var>bytes</var></a></td><td> 10000 </td><td>s</td><td>X</td></tr><tr class="odd"><td class="descr" colspan="4">The maximum size (in bytes) of a document allowed in the
cache</td></tr>
<tr><td><a href="mod_mem_cache.html#mcachemaxstreamingbuffer">MCacheMaxStreamingBuffer <var>size_in_bytes</var></a></td><td> the smaller of 1000 +</td><td>s</td><td>X</td></tr><tr><td class="descr" colspan="4">Maximum amount of a streamed response to buffer in memory
before declaring the response uncacheable</td></tr>
<tr class="odd"><td><a href="mod_mem_cache.html#mcacheminobjectsize">MCacheMinObjectSize <var>bytes</var></a></td><td> 0 </td><td>s</td><td>X</td></tr><tr class="odd"><td class="descr" colspan="4">The minimum size (in bytes) of a document to be allowed in the
cache</td></tr>
<tr><td><a href="mod_mem_cache.html#mcacheremovalalgorithm">MCacheRemovalAlgorithm LRU|GDSF</a></td><td> GDSF </td><td>s</td><td>X</td></tr><tr><td class="descr" colspan="4">The algorithm used to select documents for removal from the
cache</td></tr>
<tr class="odd"><td><a href="mod_mem_cache.html#mcachesize">MCacheSize <var>KBytes</var></a></td><td> 100 </td><td>s</td><td>X</td></tr><tr class="odd"><td class="descr" colspan="4">The maximum amount of memory used by the cache in
KBytes</td></tr>
<tr><td><a href="mod_cern_meta.html#metadir">MetaDir <var>directory</var></a></td><td> .web </td><td>svdh</td><td>E</td></tr><tr><td class="descr" colspan="4">Name of the directory to find CERN-style meta information
files</td></tr>
<tr class="odd"><td><a href="mod_cern_meta.html#metafiles">MetaFiles on|off</a></td><td> off </td><td>svdh</td><td>E</td></tr><tr class="odd"><td class="descr" colspan="4">Activates CERN meta-file processing</td></tr>
<tr><td><a href="mod_cern_meta.html#metasuffix">MetaSuffix <var>suffix</var></a></td><td> .meta </td><td>svdh</td><td>E</td></tr><tr><td class="descr" colspan="4">File name suffix for the file containg CERN-style
meta information</td></tr>
<tr class="odd"><td><a href="mod_mime_magic.html#mimemagicfile">MimeMagicFile <var>file-path</var></a></td><td></td><td>sv</td><td>E</td></tr><tr class="odd"><td class="descr" colspan="4">Enable MIME-type determination based on file contents
using the specified magic file</td></tr>
<tr><td><a href="prefork.html#minspareservers">MinSpareServers <var>number</var></a></td><td> 5 </td><td>s</td><td>M</td></tr><tr><td class="descr" colspan="4">N�mero m�nimo de procesos hijo en espera</td></tr>
<tr class="odd"><td><a href="mpm_common.html#minsparethreads">MinSpareThreads <var>number</var></a></td><td></td><td>s</td><td>M</td></tr><tr class="odd"><td class="descr" colspan="4">N�mero m�nimo de hebras en espera para atender picos de
demanda en las peticiones</td></tr>
<tr><td><a href="mod_file_cache.html#mmapfile">MMapFile <var>file-path</var> [<var>file-path</var>] ...</a></td><td></td><td>s</td><td>X</td></tr><tr><td class="descr" colspan="4">Map a list of files into memory at startup time</td></tr>
<tr class="odd"><td><a href="mod_mime.html#modmimeusepathinfo">ModMimeUsePathInfo On|Off</a></td><td> Off </td><td>d</td><td>B</td></tr><tr class="odd"><td class="descr" colspan="4">Tells <code class="module"><a href="../mod/mod_mime.html">mod_mime</a></code> to treat <code>path_info</code>
components as part of the filename</td></tr>
<tr><td><a href="mod_mime.html#multiviewsmatch">MultiviewsMatch Any|NegotiatedOnly|Filters|Handlers
[Handlers|Filters]</a></td><td> NegotiatedOnly </td><td>svdh</td><td>B</td></tr><tr><td class="descr" colspan="4">The types of files that will be included when searching for
a matching file with MultiViews</td></tr>
<tr class="odd"><td><a href="core.html#namevirtualhost" id="N" name="N">NameVirtualHost <var>addr</var>[:<var>port</var>]</a></td><td></td><td>s</td><td>C</td></tr><tr class="odd"><td class="descr" colspan="4">Designa una direcci�n IP para usar hosting virtual basado en nombres</td></tr>
<tr><td><a href="mod_proxy.html#noproxy">NoProxy <var>host</var> [<var>host</var>] ...</a></td><td></td><td>sv</td><td>E</td></tr><tr><td class="descr" colspan="4">Hosts, domains, or networks that will be connected to
directly</td></tr>
<tr class="odd"><td><a href="perchild.html#numservers">NumServers <var>number</var></a></td><td> 2 </td><td>s</td><td>M</td></tr><tr class="odd"><td class="descr" colspan="4">Total number of children alive at the same time</td></tr>
<tr><td><a href="mod_nw_ssl.html#nwssltrustedcerts">NWSSLTrustedCerts <var>filename</var> [<var>filename</var>] ...</a></td><td></td><td>s</td><td>B</td></tr><tr><td class="descr" colspan="4">List of additional client certificates</td></tr>
<tr class="odd"><td><a href="mod_nw_ssl.html#nwsslupgradeable">NWSSLUpgradeable [<var>IP-address</var>:]<var>portnumber</var></a></td><td></td><td>s</td><td>B</td></tr><tr class="odd"><td class="descr" colspan="4">Allows a connection to be upgraded to an SSL connection upon request</td></tr>
<tr><td><a href="core.html#options" id="O" name="O">Options
    [+|-]<var>option</var> [[+|-]<var>option</var>] ...</a></td><td> All </td><td>svdh</td><td>C</td></tr><tr><td class="descr" colspan="4">Configura las funcionalidades disponibles en un directorio en particular</td></tr>
<tr class="odd"><td><a href="mod_access.html#order"> Order <var>ordering</var></a></td><td> Deny,Allow </td><td>dh</td><td>B</td></tr><tr class="odd"><td class="descr" colspan="4">Controls the default access state and the order in which
<code class="directive">Allow</code> and <code class="directive">Deny</code> are
evaluated.</td></tr>
<tr><td><a href="mod_env.html#passenv" id="P" name="P">PassEnv <var>env-variable</var> [<var>env-variable</var>]
...</a></td><td></td><td>svdh</td><td>B</td></tr><tr><td class="descr" colspan="4">Passes environment variables from the shell</td></tr>
<tr class="odd"><td><a href="mpm_common.html#pidfile">PidFile <var>filename</var></a></td><td> logs/httpd.pid </td><td>s</td><td>M</td></tr><tr class="odd"><td class="descr" colspan="4">Fichero en el que el servidor guarda
el ID del proceso demonio de escucha (daemon)</td></tr>
<tr><td><a href="mod_echo.html#protocolecho">ProtocolEcho On|Off</a></td><td></td><td>sv</td><td>X</td></tr><tr><td class="descr" colspan="4">Turn the echo server on or off</td></tr>
<tr class="odd"><td><a href="mod_proxy.html#proxy">&lt;Proxy <var>wildcard-url</var>&gt; ...&lt;/Proxy&gt;</a></td><td></td><td>sv</td><td>E</td></tr><tr class="odd"><td class="descr" colspan="4">Container for directives applied to proxied resources</td></tr>
<tr><td><a href="mod_proxy.html#proxybadheader">ProxyBadHeader IsError|Ignore|StartBody</a></td><td> IsError </td><td>sv</td><td>E</td></tr><tr><td class="descr" colspan="4">Determines how to handle bad header lines in a
response</td></tr>
<tr class="odd"><td><a href="mod_proxy.html#proxyblock">ProxyBlock *|<var>word</var>|<var>host</var>|<var>domain</var>
[<var>word</var>|<var>host</var>|<var>domain</var>] ...</a></td><td></td><td>sv</td><td>E</td></tr><tr class="odd"><td class="descr" colspan="4">Words, hosts, or domains that are banned from being
proxied</td></tr>
<tr><td><a href="mod_proxy.html#proxydomain">ProxyDomain <var>Domain</var></a></td><td></td><td>sv</td><td>E</td></tr><tr><td class="descr" colspan="4">Default domain name for proxied requests</td></tr>
<tr class="odd"><td><a href="mod_proxy.html#proxyerroroverride">ProxyErrorOverride On|Off</a></td><td> Off </td><td>sv</td><td>E</td></tr><tr class="odd"><td class="descr" colspan="4">Override error pages for proxied content</td></tr>
<tr><td><a href="mod_proxy.html#proxyiobuffersize">ProxyIOBufferSize <var>bytes</var></a></td><td> 8192 </td><td>sv</td><td>E</td></tr><tr><td class="descr" colspan="4">Determine size of internal data throughput buffer</td></tr>
<tr class="odd"><td><a href="mod_proxy.html#proxymatch">&lt;ProxyMatch <var>regex</var>&gt; ...&lt;/ProxyMatch&gt;</a></td><td></td><td>sv</td><td>E</td></tr><tr class="odd"><td class="descr" colspan="4">Container for directives applied to regular-expression-matched 
proxied resources</td></tr>
<tr><td><a href="mod_proxy.html#proxymaxforwards">ProxyMaxForwards <var>number</var></a></td><td> 10 </td><td>sv</td><td>E</td></tr><tr><td class="descr" colspan="4">Maximium number of proxies that a request can be forwarded
through</td></tr>
<tr class="odd"><td><a href="mod_proxy.html#proxypass">ProxyPass [<var>path</var>] !|<var>url</var></a></td><td></td><td>svd</td><td>E</td></tr><tr class="odd"><td class="descr" colspan="4">Maps remote servers into the local server URL-space</td></tr>
<tr><td><a href="mod_proxy.html#proxypassreverse">ProxyPassReverse [<var>path</var>] <var>url</var></a></td><td></td><td>svd</td><td>E</td></tr><tr><td class="descr" colspan="4">Adjusts the URL in HTTP response headers sent from a reverse
proxied server</td></tr>
<tr class="odd"><td><a href="mod_proxy.html#proxypreservehost">ProxyPreserveHost On|Off</a></td><td> Off </td><td>sv</td><td>E</td></tr><tr class="odd"><td class="descr" colspan="4">Use incoming Host HTTP request header for proxy
request</td></tr>
<tr><td><a href="mod_proxy.html#proxyreceivebuffersize">ProxyReceiveBufferSize <var>bytes</var></a></td><td> 0 </td><td>sv</td><td>E</td></tr><tr><td class="descr" colspan="4">Network buffer size for proxied HTTP and FTP
connections</td></tr>
<tr class="odd"><td><a href="mod_proxy.html#proxyremote">ProxyRemote <var>match</var> <var>remote-server</var></a></td><td></td><td>sv</td><td>E</td></tr><tr class="odd"><td class="descr" colspan="4">Remote proxy used to handle certain requests</td></tr>
<tr><td><a href="mod_proxy.html#proxyremotematch">ProxyRemoteMatch <var>regex</var> <var>remote-server</var></a></td><td></td><td>sv</td><td>E</td></tr><tr><td class="descr" colspan="4">Remote proxy used to handle requests matched by regular
expressions</td></tr>
<tr class="odd"><td><a href="mod_proxy.html#proxyrequests">ProxyRequests On|Off</a></td><td> Off </td><td>sv</td><td>E</td></tr><tr class="odd"><td class="descr" colspan="4">Enables forward (standard) proxy requests</td></tr>
<tr><td><a href="mod_proxy.html#proxytimeout">ProxyTimeout <var>seconds</var></a></td><td> 300 </td><td>sv</td><td>E</td></tr><tr><td class="descr" colspan="4">Network timeout for proxied requests</td></tr>
<tr class="odd"><td><a href="mod_proxy.html#proxyvia">ProxyVia On|Off|Full|Block</a></td><td> Off </td><td>sv</td><td>E</td></tr><tr class="odd"><td class="descr" colspan="4">Information provided in the <code>Via</code> HTTP response
header for proxied requests</td></tr>
<tr><td><a href="mod_autoindex.html#readmename" id="R" name="R">ReadmeName <var>filename</var></a></td><td></td><td>svdh</td><td>B</td></tr><tr><td class="descr" colspan="4">Name of the file that will be inserted at the end
of the index listing</td></tr>
<tr class="odd"><td><a href="mod_alias.html#redirect">Redirect [<var>status</var>] <var>URL-path</var>
<var>URL</var></a></td><td></td><td>svdh</td><td>B</td></tr><tr class="odd"><td class="descr" colspan="4">Sends an external redirect asking the client to fetch
a different URL</td></tr>
<tr><td><a href="mod_alias.html#redirectmatch">RedirectMatch [<var>status</var>] <var>regex</var>
<var>URL</var></a></td><td></td><td>svdh</td><td>B</td></tr><tr><td class="descr" colspan="4">Sends an external redirect based on a regular expression match 
of the current URL</td></tr>
<tr class="odd"><td><a href="mod_alias.html#redirectpermanent">RedirectPermanent <var>URL-path</var> <var>URL</var></a></td><td></td><td>svdh</td><td>B</td></tr><tr class="odd"><td class="descr" colspan="4">Sends an external permanent redirect asking the client to fetch
a different URL</td></tr>
<tr><td><a href="mod_alias.html#redirecttemp">RedirectTemp <var>URL-path</var> <var>URL</var></a></td><td></td><td>svdh</td><td>B</td></tr><tr><td class="descr" colspan="4">Sends an external temporary redirect asking the client to fetch
a different URL</td></tr>
<tr class="odd"><td><a href="mod_mime.html#removecharset">RemoveCharset <var>extension</var> [<var>extension</var>]
...</a></td><td></td><td>vdh</td><td>B</td></tr><tr class="odd"><td class="descr" colspan="4">Removes any character set associations for a set of file
extensions</td></tr>
<tr><td><a href="mod_mime.html#removeencoding">RemoveEncoding <var>extension</var> [<var>extension</var>]
...</a></td><td></td><td>vdh</td><td>B</td></tr><tr><td class="descr" colspan="4">Removes any content encoding associations for a set of file
extensions</td></tr>
<tr class="odd"><td><a href="mod_mime.html#removehandler">RemoveHandler <var>extension</var> [<var>extension</var>]
...</a></td><td></td><td>vdh</td><td>B</td></tr><tr class="odd"><td class="descr" colspan="4">Removes any handler associations for a set of file
extensions</td></tr>
<tr><td><a href="mod_mime.html#removeinputfilter">RemoveInputFilter <var>extension</var> [<var>extension</var>]
...</a></td><td></td><td>vdh</td><td>B</td></tr><tr><td class="descr" colspan="4">Removes any input filter associations for a set of file
extensions</td></tr>
<tr class="odd"><td><a href="mod_mime.html#removelanguage">RemoveLanguage <var>extension</var> [<var>extension</var>]
...</a></td><td></td><td>vdh</td><td>B</td></tr><tr class="odd"><td class="descr" colspan="4">Removes any language associations for a set of file
extensions</td></tr>
<tr><td><a href="mod_mime.html#removeoutputfilter">RemoveOutputFilter <var>extension</var> [<var>extension</var>]
...</a></td><td></td><td>vdh</td><td>B</td></tr><tr><td class="descr" colspan="4">Removes any output filter associations for a set of file
extensions</td></tr>
<tr class="odd"><td><a href="mod_mime.html#removetype">RemoveType <var>extension</var> [<var>extension</var>]
...</a></td><td></td><td>vdh</td><td>B</td></tr><tr class="odd"><td class="descr" colspan="4">Removes any content type associations for a set of file
extensions</td></tr>
<tr><td><a href="mod_headers.html#requestheader">RequestHeader set|append|add|unset <var>header</var>
[<var>value</var>]</a></td><td></td><td>svdh</td><td>E</td></tr><tr><td class="descr" colspan="4">Configure HTTP request headers</td></tr>
<tr class="odd"><td><a href="core.html#require">Require <var>entity-name</var> [<var>entity-name</var>] ...</a></td><td></td><td>dh</td><td>C</td></tr><tr class="odd"><td class="descr" colspan="4">Selecciona qu� usuarios autentificados pueden acceder a
un recurso</td></tr>
<tr><td><a href="mod_rewrite.html#rewritebase">RewriteBase <em>URL-path</em></a></td><td></td><td>dh</td><td>E</td></tr><tr><td class="descr" colspan="4">Sets the base URL for per-directory rewrites</td></tr>
<tr class="odd"><td><a href="mod_rewrite.html#rewritecond"> RewriteCond
      <em>TestString</em> <em>CondPattern</em></a></td><td></td><td>svdh</td><td>E</td></tr><tr class="odd"><td class="descr" colspan="4">Defines a condition under which rewriting will take place
</td></tr>
<tr><td><a href="mod_rewrite.html#rewriteengine">RewriteEngine on|off</a></td><td> off </td><td>svdh</td><td>E</td></tr><tr><td class="descr" colspan="4">Enables or disables runtime rewriting engine</td></tr>
<tr class="odd"><td><a href="mod_rewrite.html#rewritelock">RewriteLock <em>file-path</em></a></td><td></td><td>s</td><td>E</td></tr><tr class="odd"><td class="descr" colspan="4">Sets the name of the lock file used for <code class="directive"><a href="../mod/mod_rewrite.html#rewritemap">RewriteMap</a></code>
synchronization</td></tr>
<tr><td><a href="mod_rewrite.html#rewritelog">RewriteLog <em>file-path</em></a></td><td></td><td>sv</td><td>E</td></tr><tr><td class="descr" colspan="4">Sets the name of the file used for logging rewrite engine
processing</td></tr>
<tr class="odd"><td><a href="mod_rewrite.html#rewriteloglevel">RewriteLogLevel <em>Level</em></a></td><td> 0 </td><td>sv</td><td>E</td></tr><tr class="odd"><td class="descr" colspan="4">Sets the verbosity of the log file used by the rewrite
engine</td></tr>
<tr><td><a href="mod_rewrite.html#rewritemap">RewriteMap <em>MapName</em> <em>MapType</em>:<em>MapSource</em>
</a></td><td></td><td>sv</td><td>E</td></tr><tr><td class="descr" colspan="4">Defines a mapping function for key-lookup</td></tr>
<tr class="odd"><td><a href="mod_rewrite.html#rewriteoptions">RewriteOptions <var>Options</var></a></td><td> MaxRedirects=10 </td><td>svdh</td><td>E</td></tr><tr class="odd"><td class="descr" colspan="4">Sets some special options for the rewrite engine</td></tr>
<tr><td><a href="mod_rewrite.html#rewriterule">RewriteRule
      <em>Pattern</em> <em>Substitution</em></a></td><td></td><td>svdh</td><td>E</td></tr><tr><td class="descr" colspan="4">Defines rules for the rewriting engine</td></tr>
<tr class="odd"><td><a href="core.html#rlimitcpu">RLimitCPU <var>seconds</var>|max [<var>seconds</var>|max]</a></td><td></td><td>svdh</td><td>C</td></tr><tr class="odd"><td class="descr" colspan="4">Limita el consumo de tiempo de CPU que pueden hacer proceses creados
por procesos hijo de Apache</td></tr>
<tr><td><a href="core.html#rlimitmem">RLimitMEM <var>bytes</var>|max [<var>bytes</var>|max]</a></td><td></td><td>svdh</td><td>C</td></tr><tr><td class="descr" colspan="4">Limita el consumo de memoria que pueden hacer procesos creados por procesos hijo de Apache</td></tr>
<tr class="odd"><td><a href="core.html#rlimitnproc">RLimitNPROC <var>number</var>|max [<var>number</var>|max]</a></td><td></td><td>svdh</td><td>C</td></tr><tr class="odd"><td class="descr" colspan="4">Limita el n�mero de procesos que pueden crearse por parte de 
procesos creados por procesos hijo de Apache</td></tr>
<tr><td><a href="core.html#satisfy" id="S" name="S">Satisfy Any|All</a></td><td> All </td><td>dh</td><td>C</td></tr><tr><td class="descr" colspan="4">Interacci�n entre el control de acceso basado en host
y la autentificaci�n de usuarios</td></tr>
<tr class="odd"><td><a href="mpm_common.html#scoreboardfile">ScoreBoardFile <var>file-path</var></a></td><td> logs/apache_status </td><td>s</td><td>M</td></tr><tr class="odd"><td class="descr" colspan="4">Ubicaci�n del fichero que almacena los datos necesarios para
coordinar el funcionamiento de los procesos hijo del servidor </td></tr>
<tr><td><a href="mod_actions.html#script">Script <var>method</var> <var>cgi-script</var></a></td><td></td><td>svd</td><td>B</td></tr><tr><td class="descr" colspan="4">Activates a CGI script for a particular request
method.</td></tr>
<tr class="odd"><td><a href="mod_alias.html#scriptalias">ScriptAlias <var>URL-path</var>
<var>file-path</var>|<var>directory-path</var></a></td><td></td><td>sv</td><td>B</td></tr><tr class="odd"><td class="descr" colspan="4">Maps a URL to a filesystem location and designates the
target as a CGI script</td></tr>
<tr><td><a href="mod_alias.html#scriptaliasmatch">ScriptAliasMatch <var>regex</var>
<var>file-path</var>|<var>directory-path</var></a></td><td></td><td>sv</td><td>B</td></tr><tr><td class="descr" colspan="4">Maps a URL to a filesystem location using a regular expression
and designates the target as a CGI script</td></tr>
<tr class="odd"><td><a href="core.html#scriptinterpretersource">ScriptInterpreterSource Registry|Registry-Strict|Script</a></td><td> Script </td><td>svdh</td><td>C</td></tr><tr class="odd"><td class="descr" colspan="4">T�cnica para ubicar el int�rprete de scripts CGI's</td></tr>
<tr><td><a href="mod_cgi.html#scriptlog">ScriptLog <var>file-path</var></a></td><td></td><td>sv</td><td>B</td></tr><tr><td class="descr" colspan="4">Location of the CGI script error logfile</td></tr>
<tr class="odd"><td><a href="mod_cgi.html#scriptlogbuffer">ScriptLogBuffer <var>bytes</var></a></td><td> 1024 </td><td>sv</td><td>B</td></tr><tr class="odd"><td class="descr" colspan="4">Maximum amount of PUT or POST requests that will be recorded
in the scriptlog</td></tr>
<tr><td><a href="mod_cgi.html#scriptloglength">ScriptLogLength <var>bytes</var></a></td><td> 10385760 </td><td>sv</td><td>B</td></tr><tr><td class="descr" colspan="4">Size limit of the CGI script logfile</td></tr>
<tr class="odd"><td><a href="mod_cgid.html#scriptsock">ScriptSock <var>file-path</var></a></td><td> logs/cgisock </td><td>sv</td><td>B</td></tr><tr class="odd"><td class="descr" colspan="4">The name of the socket to use for communication with
the cgi daemon</td></tr>
<tr><td><a href="mod_nw_ssl.html#securelisten">SecureListen [<var>IP-address</var>:]<var>portnumber</var>
<var>Certificate-Name</var> [MUTUAL]</a></td><td></td><td>s</td><td>B</td></tr><tr><td class="descr" colspan="4">Enables SSL encryption for the specified port</td></tr>
<tr class="odd"><td><a href="mpm_common.html#sendbuffersize">SendBufferSize <var>bytes</var></a></td><td> 0 </td><td>s</td><td>M</td></tr><tr class="odd"><td class="descr" colspan="4">Tama�o del buffer TCP</td></tr>
<tr><td><a href="core.html#serveradmin">ServerAdmin <var>email-address</var></a></td><td></td><td>sv</td><td>C</td></tr><tr><td class="descr" colspan="4">Direcci�n de email que el servidor incluye en los
mensajes de error que se env�an al cliente</td></tr>
<tr class="odd"><td><a href="core.html#serveralias">ServerAlias <var>hostname</var> [<var>hostname</var>] ...</a></td><td></td><td>v</td><td>C</td></tr><tr class="odd"><td class="descr" colspan="4">Nombres alternativos usados para un host cuando se
intentan encontrar equivalencias a hosts virtuales basados en el
nombre</td></tr>
<tr><td><a href="mpm_common.html#serverlimit">ServerLimit <var>number</var></a></td><td></td><td>s</td><td>M</td></tr><tr><td class="descr" colspan="4">L�mite superior del n�mero configurable de procesos</td></tr>
<tr class="odd"><td><a href="core.html#servername">ServerName <var>fully-qualified-domain-name</var>[:<var>port</var>]</a></td><td></td><td>sv</td><td>C</td></tr><tr class="odd"><td class="descr" colspan="4">Nombre de host y n�mero de puerto que el servidor usa
para identificarse</td></tr>
<tr><td><a href="core.html#serverpath">ServerPath <var>URL-path</var></a></td><td></td><td>v</td><td>C</td></tr><tr><td class="descr" colspan="4">URL que se usar� para hosts virtuales basados en
nombre que son accedidos con un navegador incompatible</td></tr>
<tr class="odd"><td><a href="core.html#serverroot">ServerRoot <var>directory-path</var></a></td><td> /usr/local/apache </td><td>s</td><td>C</td></tr><tr class="odd"><td class="descr" colspan="4">Directorio base de la instalaci�n del servidor</td></tr>
<tr><td><a href="core.html#serversignature">ServerSignature On|Off|EMail</a></td><td> Off </td><td>svdh</td><td>C</td></tr><tr><td class="descr" colspan="4">Configura el pie de p�gina en documentos generados
por el servidor</td></tr>
<tr class="odd"><td><a href="core.html#servertokens">ServerTokens Major|Minor|Min[imal]|Prod[uctOnly]|OS|Full</a></td><td> Full </td><td>s</td><td>C</td></tr><tr class="odd"><td class="descr" colspan="4">Configura la cabecera de respuesta HTTP
<code>Server</code></td></tr>
<tr><td><a href="mod_env.html#setenv">SetEnv <var>env-variable</var> <var>value</var></a></td><td></td><td>svdh</td><td>B</td></tr><tr><td class="descr" colspan="4">Sets environment variables</td></tr>
<tr class="odd"><td><a href="mod_setenvif.html#setenvif">SetEnvIf <em>attribute
    regex [!]env-variable</em>[=<em>value</em>]
    [[!]<em>env-variable</em>[=<em>value</em>]] ...</a></td><td></td><td>svdh</td><td>B</td></tr><tr class="odd"><td class="descr" colspan="4">Sets environment variables based on attributes of the request
</td></tr>
<tr><td><a href="mod_setenvif.html#setenvifnocase">SetEnvIfNoCase <em>attribute regex 
        [!]env-variable</em>[=<em>value</em>]
    [[!]<em>env-variable</em>[=<em>value</em>]] ...</a></td><td></td><td>svdh</td><td>B</td></tr><tr><td class="descr" colspan="4">Sets environment variables based on attributes of the request
without respect to case</td></tr>
<tr class="odd"><td><a href="core.html#sethandler">SetHandler <var>handler-name</var>|None</a></td><td></td><td>svdh</td><td>C</td></tr><tr class="odd"><td class="descr" colspan="4">Hace que todos los ficheros que correspondan con el valor
especificado sean procesados obligatoriamente por un
handler</td></tr>
<tr><td><a href="core.html#setinputfilter">SetInputFilter <var>filter</var>[;<var>filter</var>...]</a></td><td></td><td>svdh</td><td>C</td></tr><tr><td class="descr" colspan="4">Especifica los filtros que procesar�n las peticiones de
los clientes y el contenido de peticiones POST</td></tr>
<tr class="odd"><td><a href="core.html#setoutputfilter">SetOutputFilter <var>filter</var>[;<var>filter</var>...]</a></td><td></td><td>svdh</td><td>C</td></tr><tr class="odd"><td class="descr" colspan="4">Especifica los filtros que procesar�n las respuestas del
servidor</td></tr>
<tr><td><a href="mod_include.html#ssiendtag">SSIEndTag <var>tag</var></a></td><td> "--&gt;" </td><td>sv</td><td>B</td></tr><tr><td class="descr" colspan="4">String that ends an include element</td></tr>
<tr class="odd"><td><a href="mod_include.html#ssierrormsg">SSIErrorMsg <var>message</var></a></td><td> "[an error occurred +</td><td>svdh</td><td>B</td></tr><tr class="odd"><td class="descr" colspan="4">Error message displayed when there is an SSI
error</td></tr>
<tr><td><a href="mod_include.html#ssistarttag">SSIStartTag <var>tag</var></a></td><td> "&lt;!--#" </td><td>sv</td><td>B</td></tr><tr><td class="descr" colspan="4">String that starts an include element</td></tr>
<tr class="odd"><td><a href="mod_include.html#ssitimeformat">SSITimeFormat <var>formatstring</var></a></td><td> "%A, %d-%b-%Y %H:%M +</td><td>svdh</td><td>B</td></tr><tr class="odd"><td class="descr" colspan="4">Configures the format in which date strings are
displayed</td></tr>
<tr><td><a href="mod_include.html#ssiundefinedecho">SSIUndefinedEcho <var>string</var></a></td><td> "(none)" </td><td>sv</td><td>B</td></tr><tr><td class="descr" colspan="4">String displayed when an unset variable is echoed</td></tr>
<tr class="odd"><td><a href="mod_ssl.html#sslcacertificatefile">SSLCACertificateFile <em>file-path</em></a></td><td></td><td>sv</td><td>E</td></tr><tr class="odd"><td class="descr" colspan="4">File of concatenated PEM-encoded CA Certificates 
for Client Auth</td></tr>
<tr><td><a href="mod_ssl.html#sslcacertificatepath">SSLCACertificatePath <em>directory-path</em></a></td><td></td><td>sv</td><td>E</td></tr><tr><td class="descr" colspan="4">Directory of PEM-encoded CA Certificates for 
Client Auth</td></tr>
<tr class="odd"><td><a href="mod_ssl.html#sslcarevocationfile">SSLCARevocationFile <em>file-path</em></a></td><td></td><td>sv</td><td>E</td></tr><tr class="odd"><td class="descr" colspan="4">File of concatenated PEM-encoded CA CRLs for 
Client Auth</td></tr>
<tr><td><a href="mod_ssl.html#sslcarevocationpath">SSLCARevocationPath <em>directory-path</em></a></td><td></td><td>sv</td><td>E</td></tr><tr><td class="descr" colspan="4">Directory of PEM-encoded CA CRLs for 
Client Auth</td></tr>
<tr class="odd"><td><a href="mod_ssl.html#sslcertificatechainfile">SSLCertificateChainFile <em>file-path</em></a></td><td></td><td>sv</td><td>E</td></tr><tr class="odd"><td class="descr" colspan="4">File of PEM-encoded Server CA Certificates</td></tr>
<tr><td><a href="mod_ssl.html#sslcertificatefile">SSLCertificateFile <em>file-path</em></a></td><td></td><td>sv</td><td>E</td></tr><tr><td class="descr" colspan="4">Server PEM-encoded X.509 Certificate file</td></tr>
<tr class="odd"><td><a href="mod_ssl.html#sslcertificatekeyfile">SSLCertificateKeyFile <em>file-path</em></a></td><td></td><td>sv</td><td>E</td></tr><tr class="odd"><td class="descr" colspan="4">Server PEM-encoded Private Key file</td></tr>
<tr><td><a href="mod_ssl.html#sslciphersuite">SSLCipherSuite <em>cipher-spec</em></a></td><td> ALL:!ADH:RC4+RSA:+H +</td><td>svdh</td><td>E</td></tr><tr><td class="descr" colspan="4">Cipher Suite available for negotiation in SSL 
handshake</td></tr>
<tr class="odd"><td><a href="mod_ssl.html#sslengine">SSLEngine on|off</a></td><td> off </td><td>sv</td><td>E</td></tr><tr class="odd"><td class="descr" colspan="4">SSL Engine Operation Switch</td></tr>
<tr><td><a href="mod_ssl.html#sslmutex">SSLMutex <em>type</em></a></td><td> none </td><td>s</td><td>E</td></tr><tr><td class="descr" colspan="4">Semaphore for internal mutual exclusion of 
operations</td></tr>
<tr class="odd"><td><a href="mod_ssl.html#ssloptions">SSLOptions [+|-]<em>option</em> ...</a></td><td></td><td>svdh</td><td>E</td></tr><tr class="odd"><td class="descr" colspan="4">Configure various SSL engine run-time options</td></tr>
<tr><td><a href="mod_ssl.html#sslpassphrasedialog">SSLPassPhraseDialog <em>type</em></a></td><td> builtin </td><td>s</td><td>E</td></tr><tr><td class="descr" colspan="4">Type of pass phrase dialog for encrypted private 
keys</td></tr>
<tr class="odd"><td><a href="mod_ssl.html#sslprotocol">SSLProtocol [+|-]<em>protocol</em> ...</a></td><td> all </td><td>sv</td><td>E</td></tr><tr class="odd"><td class="descr" colspan="4">Configure usable SSL protocol flavors</td></tr>
<tr><td><a href="mod_ssl.html#sslproxycacertificatefile">SSLProxyCACertificateFile <em>file-path</em></a></td><td></td><td>sv</td><td>E</td></tr><tr><td class="descr" colspan="4">File of concatenated PEM-encoded CA Certificates 
for Remote Server Auth</td></tr>
<tr class="odd"><td><a href="mod_ssl.html#sslproxycacertificatepath">SSLProxyCACertificatePath <em>directory-path</em></a></td><td></td><td>sv</td><td>E</td></tr><tr class="odd"><td class="descr" colspan="4">Directory of PEM-encoded CA Certificates for 
Remote Server Auth</td></tr>
<tr><td><a href="mod_ssl.html#sslproxycarevocationfile">SSLProxyCARevocationFile <em>file-path</em></a></td><td></td><td>sv</td><td>E</td></tr><tr><td class="descr" colspan="4">File of concatenated PEM-encoded CA CRLs for 
Remote Server Auth</td></tr>
<tr class="odd"><td><a href="mod_ssl.html#sslproxycarevocationpath">SSLProxyCARevocationPath <em>directory-path</em></a></td><td></td><td>sv</td><td>E</td></tr><tr class="odd"><td class="descr" colspan="4">Directory of PEM-encoded CA CRLs for 
Remote Server Auth</td></tr>
<tr><td><a href="mod_ssl.html#sslproxyciphersuite">SSLProxyCipherSuite <em>cipher-spec</em></a></td><td> ALL:!ADH:RC4+RSA:+H +</td><td>svdh</td><td>E</td></tr><tr><td class="descr" colspan="4">Cipher Suite available for negotiation in SSL 
proxy handshake</td></tr>
<tr class="odd"><td><a href="mod_ssl.html#sslproxyengine">SSLProxyEngine on|off</a></td><td> off </td><td>sv</td><td>E</td></tr><tr class="odd"><td class="descr" colspan="4">SSL Proxy Engine Operation Switch</td></tr>
<tr><td><a href="mod_ssl.html#sslproxymachinecertificatefile">SSLProxyMachineCertificateFile <em>filename</em></a></td><td></td><td>s</td><td>E</td></tr><tr><td class="descr" colspan="4">File of concatenated PEM-encoded client certificates and keys to be used by the proxy</td></tr>
<tr class="odd"><td><a href="mod_ssl.html#sslproxymachinecertificatepath">SSLProxyMachineCertificatePath <em>directory</em></a></td><td></td><td>s</td><td>E</td></tr><tr class="odd"><td class="descr" colspan="4">Directory of PEM-encoded client certificates and keys to be used by the proxy</td></tr>
<tr><td><a href="mod_ssl.html#sslproxyprotocol">SSLProxyProtocol [+|-]<em>protocol</em> ...</a></td><td> all </td><td>sv</td><td>E</td></tr><tr><td class="descr" colspan="4">Configure usable SSL protocol flavors for proxy usage</td></tr>
<tr class="odd"><td><a href="mod_ssl.html#sslproxyverify">SSLProxyVerify <em>level</em></a></td><td> none </td><td>svdh</td><td>E</td></tr><tr class="odd"><td class="descr" colspan="4">Type of remote server Certificate verification</td></tr>
<tr><td><a href="mod_ssl.html#sslproxyverifydepth">SSLProxyVerifyDepth <em>number</em></a></td><td> 1 </td><td>svdh</td><td>E</td></tr><tr><td class="descr" colspan="4">Maximum depth of CA Certificates in Remote Server
Certificate verification</td></tr>
<tr class="odd"><td><a href="mod_ssl.html#sslrandomseed">SSLRandomSeed <em>context</em> <em>source</em> 
[<em>bytes</em>]</a></td><td></td><td>s</td><td>E</td></tr><tr class="odd"><td class="descr" colspan="4">Pseudo Random Number Generator (PRNG) seeding 
source</td></tr>
<tr><td><a href="mod_ssl.html#sslrequire">SSLRequire <em>expression</em></a></td><td></td><td>dh</td><td>E</td></tr><tr><td class="descr" colspan="4">Allow access only when an arbitrarily complex 
boolean expression is true</td></tr>
<tr class="odd"><td><a href="mod_ssl.html#sslrequiressl">SSLRequireSSL</a></td><td></td><td>dh</td><td>E</td></tr><tr class="odd"><td class="descr" colspan="4">Deny access when SSL is not used for the 
HTTP request</td></tr>
<tr><td><a href="mod_ssl.html#sslsessioncache">SSLSessionCache <em>type</em></a></td><td> none </td><td>s</td><td>E</td></tr><tr><td class="descr" colspan="4">Type of the global/inter-process SSL Session 
Cache</td></tr>
<tr class="odd"><td><a href="mod_ssl.html#sslsessioncachetimeout">SSLSessionCacheTimeout <em>seconds</em></a></td><td> 300 </td><td>sv</td><td>E</td></tr><tr class="odd"><td class="descr" colspan="4">Number of seconds before an SSL session expires
in the Session Cache</td></tr>
<tr><td><a href="mod_ssl.html#sslusername">SSLUserName <em>varname</em></a></td><td></td><td>sdh</td><td>E</td></tr><tr><td class="descr" colspan="4">Variable name to determine user name</td></tr>
<tr class="odd"><td><a href="mod_ssl.html#sslverifyclient">SSLVerifyClient <em>level</em></a></td><td> none </td><td>svdh</td><td>E</td></tr><tr class="odd"><td class="descr" colspan="4">Type of Client Certificate verification</td></tr>
<tr><td><a href="mod_ssl.html#sslverifydepth">SSLVerifyDepth <em>number</em></a></td><td> 1 </td><td>svdh</td><td>E</td></tr><tr><td class="descr" colspan="4">Maximum depth of CA Certificates in Client 
Certificate verification</td></tr>
<tr class="odd"><td><a href="mpm_common.html#startservers">StartServers <var>number</var></a></td><td></td><td>s</td><td>M</td></tr><tr class="odd"><td class="descr" colspan="4">N�mero de procesos hijo del servidor que se crean al
iniciar Apache</td></tr>
<tr><td><a href="mpm_common.html#startthreads">StartThreads <var>number</var></a></td><td></td><td>s</td><td>M</td></tr><tr><td class="descr" colspan="4">N�mero de hebras que se crean al iniciar Apache</td></tr>
<tr class="odd"><td><a href="mod_suexec.html#suexecusergroup">SuexecUserGroup <em>User Group</em></a></td><td></td><td>sv</td><td>E</td></tr><tr class="odd"><td class="descr" colspan="4">User and group permissions for CGI programs</td></tr>
<tr><td><a href="mpm_common.html#threadlimit" id="T" name="T">ThreadLimit <var>number</var></a></td><td></td><td>s</td><td>M</td></tr><tr><td class="descr" colspan="4">Marca el l�mite superior del n�mero de hebras por
proceso hijo que pueden especificarse</td></tr>
<tr class="odd"><td><a href="mpm_common.html#threadsperchild">ThreadsPerChild <var>number</var></a></td><td></td><td>s</td><td>M</td></tr><tr class="odd"><td class="descr" colspan="4">N�mero de hebras creadas por cada proceso
hijo</td></tr>
<tr><td><a href="mpm_netware.html#threadstacksize">ThreadStackSize <var>number</var></a></td><td> 65536 </td><td>s</td><td>M</td></tr><tr><td class="descr" colspan="4">Determine the stack size for each thread</td></tr>
<tr class="odd"><td><a href="core.html#timeout">TimeOut <var>seconds</var></a></td><td> 300 </td><td>s</td><td>C</td></tr><tr class="odd"><td class="descr" colspan="4">Cantidad de tiempo que el servidor esperar� para que
ocurran determinados eventos antes de cerrar una
petici�n</td></tr>
<tr><td><a href="mod_log_config.html#transferlog">TransferLog <var>file</var>|<var>pipe</var></a></td><td></td><td>sv</td><td>B</td></tr><tr><td class="descr" colspan="4">Specify location of a log file</td></tr>
<tr class="odd"><td><a href="mod_mime.html#typesconfig">TypesConfig <var>file-path</var></a></td><td> conf/mime.types </td><td>s</td><td>B</td></tr><tr class="odd"><td class="descr" colspan="4">The location of the <code>mime.types</code> file</td></tr>
<tr><td><a href="mod_env.html#unsetenv" id="U" name="U">UnsetEnv <var>env-variable</var> [<var>env-variable</var>]
...</a></td><td></td><td>svdh</td><td>B</td></tr><tr><td class="descr" colspan="4">Removes variables from the environment</td></tr>
<tr class="odd"><td><a href="core.html#usecanonicalname">UseCanonicalName On|Off|DNS</a></td><td> On </td><td>svd</td><td>C</td></tr><tr class="odd"><td class="descr" colspan="4">Configura la forma en que el servidor determina su propio
nombre u puerto</td></tr>
<tr><td><a href="mpm_common.html#user">User <var>unix-userid</var></a></td><td> #-1 </td><td>s</td><td>M</td></tr><tr><td class="descr" colspan="4">Nombre de usuario con el que el servidor responder� a las
peticiones</td></tr>
<tr class="odd"><td><a href="mod_userdir.html#userdir">UserDir <em>directory-filename</em></a></td><td> public_html </td><td>sv</td><td>B</td></tr><tr class="odd"><td class="descr" colspan="4">Location of the user-specific directories</td></tr>
<tr><td><a href="mod_vhost_alias.html#virtualdocumentroot" id="V" name="V">VirtualDocumentRoot <em>interpolated-directory</em>|none</a></td><td> none </td><td>sv</td><td>E</td></tr><tr><td class="descr" colspan="4">Dynamically configure the location of the document root
for a given virtual host</td></tr>
<tr class="odd"><td><a href="mod_vhost_alias.html#virtualdocumentrootip">VirtualDocumentRootIP <em>interpolated-directory</em>|none</a></td><td> none </td><td>sv</td><td>E</td></tr><tr class="odd"><td class="descr" colspan="4">Dynamically configure the location of the document root
for a given virtual host</td></tr>
<tr><td><a href="core.html#virtualhost">&lt;VirtualHost
    <var>addr</var>[:<var>port</var>] [<var>addr</var>[:<var>port</var>]]
    ...&gt; ... &lt;/VirtualHost&gt;</a></td><td></td><td>s</td><td>C</td></tr><tr><td class="descr" colspan="4">Contiene las directivas que se aplican solo a un nombre
de host espec�fico o direcci�n IP</td></tr>
<tr class="odd"><td><a href="mod_vhost_alias.html#virtualscriptalias">VirtualScriptAlias <em>interpolated-directory</em>|none</a></td><td> none </td><td>sv</td><td>E</td></tr><tr class="odd"><td class="descr" colspan="4">Dynamically configure the location of the CGI directory for
a given virtual host</td></tr>
<tr><td><a href="mod_vhost_alias.html#virtualscriptaliasip">VirtualScriptAliasIP <em>interpolated-directory</em>|none</a></td><td> none </td><td>sv</td><td>E</td></tr><tr><td class="descr" colspan="4">Dynamically configure the location of the cgi directory for
a given virtual host</td></tr>
<tr class="odd"><td><a href="mpm_winnt.html#win32disableacceptex" id="W" name="W">Win32DisableAcceptEx</a></td><td></td><td>s</td><td>M</td></tr><tr class="odd"><td class="descr" colspan="4">Usa accept() en lugar de AcceptEx() para aceptar
conexiones de red</td></tr>
<tr><td><a href="mod_include.html#xbithack" id="X" name="X">XBitHack on|off|full</a></td><td> off </td><td>svdh</td><td>B</td></tr><tr><td class="descr" colspan="4">Parse SSI directives in files with the execute bit
set</td></tr>
</table></div>
<div class="bottomlang">
<p><span>Idiomas disponibles: </span><a href="../de/mod/quickreference.html" hreflang="de" rel="alternate" title="Deutsch">&nbsp;de&nbsp;</a> |
<a href="../en/mod/quickreference.html" hreflang="en" rel="alternate" title="English">&nbsp;en&nbsp;</a> |
<a href="../es/mod/quickreference.html" title="Espa�ol">&nbsp;es&nbsp;</a> |
<a href="../ja/mod/quickreference.html" hreflang="ja" rel="alternate" title="Japanese">&nbsp;ja&nbsp;</a> |
<a href="../ko/mod/quickreference.html" hreflang="ko" rel="alternate" title="Korean">&nbsp;ko&nbsp;</a> |
<a href="../ru/mod/quickreference.html" hreflang="ru" rel="alternate" title="Russian">&nbsp;ru&nbsp;</a></p>
</div><div id="footer">
<p class="apache">Copyright 1995-2006 The Apache Software Foundation or its licensors, as applicable.<br />Licencia bajo los t�rminos de la <a href="http://www.apache.org/licenses/LICENSE-2.0">Apache License, Version 2.0</a>.</p>
<p class="menu"><a href="../mod/">M�dulos</a> | <a href="../mod/directives.html">Directivas</a> | <a href="../faq/">Preguntas Frecuentes</a> | <a href="../glossary.html">Glosario</a> | <a href="../sitemap.html">Mapa de este sitio web</a></p></div>
</body></html>