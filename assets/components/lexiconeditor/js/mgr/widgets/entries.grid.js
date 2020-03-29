LexiconEditor.grid.Entries = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'lexiconeditor-grid-entries'
        ,url: MODx.config.connector_url
        ,fields: ['name','value','namespace','topic','language','editedon','overridden']
        ,baseParams: {
            action: 'workspace/lexicon/getList'
            ,'namespace': LexiconEditor.config.namespace
            ,topic: ''
            ,language: MODx.config.manager_language || 'en'
        }
        ,fields: ['name','value','namespace','topic','language','editedon','overridden']
        ,paging: true
        ,remoteSort: true
        ,anchor: '97%'
        ,autoExpandColumn: 'name'
        ,autosave: true
        ,save_action: 'workspace/lexicon/updatefromgrid'
        ,columns: [{
            header: _('name')
            ,dataIndex: 'name'
            ,width: 200
            ,sortable: true
            ,renderer: this._renderStatus
        },{
            header: _('value')
            ,dataIndex: 'value'
            ,width: 500
            ,sortable: false
            ,editor: {xtype: 'textarea'}
            ,renderer: this._renderStatus
        },{
            header: _('last_modified')
            ,dataIndex: 'editedon'
            ,width: 125
            ,renderer: this._renderLastModDate
        }]
        ,tbar: [{
            xtype: 'tbtext'
            ,text: _('language')+':'
        },{
            xtype: 'modx-combo-language'
            ,name: 'language'
            ,id: 'modx-lexicon-filter-language'
            ,itemId: 'language'
            ,value: MODx.config.manager_language || 'en'
            ,width: 100
            ,url: MODx.config.connector_url
            ,baseParams: {
                action: 'system/language/getlist'
                ,'namespace': LexiconEditor.config.namespace
            }
            ,listeners: {
                'select': {fn:this.changeLanguage,scope:this}
            }
        }
        ,'->'
        ,{
            xtype: 'textfield'
            ,name: 'name'
            ,id: 'modx-lexicon-filter-search'
            ,cls: 'x-form-filter'
            ,itemId: 'search'
            ,width: 120
            ,emptyText: _('search')+'...'
            ,listeners: {
                'change': {fn:this.filter.createDelegate(this,['search'],true),scope:this}
                ,'render': {fn: function(cmp) {
                    new Ext.KeyMap(cmp.getEl(), {
                        key: Ext.EventObject.ENTER
                        ,fn: this.blur
                        ,scope: cmp
                    });
                },scope:this}
            }
        },{
            xtype: 'button'
            ,id: 'modx-lexicon-filter-clear'
            ,cls: 'x-form-filter-clear'
            ,itemId: 'clear'
            ,text: _('filter_clear')
            ,listeners: {
                'click': {fn: this.clearFilter, scope: this},
                    'mouseout': { fn: function(evt){
                        this.removeClass('x-btn-focus');
                    }
                }
            }
        }]
    });
    LexiconEditor.grid.Entries.superclass.constructor.call(this,config);
};


Ext.extend(LexiconEditor.grid.Entries,MODx.grid.Grid,{
    console: null

    ,_renderStatus: function(v,md,rec,ri) {
        switch (rec.data.overridden) {
            case 1:
                return '<span style="color: green;">'+v+'</span>';break;
            case 2:
                return '<span style="color: purple;">'+v+'</span>';
            default:
                return '<span>'+v+'</span>';
        }
    }

    ,_renderLastModDate: function(value) {
        if (Ext.isEmpty(value)) {
            return '—';
        }

        return new Date(value*1000).format(MODx.config.manager_date_format + ' ' + MODx.config.manager_time_format);
    }

    ,filter: function(cb,r,i,name) {
    	if (!name) {return false;}
    	this.store.baseParams[name] = cb.getValue();
    	this.getBottomToolbar().changePage(1);
    	//this.refresh();
        return true;
    }

    ,clearFilter: function() {
    	this.store.baseParams = {
            action: 'mgr/lexiconeditor/getList'
    	};
    	this.getBottomToolbar().changePage(1);
        var tb = this.getTopToolbar();

    	var tcl = tb.getComponent('language');
        tcl.setValue(MODx.config.manager_language || 'en');

        tb.getComponent('search').setValue('');
    	//this.refresh();
    }

    ,changeLanguage: function(cb,nv,ov) {
        this.setFilterParams(null,null,cb.getValue());
    }

    ,setFilterParams: function(ns,t,l) {
        var tb = this.getTopToolbar();
        if (!tb) {return false;}

        var s = this.getStore();
        if (s) {
            if (ns) {s.baseParams['namespace'] = ns;}
            if (t) {s.baseParams['topic'] = t || 'default';}
            if (l) {s.baseParams['language'] = l || 'en';}
            s.removeAll();
        }
        this.getBottomToolbar().changePage(1);
        //this.refresh();
    }
});

Ext.reg('lexiconeditor-grid-entries',LexiconEditor.grid.Entries);
