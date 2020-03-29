Ext.onReady(function() {
    MODx.load({ xtype: 'lexiconeditor-page-home'});
});
LexiconEditor.page.Home = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        components: [{
            xtype: 'lexiconeditor-panel-home'
            ,renderTo: 'lexiconeditor-panel-home'
        }]
    });
    LexiconEditor.page.Home.superclass.constructor.call(this,config);
};
Ext.extend(LexiconEditor.page.Home,MODx.Component);
Ext.reg('lexiconeditor-page-home',LexiconEditor.page.Home);
