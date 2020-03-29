LexiconEditor.panel.Home = function(config) {
    config = config || {};
    Ext.apply(config,{
        border: false
        ,baseCls: 'modx-formpanel'
        ,cls: 'container'
        ,items: [{
            html: '<h2>'+_('lexiconeditor')+'</h2>'
            ,border: false
            ,cls: 'modx-page-header'
        },{
            xtype: 'modx-tabs'
            ,defaults: { border: false ,autoHeight: true }
            ,border: true
            ,items: [{
                title: _('lexiconeditor.tab')
                ,defaults: { autoHeight: true }
                ,items: [{
                    html: '<p>'+_('lexiconeditor.management_desc')+'</p>'
                    ,border: false
                    ,bodyCssClass: 'panel-desc'
                },{
                    xtype: 'lexiconeditor-grid-entries'
                    ,cls: 'main-wrapper'
                    ,preventRender: true
                }]
            }]
            // only to redo the grid layout after the content is rendered
            // to fix overflow components' panels, especially when scroll bar is shown up
            ,listeners: {
                'afterrender': function(tabPanel) {
                    tabPanel.doLayout();
                }
            }
        }]
    });
    LexiconEditor.panel.Home.superclass.constructor.call(this,config);
};
Ext.extend(LexiconEditor.panel.Home,MODx.Panel);
Ext.reg('lexiconeditor-panel-home',LexiconEditor.panel.Home);
