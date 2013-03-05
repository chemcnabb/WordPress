<?php
/*
 Plugin Name: AzureTickets2
Plugin URI: http://www.AzureTickets.com
Description: AzureTickets is a Free Event Ticketing Platform designed to work with WordPress, the world's most popular Content Management System.
Version: 0.7
Author: jasonlavigne, jarekn, AzureTickets
Author URI: http://www.AzureTickets.com
License: GPLv2 or later
*/
/*  Copyright 2012  AzureTickets  (email : contact@azuretickets.com)

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License, version 2, as
published by the Free Software Foundation.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

*/

// test clientKey b31e42d6-9205-417d-a2d9-366abc7d5046

//sangcu@20121114 Load scripts for client page
add_action('wp_enqueue_scripts', 'ats2_wp_init');
add_action('admin_init', 'ats2_admin_init');
add_action('admin_menu','ats2_plugin_admin_menu');
add_action('wp_head', 'ats2_load_constant');
add_action('admin_head', 'ats2_load_constant');

//sangcu@20121114 add shortcodes for client page
function ats2_add_shortcode(){
	add_shortcode('azuretickets2', 'ats2_filter_content');
}

function ats2_load_constant(){
	?>
<!-- common head -->
<script
	type="text/javascript"
	src="<?php echo plugins_url('/',__FILE__) ?>components/responsiveiframe/dist/jquery.responsiveiframe.min.js"></script>
<script type="text/javascript">
<!--
jQuery(function(){
	jQuery('iframe.atContainer').responsiveIframe({ xdomain: '*'});
});
//-->
</script>
<style type="text/css">
iframe.atContainer {
	width: 100%;
	padding: 0px;
	margin: 0;
	border: none;
	display: block;
	height: 0px;
	overflow: hidden
}
</style>
<?php
}

//load script in client
function ats2_wp_init(){
	ats2_add_shortcode();
}

//sangcu@20120811 init scripts/style for plugin
function ats2_admin_init(){

}

//sangcu@20121108 init menu in admin page
function ats2_plugin_admin_menu(){
	$page = add_menu_page('AzureTickets2','AzureTickets2','manage_options','azuretickets2','ats2_admin_openmenu', '');
}

//sangcu@20121108 Call this function when user click on admin menu.
function ats2_admin_openmenu(){
	//sangcu@20121108 check permissions with current user
	if(!current_user_can('manage_options')){
		wp_die(__('You do not have sufficient permissions to access this page.'));
	}
	?>
<!-- admin panel -->
<iframe
	class="atContainer"
	src="<?php echo plugins_url('/',__FILE__)?>index.html#/admin"></iframe>
<?php
}

function ats2_filter_content($atts){
  // get attributes
  extract( shortcode_atts( array(
  'storeuri' => '',
  'eventkey' => '',
  ), $atts ) );

  // return empty if do not have storekey
  if (empty($storeuri))
  	return '';

  ob_start();
  ?>
<!-- front panel -->
<iframe
	class="atContainer"
	src="<?php echo plugins_url('/',__FILE__)?>index.html#/front" />
<?php
return ob_get_contents();
}
?>