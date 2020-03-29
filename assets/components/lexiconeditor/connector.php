<?php
/**
 * LexiconEditor connector
 *
 * @package lexiconeditor
 * @subpackage connector
 *
 * @var modX $modx
 */
require_once dirname(dirname(dirname(dirname(__FILE__)))) . '/config.core.php';
require_once MODX_CORE_PATH . 'config/' . MODX_CONFIG_KEY . '.inc.php';
require_once MODX_CONNECTORS_PATH . 'index.php';

$corePath = $modx->getOption('lexiconeditor.core_path', null, $modx->getOption('core_path') . 'components/lexiconeditor/');
$lexiconeditor = $modx->getService('lexiconeditor', 'LexiconEditor', $corePath . 'model/lexiconeditor/', array(
    'core_path' => $corePath
));

// Handle request
$modx->request->handleRequest(array(
    'processors_path' => $modx->lexiconeditor->getOption('processorsPath'),
    'location' => ''
));
