<?php
class LexiconeditorHomeManagerController extends modExtraManagerController {
    public function process(array $scriptProperties = array()) {}

    public function initialize()
    {
        $corePath = $this->modx->getOption('lexiconeditor.core_path', null, $this->modx->getOption('core_path') . 'components/lexiconeditor/');
        $this->lexiconeditor = $this->modx->getService('lexiconeditor', 'lexiconeditor', $corePath . '/model/lexiconeditor/', array(
            'core_path' => $corePath
        ));
    }

    public function getLanguageTopics()
    {
        return array('core:setting', 'lexiconeditor:default');
    }

    public function getPageTitle()
    {
        return $this->modx->lexicon('lexiconeditor');
    }

    public function loadCustomCssJs() {

        $assetsUrl = MODX_ASSETS_URL . 'components/lexiconeditor/';
        $jsUrl = $assetsUrl . 'js/mgr/';
        $cssUrl = $assetsUrl . 'css/mgr/';
        $connectorsUrl = MODX_ASSETS_URL . 'components/lexiconeditor/connector.php';

        $this->addCss($cssUrl . 'lexiconeditor.css?');

        $this->addLastJavascript($jsUrl . 'lexiconeditor.js');
        $this->addLastJavascript($jsUrl . 'widgets/entries.grid.js');
        $this->addLastJavascript($jsUrl . 'widgets/home.panel.js');
        $this->addLastJavascript($jsUrl . 'sections/home.js');

        $this->lexiconeditor->options = array(
            'assetsUrl' => $assetsUrl,
            'connectorUrl' => $connectorsUrl,
            'namespace' => $this->modx->getOption('lexiconeditor.namespace'),
        );

        $this->addHtml('<script type="text/javascript">
        Ext.onReady(function() {
            LexiconEditor.config = ' . json_encode($this->lexiconeditor->options, JSON_PRETTY_PRINT) . ';
        });
        </script>');

    }

    public function getTemplateFile()
    {
        return 'home.tpl';
    }
}
