#!/bin/sh

rsync --archive --verbose --human-readable --progress --recursive --copy-links --delete --exclude .git \
	~/Projects/test.local/happy-hour/paper.js/praytime/ \
	root@www.binbir.net:/www/www.binbir.net/html/pt/
	