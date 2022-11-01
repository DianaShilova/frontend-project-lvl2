### Hexlet tests and linter status:
[![Actions Status](https://github.com/DianaShilova/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/DianaShilova/frontend-project-lvl2/actions)

<a href="https://codeclimate.com/github/DianaShilova/frontend-project-lvl2/maintainability"><img src="https://api.codeclimate.com/v1/badges/f8cdd36173329c90c4e7/maintainability" /></a>

<a href="https://codeclimate.com/github/DianaShilova/frontend-project-lvl2/test_coverage"><img src="https://api.codeclimate.com/v1/badges/f8cdd36173329c90c4e7/test_coverage" /></a>

[![GitHub Actions Demo](https://github.com/DianaShilova/frontend-project-lvl2/actions/workflows/github-actions-demo.yml/badge.svg)](https://github.com/DianaShilova/frontend-project-lvl2/actions/workflows/github-actions-demo.yml)

# GenDiff - программа для вычисления отличий двух файлов

## Установка
- необходимо скачать репозиторий с GitHub
- из корневой папки репозитория выполнить следующиее команды:
 - make install
 - npm link

## Подсказки
Вызов справки  производится с помощью флага -h или --help
(gendiff -h)

Утилита имеет возможность сравнивать 3 формата данных: json, yaml/yml. А так же имеет 3 вида вывода дифа(по умолчанию stylish) с помощью соответствующего флага --format:
1) stylish
2) plain
3) json

[![asciicast](https://asciinema.org/a/n2znT6IxBW6fwIq4mDzp067Ji.svg)](https://asciinema.org/a/n2znT6IxBW6fwIq4mDzp067Ji)

### Сравнение плоских файлов (JSON) :
Для сравнения файлов необходимо ввести команду 'gendiff' и ввести названия двух сравниваемых файлов (с указанием формата файла) через пробел
Пример: gendiff file1.json file2.json

[![asciicast](https://asciinema.org/a/7gdmX0KmzLnKoYL3ayb1IgwiY.svg)](https://asciinema.org/a/7gdmX0KmzLnKoYL3ayb1IgwiY)

### Рекурсивное сравнение
Для сравнения файлов необходимо ввести команду 'gendiff' и ввести названия двух сравниваемых файлов (с указанием формата файла) через пробел. Это форматтер stylish(по умолчанию)
Пример: gendiff file1.json file2.json

[![asciicast](https://asciinema.org/a/z81w7zNQe16ORezBtHIeki5VV.svg)](https://asciinema.org/a/z81w7zNQe16ORezBtHIeki5VV)

### Плоский формат
Для сравнения файлов необходимо ввести команду 'gendiff' с флагом '--format' и ввести названия двух сравниваемых файлов (с указанием формата файла) через пробел. Это форматтер 'plain'.
Пример: gendiff --format plain file1.json file2.json

[![asciicast](https://asciinema.org/a/zK93l4UruCgAo3OS0mHulB7T3.svg)](https://asciinema.org/a/zK93l4UruCgAo3OS0mHulB7T3)

### Вывод JSON
Для сравнения файлов необходимо ввести команду 'gendiff' с флагом '--format' и ввести названия двух сравниваемых файлов (с указанием формата файла) через пробел. Это форматтер 'json'.
Пример: gendiff --format json file1.json file2.json

[![asciicast](https://asciinema.org/a/dwJKBZMUw0763nSCNA7SSy5s2.svg)](https://asciinema.org/a/dwJKBZMUw0763nSCNA7SSy5s2)