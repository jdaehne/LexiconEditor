var LexiconEditor = function (config) {
	config = config || {};
	LexiconEditor.superclass.constructor.call(this, config);
	return this;
};
Ext.extend(LexiconEditor, Ext.Component, {
	page: {}, window: {}, grid: {}, tree: {}, panel: {}, combo: {}, config: {}, view: {}, utils: {}
});
Ext.reg('lexiconeditor', LexiconEditor);

LexiconEditor = new LexiconEditor();
