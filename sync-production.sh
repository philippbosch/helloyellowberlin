#!/bin/bash
s3cmd sync --recursive --exclude ".git/*" --exclude ".sass-cache/*" --exclude .DS_Store --acl-public . s3://helloyellowberlin.de/
