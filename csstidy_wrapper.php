<?php

/**
* Wrapper for the PHP version of CSS Tidy to allow it to accept command line arguments. 
* 
* (I tried the linux version but I couldn't get the binary to work to the source to compile without errors..)
* 
* Requires php5-cli to work:
* sudo aptitude install php5-cli
*
* Copyright Nathan Friedly - http://nfriedly.com
* 
* MIT License
**/

if(!isset($argv[2])){
	exit("usage:\n$ php $argv[0] source.css destination.css\n");
}

// fire up css tidy
require('lib/csstidy-1.3/class.csstidy.php');
$css = new csstidy();

// put all settings on "no shenanigans" mode
$css->set_cfg('remove_bslash',false);
$css->set_cfg('compress_colors',false);
$css->set_cfg('compress_font-weight',false);
$css->set_cfg('lowercase_s',false);
$css->set_cfg('optimise_shorthands',0);
$css->set_cfg('remove_last_;',false);
$css->set_cfg('case_properties',0);
$css->set_cfg('sort_properties',false);
$css->set_cfg('sort_selectors',false);
$css->set_cfg('merge_selectors',0);
$css->set_cfg('discard_invalid_properties',false);
$css->set_cfg('preserve_css',true);
$css->set_cfg('timestamp',false);

$css->load_template('low_compression');

// read in the source file
$source_css = file_get_contents($argv[1]) or die("Error reading source file $argv[1]\n");

//echo "source css: \n\n" . substr($source_css,0,300) . "...\n\n";

$css->parse($source_css);

// and spit out the results
$result = $css->print->plain();

//echo "parsed css: \n\n" . substr($result,0,300) . "...\n\n";

file_put_contents($argv[2], $result) or die ("Error writing to destination file $argv[2]\n");