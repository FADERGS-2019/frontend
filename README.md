## Requisitos
- PHP 7.2
- Apache
- Composer

## Dependências
- Slim 3.0
- Twig

## Instalação
Instale as dependências utilizando o Composer com o comando na pasta raiz:
```
composer install
```

## Host Virtual
No caso da utilização do Apache, é necessário criar um host virtual apontando para a pasta ``public`` do projeto, o host também deve permitir a sobreposição de regras do arquivo ``.htaccess``, segue um exemplo do host virtual:
```xml
<VirtualHost *:80>
	ServerName pizza.local
	DocumentRoot "<pasta_raiz_aqui>/public"
	<Directory  "<pasta_raiz_aqui>/public/">
		Options +Indexes +Includes +FollowSymLinks +MultiViews
		AllowOverride All
		Require local
	</Directory>
</VirtualHost>
```
